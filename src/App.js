import "./styles.css";
import { useEffect, useState } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
export default function App() {
  const [board, setBoard] = useState(shuffle([...TILE_COLORS, ...TILE_COLORS]));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    if (selectedTiles.length < 2) return;

    if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([]);
    } else {
      let timeoutID = setTimeout(() => {
        setSelectedTiles([]);
      }, 750);
      return () => clearTimeout(timeoutID);
    }
  }, [selectedTiles, board, matchedTiles]);

  const selectTile = (index) => {
    if (
      selectedTiles.length >= 2 ||
      selectedTiles.includes(index) ||
      matchedTiles.includes(index)
    ) {
      return;
    }

    setSelectedTiles([...selectedTiles, index]);
  };

  const reset = () => {
    setBoard(shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setMatchedTiles([]);
    setSelectedTiles([]);
  };

  const didPlayerWin = board.length === matchedTiles.length;
  return (
    <div className="App">
      <h1>{didPlayerWin ? "You win!" : "Memory"}</h1>
      <div className="board">
        {board?.map((tileColor, i) => {
          const isTurnedOver =
            selectedTiles.includes(i) || matchedTiles.includes(i);
          const className = isTurnedOver ? `tile ${tileColor}` : "tile";
          return (
            <div
              key={i}
              className={className}
              onClick={() => selectTile(i)}
            ></div>
          );
        })}
      </div>
      {didPlayerWin && <button onClick={reset}>Reset</button>}
    </div>
  );
}
