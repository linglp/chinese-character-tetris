import './index.scss';
import { randomShapeGenerator} from '../Shape/util';
import {createBoard} from '../../routes/home'

type StartButtonProps = {
    isDisabled: boolean;
    onUpdate: (value: (string | number)[][]) => void;
    setEndGame: (value: boolean | ((prev: boolean) => boolean)) => void;
    setBoard: (value: (string | number)[][]) => void;
    setScore: (value: number) => void;
    setIsDisabled: (value: boolean | ((prev: boolean) => boolean)) => void;
    words: any[];
};

const StartGameButton: React.FC<StartButtonProps> = ({ onUpdate, setEndGame, setBoard, setScore, setIsDisabled, isDisabled, words }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Now use the words that were loaded
        var shape = randomShapeGenerator(words);
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

export default StartGameButton;