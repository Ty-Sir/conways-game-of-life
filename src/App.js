import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import './app.css';
import Header from './header';

const numRows = 35;
const numCols = 35;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}

function App() {
  const [grid, setGrid] = useState(() =>{
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if(!runningRef.current){
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                neighbors += g[newI][newK];
              }
            });

            if(neighbors < 2 || neighbors > 3){
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="buttons">
        <button
          onClick={() => {
            setRunning(!running);
            if(!running){
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? 'stop' : 'start'}
        </button>

        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
        clear
        </button>

        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(Array.from(Array(numCols), () => (Math.random() > 0.75 ? 1 : 0)));
            }
            setGrid(rows);
          }}
        >
        random
        </button>
      </div>

      <div className="game">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 15px)`,
            boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: grid[i][k] ? '#ec1840' : undefined,
                  border: 'solid 1px black',
                  cursor: 'pointer'
                }}
              />
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
