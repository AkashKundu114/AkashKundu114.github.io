import os
from PIL import Image

CERT_DIR = "public/certificates"
ICONS_DIR = "public/icons"

print("--- OPTIMIZING CERTIFICATES & ASSETS ---")

for root, dirs, files in os.walk("public"):
    for file in files:
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            path = os.path.join(root, file)
            initial_size = os.path.getsize(path)
            try:
                with Image.open(path) as img:
                    # Strip EXIF / metadata by creating clean copy without info
                    data = list(img.getdata())
                    clean_img = Image.new(img.mode, img.size)
                    clean_img.putdata(data)
                    
                    # For large PNGs over 1MB, optimize palette or compression
                    if initial_size > 1024 * 1024 and file.endswith(".png"):
                        # If RGBA, save with maximum deflate compression
                        clean_img.save(path, "PNG", optimize=True, compress_level=9)
                    else:
                        clean_img.save(path, optimize=True)
                
                final_size = os.path.getsize(path)
                delta_kb = (initial_size - final_size) / 1024
                if delta_kb > 50:
                    print(f"Optimized {path}: {initial_size/1024:.1f} KB -> {final_size/1024:.1f} KB (saved {delta_kb:.1f} KB)")
            except Exception as e:
                print(f"Could not process {path}: {e}")

print("Assets optimization and metadata stripping complete.")
