import { useState } from 'react';
import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import Board from "../components/Board";
import MoveShape from "../components/MoveShape"
import EndGame from "../components/EndGame"
import './home.scss';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Let's play tetris" },
    { name: "description", content: "Play tetris with Chinese character" },
  ];
}

const ROWS = 15;
const COLS = 10;

// initialize board with 0s (empty cells)
const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const initBoard = createBoard()

export default function Home() {
  const [randomShape, setShape] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>(initBoard);
  const [borderBox, setBorderBox] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);

  return (
  <div>
      <Welcome onUpdate={setShape} score={score}/>
      <div className="main-container">
        <div className="shape-container">
        {randomShape.length > 0 && (<MoveShape setShape={setShape} shape={randomShape} setBoard={setBoard} board={board} score={score} setBorderBox={setBorderBox} setScore={setScore} borderBox={borderBox} rowLimit={ROWS} colLimit={COLS} setEndGame={setEndGame}/>)}
        </div>

        <Board board={ board } endGame={endGame}/>

        {/* {endGame && <EndGame onUpdate={setShape} />} */}
      </div>
  </div>
  );
}
