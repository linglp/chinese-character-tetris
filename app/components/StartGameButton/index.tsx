import './index.scss';
import { randomShapeGenerator } from '../Shape/util';
import {createBoard} from '../../routes/home'

type StartButtonProps = {
    isDisabled: boolean;
    onUpdate: (value: number[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: number[][]) => void;
    setScore: (value: number) => void;
    setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const StartGameButton: React.FC<StartButtonProps> = ({ onUpdate, setEndGame, setBoard, setScore, setIsDisabled, isDisabled }) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    var shape = randomShapeGenerator();

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