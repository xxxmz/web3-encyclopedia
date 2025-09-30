import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/terms", async (_req, res) => {
    try {
      const terms = await storage.getAllTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch terms" });
    }
  });

  app.get("/api/terms/:id", async (req, res) => {
    try {
      const term = await storage.getTerm(req.params.id);
      if (!term) {
        return res.status(404).json({ error: "Term not found" });
      }
      res.json(term);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch term" });
    }
  });

  app.post("/api/terms/:id/click", async (req, res) => {
    try {
      const term = await storage.incrementClicks(req.params.id);
      if (!term) {
        return res.status(404).json({ error: "Term not found" });
      }
      res.json(term);
    } catch (error) {
      res.status(500).json({ error: "Failed to update clicks" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
