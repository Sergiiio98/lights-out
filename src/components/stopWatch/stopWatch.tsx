import { useEffect, useState } from "react";

interface IWatch {
  stopWatchStatus: boolean;
  time: number;
  setTime: Function;
}

const StopWatch = ({ stopWatchStatus, time, setTime }: IWatch) => {
  useEffect(() => {
    let interval = undefined;

    if (stopWatchStatus === true) {
      interval = setInterval(() => {
        setTime((time: number) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
  }, [stopWatchStatus]);

  return (
    <div>
      <h3 className="textScore">Time: {time / 1000}</h3>
    </div>
  );
};

export default StopWatch;
