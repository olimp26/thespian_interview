# 🎬 Video Captions & Transcript Sync

## 📁 Project Structure

Inside the shared folder, you'll find two subfolders:

```
📁 video_1/
  ├── clip.mp4
  └── captions.srt

📁 video_2/
  ├── clip.mp4
  └── captions.srt
```

A sample reference video `preview.mp4` is included to demonstrate the minimum expected functionality.

---

## ✅ Features

* 📼 Plays a video with **caption overlay** (from `.srt` file)
* 📝 Shows a **full transcript** synced to the video timeline
* 🕒 Clicking transcript timestamps seeks the video
* 🎨 Optional caption styling (font size, colors, etc.)
* ⚙️ Easily supports adding **more videos with `.srt` files**

---

## 🚀 How to Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm start
   ```

   This will start the app at: `http://localhost:3000`

---

## 📂 Adding Videos

All videos and captions should be placed in the `public` folder.

1. Create a new folder inside `public` for each video:

   ```
   public/
   ├── video_1/
   │   ├── clip.mp4
   │   └── captions.srt
   ├── video_2/
   │   ├── clip.mp4
   │   └── captions.srt
   └── videos/
       └── videos.json   <-- define your videos here
   ```

2. Edit `public/videos/videos.json` to register your videos:

   ```json
   [
     {
       "id": "video_1",
       "title": "Demo Video 1"
     },
     {
       "id": "video_2",
       "title": "Demo Video 2"
     }
   ]
   ```

   Each object must contain:

   * `"id"`: must match the folder name in `/public`
   * `"title"`: how the clip appears in the dropdown selector

---

## 🌟 Bonus Features

* ✅ Uses native `<video>` element (no third-party video player)
* ✅ Clickable transcript seeks video
* ✅ Caption customization (font/background/text color)
* ✅ Easily extendable to support any `clip.mp4` + `captions.srt` combo

---

## ⏱ Estimated Time

* ⌛ Expected: **\~2 hours** for basic functionality
* 🆗 OK if it takes longer!

---

## 🧠 Tech Stack

* React (Vite or CRA)
* HTML5 video API
* Native `.srt` parser
* Plain CSS / Tailwind / Styled Components (your choice)

---

## 📬 Submission

1. Push your code to a **public GitHub repo**
2. Share the link with us
3. ✅ Make sure the repo is accessible

---

**Good luck, you got this! 🚀🎉**
