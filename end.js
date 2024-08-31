const username = document.getElementById("username");
const saveScoreButton = document.getElementById("save-score-btn");
const finalScore = document.getElementById("final-score");
const mostRecentScore = localStorage.getItem("most recent score")
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () =>{
 saveScoreButton.disabled = !username.value;
})

saveHighScore = e =>{
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);
    
    localStorage.setItem("high scores", JSON.stringify(highScores))
}