const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem("high scores")) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("");