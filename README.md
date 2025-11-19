# YouTube Video Analysis (YVA)

A powerful AI-powered web application that analyzes YouTube videos using Google's Gemini Flash Lite model. Get detailed insights from a director's and editor's perspective, including cinematography analysis, pacing evaluation, and viral shorts suggestions.

## Features

- 🎬 **Professional Video Analysis**: Get comprehensive breakdowns of cinematography, pacing, and key moments
- ✂️ **Viral Shorts Suggestions**: AI identifies potential viral short clips with timestamps and editing recommendations
- 🎨 **Beautiful Modern UI**: Sleek, dynamic interface with glassmorphism effects and smooth animations
- ⚡ **Fast Processing**: Powered by Gemini Flash Lite for quick analysis
- 📊 **Detailed Insights**: Director and editor perspectives with constructive critique

## Tech Stack

### Frontend
- **Next.js** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Modern UI Components** - Custom glass cards and gradient buttons

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Gemini AI** - Advanced video analysis
- **yt-dlp** - YouTube video processing
- **Python 3.12** - Latest Python features

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python 3.12
- Google Gemini API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install fastapi uvicorn google-generativeai yt-dlp python-multipart
```

4. Create a `.env` file with your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

5. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a YouTube URL in the input field
2. Click "Analyze Video" to start the analysis
3. Wait for the AI to process the video
4. View comprehensive analysis including:
   - Overall summary
   - Cinematography insights
   - Pacing evaluation
   - Key moments
   - Constructive critique
   - Viral shorts suggestions with timestamps

## Project Structure

```
YVA/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── services/
│   │   ├── gemini_service.py   # Gemini AI integration
│   │   └── video_service.py    # Video processing
│   └── downloads/              # Temporary video storage (gitignored)
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   └── components/        # React components
│   └── public/                # Static assets
└── README.md
```

## API Endpoints

- `POST /analyze` - Analyze a YouTube video
  - Request body: `{ "url": "youtube_url" }`
  - Returns: Detailed analysis JSON

## Environment Variables

### Backend
- `GEMINI_API_KEY` - Your Google Gemini API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Author

Sahil Tanna

## Acknowledgments

- Google Gemini AI for powerful video analysis
- yt-dlp for reliable YouTube video processing
- Next.js and FastAPI communities
