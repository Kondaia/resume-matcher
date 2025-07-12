async function getConfig() {
  const res = await fetch('/config');
  return res.json();
}

const form = document.getElementById('matcherForm');
const results = document.getElementById('results');

form.addEventListener('submit', async e => {
  e.preventDefault();
  results.textContent = 'Processing...';

  // Load token & repo
  const { token, repo } = await getConfig();

  const readFile = file => new Promise(resolve => { /* unchanged */ });
  const resumeText = btoa(await readFile(document.getElementById('resumeFile').files[0]));
  const jdText     = btoa(await readFile(document.getElementById('jdFile').files[0]));

  await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/matcher.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify({ ref: 'main', inputs: { resume: resumeText, jd: jdText } })
    }
  );

  /* polling stays the same */
});