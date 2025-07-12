const form = document.getElementById('matcherForm');
const results = document.getElementById('results');

form.addEventListener('submit', async e => {
  e.preventDefault();
  results.textContent = 'Processing...';

  const readFile = file => new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.readAsText(file);
  });

  const resumeText = btoa(await readFile(document.getElementById('resumeFile').files[0]));
  const jdText     = btoa(await readFile(document.getElementById('jdFile').files[0]));

  // Dispatch GitHub Actions workflow
  await fetch(
    'https://api.github.com/repos/your-username/resume-matcher/actions/workflows/matcher.yml/dispatches', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer <PERSONAL_ACCESS_TOKEN>',
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify({ ref: 'main', inputs: { resume: resumeText, jd: jdText } })
    }
  );

  // Poll for result (simplified)
  setTimeout(async () => {
    const repo = 'your-username/resume-matcher';
    const resp = await fetch(`https://raw.githubusercontent.com/${repo}/main/results/latest.md`);
    results.textContent = await resp.text();
  }, 10000);
});