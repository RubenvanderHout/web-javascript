import Truck from "./truckData.js"

const TRUCK_MAX_WIDTH = 8;
const TRUCK_MAX_LENGTH = 8;
const INTERVAL_MAX_TIME_SECONDS = 20; 

/** @typedef {('Koud transport'|'Breekbaar transport'|'Algemeen transport'|'Pallets'|'Snelkoerier')} TruckTypes */
const TruckTypesObject = Object.freeze({
    Koud_transport: 'Koud transport',
    Breekbaar_transport: 'Breekbaar transport',
    Algemeen_transport: 'Algemeen transport',
    Pallets: 'Pallets',
    Snelkoerier: 'Snelkoerier'
});

class Hall {

    /** @type {Truck[]} */
    trucks;
    /** @type {Element} */
    hallElement;

    constructor(hallElement){
        this.trucks = [];
        this.hallElement = hallElement;
    }

    addNewTruck(form) {
        const formData = new FormData(form);

        const length = formData.get("length");
        const width = formData.get("width");
        const interval = formData.get("interval");
        const truckType = formData.get("truckType");


        let truck = this.createTruck(length, width, interval, truckType);
        this.trucks.push(truck);
    }


    /** 
     * @throws Types not correct
     * @throws Truck width too wide
     * @throws Truck length too tall
     * @throws Interval too long
    **/
    createTruck(length, width, interval, truckType){
        if( !(Object.values(TruckTypesObject).includes(truckType))){
            throw new Error("Not a valid truck type")
        }

        if(width > TRUCK_MAX_WIDTH){
            throw new Error("Truck width too wide")
        }

        if(length > TRUCK_MAX_LENGTH){
            throw new Error("Truck length too tall")
        }

        if(interval > INTERVAL_MAX_TIME_SECONDS){
            throw new Error("Interval too long")
        }

        const truck = new Truck(length, width, interval, truckType);
        return truck;
    }
}


export default Hall;