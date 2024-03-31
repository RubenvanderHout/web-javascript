class Truck {
    /** 
     * @constructor
    
     * @param {number} length
     * @param {number} width
     * @param {number} interval
     * @typedef {('Koud transport'|'Breekbaar transport'|'Algemeen transport'|'Pallets'|'Snelkoerier')} TruckTypes 
     * @param {TruckTypes} truckType
    */
    constructor(length, width, interval, truckType){
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.truckType = truckType;
    }

    getLength(){
        return this.length;
    }
    
    getWidth(){
        return this.width;
    }

    getInterval(){
        return this.interval;
    }

    getTruckType() {
        return this.truckType;
    }
}

export default Truck;

