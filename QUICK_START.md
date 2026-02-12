# 🚗 Quick Start: Video to 3D Model (Mac)

## 📋 What You Need
- ✅ Your car video file
- ✅ Mac computer
- ✅ Google account (for free Colab GPU)
- ✅ 15-20 minutes

## ⚡ 3-Step Process

### 1️⃣ Extract Frames (2 minutes)
```bash
./extract_frames.sh Car_Exterior_Video_For_Model.mp4
```
**Output**: `car_frames_YYYYMMDD_HHMMSS.zip`

---

### 2️⃣ Generate 3D Model (10-15 minutes)

**Option A: Google Colab (FREE)** ⭐ RECOMMENDED
1. Open: https://colab.research.google.com/
2. Upload: `colab_trellis_3d.ipynb`
3. Runtime → Change runtime type → T4 GPU
4. Runtime → Run all
5. Upload your ZIP when prompted
6. Wait for `car_model_3d.glb` to download

**Option B: Hugging Face (EASIEST)**
1. Go to: https://huggingface.co/spaces/JeffreyXiang/TRELLIS
2. Upload one frame from `extracted_frames/`
3. Click "Generate"
4. Download `.glb` file

---

### 3️⃣ Add to Website (1 minute)
```bash
# Create folder
mkdir -p public/models

# Move GLB file
mv ~/Downloads/car_model_3d.glb public/models/car-name.glb
```

**Edit `data.js`** - Add this line to your car object:
```javascript
model3d: "/models/car-name.glb",
```

**Done!** Refresh website → Click "View Details" → See 3D model! 🎉

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `extract_frames.sh` | Extracts video frames |
| `colab_trellis_3d.ipynb` | Google Colab notebook |
| `MAC_3D_GUIDE.md` | Detailed guide |
| `3D_MODEL_GUIDE.md` | Alternative methods |

---

## 🆘 Troubleshooting

**"FFmpeg not found"**
```bash
brew install ffmpeg
```

**"Colab GPU unavailable"**
- Wait 5 minutes and retry
- Or use Hugging Face Spaces

**"Model looks weird"**
- Try different frame
- Ensure good lighting in video
- Walk completely around car

---

## 💡 Pro Tips

✅ **Best video**: Cloudy day, walk 360° around car
✅ **Best frame**: Front 3/4 angle
✅ **File size**: Use `simplify=0.95` in Colab for smaller files
✅ **Quality**: Use `texture_size=2048` for high quality

---

## 📞 Full Documentation

- **Mac Guide**: `MAC_3D_GUIDE.md`
- **Alternative Methods**: `3D_MODEL_GUIDE.md`
- **Website Setup**: `README.md`
