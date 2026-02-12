# 🍎 Mac-Compatible 3D Model Generation Guide

## ⚠️ Important: TRELLIS Limitation on Mac

TRELLIS requires **NVIDIA GPUs with CUDA**, which Mac computers don't have. However, you can still use TRELLIS through **cloud-based solutions** that provide free GPU access.

## 🚀 Quick Start (3 Steps)

### Step 1: Extract Frames from Your Video

Run this command on your Mac:

```bash
chmod +x extract_frames.sh
./extract_frames.sh Car_Exterior_Video_For_Model.mp4
```

This will:
- Extract frames from your video at 2 FPS
- Resize them to 1024x1024 (optimal for TRELLIS)
- Create a ZIP file for easy upload

### Step 2: Generate 3D Model (Choose ONE option)

#### 🌟 Option A: Google Colab (RECOMMENDED - FREE)

1. **Open Google Colab**: https://colab.research.google.com/
2. **Upload the notebook**: 
   - Click "File" → "Upload notebook"
   - Upload `colab_trellis_3d.ipynb` from your project folder
3. **Enable GPU**:
   - Click "Runtime" → "Change runtime type"
   - Select "T4 GPU" (free tier)
   - Click "Save"
4. **Run the notebook**:
   - Click "Runtime" → "Run all"
   - Upload your `car_frames_*.zip` when prompted
   - Wait 10-15 minutes for processing
5. **Download**: The `.glb` file will auto-download when complete

**Pros**: 
- ✅ Completely FREE
- ✅ No setup required
- ✅ Good GPU (T4)
- ✅ Best for beginners

**Cons**:
- ⏱️ Session timeout after 12 hours
- 📊 Limited to ~15GB RAM

---

#### Option B: Hugging Face Spaces (EASIEST)

1. Go to: https://huggingface.co/spaces/JeffreyXiang/TRELLIS
2. Upload one of your extracted frames (pick the best angle)
3. Click "Generate"
4. Wait 5-10 minutes
5. Download the `.glb` file

**Pros**:
- ✅ No account needed
- ✅ Very simple UI
- ✅ Fast

**Cons**:
- ⚠️ Single image only (not multi-view)
- ⚠️ May have queue during peak hours

---

#### Option C: Replicate.com (PAID but FAST)

1. Sign up at: https://replicate.com
2. Go to: https://replicate.com/microsoft/trellis
3. Upload your best frame
4. Pay ~$0.10-0.50 per generation
5. Download result

**Pros**:
- ✅ Very fast (2-5 minutes)
- ✅ Reliable
- ✅ API available

**Cons**:
- 💰 Costs money (but very cheap)

---

#### Option D: RunPod (For Advanced Users)

1. Sign up at: https://www.runpod.io
2. Rent a GPU pod (RTX 4090 ~$0.50/hour)
3. Install TRELLIS manually
4. Process your frames
5. Download and terminate pod

**Pros**:
- ✅ Full control
- ✅ Powerful GPUs
- ✅ Can process multiple cars

**Cons**:
- 💰 Costs money
- 🛠️ Requires technical knowledge

---

### Step 3: Add to Your Website

Once you have the `.glb` file:

```bash
# 1. Create models directory
mkdir -p public/models

# 2. Move your GLB file
mv ~/Downloads/car_model_3d.glb public/models/premium-suv.glb

# 3. Update data.js (edit the file and add this line to your car object):
# model3d: "/models/premium-suv.glb",
```

Example in `data.js`:
```javascript
{
    id: 7,
    name: "Premium Featured SUV",
    year: 2024,
    fuel: "Diesel",
    km: "5,000",
    transmission: "Automatic",
    price: "₹ 22,50,000",
    image: "https://images.unsplash.com/photo-1609521263047...",
    model3d: "/models/premium-suv.glb",  // ← Add this line
    has360: true,
    details: { /* ... */ }
}
```

**That's it!** Refresh your website and click "View Details" on the car to see the interactive 3D model.

---

## 🎯 Tips for Best Results

### Video Recording Tips:
1. **Lighting**: Shoot in even, diffused lighting (cloudy day is ideal)
2. **Coverage**: Walk completely around the car (360°)
3. **Overlap**: Each frame should overlap 60-70% with the previous
4. **Steady**: Use a gimbal or walk slowly
5. **Background**: Simple, non-reflective background
6. **Resolution**: 4K video if possible

### Frame Extraction Tips:
- **FPS**: 2 FPS is good for most videos (adjust in script if needed)
- **Quality**: Higher resolution = better model
- **Count**: 30-60 frames is optimal for TRELLIS

### TRELLIS Generation Tips:
- **Primary Frame**: Choose the best angle (front 3/4 view usually works best)
- **Seed**: Try different seeds (42, 123, 999) for variations
- **Steps**: More steps = better quality but slower (12 is good default)
- **Simplify**: 0.95 reduces triangles by 95% (good for web)
- **Texture Size**: 2048 for high quality, 1024 for smaller file size

---

## 📊 Comparison Table

| Method | Cost | Time | Quality | Difficulty |
|--------|------|------|---------|------------|
| **Google Colab** | FREE | 10-15 min | ⭐⭐⭐⭐ | Easy |
| **HF Spaces** | FREE | 5-10 min | ⭐⭐⭐ | Very Easy |
| **Replicate** | $0.10-0.50 | 2-5 min | ⭐⭐⭐⭐⭐ | Easy |
| **RunPod** | $0.50/hr | 5-10 min | ⭐⭐⭐⭐⭐ | Hard |

---

## 🔧 Troubleshooting

### "FFmpeg not found"
```bash
brew install ffmpeg
```

### "Not enough frames extracted"
Increase FPS in the script:
```bash
# Edit extract_frames.sh, change fps=2 to fps=5
ffmpeg -i "$VIDEO_FILE" -vf "fps=5,scale=1024:1024..." ...
```

### "Colab GPU not available"
- Wait a few minutes and try again
- Use Hugging Face Spaces instead
- Upgrade to Colab Pro ($10/month) for guaranteed GPU

### "Generated model looks weird"
- Try a different primary frame
- Increase steps to 24
- Try a different seed value
- Ensure your video has good lighting and coverage

### "GLB file too large"
Reduce texture size in the Colab notebook:
```python
glb = postprocessing_utils.to_glb(
    outputs['gaussian'][0],
    outputs['mesh'][0],
    simplify=0.98,      # More aggressive simplification
    texture_size=1024,  # Smaller texture
)
```

---

## 🎓 Alternative: Mac-Native Solutions

If you want to run everything locally on your Mac (without TRELLIS):

### 1. Polycam (iOS/Mac App)
- Download from App Store
- Import your video
- Auto-generates 3D model
- Export as GLB
- **Cost**: $10/month subscription

### 2. RealityCapture (Mac Beta)
- Professional photogrammetry
- Best quality
- **Cost**: $50/month or $3,750 perpetual

### 3. Meshroom (via Docker on Mac)
- Free and open-source
- Requires powerful Mac (M1 Max or better)
- Complex setup
- **Cost**: FREE

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message in the Colab notebook
2. Try a different cloud service
3. Verify your video quality and frame extraction
4. Consider using Polycam for simpler workflow

---

## ✅ Summary

**For Mac users, the recommended workflow is:**

1. ✅ Extract frames locally using `extract_frames.sh`
2. ✅ Upload to **Google Colab** (free) or **Hugging Face Spaces** (easiest)
3. ✅ Download the `.glb` file
4. ✅ Add to your website

**Total time**: 15-20 minutes per car
**Total cost**: FREE (or $0.10-0.50 if using Replicate)

This gives you the same high-quality 3D models as TRELLIS, without needing an NVIDIA GPU!
