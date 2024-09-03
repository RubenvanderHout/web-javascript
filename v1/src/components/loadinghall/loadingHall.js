import Truck from "./modules/truck.js";
import Belt from "./modules/belt.js"
import TruckData from "../../modules/truckData.js"
import Coordinates from "./modules/coordinates.js"

class LoadingHall {

    isRunning = false;
    maxBelts = 3;
    maxTrucks = 3;

    /** @type { Belt[] } */
    belts = [];
    trucks = []

    weatherData = null;

    /**
     * Creates a new Loadinghall with everything included
     * @constructor
     * @param { HTMLElement } canvasContainerElement - Container element where will be written to.
     * @param {{ width: number, height: number}} size - Size of the screen that is being used
     */
    constructor(canvasContainerElement, size) {
        
        this.beltContainer = canvasContainerElement.querySelector("#beltContainer");
        this.truckContainer = canvasContainerElement.querySelector("#truckContainer");

        const beltWidthPart = Math.floor(size.width / this.maxBelts)
        const truckWidthPart = Math.floor(size.width / this.maxTrucks)
 
        this.tileSize = 30;

        this.beltWidth = Math.floor(beltWidthPart * 2);
        this.beltHeight = Math.floor(size.height / this.maxBelts); 

 
        this.truckWidth = Math.floor(truckWidthPart);
        this.truckHeight = Math.floor(size.height / this.maxTrucks);


        this.addBelt();
        this.addTruck(null)
        this.addTruck(null)
    }

    /**
     * Adds a new belt to the canvas
     * @throws Error maxamount reached
    */
    addBelt(){
        const max = this.maxBelts;
        let current = this.belts.length;

        if(current > max){
            throw new Error("Max amount of belts reached")
        } 

        const canvas = document.createElement("canvas");
        canvas.width = this.beltWidth;
        canvas.height = this.beltHeight;

        this.beltContainer.appendChild(canvas);

        const coordinates = new Coordinates(this.beltWidth, this.beltHeight, this.tileSize);
        const belt = new Belt(canvas, coordinates);
        this.belts.push(belt);
    }

    
    /**
     * Adds a new truck to the canvas
     * @param {TruckData} truckData 
     * @throws Error maxamount reached
     */
    addTruck(truckData){
        const max = this.maxTrucks;
        let current = this.trucks.length;

        if(current > max){
            throw new Error("Max amount of trucks reached")
        }

        const canvas = document.createElement("canvas");
        canvas.width = this.truckWidth;
        canvas.height = this.truckHeight;
        
        this.truckContainer.appendChild(canvas)

        const coordinates = new Coordinates(this.truckWidth, this.truckHeight, this.tileSize);
        const truck = new Truck(canvas, coordinates, truckData);
        this.trucks.push(truck);
    }

    getAmountOfBelts(){
        return this.belts.length;
    }

    getMaxBelts(){
        return this.maxBelts;
    }

    start(){
        console.log("Starting simulation")
        this.isRunning = true;
        
        console.log(this.belts.length)

        this.belts.forEach((belt) => {
            belt.start();
        } )
    }

    stop() {
        console.log("Stopping simulation")
        this.isRunning = false
        this.belts.forEach((belt) => {
            belt.stop();
        } )
    }

    generateBlock(){
        console.log("generate not needed anymore")
        
        // this.belts.forEach((belt) => {
        //     belt.generateTetromino(17, 7)
        // } )
    }


    setWeatherData(data){
        this.weatherData = data;
        console.log(this.weatherData)
    }
}

export default LoadingHall;
