import * as d3 from "d3";
import {
  yBounds,
  xBounds,
  graphHeight,
  marginLeft,
  marginRight,
  width,
} from "./config";

type OneDFunction = (x: number) => number;

function visualizeFunction(func: OneDFunction) {
  const data = d3.ticks(xBounds[0], xBounds[1], 2000).map(func);

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );

  d3.select("svg")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", function (_, i) {
      return x(i);
    })
    .attr("cy", function (d) {
      return graphHeight - graphHeight * (d / yBounds[1]);
    })
    .attr("r", 1)
    .style("fill", "var(--b1)");
}

export { visualizeFunction };
