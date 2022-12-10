import "./userLeaderboardScore.scss";

interface IUserLeaderboardScore {
  nickname: String | null;
  moves: number;
  time: number;
}

const UserLeaderboardScore = ({
  nickname,
  moves,
  time,
}: IUserLeaderboardScore) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <h3 className="text">{nickname}</h3>
      <h3 className="text">{moves}</h3>
      <h3 className="text">{time / 1000}</h3>
    </div>
  );
};

export default UserLeaderboardScore;
