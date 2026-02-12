#!/bin/bash

# Complete 3D Model Setup Helper for Mac
# This script guides you through the entire process

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🚗 Sri Tiruchendur Cars - 3D Model Setup (Mac)          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check FFmpeg
echo -e "${BLUE}[1/4] Checking dependencies...${NC}"
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${YELLOW}⚠️  FFmpeg not found. Installing...${NC}"
    if ! command -v brew &> /dev/null; then
        echo -e "${RED}❌ Homebrew not found. Please install from: https://brew.sh${NC}"
        exit 1
    fi
    brew install ffmpeg
    echo -e "${GREEN}✅ FFmpeg installed${NC}"
else
    echo -e "${GREEN}✅ FFmpeg found${NC}"
fi
echo ""

# Find video file
echo -e "${BLUE}[2/4] Looking for video file...${NC}"
VIDEO_FILE=""

if [ -f "Car_Exterior_Video_For_Model.mp4" ]; then
    VIDEO_FILE="Car_Exterior_Video_For_Model.mp4"
    echo -e "${GREEN}✅ Found: $VIDEO_FILE${NC}"
elif [ -f "public/Car_Exterior_Video_For_Model.mp4" ]; then
    VIDEO_FILE="public/Car_Exterior_Video_For_Model.mp4"
    echo -e "${GREEN}✅ Found: $VIDEO_FILE${NC}"
else
    echo -e "${YELLOW}⚠️  Video file not found in current directory${NC}"
    echo -e "Please drag and drop your video file here and press Enter:"
    read -r VIDEO_FILE
    VIDEO_FILE="${VIDEO_FILE//\'/}"  # Remove quotes
    
    if [ ! -f "$VIDEO_FILE" ]; then
        echo -e "${RED}❌ File not found: $VIDEO_FILE${NC}"
        exit 1
    fi
fi
echo ""

# Extract frames
echo -e "${BLUE}[3/4] Extracting frames...${NC}"
OUTPUT_DIR="extracted_frames"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "📹 Processing: $VIDEO_FILE"
ffmpeg -i "$VIDEO_FILE" \
    -vf "fps=2,scale=1024:1024:force_original_aspect_ratio=decrease,pad=1024:1024:(ow-iw)/2:(oh-ih)/2" \
    "$OUTPUT_DIR/frame_%04d.png" \
    -y -loglevel error

FRAME_COUNT=$(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo -e "${GREEN}✅ Extracted $FRAME_COUNT frames${NC}"
echo ""

# Create ZIP
echo -e "${BLUE}[4/4] Creating ZIP archive...${NC}"
ZIP_FILE="car_frames_$(date +%Y%m%d_%H%M%S).zip"
cd "$OUTPUT_DIR" && zip -r -q "../$ZIP_FILE" *.png && cd ..
ZIP_SIZE=$(du -h "$ZIP_FILE" | cut -f1)
echo -e "${GREEN}✅ Created: $ZIP_FILE ($ZIP_SIZE)${NC}"
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    ✅ EXTRACTION COMPLETE                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}📦 Files Ready:${NC}"
echo "   • Frames: $OUTPUT_DIR/ ($FRAME_COUNT files)"
echo "   • Archive: $ZIP_FILE ($ZIP_SIZE)"
echo ""
echo -e "${YELLOW}📤 NEXT STEPS:${NC}"
echo ""
echo "Choose ONE option to generate your 3D model:"
echo ""
echo -e "${GREEN}OPTION 1: Google Colab (FREE, RECOMMENDED)${NC}"
echo "   1. Open: https://colab.research.google.com/"
echo "   2. Upload: colab_trellis_3d.ipynb"
echo "   3. Runtime → Change runtime type → T4 GPU → Save"
echo "   4. Runtime → Run all"
echo "   5. Upload: $ZIP_FILE"
echo "   6. Wait 10-15 minutes"
echo "   7. Download car_model_3d.glb"
echo ""
echo -e "${BLUE}OPTION 2: Hugging Face Spaces (EASIEST)${NC}"
echo "   1. Open: https://huggingface.co/spaces/JeffreyXiang/TRELLIS"
echo "   2. Upload any frame from: $OUTPUT_DIR/"
echo "   3. Click 'Generate'"
echo "   4. Download .glb file"
echo ""
echo -e "${YELLOW}OPTION 3: Replicate (FAST, ~\$0.50)${NC}"
echo "   1. Open: https://replicate.com/microsoft/trellis"
echo "   2. Upload best frame"
echo "   3. Pay and download"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}💾 After you get the .glb file:${NC}"
echo ""
echo "   1. Create models folder:"
echo "      mkdir -p public/models"
echo ""
echo "   2. Move GLB file:"
echo "      mv ~/Downloads/car_model_3d.glb public/models/your-car.glb"
echo ""
echo "   3. Edit data.js and add to your car object:"
echo "      model3d: \"/models/your-car.glb\","
echo ""
echo "   4. Refresh website and click 'View Details' on the car!"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}📖 For detailed help, see:${NC}"
echo "   • QUICK_START.md"
echo "   • MAC_3D_GUIDE.md"
echo ""
echo -e "${GREEN}🎉 Happy 3D modeling!${NC}"
echo ""
