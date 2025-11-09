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
    const [words, phrases] = loadWords();

    var shape = randomShapeGenerator(words);
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