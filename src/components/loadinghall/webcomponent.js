import LoadingHall from "./loadingHall.js";

class LoadingHallComponent extends HTMLElement {
    
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        
        const id = this.getAttribute("id");

        this.render(this.shadow, id)

        const addBeltButton = this.shadow.getElementById("addBelt");
        addBeltButton.addEventListener("click", () => { this.addBelt(addBeltButton) });

        const toggleSimulationButton = this.shadow.getElementById("toggleSimulation");
        toggleSimulationButton.addEventListener("click", () => { this.toggleSimulation() })

        const componentWidth = Number(this.getAttribute("component-width")) || 900;
        const componentHeight = Number(this.getAttribute("component-height")) || 700;
        const size = { width: componentWidth, height: componentHeight };
        /** @type {HTMLCanvasElement} */
        const canvas = this.shadow.querySelector("#canvas");

        this.loadingHall = new LoadingHall(canvas, size);
        this.loadingHall.start();
    }

    /**
     * Render html
     * @param {ShadowRoot} shadow - Shadowroot
     * @param {String} id - Id of the assignnent hall
     */
    render(shadow, id) {
        shadow.innerHTML = `
        <h2>Loading hall ${id} </h2>
        <button id="addBelt"> Add conveyor belt </button>
        <button id="toggleSimulation"> Toggle simulation </button>
        <canvas id="canvas"></canvas>

        <style>
            .canvas {
                grid-row: 1;
                height: 100%;
                width: 100%;
                aspect-ratio: 1 / 1;
                border: 0.25rem solid #eeeeee;
                border-radius: 0.25rem;
                cursor: crosshair;
                }
            :host {
                display: flex;
                flex-direction: column;
            }
        </style>
        `;
    }


    set width(width) {
        this.setAttribute("component-width", width)
    }

    set height(height) {
        this.setAttribute("component-height", height)
    }

    addBelt(target){
        const maxBelts = this.loadingHall.getMaxBelts();
        let currentBelts  = this.loadingHall.getAmountOfBelts();

        if(currentBelts < maxBelts){
            this.loadingHall.addBelt();
            currentBelts++;
        }
        
        if(currentBelts === maxBelts){
            target.remove();
        }
    }

    setWeatherData(data) {
        this.loadingHall.setWeatherData(data);
    }

    toggleSimulation(){
        if(this.loadingHall.isRunning){
            this.loadingHall.stop();
        } else {
            this.loadingHall.start();
        }
    }

    addTruck(truck){
        this.loadingHall.addTruck(truck);
    }

}
 
customElements.define('hall-component', LoadingHallComponent);