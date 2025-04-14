import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Board from "../components/Board";



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

export default function Home() {
  return (
  <div>
      <Welcome />
      <Board board={ board } />
  </div>

  );
}
