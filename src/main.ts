import { func } from "./config";
import { visualizeFunction } from "./function";
import { setupGraph } from "./graph";
import { startAlgorithm } from "./mods";
import "./style.css";

let populationSize = 20;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <span><i>f(x) = sin(x) + sin(10 / 3 * x)</i></span>
  <div class='controls'>
  <label for='population-size'>Population size</label>
    <input id='population-size' type='number' value='20' class="input input-bordered"/>
    <button class="btn btn-primary">Start</button>
  </div>
  <div id="container">
  </div>
`;

const container = document.querySelector("#container") as HTMLDivElement;

setupGraph(container);

visualizeFunction(func);

const input = document.querySelector("#population-size") as HTMLInputElement;

input.addEventListener("change", (e) => {
  populationSize = parseInt((e.target as HTMLInputElement)?.value);
  console.log("Population size changed:", populationSize);
});

const button = document.querySelector("button") as HTMLInputElement;

button.addEventListener("click", () => {
  startAlgorithm(populationSize);
});
