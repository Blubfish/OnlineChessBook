import { Chess } from "./node_modules/chess.js/dist/esm/chess.js";
window.board = null
window.$status = $('#status')
var moveid = 1
var position = 0
var curBackPos = 0
var UIPosition = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"]
var LogicPostion = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

window.backwardButton = () => {
  curBackPos -= 1
  var curUIPos = UIPosition[curBackPos]
  var curLogicPos = LogicPostion[curBackPos]
  chess.load(curLogicPos)
  board.position(curUIPos)
  console.log(chess.ascii())
  updateStatus()
}

window.forwardButton = () => {
  curBackPos += 1
  var curUIPos = UIPosition[curBackPos]
  var curLogicPos = LogicPostion[curBackPos]
  chess.load(curLogicPos)
  board.position(curUIPos)
  console.log(chess.ascii())
  updateStatus()
}

window.checkMove = (input) => {
    input.oninput = null
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const move = input.value 
        if (chess.move(`${move}`) === null) {
          console.log(`Invalid move: ${move}`);
        } else {
          console.log(`Move successful: ${move}`);
        }
        updateBoard()
        if (input.id === "input-box2"){
          addInputBox()
        }
      }
    });
    
}


window.addInputBox = () => {
  moveid += 1
  var originalDiv = document.getElementById("move1");
  var clonedDiv = originalDiv.cloneNode(true);
  clonedDiv.id = `move${moveid}`
  const inputs = clonedDiv.querySelectorAll('input');
  inputs.forEach((inputBox) => {
    inputBox.value = ''
  })
  document.getElementById("center").appendChild(clonedDiv)
}

window.onDragStart  = (source, piece, position, orientation) => {
  if (chess.isGameOver()) return false
  if ((chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

window.onDrop = (source, target, piece, newPos, oldPos, orientation) => {
  var move = chess.move({
    from: source,
    to: target,
  })
  if (curBackPos + 1 < UIPosition.length) {
    var difference = UIPosition.length - curBackPos
    for (let i = 0; i < difference; i++) {
      UIPosition.pop();
      LogicPostion.pop();
    }
  }
 
  UIPosition.push(Chessboard.objToFen(newPos))
  LogicPostion.push(chess.fen())
  curBackPos = UIPosition.length - 1
  console.log(UIPosition)
  console.log(LogicPostion)
  const inputs = document.querySelectorAll('input[type="text"]');
  for (let index = 0; index < inputs.length; ++index) {
    if (inputs[index].value === "") {
      inputs[index].value = target;
      break
  }
}
  if (move === null) return 'snapback'
  updateStatus()
}

window.updateBoard = () => {
  board.position(chess.fen())
}

window.updateStatus = () => {
  var status = ''


  var moveColor = 'White'
  if (chess.turn() === 'b') {
    moveColor = 'Black'
  }

  if (chess.isGameOver()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  else if (chess.isDraw()) {
    status = 'Game over, drawn position'
  }

  else {
    status = moveColor + ' to move'

    if (chess.inCheck()) {
      status += ', ' + moveColor + ' is in check'
    }
  }
  $status.html(status)
}



$(document).ready(function () {
  if (typeof Chess !== "undefined") {
    window.chess = new Chess();
  } else {
    console.log("chess is not real");
  }

  window.config = {
    position: 'start',
    draggable: true,
    dropOffBoard: 'snapback',
    pieceTheme: "./images/chesspieces/wikipedia/{piece}.png",
    showNotation: true,
    sparePieces: true,
    onDrop: onDrop,
    onSnapEnd: updateBoard,
    onDragStart: onDragStart,
  };
  window.board = Chessboard('myBoard', config)
  updateStatus()
  
});
