import './index.scss';
import { randomShapeGenerator } from '../Shape/util';
import {createBoard} from '../../routes/home'

type StartButtonProps = {
    disabled: boolean;
    onUpdate: (value: number[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: number[][]) => void;
};

const StartGameButton: React.FC<StartButtonProps> = ({ disabled, onUpdate, setEndGame, setBoard }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    var shape = randomShapeGenerator();

    onUpdate(shape);
    setEndGame(false);
    setBoard(createBoard());
    
    };

    return (
        <button disabled={disabled} onClick={handleClick} className="start-game-button">
            Start Game
        </button>
    )
}

export default StartGameButton