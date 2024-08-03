import { Chess } from "./node_modules/chess.js/dist/esm/chess.js";
window.board = null
window.$status = $('#status')
var moveid = 1
var curBackPos = 0
window.LogicPostion = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']

window.goBack = () => {
  window.location.href = 'mainScreen.html'
}

window.backwardButton = () => {
  if (curBackPos > 0){
    curBackPos -= 1
    var curLogicPos = LogicPostion[curBackPos]
    chess.load(curLogicPos)
    board.position(curLogicPos)
    
    console.log(chess.ascii())
    updateStatus()
    }
  
}

window.forwardButton = () => {
  if (curBackPos + 1< LogicPostion.length){
    curBackPos += 1
    var curLogicPos = LogicPostion[curBackPos]
    chess.load(curLogicPos)
    board.position(curLogicPos)
    console.log(chess.ascii())
    updateStatus()
    console.log(curBackPos)
  }
  
}

window.controlMoveHistory = () => {
  if (curBackPos + 1 < LogicPostion.length) {
    var difference = LogicPostion.length - (curBackPos + 1)
    const inputs = document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < difference; i++) {  
      for (let index = 0; index < inputs.length; ++index) {
        if (inputs[index].value !== "") {
            continue  
        } else{
          inputs[index - 1].value = ""
          if (inputs[index - 1].classList.contains("input-box2")){
            document.getElementById(`move${moveid}`).remove()
            moveid -= 1
          }
          break
        }
      }
      LogicPostion.pop();
    }
  }
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
        if (input.classList.contains('input-box2')){
          addInputBox()
        }
      }
      controlMoveHistory()
      updateBoardHistory()
      
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

window.updateBoardHistory = () => {
  LogicPostion.push(chess.fen())
  curBackPos = LogicPostion.length - 1
}

window.onDrop = (source, target, piece, newPos, oldPos, orientation) => {
  try {
    var move = chess.move({
      from: source,
      to: target,
    })
  } catch{
    return 'snapback'
  }
  
  controlMoveHistory()
  
  var movePiece = piece.split("")[1]
  if (movePiece === 'P'){
    movePiece = ''
  }
 
  updateBoardHistory()
  const inputs = document.querySelectorAll('input[type="text"]');
  for (let index = 0; index < inputs.length; ++index) {
    if (inputs[index].value === "") {
        inputs[index].value = movePiece + target;
      if (inputs[index].classList.contains("input-box2")){
        addInputBox()
      }
      break
  }
}
 
  console.log(LogicPostion)
  console.log(LogicPostion)
  console.log(chess.ascii())
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
    onDragStart: onDragStart
  };
  window.board = Chessboard('myBoard', config)
  console.log(chess.fen())
  updateStatus()
  
});
