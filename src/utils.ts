export const random = (from: number, to: number) => {
  return Math.floor(Math.random() * to) + from;
};

export const sleep = (time: number) =>
  new Promise((res) => setTimeout(res, time));
