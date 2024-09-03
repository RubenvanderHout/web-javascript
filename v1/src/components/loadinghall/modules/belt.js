import Coordinates from "./coordinates.js";
import Tetromino, { tetrominoShapes, numberOfShapes } from "./tetromino.js";

class Belt {


  MAX_GRIDCOLLUMNS;
  MAX_GRIDROWS;

  intervalId = null;

  tetrominos = [];
  oldgrid = [];
  grid = [];
  /**
   * Constructs a new Belt
   * @constructor
   * @param {HTMLCanvasElement} canvas - canvas element
   * @param {Coordinates} coordinates - shapeType
   */
  constructor(canvas, coordinates, interval = 1000) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.coordinates = coordinates;

    this.coordinates = coordinates;
    this.interval = interval;

    this.MAX_GRIDCOLLUMNS = (this.coordinates.gridCollumns - 1)
    this.MAX_GRIDROWS = (this.coordinates.gridRows)

    this.init()
  }

  init() {
    for (let gridY = 0; gridY < this.coordinates.gridCollumns; gridY++) {
      this.grid[gridY] = [];
      for (let gridX = 0; gridX < this.coordinates.gridRows; gridX++) {
        if (gridY >= (this.coordinates.gridCollumns - 1)) {
          this.coordinates.drawFillRect(this.ctx, gridX, gridY, "grey")
          this.grid[gridY][gridX] = 1;
        } else {
          this.coordinates.drawStrokeRect(this.ctx, gridX, gridY, "grey")
          this.grid[gridY][gridX] = 0;
        }
      }
    }
    console.log(this.grid)
  }

  start() {
    console.log("start");
    this.intervalId = setInterval(() => {
      this.updateScreen();
    }, this.interval);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateScreen() {
    for (let i = this.tetrominos.length - 1; i >= 0; i--) {
      this.move(this.tetrominos[i]);
    }
    
    if (this.checkNoSpawnCollison()) {
      this.createTetromino();
    }
    
  }

  checkNoSpawnCollison() {
    if (this.tetrominos.length <= 0) {
      return true;
    }

    for (const otherTetromino of this.tetrominos) {
      if (otherTetromino.gridY <= 2) {
        return false;
      }
    }
    return true;
  }


  createTetromino() {
    const randomIndex = Math.floor(Math.random() * numberOfShapes);
    const randomShapeKey = Object.keys(tetrominoShapes)[randomIndex];
    const randomShape = tetrominoShapes[randomShapeKey];

    const tetromino = new Tetromino(this.ctx, randomShape, this.coordinates, 0, 0);
    tetromino.draw(0, 0);
    this.tetrominos.push(tetromino);
  }

  move(tetromino) {
    const oldGridX = tetromino.gridX;
    const oldGridY = tetromino.gridY;

    // Calculate new position based on direction
    let newGridX = oldGridX;
    let newGridY = oldGridY;

    if (this.canMoveDown(tetromino)) {
      newGridY++;
    } else if (this.canMoveRight) {
      newGridX++;
    }

    tetromino.delete(oldGridX, oldGridY);
    // Update position
    tetromino.gridX = newGridX;
    tetromino.gridY = newGridY;
    // Redraw in new position
    tetromino.draw(newGridX, newGridY);
  }

  canMoveDown(tetromino, old) {
    let canMoveDown = true;

    const oldGridX = tetromino.gridX;
    const oldGridY = tetromino.gridY;

    // Calculate new position based on direction
    let newGridX = oldGridX + 1;

    const LastRowContainsBlock = tetromino.shape[2].includes(1, 2);
    const secondRowContainsBlock = tetromino.shape[1].includes(1, 2);
    const firstRowContainsBlock = tetromino.shape[0].includes(1, 2);

    const nextPostitionFilled = this.grid[oldGridY][newGridX];

    if (LastRowContainsBlock && 
        (oldGridY + 1) === this.MAX_GRIDCOLLUMNS
      ) {
      canMoveDown = false
    } else if (
      secondRowContainsBlock &&
      !LastRowContainsBlock &&
      (oldGridY + 1) === (this.MAX_GRIDCOLLUMNS - 1)
    ) {
      canMoveDown = false;
    } else if (
      firstRowContainsBlock &&
      !secondRowContainsBlock &&
      !LastRowContainsBlock &&
      (oldGridY + 1) === (this.MAX_GRIDCOLLUMNS - 2)
    ) {
      canMoveDown = false;
    } 
    // else if(nextPostitionFilled){
    //   canMoveDown = false; 
    // }

    return canMoveDown;
  }

  canMoveRight(tetromino) {
    let canMoveRight = false

    const oldGridX = tetromino.gridX;
    const oldGridY = tetromino.gridY;

    let newGridY = oldGridY + 1;
    const nextPostitionMoveY = this.grid[oldGridX][newGridY];

    if ((oldGridX + 1) <= this.MAX_GRIDROWS && nextPostitionMoveY) {
      canMoveRight = true;
    }

    return canMoveRight;
  }

}

export default Belt;