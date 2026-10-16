import os
import pypdf

input_pdf = "public/cv/AkashKundu_CV.pdf"
output_pdf = "public/cv/Akash_Kundu_Resume.pdf"

if os.path.exists(input_pdf):
    reader = pypdf.PdfReader(input_pdf)
    writer = pypdf.PdfWriter()

    for page in reader.pages:
        writer.add_page(page)

    # Strip metadata entirely
    writer.add_metadata({
        "/Title": "Akash Kundu - Resume",
        "/Author": "Akash Kundu",
        "/Subject": "AI Systems & Full-Stack Engineering Resume",
        "/Keywords": "AI Engineer, Full-Stack, Machine Learning, Python, React",
        "/Creator": "",
        "/Producer": ""
    })

    with open(output_pdf, "wb") as f:
        writer.write(f)

    print(f"Generated clean canonical resume: {output_pdf} ({os.path.getsize(output_pdf)} bytes)")
    
    # Also strip metadata on original so both are sanitized
    with open(input_pdf, "wb") as f:
        writer.write(f)
    print("Sanitized metadata on AkashKundu_CV.pdf as well.")
else:
    print(f"Input {input_pdf} not found.")
