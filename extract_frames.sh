#!/bin/bash

# Mac-Compatible 3D Model Generation Script
# This script extracts frames from video and prepares them for cloud-based 3D generation

echo "🚗 Car Video to 3D Model - Mac Edition"
echo "========================================"
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Installing via Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install ffmpeg
fi

# Create output directory
VIDEO_FILE="${1:-Car_Exterior_Video_For_Model.mp4}"
OUTPUT_DIR="extracted_frames"
mkdir -p "$OUTPUT_DIR"

echo "📹 Processing video: $VIDEO_FILE"
echo ""

# Extract frames at 2 FPS (adjust as needed)
echo "🎬 Extracting frames..."
ffmpeg -i "$VIDEO_FILE" -vf "fps=2,scale=1024:1024:force_original_aspect_ratio=decrease,pad=1024:1024:(ow-iw)/2:(oh-ih)/2" "$OUTPUT_DIR/frame_%04d.png" -y

FRAME_COUNT=$(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)
echo "✅ Extracted $FRAME_COUNT frames to $OUTPUT_DIR/"
echo ""

# Create a ZIP file for easy upload
ZIP_FILE="car_frames_$(date +%Y%m%d_%H%M%S).zip"
echo "📦 Creating ZIP archive: $ZIP_FILE"
cd "$OUTPUT_DIR" && zip -r "../$ZIP_FILE" *.png && cd ..

echo ""
echo "✅ DONE! Next steps:"
echo ""
echo "📤 OPTION 1: Use Google Colab (FREE)"
echo "   1. Open: https://colab.research.google.com/"
echo "   2. Upload the notebook: colab_trellis_3d.ipynb (will be created)"
echo "   3. Upload your frames ZIP: $ZIP_FILE"
echo "   4. Run the notebook to generate 3D model"
echo ""
echo "📤 OPTION 2: Use Replicate.com"
echo "   1. Go to: https://replicate.com/microsoft/trellis"
echo "   2. Upload frames from: $OUTPUT_DIR/"
echo "   3. Download the generated .glb file"
echo ""
echo "📤 OPTION 3: Use Hugging Face Spaces"
echo "   1. Go to: https://huggingface.co/spaces/JeffreyXiang/TRELLIS"
echo "   2. Upload frames one by one"
echo "   3. Download the generated model"
echo ""
echo "💾 Once you have the .glb file:"
echo "   1. Place it in: public/models/your-car.glb"
echo "   2. Update data.js with: model3d: '/models/your-car.glb'"
echo ""
