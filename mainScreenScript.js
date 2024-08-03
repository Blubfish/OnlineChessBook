import { Chess } from "./node_modules/chess.js/dist/esm/chess.js";

window.logOut = () => {
    window.location.href = "index.html"
}

window.logGame = () => {
    window.location.href = "chessGame.html"
}


$(document).ready(function () {
    if (typeof Chess !== "undefined") {
      window.chess = new Chess();
    } else {
      console.log("chess is not real");
    }
    
  
    window.board1 = Chessboard('board1', {
        position: 'start',
        pieceTheme: "./images/chesspieces/wikipedia/{piece}.png",
        showNotation: false
      })
      
    window.board2 = Chessboard('board2', {
        position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
        pieceTheme: "./images/chesspieces/wikipedia/{piece}.png",
        showNotation: false
      })
      
    window.board3 = Chessboard('board3', {
        pieceTheme: "./images/chesspieces/wikipedia/{piece}.png",
        position: 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1',
        showNotation: false
      })
    
  });

