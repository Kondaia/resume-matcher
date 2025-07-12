# resume-matcher
Resume &amp; Job‑Description Matcher

# Resume & Job-Description Matcher

This project helps job seekers tailor their resumes to specific job descriptions by:

1. Extracting required skills from a JD
2. Comparing them with your resume
3. Generating bullet-point suggestions for missing skills

**Tech stack**: Static frontend (GitHub Pages), GitHub Actions, Python, OpenAI/Cohere or Hugging Face API, pdfminer.six

**Usage**:
1. Deploy frontend to GitHub Pages (`/frontend`)
2. Add API key as GitHub secret: `OPENAI_API_KEY`
3. Trigger workflow via frontend form