import React, { useEffect, useState } from "react";
import Node from "../Node/node";
import {
  createBoard,
  emptyGird,
  MouseDown,
  MouseEnter,
  Mouseup,
  resetGird,
} from "./boardsUtil";
import "./board.css";
import { ratinMaze } from "../../algorithms/rat_in_a_maze";
import { bfs } from "../../algorithms/bfs";
import { greedyBfs } from "../../algorithms/greedyBfs";
import { connect } from "react-redux";

import HeaderImage from "../../assests/image1.png";
import PlayBtn from "../../assests/play.png";
import MonsterLogo from "../../assests/monster.png";
import StartLogo from "../../assests/start.png";
import SelectAlgoritm from "../SelectAlgorithm/SelectAlgoritm";
import { Astar } from "../../algorithms/astar";
import { dfs } from "../../algorithms/dfs";

const Board = (props) => {
  const [board, setBoard] = useState({});
  const [changeboard , setchnageBoard] = useState(false);

  useEffect(() => {
    let Board = createBoard();
    console.log(Board);
    setBoard(Board);

  }, []);

  const StartFindingPath = () => {
    const algorithm = props.algo;
    resetGird(board, setBoard);
    if (algorithm == "Backtracking") {
      ratinMaze(
        board.grid,
        board.startPoint.x,
        board.startPoint.y,
        board.grid.length,
        board.grid[1].length,
        setGrid,
        board.endPoint.x,
        board.endPoint.y,
        setBoard,board
      );
    } else if (algorithm == "breadth first search") {
      bfs(
        board.grid,
        board.startPoint.x,
        board.startPoint.y,
        board.endPoint.x,
        board.endPoint.y,
        setBoard,
        board,
        setGrid
      );
    } else if (algorithm == "greedy bfs") {
      greedyBfs(
        board.grid,
        board.startPoint.x,
        board.startPoint.y,
        board.endPoint.x,
        board.endPoint.y,
        setBoard,
        board,
        setGrid
      );
    } else if(algorithm == "A star"){
      Astar(board.grid,
        board.startPoint.x,
        board.startPoint.y,
        board.endPoint.x,
        board.endPoint.y,
        setBoard,
        board,
        setGrid)
    }
    else if(algorithm == "depth first search"){
      dfs(board.grid,
        board.startPoint.x,
        board.startPoint.y,
        board.endPoint.x,
        board.endPoint.y,
        setBoard,
        board,
        setGrid)
    }
  };

  

  const setGrid = (grid) => {
    setBoard({ ...board, grid: grid });
  };
  return (
    <div>
      { /* header  of app */}
      <div className="header--main--container">
        <img src={HeaderImage} style={{ height: "100%", width: "100%" }} />
        <div className="header--btn">
          <img src={MonsterLogo} className="monster--logo" />
          <div className="header-btn-btn-group">
            
            <div className="header-btn-btn header-bnt-select">
              {" "}
              <SelectAlgoritm disable={board.isSearching} />{" "}
            </div>
    
            <button className="header-btn-btn reset--grid-btn" onClick={()=>emptyGird(board, setBoard)} disabled={board.isSearching}>reset grid</button>
            <div className="header-btn-btn header-bnt-select reset--grid-btn">monster</div>
            <button
              className="header-btn-btn play--btn"
              onClick={StartFindingPath}
              disabled={board.isSearching}
            >
              <img src={PlayBtn} />
            </button>
          </div>
        </div>

        <div className="header--info">
          <div className="header--info--section">
            <div className="header--info--section--text">visited</div>
            <div
              className="header--info--section--block"
              style={{ backgroundColor: "skyblue" }}
            ></div>
            <div
              className="header--info--section--block"
              style={{ backgroundColor: "mediumslateblue" }}
            ></div>
          </div>
          <div className="header--info--section">
            <div className="header--info--section--text">start</div>
            <div
              className="header--info--section--block"
              style={{
                backgroundImage: `url(` + StartLogo + `)`,
                backgroundSize: "cover",
                marginTop: "5px",
              }}
            ></div>
          </div>
          <div className="header--info--section">
            <div className="header--info--section--text">shortest path</div>
            <div
              className="header--info--section--block"
              style={{ backgroundColor: "yellow" }}
            ></div>
          </div>

          <div className="header--info--section">
            <div className="header--info--section--text">Wall</div>
            <div
              className="header--info--section--block"
              style={{ backgroundColor: "rgb(3, 41, 66)" }}
            ></div>
          </div>
        </div>
      </div>

              {/** board grid of app */}
      <div className="grid">
        {board.grid &&
          board.grid.map((row) => (
            <div className="grid--row">
              {row.map((nodes) => (
                <div
                  className="grid--node"
                  onMouseDown={() =>
                    MouseDown(nodes.x, nodes.y, board, setBoard)
                  }
                  onMouseEnter={() =>
                    MouseEnter(nodes.x, nodes.y, board, setBoard)
                  }
                  onMouseUp={() => Mouseup(nodes.x, nodes.y, board, setBoard)}
                >
                  <Node
                    visited={nodes.visited}
                    value={nodes.value}
                    node={nodes}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
      
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    algo: state.algo.algo,
  };
};

export default connect(mapStateToProp, null)(Board);
