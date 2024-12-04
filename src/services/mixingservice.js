import { computed } from "../utils/utils.js";
import { getWeatherMixingModifiers, currentWeatherInfo } from "./weatherservice.js";


const currentMixingRules = computed(() => getWeatherMixingModifiers(currentWeatherInfo));
let processIsRunning = false;

export function getMixingTimeModifier() {
    return currentMixingRules?.value?.mixingspeedmodifier;
}

export function mixingTaskRunner(mixingTask, delay = 0){
    const isLimitedByOneMachine = currentMixingRules?.value?.maxmachines === 1;

    if (isLimitedByOneMachine) {
        if (processIsRunning) {
            console.log("mixingmachine is already running")
        }
        processIsRunning = true;
        setTimeout(() => {
            mixingTask();
            processIsRunning = false;
        }, delay);
    } else {
        setTimeout(() => {
            mixingTask();
        }, delay);
    }
}
