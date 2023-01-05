var rows = 3;
var columns = 3;

var currtitle;
var othertitle;

var turns = 0;
var imgOrder = ["4", "5", "6", "8", "9", "3", "2", "1", "7"];
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

shuffle(imgOrder);

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //img mapping 0,0 0,1 etc
      let title = document.createElement("img");
      title.id = r.toString() + "-" + c.toString();
      title.src = imgOrder.shift() + ".jpg";

      //drag functionality
      title.addEventListener("dragstart", dragStart);
      title.addEventListener("dragover", dragOver);
      title.addEventListener("dragenter", dragEnter);
      title.addEventListener("dragleave", dragLeave);
      title.addEventListener("drop", drageDrop);
      title.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(title);
    }
  }
};

function dragStart() {
  currtitle = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}
function drageDrop() {
  othertitle = this;
}
function dragEnd() {
  if (!othertitle.src.includes("7.jpg")) {
    return;
  }
  let currCoords = currtitle.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = othertitle.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  if (isAdjacent) {
    let currImg = currtitle.src;
    let otherImg = othertitle.src;

    currtitle.src = otherImg;
    othertitle.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}
