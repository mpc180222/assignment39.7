import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
 

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let i = 0; i< nrows ; i++){
      initialBoard.push([]);
      for(let j = 0; j < ncols; j ++){
        let roll = Math.random();
        let cell;
        if(roll > chanceLightStartsOn) cell = false;
        else{cell = true}
        initialBoard[i].push(cell); 
      } }
     
    return initialBoard;}
    const [board, setBoard] = useState(createBoard());
    

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
   return board.every(r => r.every(c => c === true));
  }

  function flipCellsAroundMe(coord) {
    
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        //this appears to only flip one cell, need the rest.
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          if(x+1 < ncols) boardCopy[y][x+1] = !boardCopy[y][x+1];
          if(x-1 >= 0) boardCopy[y][x-1] = !boardCopy[y][x-1];
          if(y+1 < nrows) boardCopy[y+1][x] = !boardCopy[y+1][x]
          if(y-1 >= 0) boardCopy[y-1][x] = !boardCopy[y-1][x]



        }
        return boardCopy
      };

      // TODO: Make a (deep) copy of the oldBoard
      let deepBoardCopy = JSON.parse(JSON.stringify(board));
      // TODO: in the copy, flip this cell and the cells around it
      let flippedCopy = flipCell(y, x, deepBoardCopy)
      return flippedCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  let check = hasWon();

  if(check === true){

    return(
      <div>
        <h1>Winning</h1>
      </div>

    )

  }
  // TODO

  // make table board

  return (
    <div className = "Board">
      <table>
      <tbody>
      
      {board.map((outer, oIdx) => (
        <tr>{
       outer.map((cell, iIdx) => (

       <Cell flipCellsAroundMe={flipCellsAroundMe} isLit = {cell === true ? true : false} y = {oIdx} x = {iIdx}  /> ) ) }</tr>
       
       ))}
     </tbody>
      </table>

    </div>



  )

  // TODO
}

export default Board;




