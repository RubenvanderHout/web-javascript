import { MixingMachineComponent } from "./MixingMachine.js";
import { generateRandomId } from "../utils/utils.js";

export function MixingMachineList() {
    const mixingspeedId = "mixingspeed-" + generateRandomId();
    const mixingtimeId = "mixingtime-" + generateRandomId();

    const html = `
        <form class="mixing-machine-form">
            <input type="number" min="1" max="11" id="${mixingspeedId}" placeholder="mixing speed">
            <input type="number" min="1000" max="5000" id="${mixingtimeId}" placeholder="mixing time in ms">
            <input type="submit" value="Add mixing machine">
        </form>

        <div class="mixingmachine-list">

        </div>
    `;

  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

  const MAX_MIXINGMACHINES = 3;

  const form = fragment.querySelector("form");
  const mixingMachineList = fragment.querySelector(".mixingmachine-list");

  form.addEventListener("submit", () => {
    event.preventDefault();
    const currentLength = mixingMachineList.children.length;
    if (MAX_MIXINGMACHINES === currentLength) {
      return;
    }
    let machine = MixingMachineComponent();
    let machineElement = machine.querySelector(".mixing-machine");
    // @ts-ignore
    const mixingspeed = document.getElementById(mixingspeedId).value;
    // @ts-ignore
    const mixingtime = document.getElementById(mixingtimeId).value;
    machineElement.setAttribute("mixingspeed",mixingspeed);
    machineElement.setAttribute("mixingtime",mixingtime);
    machineElement.innerHTML = `<span>Mixing Speed: ${mixingspeed} Mixing Time: ${mixingtime} ms</span>`;
    mixingMachineList.append(machine);
  });

  return fragment;
}
