import LoadingHall from "./loadingHall.js";

class LoadingHallComponent extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const id = this.getAttribute("id");

        this.render(this.shadowRoot, id)

        const addBeltButton = this.shadowRoot.getElementById("addBelt");
        addBeltButton.addEventListener("click", () => { this.addBelt(addBeltButton) });

        const toggleSimulationButton = this.shadowRoot.getElementById("toggleSimulation");
        toggleSimulationButton.addEventListener("click", () => { this.toggleSimulation() })

        const generateBlockButton = this.shadowRoot.getElementById("generateBlock");
        generateBlockButton.addEventListener("click", () => { this.generateBlock() })

        let canvasContainerWidth = Number(this.getAttribute("component-width")) || 900;
        let canvasContainerHeight = Number(this.getAttribute("component-height")) || 900;
        
        const size = { width: canvasContainerWidth, height: canvasContainerHeight };
        /** @type {HTMLCanvasElement} */
        const canvasContainer = this.shadowRoot.querySelector("#canvasContainer");


        this.loadingHall = new LoadingHall(canvasContainer, size);
    }

    /**
     * Render html
     * @param {ShadowRoot} shadow - Shadowroot
     * @param {String} id - Id of the assignnent hall
     */
    render(shadow, id) {
        shadow.innerHTML = `
        <h2> ${id} </h2>
        <button id="addBelt"> Add conveyor belt </button>
        <button id="toggleSimulation"> Toggle simulation </button>
        <button id="generateBlock"> Generate Block </button>

        <div class="canvasContainer" id="canvasContainer">
            <div id="beltContainer">
            </div>

            <div class="canvas-small" id="truckContainer">
            </div>
        </div>
        
        <style>

            .canvasContainer {
                display: flex;
                width: 900px;
            }

            canvas {
                grid-row: 1;
                aspect-ratio: 1 / 1;
                border: 0.25rem solid #eeeeee;
                border-radius: 0.25rem;
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

    generateBlock(){
        this.loadingHall.generateBlock()
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