import LoadingHall from "./loadingHall";

/**
 * LoadingHall 
 * @element hall-component
 * @attr {String} [color=#ff0000] - The color of the element.
 * @attr {Number} [size=12] - The size of the element.

 */
class LoadingHallComponent extends HTMLElement {
    
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render(this.shadow)

        const resolution = Number(this.getAttribute("resolution")) || 100;
        const size = { width: resolution, height: resolution };
        const canvas = this.shadow.querySelector("#canvas");

        this.loadingHall = new LoadingHall(canvas, size);
        this.loadingHall.start();
    }

    /**
     * Render html
     * @param {ShadowRoot} shadow - Shadowroot
     */
    render(shadow) {
        shadow.innerHTML = `
        <canvas id="canvas"></canvas>

        <style>
            .canvas {
                grid-row: 1;
                width: 100%;
                aspect-ratio: 1 / 1;
                border: 0.25rem solid #eeeeee;
                border-radius: 0.25rem;
                cursor: crosshair;
                }
        </style>
        `;
    }

    start() {
        // Start the loading process
        this.loadingHall.start();
    }

    stop() {
        // Stop the loading process
        this.loadingHall.stop();
    }

    addBelt(){
        this.loadingHall.addBelt();
    }

    set setWeatherData(data) {
        this.loadingHall.setWeatherData(data);
    }

}
 
customElements.define('hall-component', LoadingHallComponent);