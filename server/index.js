import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function createLShape1() {
  return [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ];
}
function createLShape2() {
  return [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ];
}
function createLShape3() {
  return [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ];
}
function createLShape4() {
  return [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ];
}
function createSShape1() {
  return [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ];
}
function createSShape2() {
  return [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ];
}
function createSShape3() {
  return [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ];
}
function createSShape4() {
  return [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
  ];
}
function createZShape1() {
  return [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ];
}
function createZShape2() {
  return [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ];
}
function createZShape3() {
  return [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ];
}
function createZShape4() {
  return [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ];
}
function createJShape1() {
  return [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ];
}
function createJShape2() {
  return [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ];
}
function createJShape3() {
  return [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ];
}
function createJShape4() {
  return [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ];
}
function createSquareShape1() {
  return [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ];
}
function createIShape1() {
  return [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ];
}
function createIShape2() {
  return [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ];
}
function createTShape1() {
  return [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ];
}
function createTShape2() {
  return [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ];
}
function createTShape3() {
  return [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ];
}
function createTShape4() {
  return [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ];
}
const allShapesFunctions = [
  //L shape family
  "createLShape1",
  "createLShape2",
  "createLShape3",
  "createLShape4",
  //S shape family,
  "createSShape1",
  "createSShape2",
  "createSShape3",
  "createSShape4",
  //T shape family,
  "createTShape1",
  "createTShape2",
  "createTShape3",
  "createTShape4",
  //I shape family
  "createIShape1",
  "createIShape2",
  //J shape family
  "createJShape1",
  "createJShape2",
  "createJShape3",
  "createJShape4",
  //Z shape family
  "createZShape1",
  "createZShape2",
  "createZShape3",
  "createZShape4",
  //O shape family
  "createSquareShape1"
];
const shapeRegistry = {
  //L shape family
  createLShape1,
  createLShape2,
  createLShape3,
  createLShape4,
  //S shape family
  createSShape1,
  createSShape2,
  createSShape3,
  createSShape4,
  //T shape family
  createTShape1,
  createTShape2,
  createTShape3,
  createTShape4,
  //I shape family
  createIShape1,
  createIShape2,
  //J shape family,
  createJShape1,
  createJShape2,
  createJShape3,
  createJShape4,
  //Z shape family
  createZShape1,
  createZShape2,
  createZShape3,
  createZShape4,
  //O shape family
  createSquareShape1
};
function randomShapeGenerator() {
  let randomShape = allShapesFunctions[Math.floor(Math.random() * allShapesFunctions.length)];
  const fn = shapeRegistry[randomShape];
  return fn();
}
const StartGameButton = ({ disabled, onUpdate, setEndGame, setBoard, setScore }) => {
  const handleClick = (event) => {
    var shape = randomShapeGenerator();
    onUpdate(shape);
    setEndGame(false);
    setBoard(createBoard());
    setScore(0);
  };
  return /* @__PURE__ */ jsx("button", { disabled, onClick: handleClick, className: "start-game-button", children: "Start Game" });
};
const Welcome = ({ onUpdate, score, setEndGame, setBoard, setScore }) => {
  const disabled = false;
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: /* @__PURE__ */ jsxs("header", { className: "flex flex-col items-start gap-5 w-[500px] max-w-[100vw] p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "welcome", children: "Welcome to tetris!" }),
    /* @__PURE__ */ jsxs("div", { className: "score-container", children: [
      "Score: ",
      score
    ] }),
    /* @__PURE__ */ jsx("div", { className: "start-button", children: /* @__PURE__ */ jsx(StartGameButton, { disabled, onUpdate, setEndGame, setBoard, setScore }) })
  ] }) }) });
};
const Timer = ({ endGame, hasInitialized }) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!endGame && hasInitialized) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      } else if (endGame) {
        setSeconds(0);
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [endGame, hasInitialized]);
  return /* @__PURE__ */ jsxs("div", { className: "timer", children: [
    "Timer: ",
    seconds,
    " s"
  ] });
};
const EndGame = ({ onUpdate, setEndGame, setBoard, setScore }) => {
  const disabled = false;
  return /* @__PURE__ */ jsx("div", { className: "splash", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Game Over" }),
    /* @__PURE__ */ jsx("div", { className: "restart-btn", children: /* @__PURE__ */ jsx(StartGameButton, { disabled, onUpdate, setEndGame, setBoard, setScore }) })
  ] }) });
};
const Board = ({ board, endGame, setShape, hasInitialized, setEndGame, setBoard, setScore }) => {
  useEffect(() => {
  }, [board, endGame]);
  return /* @__PURE__ */ jsxs("div", { className: "board", children: [
    /* @__PURE__ */ jsx(Timer, { endGame, hasInitialized }),
    board.map((row, rowIndex) => /* @__PURE__ */ jsx("div", { className: "row", children: row.map((cell, colIndex) => /* @__PURE__ */ jsx("div", { className: `cell cell-${cell}` }, `${rowIndex}_${colIndex}`)) }, rowIndex)),
    endGame && /* @__PURE__ */ jsx(EndGame, { onUpdate: setShape, setEndGame, setBoard, setScore })
  ] });
};
function cleanUpBoard({ board, shapeCoordinate }) {
  const newBoard = board.map((row) => [...row]);
  shapeCoordinate.forEach((object) => {
    newBoard[object["row"]][object["col"]] = 0;
  });
  return newBoard;
}
function updateBoard({ board, newShape }) {
  const newBoard = board.map((row) => [...row]);
  const shapePos = newShape;
  newShape.forEach((pos) => {
    const rowIndex = pos.row;
    const colIndex = pos.col;
    newBoard[rowIndex][colIndex] = 1;
  });
  return { newBoard, shapePos };
}
const OCCUPIED_CELL = 1;
function computeBorder(position) {
  if (position.length === 0) return [0, 0, 0, 0];
  const { maxRow, maxCol, minRow, minCol } = position.reduce(
    (acc, { row, col }) => ({
      maxRow: Math.max(acc.maxRow, row),
      maxCol: Math.max(acc.maxCol, col),
      minRow: Math.min(acc.minRow, row),
      minCol: Math.min(acc.minCol, col)
    }),
    //Any actual row or col value will be less than 100
    { maxRow: 0, maxCol: 0, minRow: 100, minCol: 100 }
  );
  return [maxRow, maxCol, minRow, minCol];
}
function findOccupant(nextShape, board) {
  const numRows = board.length;
  const numCols = board[0].length;
  for (const coord of nextShape) {
    var row = coord["row"];
    var col = coord["col"];
    if (row >= 0 && col >= 0 && row < numRows && col < numCols) {
      if (board[row][col] === OCCUPIED_CELL) {
        return true;
      }
    }
  }
  return false;
}
function findNextShape(activity, shapeCoordinate, box, setBorderBoxCoordinate) {
  const moveLeft = (points) => points.map((p) => ({ "row": p["row"], "col": p["col"] - 1 }));
  const moveRight = (points) => points.map((p) => ({ "row": p["row"], "col": p["col"] + 1 }));
  const moveDown = (points) => points.map((p) => ({ "row": p["row"] + 1, "col": p["col"] }));
  let moved = shapeCoordinate;
  let newBox = box;
  if (activity === "ArrowRight") {
    moved = moveRight(shapeCoordinate);
    newBox = moveRight(box);
  } else if (activity === "ArrowLeft") {
    moved = moveLeft(shapeCoordinate);
    newBox = moveLeft(box);
  } else if (activity === "ArrowDown") {
    moved = moveDown(shapeCoordinate);
    newBox = moveDown(box);
  } else if (activity == "ArrowUp") {
    moved = rotateShape(shapeCoordinate, box);
  }
  setBorderBoxCoordinate(newBox);
  return moved;
}
function ifOccupy({ nextShape, board }) {
  const newBoard = board.map((row) => [...row]);
  const result = findOccupant(nextShape, newBoard);
  return result;
}
function getPivot(shapeCoordinate) {
  const rows = shapeCoordinate.map((cell) => cell.row);
  const cols = shapeCoordinate.map((cell) => cell.col);
  const rowCenter = (Math.min(...rows) + Math.max(...rows)) / 2;
  const colCenter = (Math.min(...cols) + Math.max(...cols)) / 2;
  return { row: rowCenter, col: colCenter };
}
function rotateShape(shapeCoordinate, box) {
  const pivot = getPivot(box);
  const cx = pivot["col"];
  const cy = pivot["row"];
  var rotated = shapeCoordinate.map((cell) => ({
    row: Math.round(cy + (cell.col - cx)),
    // y' = cy - (x - cx)
    col: Math.round(cx - (cell.row - cy))
    // x' = cx + (y - cy)
  }));
  return rotated;
}
function ifInBorder({ nextShape, rowLimit, colLimit }) {
  const [edgeMaxRow, edgeMaxCol, edgeMinRow, edgeMinCol] = computeBorder(nextShape);
  return edgeMaxRow < rowLimit && edgeMaxCol < colLimit && edgeMinCol >= 0 && edgeMinRow >= 0;
}
function mapShapeToPositions(matrix) {
  const positions = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 1) {
        positions.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return positions;
}
function saveBox(matrix) {
  const borderBox = [];
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      borderBox.push({ row: rowIndex, col: colIndex });
    });
  });
  return borderBox;
}
function clearBoardCountScore(board, score) {
  const rowsToClear = [];
  const newBoard = board.map((row) => [...row]);
  for (let i = 0; i < board.length; i++) {
    const allFilled = (arr) => arr.every((val) => val === 1);
    const filled = allFilled(board[i]);
    if (filled) {
      rowsToClear.push(i);
    }
  }
  rowsToClear.sort((a, b) => b - a);
  if (rowsToClear.length > 0) {
    for (let i of rowsToClear) {
      newBoard.splice(i, 1);
    }
    let numCols = board[0].length;
    for (let i = 0; i < rowsToClear.length; i++) {
      newBoard.unshift(Array(numCols).fill(0));
    }
  }
  score = score + 10 * rowsToClear.length;
  return [score, newBoard];
}
function ifGameEnd(board) {
  let hasOne = board[0].some((cell) => cell === 1);
  return hasOne;
}
const MoveShape = ({ setShape, shape, setBoard, board, score, setScore, rowLimit, colLimit, setEndGame, hasInitialized, setHasInitialized }) => {
  const [shapeCoordinate, setShapeCoordinate] = useState(mapShapeToPositions(shape));
  const [box, setBorderCoordinate] = useState(saveBox(shape));
  useEffect(() => {
    if (!hasInitialized && shape.length > 0) {
      console.log("restarting...");
      const nextShape = findNextShape("", shapeCoordinate, box, setBorderCoordinate);
      const { newBoard, shapePos } = updateBoard({ board, newShape: nextShape });
      setShapeCoordinate(shapePos);
      setBoard(newBoard);
      setHasInitialized(true);
    }
  }, [shape, hasInitialized, box]);
  useEffect(() => {
  }, [shapeCoordinate]);
  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const nextShape = findNextShape("ArrowDown", shapeCoordinate, box, setBorderCoordinate);
      const inBorder = ifInBorder({ nextShape, rowLimit, colLimit });
      const cleanedBoard = cleanUpBoard({ board, shapeCoordinate });
      const Occupied = ifOccupy({ nextShape, board: cleanedBoard });
      if (inBorder && !Occupied) {
        const { newBoard, shapePos } = updateBoard({
          board: cleanedBoard,
          newShape: nextShape
        });
        setBoard(newBoard);
        setShapeCoordinate(shapePos);
      } else {
        const { newBoard } = updateBoard({
          board,
          newShape: shapeCoordinate
        });
        setBoard(newBoard);
        const endGame = ifGameEnd(newBoard);
        if (endGame) {
          setEndGame(endGame);
          return;
        }
        const [newScore, updatedBoard] = clearBoardCountScore(newBoard, score);
        setScore(newScore);
        setBoard(updatedBoard);
        var newShape = randomShapeGenerator();
        setShape(newShape);
        setBorderCoordinate(saveBox(newShape));
        setShapeCoordinate(mapShapeToPositions(newShape));
        setHasInitialized(false);
      }
    }, 1e3);
    const handleKeyDown = (e) => {
      e.preventDefault();
      const nextShape = findNextShape(e.key, shapeCoordinate, box, setBorderCoordinate);
      const inBorder = ifInBorder({ nextShape, rowLimit, colLimit });
      const cleanedBoard = cleanUpBoard({ board, shapeCoordinate });
      const Occupied = ifOccupy({ nextShape, board: cleanedBoard });
      if (inBorder && !Occupied) {
        const { newBoard, shapePos } = updateBoard({ board: cleanedBoard, newShape: nextShape });
        setBoard(newBoard);
        setShapeCoordinate(shapePos);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(intervalId);
    };
  });
  return null;
};
function meta({}) {
  return [{
    title: "Let's play tetris"
  }, {
    name: "description",
    content: "Play tetris with Chinese character"
  }];
}
const ROWS = 15;
const COLS = 10;
const createBoard = () => {
  return Array.from({
    length: ROWS
  }, () => Array(COLS).fill(0));
};
const initBoard = createBoard();
const home = withComponentProps(function Home() {
  const [randomShape, setShape] = useState([]);
  const [board, setBoard] = useState(initBoard);
  const [borderBox, setBorderBox] = useState([]);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  return /* @__PURE__ */ jsx("div", {
    className: "app-container",
    children: /* @__PURE__ */ jsxs("div", {
      className: "content",
      children: [/* @__PURE__ */ jsx(Welcome, {
        onUpdate: setShape,
        score,
        setEndGame,
        setBoard,
        setScore
      }), /* @__PURE__ */ jsxs("div", {
        className: "main-container",
        children: [/* @__PURE__ */ jsx("div", {
          className: "shape-container",
          children: randomShape.length > 0 && /* @__PURE__ */ jsx(MoveShape, {
            setShape,
            shape: randomShape,
            setBoard,
            board,
            score,
            setScore,
            borderBox,
            rowLimit: ROWS,
            colLimit: COLS,
            setEndGame,
            hasInitialized,
            setHasInitialized
          })
        }), /* @__PURE__ */ jsx(Board, {
          board,
          endGame,
          setEndGame,
          setShape,
          hasInitialized,
          setBoard,
          setScore
        })]
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createBoard,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CrHes0rY.js", "imports": ["/assets/chunk-KNED5TY2-BWNdqSdz.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Dk44eWJ3.js", "imports": ["/assets/chunk-KNED5TY2-BWNdqSdz.js", "/assets/with-props-D3AO8slx.js"], "css": ["/assets/root-Dnr_lOmf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BXICkEle.js", "imports": ["/assets/with-props-D3AO8slx.js", "/assets/chunk-KNED5TY2-BWNdqSdz.js"], "css": ["/assets/home-aHjAghDg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-4b769309.js", "version": "4b769309", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
