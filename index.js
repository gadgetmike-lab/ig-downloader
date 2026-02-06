import express from "express";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DOWNLOAD_DIR = "./downloads";

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

app.post("/ig-download", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Missing url" });
  }

  const id = crypto.randomBytes(6).toString("hex");
  const filename = `${id}.mp4`;
  const filepath = path.join(DOWNLOAD_DIR, filename);

  const cmd = `yt-dlp -f mp4 -o "${filepath}" "${url}"`;

  exec(cmd, (error) => {
    if (error) {
      return res.status(500).json({ error: "Download failed" });
    }

    res.json({
      filename,
      video_url: `/files/${filename}`
    });
  });
});

app.use("/files", express.static(DOWNLOAD_DIR));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});