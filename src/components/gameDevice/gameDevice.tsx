import "./gameDevice.scss";
import LightBox from "../lightBox/lightBox";
import { useState, useEffect } from "react";
import { levels } from "../../assets/levels";
import StopWatch from "../stopWatch/stopWatch";
import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
import sound from "../../assets/sounds/sound.mp3";
import winSound from "../../assets/sounds/win-melody.mp3";
import UserLeaderboardScore from "../userLeaderboardScore/userLeaderboardScore";

const GameDevice = () => {
  const [level, setLevel] = useState(0);
  const [boardState, setBoardState] = useState(levels[level]);
  const [gameStatus, setGameStatus] = useState(false);
  const [nickname, setNickname] = useState<String | null>("");
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [scores, setScores] = useState<DocumentData>([]);

  const playLevelSound = () => {
    console.log("test");
    const audio = new Audio(sound);
    audio.play();
  };

  const playWinSound = () => {
    console.log("test");
    const audio = new Audio(winSound);
    audio.play();
  };

  useEffect(() => {
    let LightsOnNumber = 0;
    for (let i of boardState) {
      for (let j of i) {
        if (j === true) LightsOnNumber++;
      }
    }
    if (LightsOnNumber === 0) {
      if (level + 1 === levels.length) {
        playWinSound();
        saveUserScore(nickname, moves, time);
        setGameStatus(false);
        setTime(0);
        getUsers(db).then((users) => {
          setScores(users);
        });
      }

      if (level + 1 < levels.length) {
        playLevelSound();
        setLevel((prevLevel) => prevLevel + 1);
      }
    }
  }, [boardState]);

  useEffect(() => {
    setBoardState(levels[level]);
  }, [level]);

  useEffect(() => {
    const userNickname = prompt("Set you nickname: ");
    setNickname(userNickname);
  }, []);

  useEffect(() => {
    getUsers(db).then((users) => {
      setScores(users);
    });
  }, []);

  const clickEffect = (r: number, c: number) => {
    let setup = boardState;
    setup[r][c] = !setup[r][c];
    if (r - 1 < setup.length && r - 1 >= 0) setup[r - 1][c] = !setup[r - 1][c];
    if (c - 1 < setup.length && c - 1 >= 0) setup[r][c - 1] = !setup[r][c - 1];
    if (c + 1 < setup.length && c + 1 >= 0) setup[r][c + 1] = !setup[r][c + 1];
    if (r + 1 < setup.length && r + 1 >= 0) setup[r + 1][c] = !setup[r + 1][c];
    setBoardState((arr) => [...arr]);
    setMoves((prevState) => prevState + 1);
  };

  const renderBoard = () => {
    const grid = boardState.map((el, rowNum) => {
      const row = el.map((item, columnNumber) => {
        return item ? (
          <LightBox
            isOn={true}
            row={rowNum}
            column={columnNumber}
            gameStatus={gameStatus}
            handleClick={clickEffect}
          />
        ) : (
          <LightBox
            isOn={false}
            row={rowNum}
            column={columnNumber}
            gameStatus={gameStatus}
            handleClick={clickEffect}
          />
        );
      });
      return row;
    });

    const output = grid.map((el) => {
      return <div>{el}</div>;
    });
    return output;
  };

  const startGame = () => {
    setGameStatus(true);
  };

  async function getUsers(db: any) {
    const users = collection(db, "users");
    const userSnapshot = await getDocs(users);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
  }

  async function saveUserScore(
    nickname: String | null,
    moves: number,
    time: number
  ) {
    await setDoc(doc(db, "users", uuidv4()), {
      nickname: nickname ? nickname : "Guest",
      moves: moves,
      time: time,
    });
  }

  const sortTopPlayers = (list: DocumentData) => {
    list.sort((a: any, b: any) => (a.moves > b.moves ? 1 : -1));
    console.log(list);
    list.sort((a: any, b: any) => (a.time > b.time ? 1 : -1));
    console.log(list);
  };

  sortTopPlayers(scores);

  return (
    <div className="mainWindow">
      <div className="gamePart">
        <div className="userScore">
          <h2 className="textScore" style={{ textAlign: "center" }}>
            Scoreboard
          </h2>
          <h3 className="textScore">Level: {level + 1}</h3>
          <h3 className="textScore">Moves: {moves}</h3>
          <StopWatch
            stopWatchStatus={gameStatus}
            time={time}
            setTime={setTime}
          />
        </div>
      </div>

      <div className="gamePart">
        <div className="gameDevice">
          <h3 style={{ textAlign: "center" }}>
            Level: {level + 1}/{levels.length}
          </h3>
          {renderBoard()}
          <div className="buttonsBox">
            <div className="buttonRow">
              <button onClick={startGame} className="button"></button>
              <h5 className="buttonDescription">Start</h5>
            </div>
            <div className="buttonRow">
              <button onClick={playLevelSound} className="button"></button>
              <h5 className="buttonDescription">Sound</h5>
            </div>
            <div className="buttonRow">
              <button onClick={playWinSound} className="button"></button>
              <h5 className="buttonDescription">Help</h5>
            </div>
          </div>
          <button className="blueButton"></button>
        </div>
      </div>
      <div className="gamePart">
        <div className="leaderboard">
          <h2 className="textScore" style={{ textAlign: "center" }}>
            Leaderboards
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <h3
              className="textScore"
              style={{
                flex: "33.33%",
                textAlign: "center",
              }}
            >
              Nickname
            </h3>
            <h3
              className="textScore"
              style={{
                flex: "33.33%",
                textAlign: "center",
              }}
            >
              Moves
            </h3>
            <h3
              className="textScore"
              style={{
                flex: "33.33%",
                textAlign: "center",
              }}
            >
              Time [s]
            </h3>
          </div>
          {scores
            ? scores.map((user: any) => {
                return (
                  <UserLeaderboardScore
                    time={user.time}
                    moves={user.moves}
                    nickname={user.nickname}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default GameDevice;
