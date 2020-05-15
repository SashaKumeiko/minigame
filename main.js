class Game {
  constructor(level) {
    this.difficulty = Game.difficulties[level];
    this.playerPoints = 0;
    this.computerPoints = 0;
  }
  static difficulties = { hard: 50, normal: 1000, easy: 1500 };
   playerClick(event) {
    if (event.target.style.backgroundColor === "blue") {
      event.target.style.backgroundColor = "green";
      console.log("playerPoints:", ++this.playerPoints);
    }
  };
  finish(diffInterval, cellsNodeList) {
    let buttons = document.querySelector(".buttons");
    buttons.style.display = "inline-block";

    clearInterval(diffInterval);
    let cellsToClear = Array.from(cellsNodeList);
    cellsToClear.forEach(element => {
      element.style.backgroundColor = "white";
    });
    alert("if you want, play again!");
  }
  start() {
    let cellsNodeList = document.querySelectorAll(".cell");
    const cellsArray = Array.from(cellsNodeList);

    let diffInterval = setInterval(computerPace.bind(this), this.difficulty);
    let cellToHit;

    function computerPace() {
      if (cellToHit && cellToHit.style.backgroundColor === "blue") {
        cellToHit.style.backgroundColor = "red";
        console.log("computerPoints:", ++this.computerPoints);
      }
      let selectedCell = Math.floor(Math.random() * cellsArray.length);
      cellsArray[selectedCell].style.backgroundColor = "blue";
      cellToHit = cellsArray[selectedCell];
      cellToHit.addEventListener("click", this.playerClick.bind(this));
      cellsArray.splice(selectedCell, 1);


      if (this.computerPoints === 51) {
        alert("computer wins");
        this.finish(diffInterval, cellsNodeList);
      }
      if (this.playerPoints === 51) {
        alert("player wins");
        this.finish(diffInterval, cellsNodeList);
      }
      if (this.playerPoints === 50 && this.computerPoints === 50) {
        alert("it is a draw");
        this.finish(diffInterval, cellsNodeList);
      }
    }
  }
}
alert("выберите уровень сложности под таблицей:");

function begin(event) {
  let difficultyLevel = event.target.value;
  let buttons = document.querySelector(".buttons");
  buttons.style.display = "none";
  let newGame = new Game(difficultyLevel);
  newGame.start();
}


