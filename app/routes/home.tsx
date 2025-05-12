import { useState } from 'react';
import type { Route } from "./+types/home";
import  Welcome  from "../welcome/welcome";
import Board from "../components/Board";
import Shape from "../components/Shape";
import StartGame from "../components/StartGameButton"
import {createLShape} from "../components/Shape/util"
import MoveShape from "../components/MoveShape"



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

const board = createBoard()
const shape = createLShape()

export default function Home() {
  const [randomShape, setShape] = useState<number[][]>([]);

  return (
  <div>
      <Welcome onUpdate={setShape}/>
      <MoveShape shape={ randomShape } />
      {/* <Board board={ board } /> */}
  </div>

  );
}
