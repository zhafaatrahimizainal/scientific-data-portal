import { supabaseAdmin } from "../config/supabase.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization token" });
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Unauthorized token verification failed" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal authentication error" });
  }
};