import { Modal } from "@mantine/core";
import img from "../../assets/images/htp.png";
import "../gameDevice/gameDevice.scss";
import { useState } from "react";
import { DocumentData } from "firebase/firestore/lite";

interface IHowToPlay {
  opened: boolean;
  setOpened: Function;
  input: string;
  setInput: Function;
  nickname: string;
  setNickname: Function;
  nickInputIncluded: boolean;
  scores: DocumentData;
}

const HowToPlayModal = ({
  opened,
  setOpened,
  input,
  setInput,
  nickname,
  setNickname,
  nickInputIncluded,
  scores,
}: IHowToPlay) => {
  const [validationMessage, setValidationMessage] = useState(0);

  const checkIfNicknameExist = (nickname: string, input: string) => {
    scores.map((el: any) => {
      if (el.nickname === input) {
        setValidationMessage(2);
      } else {
        setNickname(input);
        setOpened(false);
      }
    });
  };
  return (
    <Modal
      centered
      style={{ color: "blue" }}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Rules of the game"
    >
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <li className="li">The game consists of a 5 by 5 grid of lights</li>
            <li className="li">
              Pressing any of the lights will toggle it and the adjacent lights
            </li>
            <li className="li">
              The goal of the puzzle is to switch all the lights off, preferably
              in as few button presses as possible.
            </li>
            <li className="li">
              Time is also the key to win when other player will have same
              number of moves.
            </li>
          </div>
          <div>
            <img className="image" src={img}></img>
          </div>
        </div>
        {nickInputIncluded ? (
          <div style={{ marginTop: "30px" }}>
            <label style={{ marginRight: "10px" }}>Your nickname:</label>
            <input
              required
              style={{
                backgroundColor: "#050d15",
                borderRadius: "5px",
                color: "rgb(132, 150, 170)",
                border: "none",
                outline: "none",
                paddingLeft: "7px",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <button
              className="saveBtn"
              onClick={() => {
                if (input) {
                  checkIfNicknameExist(nickname, input);
                } else {
                  setValidationMessage(1);
                }
              }}
            >
              Save
            </button>
          </div>
        ) : null}
        {validationMessage === 1 ? (
          <span style={{ fontSize: "10px", color: "red" }}>
            Please set a nickname
          </span>
        ) : null}
        {validationMessage === 2 ? (
          <span style={{ fontSize: "10px", color: "red" }}>
            This nickname is already taken
          </span>
        ) : null}
      </div>
    </Modal>
  );
};

export default HowToPlayModal;
