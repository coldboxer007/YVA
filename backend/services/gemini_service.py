import google.generativeai as genai
import os
import time

# Configure Gemini
# API_KEY should be in .env
def configure_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    genai.configure(api_key=api_key)

def upload_to_gemini(path, mime_type=None):
    """Uploads the given file to Gemini."""
    file = genai.upload_file(path, mime_type=mime_type)
    print(f"Uploaded file '{file.display_name}' as: {file.uri}")
    return file

def wait_for_files_active(files):
    """Waits for the given files to be active."""
    print("Waiting for file processing...")
    for name in (file.name for file in files):
        file = genai.get_file(name)
        while file.state.name == "PROCESSING":
            print(".", end="", flush=True)
            time.sleep(5)
            file = genai.get_file(name)
        if file.state.name != "ACTIVE":
            raise Exception(f"File {file.name} failed to process")
    print("...all files ready")

def analyze_video(video_path: str, video_title: str):
    configure_gemini()
    
    # Create the prompt
    system_instruction = """
    You are a world-class Film Director and Video Editor. 
    Your task is to analyze the provided video content deeply, not just the transcript.
    
    Provide a structured analysis with the following sections:
    
    1. **Director's Log**: A high-level summary of the video's intent, mood, and narrative structure.
    2. **Cinematography & Visuals**: Comments on lighting, camera angles, color grading, and visual composition.
    3. **Pacing & Editing**: Analyze the editing rhythm, cut points, transitions, and pacing.
    4. **Key Moments**: Identify the 3-5 most impactful moments with timestamps (approximate) and why they work.
    5. **Viral Shorts Potential**: Identify 3 specific segments (with start/end timestamps) that would make viral YouTube Shorts/TikToks. For each, suggest:
        - **Hook**: Why this moment grabs attention.
        - **Editing Style**: Fast cuts, slow-mo, text overlays, or music choice.
        - **Caption Idea**: A catchy caption for the short.
    6. **Constructive Critique**: What could be improved from a storytelling or technical perspective?
    
    Tone: Professional, insightful, creative.
    """
    
    model = genai.GenerativeModel(
        model_name="gemini-flash-lite-latest", # Using Flash Lite Latest as requested
        system_instruction=system_instruction
    )

    # Upload video
    print(f"Uploading {video_path} to Gemini...")
    video_file = upload_to_gemini(video_path, mime_type="video/mp4")
    
    # Wait for processing
    wait_for_files_active([video_file])
    
    # Generate content
    print("Generating analysis...")
    response = model.generate_content(
        [video_file, f"Analyze this video titled: '{video_title}'"],
        request_options={"timeout": 600}
    )
    
    # Clean up (optional, but good practice to delete file from Gemini storage if not needed)
    # genai.delete_file(video_file.name)
    
    return response.text
