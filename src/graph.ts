import * as d3 from "d3";
import {
  marginLeft,
  height,
  marginBottom,
  marginRight,
  marginTop,
  width,
  xBounds,
  yBounds,
} from "./config";

function setupGraph(container: HTMLDivElement) {
  const x = d3
    .scaleLinear()
    .domain(xBounds)
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain(yBounds)
    .range([height - marginBottom, marginTop]);

  const svg = d3.create("svg").attr("width", width).attr("height", height);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  container.append(svg.node() as SVGSVGElement);
}

export { setupGraph };
