import Coordinates from "./coordinates.js";

export const tetrominoShapes = {
    // Square
    square: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ],
  
    // L-shape
    lShape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ],
  
    // T-shape
    tShape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
  
    // Line
    line: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
  
    // Z-shape
    zShape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
  
    // Reverse L-shape
    reverseLShape: [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ],
  
    // Reverse Z-shape
    reverseZShape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ]
  };
export const numberOfShapes = Object.keys(tetrominoShapes).length;


class Tetromino {
 
  /**
   * Constructs a new Tetrominos.
   * @constructor
   * @param {CanvasRenderingContext2D } ctx - context
   * @param {object} shape - shapeType
   * @param {Coordinates} coordinates - coordinates class
   */
  constructor(ctx, shape, coordinates, gridX, gridY){
    this.ctx = ctx;
    this.shape = shape;
    this.coordinates = coordinates;
    this.color = this.getRandomColor();
    this.gridX = gridX
    this.gridY = gridY
  }
    

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    // Return the RGB color string
    return `rgb(${r},${g},${b})`;
  }






  draw(gridX, gridY) {
    const shape = this.shape;
    const ctx = this.ctx;

    let index = 2
    let gridYCounter = gridY
    if(gridY > 2){
      gridYCounter = 2;
    }

    for(let y = 0; gridYCounter >= y; gridYCounter--){
      for(let x = 0; x <= shape[index].length - 1; x++){
        if (shape[index][x] === 1) {
          // Calculate the actual grid position
          const posX = gridX + x;
          const posY = gridY;
  
          // Draw the block
          this.coordinates.drawFillRect(ctx, posX, posY, this.color);
        }
      }
      index--;
      gridY--;
    }
  }

  delete(gridX, gridY) {
    const shape = this.shape;
    const ctx = this.ctx;

   
    let index = 2
    let gridYCounter = gridY
    if(gridY > 2){
      gridYCounter = 2;
    }

    for(let y = 0; gridYCounter >= y; gridYCounter--){
      for(let x = 0; x <= shape[index].length - 1; x++){
        if (shape[index][x] === 1) {
          // Calculate the actual grid position
          const posX = gridX + x;
          const posY = gridY;
  
          // Draw the block
          this.coordinates.clearRect(ctx, posX, posY)
          this.coordinates.drawStrokeRect(ctx, posX, posY, "grey");
        }
      }
      index--;
      gridY--;
    }
  }
}

export default Tetromino