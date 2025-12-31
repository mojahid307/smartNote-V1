import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const BUCKET_NAME = 'make-a9941a55-voice-notes';

// Helper to get user from request
async function getUser(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return user;
}

// Ensure bucket exists
async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
    });
  }
}

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
app.get("/make-server-a9941a55/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all data
app.get("/make-server-a9941a55/data", async (c) => {
  const user = await getUser(c);
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const userId = user.id;

  const [textNotes, voiceNotes, photoNotes] = await Promise.all([
    kv.get(`text_notes_${userId}`),
    kv.get(`voice_notes_${userId}`),
    kv.get(`photo_notes_${userId}`)
  ]);
  
  return c.json({
    textNotes: textNotes || [],
    voiceNotes: voiceNotes || [],
    photoNotes: photoNotes || []
  });
});

// Text Notes
app.post("/make-server-a9941a55/notes/text", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const note = await c.req.json();
  const notes: any[] = (await kv.get(`text_notes_${userId}`)) || [];
  const newNotes = [note, ...notes];
  await kv.set(`text_notes_${userId}`, newNotes);
  return c.json(note);
});

// Voice Upload
app.post("/make-server-a9941a55/upload/voice", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  // We allow upload, but maybe we should path it by user? 
  // For now keeping simpler path but requiring auth is good.
  
  try {
    await ensureBucket();
    const body = await c.req.parseBody();
    const file = body['file'];

    if (file instanceof File) {
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.webm`;
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false
        });

      if (error) {
          console.error("Upload error:", error);
          return c.json({ error: 'Upload failed: ' + error.message }, 500);
      }

      // Create signed URL
      const { data: signedData, error: signedError } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(fileName, 315360000); // 10 years

      if (signedError) {
          console.error("Signed URL error:", signedError);
          return c.json({ error: 'Failed to generate URL' }, 500);
      }

      return c.json({ url: signedData.signedUrl });
    }

    return c.json({ error: 'No file provided' }, 400);
  } catch (err) {
      console.error("Server error:", err);
      return c.json({ error: 'Server error' }, 500);
  }
});

// Voice Notes
app.post("/make-server-a9941a55/notes/voice", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const note = await c.req.json();
  const notes: any[] = (await kv.get(`voice_notes_${userId}`)) || [];
  const newNotes = [note, ...notes];
  await kv.set(`voice_notes_${userId}`, newNotes);
  return c.json(note);
});

app.delete("/make-server-a9941a55/notes/voice/:id", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const id = c.req.param("id");
  const notes: any[] = (await kv.get(`voice_notes_${userId}`)) || [];
  const newNotes = notes.filter((n) => n.id !== id);
  await kv.set(`voice_notes_${userId}`, newNotes);
  return c.json({ success: true });
});

// Photo Notes
app.post("/make-server-a9941a55/notes/photo", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const body = await c.req.json();
  const { url } = body;
  const photos: string[] = (await kv.get(`photo_notes_${userId}`)) || [];
  const newPhotos = [url, ...photos];
  await kv.set(`photo_notes_${userId}`, newPhotos);
  return c.json({ url });
});

// Update Text Note
app.put("/make-server-a9941a55/notes/text/:id", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const id = c.req.param("id");
  const updates = await c.req.json();
  const notes: any[] = (await kv.get(`text_notes_${userId}`)) || [];
  const updatedNotes = notes.map((n) => (n.id === id ? { ...n, ...updates } : n));
  await kv.set(`text_notes_${userId}`, updatedNotes);
  return c.json({ success: true });
});

// Delete Text Note
app.delete("/make-server-a9941a55/notes/text/:id", async (c) => {
  const user = await getUser(c);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  const userId = user.id;

  const id = c.req.param("id");
  const notes: any[] = (await kv.get(`text_notes_${userId}`)) || [];
  const newNotes = notes.filter((n) => n.id !== id);
  await kv.set(`text_notes_${userId}`, newNotes);
  return c.json({ success: true });
});

// AI Enhance
app.post("/make-server-a9941a55/ai/enhance", async (c) => {
  const { text } = await c.req.json();
  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  
  if (!apiKey) {
    return c.json({ error: 'OpenRouter API Key not configured' }, 500);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert editor. Enhance the following text to be more clear, concise, and professional, while maintaining the original meaning. Return ONLY the enhanced text, no explanations."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();
    const enhancedText = data.choices?.[0]?.message?.content || text;
    return c.json({ enhancedText });
  } catch (error) {
    console.error("AI Enhance error:", error);
    return c.json({ error: 'Failed to enhance text' }, 500);
  }
});

// AI Summary
app.post("/make-server-a9941a55/ai/summary", async (c) => {
  const { text } = await c.req.json();
  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  
  if (!apiKey) {
    return c.json({ error: 'OpenRouter API Key not configured' }, 500);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert summarizer. Summarize the following text into a concise paragraph. Return ONLY the summary, no explanations."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || text;
    return c.json({ summary });
  } catch (error) {
    console.error("AI Summary error:", error);
    return c.json({ error: 'Failed to summarize text' }, 500);
  }
});

Deno.serve(app.fetch);
