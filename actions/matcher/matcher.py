import sys, json, openai
from pdfminer.high_level import extract_text

def load_text(path):
    if path.lower().endswith('.pdf'):
        return extract_text(path)
    return open(path, encoding='utf-8').read()

def call_llm(prompt):
    resp = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role':'system','content':'You are an expert recruiter.'},
                  {'role':'user','content': prompt}]
    )
    return resp.choices[0].message.content

if __name__ == '__main__':
    resume_path, jd_path, out_path = sys.argv[1:]
    resume_text = load_text(resume_path)
    jd_text     = load_text(jd_path)

    # 1. Extract skills
    skills_json = call_llm(f"Extract a JSON list of skills from this JD:\n{jd_text}")
    skills = json.loads(skills_json)

    # 2. Match against resume
    match_json = call_llm(f"Compare these skills {skills} to this resume:\n{resume_text}")
    match = json.loads(match_json)

    # 3. Suggestions
    bullets = call_llm(f"For each skill in {match['missing_skills']}, suggest 2 bullet points for a resume.")

    # Write report
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('# Resume–JD Match Report\n\n')
        f.write('## Matched Skills\n')
        for s in match['matched_skills']:
            f.write(f'- {s}\n')
        f.write('\n## Suggestions for Missing Skills\n')
        f.write(bullets)