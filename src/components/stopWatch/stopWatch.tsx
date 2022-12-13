import { clear } from "console";
import { useEffect, useState } from "react";

interface IWatch {
  stopWatchStatus: boolean;
  time: number;
  setTime: Function;
}

const StopWatch = ({ stopWatchStatus, time, setTime }: IWatch) => {
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

  function startTimer() {
    let interval = setInterval(() => {
      setTime((time: number) => time + 10);
    }, 10);
    setIntervalID(interval);
  }

  function stopTimer() {
    clearInterval(intervalID);
  }

  useEffect(() => {
    if (stopWatchStatus === true) {
      startTimer();
    } else if (stopWatchStatus === false) {
      stopTimer();
    }
  }, [stopWatchStatus]);

  return (
    <div>
      <h3 className="textScore">Time: {time / 1000}</h3>
    </div>
  );
};

export default StopWatch;
