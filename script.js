let players = [];

function setupPlayers() {
  const count = parseInt(document.getElementById('player-count').value);
  const namesDiv = document.getElementById('player-names');
  namesDiv.innerHTML = '';
  for (let i = 0; i < count; i++) {
    namesDiv.innerHTML += `<input type="text" placeholder="Player ${i + 1} Name" required>`;
  }
  document.getElementById('player-names-form').style.display = 'block';
}

function startGame(event) {
  event.preventDefault();
  const nameInputs = document.querySelectorAll('#player-names input');
  players = Array.from(nameInputs).map(input => ({
    name: input.value.trim() || 'Unnamed',
    score: 0
  }));

  document.getElementById('setup-section').style.display = 'none';
  document.getElementById('player-names-form').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';

  renderScoreboard();
}

function renderScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';
  players.forEach((player, index) => {
    scoreboard.innerHTML += `
      <div class="player-score">
        <h3>${player.name} — Score: <span id="score-${index}">${player.score}</span></h3>
        <div class="player-controls">
          <input type="number" id="points-${index}" placeholder="Points">
          <button onclick="addPoints(${index})">➕ Add</button>
          <button onclick="removePoints(${index})">➖ Remove</button>
        </div>
      </div>
    `;
  });
}

function addPoints(index) {
  const input = document.getElementById(`points-${index}`);
  const points = parseInt(input.value);
  if (!isNaN(points)) {
    players[index].score += points;
    updateScoreDisplay(index);
  }
  input.value = '';
}

function removePoints(index) {
  const input = document.getElementById(`points-${index}`);
  const points = parseInt(input.value);
  if (!isNaN(points)) {
    players[index].score -= points;
    updateScoreDisplay(index);
  }
  input.value = '';
}

function updateScoreDisplay(index) {
  document.getElementById(`score-${index}`).textContent = players[index].score;
}

function endGame() {
  const resultsDiv = document.getElementById('results');
  const maxScore = Math.max(...players.map(p => p.score));
  const winners = players.filter(p => p.score === maxScore);
  resultsDiv.innerHTML = `
    <h2>🏁 Game Over!</h2>
    ${winners.length > 1 ? `<p>It's a tie!</p>` : `<p>🏆 Winner: ${winners[0].name}</p>`}
    <ul>
      ${players.map(p => `<li>${p.name}: ${p.score} points</li>`).join('')}
    </ul>
    <button id="play-again" onclick="resetGame()">🔁 Play Again</button>
  `;
}

function resetGame() {
  players = [];
  document.getElementById('player-count').value = 2;
  document.getElementById('player-names-form').style.display = 'none';
  document.getElementById('player-names').innerHTML = '';
  document.getElementById('setup-section').style.display = 'block';
  document.getElementById('game-section').style.display = 'none';
  document.getElementById('scoreboard').innerHTML = '';
  document.getElementById('results').innerHTML = '';
}
