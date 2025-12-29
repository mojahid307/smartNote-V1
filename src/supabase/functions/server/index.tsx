import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-57cdb9fb/health", (c) => {
  return c.json({ status: "ok" });
});

// Get notes for a user
app.get("/make-server-57cdb9fb/notes/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `notes:${userId}`;
    
    const notes = await kv.get(key);
    
    return c.json({ notes: notes || [] });
  } catch (error) {
    console.error("Error getting notes:", error);
    return c.json({ error: "Failed to get notes", details: error.message }, 500);
  }
});

// Save notes for a user
app.post("/make-server-57cdb9fb/notes", async (c) => {
  try {
    const body = await c.req.json();
    const { userId, notes } = body;
    
    if (!userId) {
      return c.json({ error: "userId is required" }, 400);
    }
    
    const key = `notes:${userId}`;
    await kv.set(key, notes);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving notes:", error);
    return c.json({ error: "Failed to save notes", details: error.message }, 500);
  }
});

// Generate AI summary using Gemini API
app.post("/make-server-57cdb9fb/summarize", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content } = body;
    
    console.log("Summarize request received:", { title, contentLength: content?.length });
    
    if (!title || !content) {
      return c.json({ error: "Title and content are required" }, 400);
    }
    
    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY environment variable not set");
      return c.json({ error: "OpenRouter API key not configured. Please add your OPENROUTER_API_KEY." }, 500);
    }
    
    console.log("Calling OpenRouter API...");
    
    // Call OpenRouter API
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    const requestBody = {
      model: "anthropic/claude-3.5-sonnet",
      messages: [{
        role: "user",
        content: `Please summarize the following note in 3-5 concise bullet points. Focus on the key information and main ideas. Format each point with a bullet (•) at the start.

Title: ${title}

Content: ${content}

Summary:`
      }],
      temperature: 0.7,
      max_tokens: 500,
    };
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://smartkeeper.app",
        "X-Title": "SmartKeeper Notes"
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log("OpenRouter API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error response:", errorText);
      
      let errorMessage = "Failed to generate summary with OpenRouter API";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch (e) {
        // If error is not JSON, use the text
        errorMessage = errorText || errorMessage;
      }
      
      return c.json({ 
        error: errorMessage,
        details: errorText,
        status: response.status 
      }, response.status);
    }
    
    const data = await response.json();
    console.log("OpenRouter API response data:", JSON.stringify(data).substring(0, 200));
    
    const summary = data.choices?.[0]?.message?.content || "Could not generate summary";
    
    console.log("Summary generated successfully");
    return c.json({ summary });
  } catch (error) {
    console.error("Error generating summary (catch block):", error);
    return c.json({ 
      error: "Failed to generate summary", 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

Deno.serve(app.fetch);