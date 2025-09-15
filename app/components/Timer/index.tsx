import { useState, useEffect } from 'react';

type TimerProp = {
  endGame: boolean;
  hasInitialized: boolean;
}

const Timer: React.FC<TimerProp>  = ({endGame, hasInitialized}) => {
  const [seconds, setSeconds] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (!endGame && hasInitialized){
        setSeconds(prevSeconds => prevSeconds + 1);
      }
      else if (endGame){
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endGame, hasInitialized]);

  return (
    <div className="timer">
      Timer: {seconds} s
    </div>
  );
};

export default Timer;