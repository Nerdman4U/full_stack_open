/* 
  Tutorial from React website.

  Board.checkWin
  At this solution, squares variable is explicitely given at parameter because setSquares does not update variable 
  instantly at handler... at tutorial solution victory check is written outside object which some 
  may consider bad practice.

*/
import { useState } from "react";

function Square({value, onSquareClick}) {
  // const [value, setValue] = useState(null);
  /*function handleClick() {
    setValue("X")
  }*/
  //return <button className="square" onClick={handleClick}>{value}</button>;
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function checkWin(squares) {
    //const victory = [[0,1,2],[3,4,5],[5,6,7],[0,2,6]];
    const victory = [[0,1,2]];
    for (let i=0; i<victory.length; i++) {
      const [a,b,c] = victory[i];
      console.log("i:", i, "squares:", squares)
      console.log(squares[a], squares[b], squares[c]);
      if (!(squares[a] && squares[b] && squares[c])) {
        continue; 
      }
      if ((squares[a] === squares[b]) && (squares[a] === squares[c])) {
        return true;
      }
    }  
    return false
  }

  function handleClick(i) {    
    const nextSquares = squares.slice();

    if (nextSquares[i]) return;
    if (xIsNext) { 
       nextSquares[i] = "X";
       setXIsNext(false);
    } 
    else { 
       nextSquares[i] = "O";
       setXIsNext(true);
    }
    // squares[i] === "X" ? nextSquares[i] = "0" : nextSquares[i] = "X";
    setSquares(nextSquares);

    /*  
    checkWin() without parameter does not work because setSquares does not update squares until
    handler has finished.
    
    Could be: 
    squares = nextSquares.slice();
    if ( checkWin() ) { winner }
    */
    if ( checkWin(nextSquares) ) { 
      console.log("WINNER"); 
      return; 
    }
  }

  function createSquare(square_id) {
    return <Square value={squares[square_id]} onSquareClick={() => handleClick(square_id)} />
  }
     
  return (
    <>  
      <div className="board-row">
        {createSquare(0)}
        {createSquare(1)}
        {createSquare(2)}
        {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> */}
      </div>
      <div className="board-row">
        {createSquare(3)}
        {createSquare(4)}
        {createSquare(5)}
      </div>
      <div className="board-row">
        {createSquare(6)}
        {createSquare(7)}
        {createSquare(8)}
      </div>
    </>
  );
}
