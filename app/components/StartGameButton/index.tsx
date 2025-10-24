import './index.scss';
import { randomShapeGenerator, loadWords } from '../Shape/util';
import {createBoard} from '../../routes/home'

type StartButtonProps = {
    isDisabled: boolean;
    onUpdate: (value: (string | number)[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: (string | number)[][]) => void;
    setScore: (value: number) => void;
    setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const StartGameButton: React.FC<StartButtonProps> = ({ onUpdate, setEndGame, setBoard, setScore, setIsDisabled, isDisabled }) => {
    const words = loadWords();
    // var shape = randomShapeGenerator(words);
    var shape = [
    [
        "菊",
        "菠",
        0
    ],
    [
        0,
        "粥",
        "柿"
    ],
    [
        0,
        0,
        0
    ]
]
    console.log('shape', shape)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    onUpdate(shape);
    setEndGame(false);
    setBoard(createBoard());
    setScore(0);
    setIsDisabled(true);

    };

    return (
        <button disabled={isDisabled} onClick={handleClick} className="start-game-button">
            Start Game
        </button>
    )
}

export default StartGameButton