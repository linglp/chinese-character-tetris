import { useRef, useEffect } from "react";

type MusicProps = {
  endGame: boolean;
  hasInitialized: boolean;

}

const BackgroundMusic: React.FC<MusicProps> = ({endGame, hasInitialized}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Create the Audio object only once on mount
    useEffect(() => {
        audioRef.current = new Audio("/tetris-game-classic.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Control play/pause based on endGame and hasInitialized
    useEffect(() => {
        if (!audioRef.current) return;
        if (!endGame && hasInitialized) {
            audioRef.current.play().catch(err => {
                console.warn("Autoplay blocked:", err);
            });
        } else {
            audioRef.current.pause();
        }
    }, [endGame, hasInitialized]);
  return null;
}
export default BackgroundMusic;