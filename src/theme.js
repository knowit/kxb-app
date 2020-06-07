const breakpoints = ["288px", "608px", "1024px", "1504px"];

// breakpoints.xs = breakpoints[0];
// breakpoints.s = breakpoints[1];
// breakpoints.m = breakpoints[2];
// breakpoints.l = breakpoints[3];

const colors = {
  bg100: "#757575",
  bg200: "#5e5e5e",
  bg300: "#464646",
  bg400: "#2f2f2f",
  bg500: "#191919",
  text100: "#990c58",
  text200: "#b20e66",
  text300: "#cc1075",
  text400: "#e51284",
  text500: "#ff1493",

  main: "#ff1493",
  link: "#ff1493",
  text: "#ff1493",
  borders: {
    default: "rgba(255, 255, 255, 0.8)"
  }
};

export const theme = {
  breakpoints,
  colors,
  space: [
    0,
    "0.8rem",
    "1.6rem",
    "2.4rem",
    "3.2rem",
    "4rem",
    "4.8rem",
    "5.6rem",
    "6.4rem",
    "7.2rem",
    "8rem",
    "9.6rem",
    "12rem",
    "14rem",
    "18rem",
    "20rem",
    "30rem"
  ],
  fontSizes: [
    "1.2rem",
    "1.4rem",
    "1.6rem",
    "1.8rem",
    "2rem",
    "2.4rem",
    "3.2rem",
    "4.8rem",
    "5.6rem",
    "6.4rem",
    "7.2rem",
    "9.6rem",
    "12rem"
  ],
  fontWeights: [200, 400, 700],
  lineHeights: [
    "2rem",
    "2.4rem",
    "2.8rem",
    "3.2rem",
    "4rem",
    "6rem",
    "7.2rem",
    "8rem",
    "10rem",
    "12rem"
  ],
  fonts: {
    default: "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif"
  },
  borders: [0, `1px solid ${colors.main}`],
  radii: ["0.4rem", "0.8rem", "1.6rem", "3.2rem", "50%"]
};

export default {
  breakpoints
};
