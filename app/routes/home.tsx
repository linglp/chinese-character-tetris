import { useState } from 'react';
import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import Board from "../components/Board";
import MoveShape from "../components/MoveShape"
import './home.scss';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Let's play tetris" },
    { name: "description", content: "Play tetris with Chinese character" },
  ];
}

const ROWS = 20;
const COLS = 30;

// initialize board with 0s (empty cells)
const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const initBoard = createBoard()

export default function Home() {
  const [randomShape, setShape] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>(initBoard);

  return (
  <div>
      <Welcome onUpdate={setShape}/>
      <div className="main-container">
        <div className="shape-container">
        {randomShape.length > 0 && (<MoveShape setShape={setShape} shape={randomShape} setBoard={setBoard} board={board} rowLimit={ROWS} colLimit={COLS}/>)}
        </div>

        <Board board={ board } />
      </div>
  </div>
  );
}
