# 3D Model Generation Guide

## Current Implementation

The website now includes a **professional 3D viewer** powered by Three.js that can display interactive 3D models with:
- ✅ Full 360° rotation (drag with mouse)
- ✅ Zoom in/out (scroll wheel)
- ✅ Pan (right-click drag)
- ✅ Professional lighting and shadows
- ✅ Smooth controls with damping
- ✅ High-quality rendering

## How to Generate Real 3D Models from 360° Video

To convert your car videos into actual 3D models, you need to use **photogrammetry software**. Here are the best options:

### Option 1: Polycam (Easiest - Mobile App)
**Best for: Quick results, beginners**

1. Download Polycam app (iOS/Android)
2. Upload your 360° video or take photos around the car
3. The app automatically generates a 3D model
4. Export as GLB/GLTF format
5. Place the `.glb` file in your `public/` folder
6. Update the car data with `model3d: "/your-car-model.glb"`

**Pros:** Very easy, automatic processing
**Cons:** Requires subscription for high-quality exports (~$10/month)

### Option 2: Luma AI (Best Quality)
**Best for: Professional results**

1. Go to https://lumalabs.ai
2. Upload your video
3. Wait for AI processing (5-30 minutes)
4. Download the 3D model as GLB
5. Add to your website

**Pros:** Excellent quality, handles reflective surfaces well
**Cons:** Processing time, limited free tier

### Option 3: Meshroom (Free, Desktop)
**Best for: Complete control, no cost**

1. Download Meshroom (free, open-source)
2. Extract frames from your video using:
   ```bash
   ffmpeg -i car_video.mp4 -vf fps=2 frames/frame_%04d.jpg
   ```
3. Import frames into Meshroom
4. Process (takes 1-4 hours depending on PC)
5. Export as OBJ, then convert to GLB using Blender

**Pros:** Free, full control, best for learning
**Cons:** Steep learning curve, requires powerful PC

### Option 4: RealityCapture (Professional)
**Best for: Commercial projects**

- Industry standard for photogrammetry
- Fastest processing
- Best quality
- Expensive ($3,750 perpetual license or $50/month)

## Converting Video to Frames

If you have a 360° video, first extract frames:

```bash
# Install FFmpeg first
brew install ffmpeg  # macOS
# or download from ffmpeg.org for Windows

# Extract 2 frames per second (adjust fps as needed)
ffmpeg -i Car_Exterior_Video_For_Model.mp4 -vf fps=2 output/frame_%04d.jpg

# For better quality, extract more frames
ffmpeg -i Car_Exterior_Video_For_Model.mp4 -vf fps=5 output/frame_%04d.jpg
```

## Tips for Best Results

1. **Lighting**: Shoot in even, diffused lighting (cloudy day is ideal)
2. **Coverage**: Walk completely around the car, overlap each shot by 60-70%
3. **Steady shots**: Use a gimbal or walk slowly
4. **No reflections**: Avoid shooting near windows or shiny surfaces
5. **Background**: Simple, non-reflective background works best
6. **Resolution**: Higher resolution = better model (4K recommended)

## Using the 3D Model on Your Website

Once you have a `.glb` or `.gltf` file:

1. Place it in `/public/models/` folder:
   ```
   public/
   └── models/
       └── car-premium-suv.glb
   ```

2. Update your car data in `data.js`:
   ```javascript
   {
       id: 7,
       name: "Premium Featured SUV",
       // ... other details ...
       model3d: "/models/car-premium-suv.glb",  // Add this line
       has360: true
   }
   ```

3. The website will automatically load and display the 3D model!

## Current Placeholder

Right now, the car with `video` property uses the video as a texture on a 3D box shape. This is a **placeholder** to demonstrate the viewer. Replace it with a real 3D model for the full interactive experience.

## Recommended Workflow

1. **Immediate**: Use Polycam or Luma AI for quick results
2. **Long-term**: Learn Meshroom for unlimited free models
3. **Professional**: Invest in RealityCapture if doing this commercially

## Model Optimization

3D models can be large. Optimize them:

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress your model
gltf-pipeline -i model.glb -o model-compressed.glb -d
```

This can reduce file size by 70-90% with minimal quality loss.
