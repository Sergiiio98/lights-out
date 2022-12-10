import "./lightBox.scss";
import React from "react";

interface IBox {
  isOn: boolean;
  row: number;
  column: number;
  handleClick: Function;
  gameStatus: boolean;
}

const LightBox = ({ isOn, row, column, handleClick, gameStatus }: IBox) => {
  return (
    <>
      {isOn ? (
        <button
          disabled={!gameStatus}
          onClick={() => handleClick(row, column)}
          className="on"
        ></button>
      ) : (
        <button
          disabled={!gameStatus}
          onClick={() => handleClick(row, column)}
          className="off"
        ></button>
      )}
    </>
  );
};

export default LightBox;
