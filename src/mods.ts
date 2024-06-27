import * as d3 from "d3";
import {
  func,
  gaussianRandom,
  graphHeight,
  graphWidth,
  marginLeft,
  xBounds,
  xLength,
  yBounds,
} from "./config";
import { random, sleep } from "./utils";

const populationToColor = {
  Pt: "#eeaf3a",
  Pz: "#ef9fbc",
  Ps: "#65c3c8",
};

async function startAlgorithm(populationSize: number) {
  let Pt = generatePopulation(populationSize);
  visualizePopulation(Pt, "Pt");
  await sleep(400);

  for (let i = 0; i < 10; i++) {
    let Pz = getDistributedPopulation(Pt);
    visualizePopulation(Pz, "Pz");

    Pz = backToBounds(Pz);
    visualizePopulation(Pz, "Pz");

    await sleep(400);

    const Ps = getMeanPopulation(Pt);
    visualizePopulation(Ps, "Ps");

    await sleep(400);

    Pt = selection(Pt, Pz, Ps);
    visualizePopulation(Pt, "Pt");

    await sleep(400);

    d3.selectAll(`circle[data-type='Ps']`).remove();
    // d3.selectAll(`circle[data-type='Pt']`).remove();
    d3.selectAll(`circle[data-type='Pz']`).remove();
  }

  visualizePopulation(Pt, "Pt");
}

function generatePopulation(populationSize: number) {
  const population = d3.ticks(xBounds[0], xBounds[1], populationSize);

  return population;
}

function getDistributedPopulation(pt: number[]) {
  const pz: number[] = [];

  pt.forEach((val) => {
    pz.push(val + gaussianRandom());
  });

  return pz;
}

function getMeanPopulation(pt: number[]) {
  const ps = [];

  for (let i = 0; i < pt.length; i++) {
    const i: number = random(0, pt.length);
    let j: number = random(0, pt.length);
    while (i == j) j = random(0, pt.length);

    ps.push((pt[i] + pt[j]) / 2);
  }

  return ps;
}

function selection(Pt: number[], Pz: number[], Ps: number[]) {
  return [...Pt, ...Pz, ...Ps]
    .sort((a, b) => func(a) - func(b))
    .slice(0, Pt.length);
}

function visualizePopulation(
  population: number[],
  type: keyof typeof populationToColor
) {
  const color = populationToColor[type];

  d3.select("svg")
    .selectAll(`circle[data-type=${type}]`)
    .data(population)
    .join("circle")
    .attr("data-type", type)
    .attr("cx", (x) => {
      return (x * graphWidth) / xLength + marginLeft;
    })
    .attr("cy", (x) => {
      return graphHeight - graphHeight * (func(x) / yBounds[1]);
    })
    .attr("r", 3)
    .style("fill", color);
}

function backToBounds(population: number[]) {
  return population.map((p) => {
    if (p < xBounds[0]) {
      return p + xBounds[1] - xBounds[0];
    } else if (p > xBounds[1]) {
      return p + xBounds[0] - xBounds[1];
    }
    return p;
  });
}

export { startAlgorithm };
