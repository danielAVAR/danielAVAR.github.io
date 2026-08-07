  document.getElementById('year').textContent = new Date().getFullYear();

  // Pull public repos from GitHub API and render them in the GitHub section
  const GH_USER = "danielAVAR";
  const listEl = document.getElementById('repo-list');
  const statusEl = document.getElementById('repo-status');

  fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('GitHub API error: ' + res.status);
      return res.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || repos.length === 0) {
        statusEl.textContent = "No public repositories found.";
        return;
      }
      statusEl.remove();
      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
          <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
          <div class="repo-desc">${repo.description ? repo.description : 'No description provided.'}</div>
          <div class="repo-meta">
            <span>${repo.language ? repo.language : '—'}</span>
            <span>★ ${repo.stargazers_count}</span>
          </div>
        `;
        listEl.appendChild(card);
      });
    })
    .catch(() => {
      statusEl.textContent = "Couldn't load repositories right now — visit the GitHub profile directly.";
    });
