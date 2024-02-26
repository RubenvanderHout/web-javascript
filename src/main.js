import { loadPage } from "./utils/loadfiles.js";

await loadPage("home", "page")
const element = document.getElementById("test");
element.addEventListener("click", () => {
    console.log("click")
})




