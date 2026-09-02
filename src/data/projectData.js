// src/data/projectData.js

export const projectMetadata = {
  title: "Scientific Data Management Portal",
  subtitle: "An analytical platform designed for data tracking, document previewing, and PostgreSQL database queries with high-throughput response times.",
  version: "v1.0.4-dev",
  environment: "DEMO / FRONTEND-ONLY",
  techStack: [
    "React.js",
    "JavaScript",
    "Lucide React",
    "Node.js",
    "PostgreSQL",
    "REST API"
  ],
  metadataBadges: [
    "FULL-STACK WEB APPLICATION",
    "DATA MANAGEMENT",
    "REST API",
    "POSTGRESQL",
    "ENGINEERING PROJECT"
  ]
};

export const overviewHighlights = [
  {
    id: "01",
    tag: "DATA TRACKING",
    title: "Structured Lineage",
    description: "Monitor and trace scientific datasets across diverse experiments with standardized metadata formats."
  },
  {
    id: "02",
    tag: "DOCUMENT PREVIEW",
    title: "In-Context Reading",
    description: "Inspect supporting lab notes, PDF exports, and experimental protocols without breaking your focus."
  },
  {
    id: "03",
    tag: "DATABASE QUERIES",
    title: "Targeted Retrieval",
    description: "Execute targeted analytical queries against relational PostgreSQL datasets with minimal overhead."
  },
  {
    id: "04",
    tag: "HIGH-THROUGHPUT API",
    title: "Decoupled Data Layer",
    description: "Connect application layers via a standardized REST interface engineered for frequent state synchronization."
  }
];

export const capabilities = [
  {
    id: "cap-1",
    code: "CAP-01",
    title: "Data Tracking & Lineage",
    category: "Core Engine",
    description: "Monitor and organize scientific datasets through structured data views, temporal tracking, and research group tagging.",
    icon: "Database",
    featured: true,
    details: ["Granular sample-level taxonomy", "Real-time query filters", "Status tracking & lifecycle management"]
  },
  {
    id: "cap-2",
    code: "CAP-02",
    title: "Document Preview",
    category: "Workflow",
    description: "Preview supporting documents directly within the platform without interrupting active data collection workflows.",
    icon: "FileText",
    featured: false,
    details: ["Instant payload inspection", "Metadata extraction"]
  },
  {
    id: "cap-3",
    code: "CAP-03",
    title: "PostgreSQL Queries",
    category: "Database",
    description: "Perform efficient database queries against structured scientific datasets using relational schemas.",
    icon: "Search",
    featured: false,
    details: ["Relational join support", "Indexed search parameters"]
  },
  {
    id: "cap-4",
    code: "CAP-04",
    title: "REST API Gateway",
    category: "Interface",
    description: "Provide a clean API layer between the frontend client application and underlying backend microservices.",
    icon: "Network",
    featured: false,
    details: ["Decoupled endpoints", "Standardized JSON responses"]
  },
  {
    id: "cap-5",
    code: "CAP-05",
    title: "High-Throughput Architecture",
    category: "Performance",
    description: "Designed to handle frequent client requests and large volumes of structured scientific records efficiently.",
    icon: "Server",
    featured: false,
    details: ["Async execution pipeline", "Predictable response cycles"]
  }
];

export const architectureNodes = [
  {
    id: "client",
    tag: "CLIENT",
    title: "React.js Frontend",
    sub: "Interface & User Interaction",
    desc: "Single-page state management, responsive UI layout, and query workspace rendering.",
    icon: "Layers"
  },
  {
    id: "api",
    tag: "API LAYER",
    title: "REST API Gateway",
    sub: "Request / Response Boundary",
    desc: "Route handles, payload validation, and HTTP verb orchestration.",
    icon: "Network"
  },
  {
    id: "server",
    tag: "SERVER",
    title: "Node.js Backend",
    sub: "Application & Processing Layer",
    desc: "Business logic, authentication verification, and SQL query builder middleware.",
    icon: "Activity"
  },
  {
    id: "database",
    tag: "DATABASE",
    title: "PostgreSQL Engine",
    sub: "Relational Scientific Storage",
    desc: "Indexed tables for datasets, experimental parameters, and metadata storage.",
    icon: "Database"
  }
];

export const mockDatasets = [
  {
    id: "DS-8842",
    sampleId: "SMP-2026-091",
    collectionDate: "2026-08-14",
    researchGroup: "Genomics Core",
    status: "Completed",
    recordCount: 14200,
    species: "Arabidopsis thaliana",
    storageLocation: "Vault-Alpha"
  },
  {
    id: "DS-8843",
    sampleId: "SMP-2026-104",
    collectionDate: "2026-08-18",
    researchGroup: "Biophysics Lab",
    status: "Processing",
    recordCount: 8900,
    species: "Escherichia coli",
    storageLocation: "Vault-Gamma"
  },
  {
    id: "DS-8844",
    sampleId: "SMP-2026-112",
    collectionDate: "2026-08-22",
    researchGroup: "Proteomics Unit",
    status: "Completed",
    recordCount: 32100,
    species: "Homo sapiens (Line B)",
    storageLocation: "Vault-Beta"
  },
  {
    id: "DS-8845",
    sampleId: "SMP-2026-120",
    collectionDate: "2026-08-29",
    researchGroup: "Genomics Core",
    status: "Archived",
    recordCount: 5400,
    species: "Saccharomyces cerevisiae",
    storageLocation: "Cold-Archive"
  }
];

export const mockDocuments = [
  {
    id: "DOC-202",
    title: "Genomic Sequence Alignment Protocol v4.pdf",
    type: "PDF Document",
    size: "2.4 MB",
    author: "Dr. E. Vance",
    updatedAt: "2026-08-15",
    abstract: "Standard operating procedure for high-throughput alignment of fastq reads against indexed reference genomes."
  },
  {
    id: "DOC-203",
    title: "Mass Spectrometry Calibration Log.docx",
    type: "Lab Report",
    size: "810 KB",
    author: "M. Kroll",
    updatedAt: "2026-08-20",
    abstract: "Daily machine calibration records verifying voltage stability and ion trajectory tolerance."
  },
  {
    id: "DOC-204",
    title: "Crystallography Data Extraction Notes.txt",
    type: "Technical Note",
    size: "142 KB",
    author: "S. Chen",
    updatedAt: "2026-08-28",
    abstract: "Raw electron density map exports and manual filtering guidelines for batch DS-8844."
  }
];

export const mockQueries = [
  {
    id: "Q-1",
    name: "Active Genomics Samples",
    sql: "SELECT dataset_id, sample_id, record_count, status\nFROM scientific_records\nWHERE research_group = 'Genomics Core'\n  AND status = 'Completed'\nORDER BY collection_date DESC;",
    description: "Retrieves recent genomics datasets marked ready for downstream processing."
  },
  {
    id: "Q-2",
    name: "High-Volume Volume Metrics",
    sql: "SELECT research_group, COUNT(dataset_id) AS total_datasets, SUM(record_count) AS total_records\nFROM scientific_records\nGROUP BY research_group\nHAVING SUM(record_count) > 8000;",
    description: "Aggregates total dataset records grouped by active research laboratories."
  },
  {
    id: "Q-3",
    name: "Vault Location Summary",
    sql: "SELECT storage_location, status, COUNT(*)\nFROM scientific_records\nWHERE collection_date >= '2026-08-01'\nGROUP BY storage_location, status;",
    description: "Summarizes active dataset storage distribution across regional physical vaults."
  }
];

export const engineeringFoundations = [
  {
    title: "Fast Query Response",
    badge: "DATABASE OPTIMIZATION",
    description: "Structured indexing strategies and tuned SQL query paths enable low-latency retrieval of large scientific record sets."
  },
  {
    title: "Relational Rigor",
    badge: "POSTGRESQL SCHEMA",
    description: "Schema-enforced integrity constraints prevent data drift and preserve strict relational consistency between datasets and documents."
  },
  {
    title: "REST Architecture",
    badge: "SERVICE DECOUPLING",
    description: "Clear isolation between client-side view logic and server-side storage handlers ensures maintainable frontend development."
  },
  {
    title: "Scalable Foundation",
    badge: "SYSTEM EXPANSION",
    description: "Modular architecture designed to integrate upcoming caching layers, streaming endpoints, and microservice expansions."
  }
];