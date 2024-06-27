export const width = 600;
export const height = 500;

export const marginTop = 20;
export const marginRight = 20;
export const marginBottom = 150;
export const marginLeft = 40;

export const yBounds = [0, 5];
export const xBounds = [0, 16];

export const xLength = xBounds[1] - xBounds[0];
export const yLength = yBounds[1] - yBounds[0];

export const graphHeight = height - marginBottom;
export const graphWidth = width - marginLeft - marginRight;

// export const func = (x: number) => Math.pow(x, 2 - x);
export const func = (x: number) => Math.sin(x) + Math.sin((10.0 / 3.0) * x);

export const gaussianRandom = (mean = 0, stdev = 1) => {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
};
