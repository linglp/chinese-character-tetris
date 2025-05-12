import './index.scss';
import { randomShapeGenerator } from '../Shape/util';

type StartButtonProps = {
    disabled: boolean;
    onUpdate: (value: number[][]) => void;
};


const StartGameButton: React.FC<StartButtonProps> = ({ disabled, onUpdate }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log("Button clicked!");
      //generate a random shape
      var shape = randomShapeGenerator();
      onUpdate(shape);
    };

    return (
        <button disabled={disabled} onClick={handleClick} className="start-game-button">
            Start Game
        </button>
    )
}

export default StartGameButton