import { jest } from "@jest/globals";
import request from "supertest";

// 1. Mock Supabase Client
const mockGetUser = jest.fn();
const mockFrom = jest.fn();
const mockStorageFrom = jest.fn();

jest.unstable_mockModule("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
    storage: {
      from: mockStorageFrom,
    },
  })),
}));

// Import app after mocking modules
const { default: app } = await import("../app.js");

describe("Dataset Routes API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock valid user auth session
  const setupValidAuth = () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123", email: "researcher@lab.org" } },
      error: null,
    });
  };

  describe("GET /api/datasets", () => {
    it("should return 401 if Authorization header is missing", async () => {
      const res = await request(app).get("/api/datasets");
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Missing access token");
    });

    it("should return 200 and a list of datasets for an authenticated user", async () => {
      setupValidAuth();

      const mockDatasets = [
        { id: "ds-1", title: "Genomics Run 1", file_name: "run1.csv" },
      ];

      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({ data: mockDatasets, error: null }),
        }),
      });

      const res = await request(app)
        .get("/api/datasets")
        .set("Authorization", "Bearer fake-token");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockDatasets);
      expect(mockFrom).toHaveBeenCalledWith("datasets");
    });
  });

  describe("POST /api/datasets/upload", () => {
    it("should reject file uploads with invalid extensions", async () => {
      setupValidAuth();

      const res = await request(app)
        .post("/api/datasets/upload")
        .set("Authorization", "Bearer fake-token")
        .field("title", "Forbidden Executable")
        .field("discipline", "Genomics")
        .attach("file", Buffer.from("malicious script"), "script.exe");

      expect(res.status).toBe(400);
      expect(res.body.error).toContain("Unsupported file extension");
    });

    it("should process and index valid CSV dataset uploads", async () => {
      setupValidAuth();

      // Mock storage upload success
      mockStorageFrom.mockReturnValue({
        upload: jest.fn().mockResolvedValue({ data: { path: "user-123/sample.csv" }, error: null }),
      });

      // Mock DB insert success
      const insertedRecord = {
        id: "ds-99",
        title: "Sample Experiment",
        file_name: "sample.csv",
      };

      mockFrom.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: insertedRecord, error: null }),
          }),
        }),
      });

      const res = await request(app)
        .post("/api/datasets/upload")
        .set("Authorization", "Bearer fake-token")
        .field("title", "Sample Experiment")
        .field("discipline", "Genomics")
        .field("access_level", "private")
        .attach("file", Buffer.from("col1,col2\n1,2"), "sample.csv");

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Dataset uploaded successfully");
      expect(res.body.dataset).toEqual(insertedRecord);
    });
  });

  describe("DELETE /api/datasets/:id", () => {
    it("should delete storage binary and database record", async () => {
      setupValidAuth();

      // Mock DB fetch for path
      mockFrom.mockReturnValueOnce({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { file_path: "user-123/sample.csv" },
              error: null,
            }),
          }),
        }),
      });

      // Mock storage delete
      mockStorageFrom.mockReturnValue({
        remove: jest.fn().mockResolvedValue({ data: [], error: null }),
      });

      // Mock DB row delete
      mockFrom.mockReturnValueOnce({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      const res = await request(app)
        .delete("/api/datasets/ds-99")
        .set("Authorization", "Bearer fake-token");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Dataset removed successfully");
    });
  });
});