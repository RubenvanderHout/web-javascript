import TruckData from "../../../modules/truckData.js"
import Coordinates from "./coordinates.js";

class Truck {
    
      /**
     * Constructs a new Truck
     * @constructor
     * @param {HTMLCanvasElement } canvas - canvas element
     * @param {Coordinates} coordinates - shapeType
     * @param {TruckData} data
     */
      constructor(canvas, coordinates, data) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.coordinates = coordinates;
        
        for (let gridY = 0; gridY < this.coordinates.gridCollumns; gridY++) {
          for (let gridX = 0; gridX < this.coordinates.gridRows; gridX++) {
            if(gridY === 0 || gridY === this.coordinates.gridCollumns - 1 || gridX === 0 || gridX === this.coordinates.gridCollumns - 1) {
              this.coordinates.drawFillRect(this.ctx, gridX, gridY, "black")
            } else{
              this.coordinates.drawStrokeRect(this.ctx, gridX, gridY, "grey")
            }
          }
        }

        for (let gridY = 0; gridY < this.coordinates.gridCollumns; gridY++) {
          for (let gridX = 0; gridX < this.coordinates.gridRows; gridX++) {
              this.coordinates.drawStrokeRect(this.ctx, gridX, gridY, "grey")
          }
        }

      }

}

export default Truck