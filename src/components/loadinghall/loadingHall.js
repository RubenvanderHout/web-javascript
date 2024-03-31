import Truck from "./models/truck.js";
import Belt from "./models/belt.js"

class LoadingHall {

    isRunning = false;
    
    maxBelts = 3;
    belts = [];

    maxTrucks = 3;
    trucks = []

    weatherData = null;

    /**
     * Creates a new Loadinghall with everything included
     * @constructor
     * @param { HTMLCanvasElement } canvas - Canvas element where will be written to.
     * @param {{ width: number, height: number}} size - Size of the screen that is being used
     */
    constructor(canvas, size) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.canvas.width = size.width;
        this.canvas.height = size.height;

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
    }

    stop() {
        console.log("Stopping simulation")
        this.isRunning = false;
    }


    setWeatherData(data){
        this.weatherData = data;
        console.log(this.weatherData)
    }
	

     /**
     * Adds a new belt to the canvas
     * @throws Error maxamount reached
     */
    addBelt(){
        const max = this.maxBelts;
        let current = this.belts.length;

        if(current < max){
            this.belts.push(new Belt());
            current++;
        } else {
            throw new Error("Max amount of belts reached")
        }
    }

    
    /**
     * Adds a new belt to the canvas
     * @param {Truck} truck 
     * @throws Error maxamount reached
     */
    addTruck(truck){
        const max = this.maxTrucks;
        let current = this.trucks.length;

        if(current < max){
            this.trucks.push(truck);
            current++;
        } else{
            throw new Error("Max amount of trucks reached")
        }
    }

}

export default LoadingHall;
