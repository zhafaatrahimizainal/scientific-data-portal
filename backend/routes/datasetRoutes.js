import express from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100 MB Limit
});

const ALLOWED_EXTENSIONS = ['.csv', '.json', '.hdf5', '.nii', '.fastq', '.xlsx', '.pdf'];

// Middleware to verify user token from frontend request headers
const verifyAuthToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing access token' });

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return res.status(401).json({ error: 'Unauthorized token' });

  req.user = user;
  req.supabase = supabase;
  next();
};

router.post('/upload', verifyAuthToken, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file attached' });

    // File Extension Validation
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return res.status(400).json({ error: `Unsupported file extension: ${ext}` });
    }

    // Extract metadata fields from request body
    const { title, discipline, grant_id, experimental_conditions, tags, access_level } = req.body;
    const parsedTags = tags ? JSON.parse(tags) : [];

    // File path formatting inside storage bucket
    const filePath = `${req.user.id}/${Date.now()}_${file.originalname}`;

    // Upload buffer to Supabase Storage
    const { error: storageError } = await req.supabase.storage
      .from('scientific-datasets')
      .upload(filePath, file.buffer, { contentType: file.mimetype });

    if (storageError) throw storageError;

    // Insert dataset record into Postgres
    const { data: dataset, error: dbError } = await req.supabase
      .from('datasets')
      .insert([{
        user_id: req.user.id,
        title,
        discipline,
        grant_id,
        experimental_conditions,
        tags: parsedTags,
        access_level: access_level || 'private',
        file_path: filePath,
        file_name: file.originalname,
        file_size: file.size,
        mime_type: file.mimetype
      }])
      .select()
      .single();

    if (dbError) throw dbError;

    res.status(201).json({ message: 'Dataset uploaded successfully', dataset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all datasets for the authenticated user
router.get('/', verifyAuthToken, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('datasets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate a temporary signed URL for file download (60 sec expiration)
router.get('/:id/download', verifyAuthToken, async (req, res) => {
  try {
    const { data: dataset, error: fetchErr } = await req.supabase
      .from('datasets')
      .select('file_path, file_name')
      .eq('id', req.params.id)
      .single();

    if (fetchErr || !dataset) return res.status(404).json({ error: 'Dataset not found' });

    const { data, error: urlErr } = await req.supabase.storage
      .from('scientific-datasets')
      .createSignedUrl(dataset.file_path, 60);

    if (urlErr) throw urlErr;

    res.json({ downloadUrl: data.signedUrl, fileName: dataset.file_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete dataset file from storage and record from Postgres
router.delete('/:id', verifyAuthToken, async (req, res) => {
  try {
    const { data: dataset, error: fetchErr } = await req.supabase
      .from('datasets')
      .select('file_path')
      .eq('id', req.params.id)
      .single();

    if (fetchErr || !dataset) return res.status(404).json({ error: 'Dataset not found' });

    // 1. Remove from storage bucket
    await req.supabase.storage.from('scientific-datasets').remove([dataset.file_path]);

    // 2. Remove metadata row from DB
    const { error: dbErr } = await req.supabase
      .from('datasets')
      .delete()
      .eq('id', req.params.id);

    if (dbErr) throw dbErr;

    res.json({ message: 'Dataset removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;