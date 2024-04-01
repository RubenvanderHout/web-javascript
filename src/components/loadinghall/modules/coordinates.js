class Coordinates {

    constructor(canvasWidth, canvasHeight, tileSize){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tileSize = tileSize;
        this.gridCollumns = Math.floor(canvasHeight / tileSize);
        this.gridRows = Math.floor(canvasWidth / tileSize);
    }

    /**
     * Converts grid positions into actual pixels to write to the board.
     * @param {number} gridX - xLocation based on grid
     * @param {number} gridY - YLocation based on grid
    */
    gridToPixel(gridX, gridY){
        const pixelX = gridX * this.tileSize;
        const pixelY = gridY * this.tileSize;
        return { x: pixelX, y: pixelY };
    }

     /**
     * Converts grid positions into actual pixels to write to the board.
     * @param {CanvasRenderingContext2D } ctx - context
     * @param {number} gridX - xLocation based on grid
     * @param {number} gridY - YLocation based on grid
     * @param {string} color - shapeType
    */
    drawFillRect(ctx, gridX, gridY, color){
        const { x: pixelX, y: pixelY} = this.gridToPixel(gridX, gridY);
        ctx.fillStyle = color;
        ctx.fillRect(pixelX, pixelY, this.tileSize, this.tileSize);
    }


    /**
     * Converts grid positions into actual pixels to write to the board.
     * @param {CanvasRenderingContext2D } ctx - context
     * @param {number} gridX - xLocation based on grid
     * @param {number} gridY - YLocation based on grid
     * @param {string} color - shapeType
    */
    drawStrokeRect(ctx, gridX, gridY, color){
        const { x: pixelX, y: pixelY} = this.gridToPixel(gridX, gridY);
        ctx.strokeStyle = color;
        ctx.strokeRect(pixelX, pixelY, this.tileSize, this.tileSize);
    }

     /**
     * Converts grid positions into actual pixels to write to the board.
     * @param {CanvasRenderingContext2D } ctx - context
     * @param {number} gridX - xLocation based on grid
     * @param {number} gridY - YLocation based on grid
    */
    clearRect(ctx, gridX, gridY ){
        const { x: pixelX, y: pixelY} = this.gridToPixel(gridX, gridY);
        ctx.clearRect(pixelX, pixelY, this.tileSize, this.tileSize);
    }

}
export default Coordinates