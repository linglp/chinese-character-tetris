import { useRef, useEffect } from "react";

type MusicProps = {
  endGame: boolean;
  hasInitialized: boolean;

}

const BackgroundMusic: React.FC<MusicProps> = ({endGame, hasInitialized}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        audioRef.current = new Audio("/tetris-game-classic.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;


    if (!endGame && hasInitialized){
      audioRef.current.play().catch(err => {
      console.warn("Autoplay blocked:", err);
      });
    } else {
      audioRef.current.pause();
    }

  }, [endGame, hasInitialized]);

  return null;
}
export default BackgroundMusic