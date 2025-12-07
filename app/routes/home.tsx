import { useState } from 'react';
import type { Route } from "./+types/home";
import Welcome from "../welcome/welcome";
import Board from "../components/Board";
import MoveShape from "../components/MoveShape"
import './home.scss';
import BackgroundMusic from "../components/BackgroundMusic"
import { loadWords } from "../components/Shape/util";
import { getUniqueObjectCounts } from '../components/MoveShape/util';



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Let's play tetris" },
    { name: "description", content: "Play tetris with Chinese character" },
  ];
}

const ROWS = 15;
const COLS = 10;

// initialize board with 0s (empty cells)
export const createBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

const initBoard = createBoard();

export default function Home() {
    // Load words ONCE at the top level
  const [words, phrases] = loadWords();
  
  const [randomShape, setShape] = useState<(string | number)[][]>([]);
  const [board, setBoard] = useState<(string | number)[][]>(initBoard);
  const [borderBox, setBorderBox] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [food, setFood] = useState<{word: string, explanation: string}[]>([]);

  var foodCounts = food.length > 0 ? getUniqueObjectCounts(food) : [];

  return (
  <div className="app-container">
    <div className="content">
      <Welcome onUpdate={setShape} score={score} setEndGame={setEndGame} setBoard={setBoard} setScore={setScore} endGame={endGame} hasInitialized={hasInitialized} isDisabled={isDisabled} setIsDisabled={setIsDisabled} words={words}/>
      <div className="main-container">
        <div className="shape-container">
        {randomShape.length > 0 && (<MoveShape setShape={setShape} shape={randomShape} setBoard={setBoard} board={board} score={score} setScore={setScore} borderBox={borderBox} rowLimit={ROWS} colLimit={COLS} setEndGame={setEndGame} hasInitialized={hasInitialized} setHasInitialized={setHasInitialized} setFood={setFood} words={words} phrases={phrases}/>)}
        </div>

        <Board board={board} endGame={endGame} setEndGame={setEndGame} setShape={setShape} setBoard={setBoard} setScore={setScore} setIsDisabled={setIsDisabled} isDisabled={isDisabled} words={words} setFood={setFood}/>

        <div className="food-container">
          <div className="food-header">Food collected</div>
          <div className="food-items-wrapper">

            {foodCounts.map(object => (
              <div key={object.object.word} className="food-item">
              <div className="food-word-line">
                <div className="food-word">{object.object.word}</div>
                <div className="food-count">x {object.count}</div>
              </div>
                <div className="food-explanation">{object.object.explanation}</div>
              </div>
            ))} 
          </div>
        </div>

        <BackgroundMusic endGame={endGame} hasInitialized={hasInitialized}/>
      </div>
    </div>
  </div>
  );
}
