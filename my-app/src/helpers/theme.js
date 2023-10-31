import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";

export const theme = createTheme({
  typography: {},
  palette: {
    primary: {
      main: blue[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const styles = (theme) => ({
  h1Custom: {
    [theme.breakpoints.down("md")]: {
      fontSize: 48, // Apply this style on screens greater than or equal to 'md'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 30, // Apply this style on screens greater than or equal to 'sm'
    },
  },
  h3Custom: {
    [theme.breakpoints.down("md")]: {
      fontSize: 28, // Apply this style on screens greater than or equal to 'md'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 20, // Apply this style on screens greater than or equal to 'sm'
    },
  },
  h5Custom: {
    [theme.breakpoints.down("md")]: {
      fontSize: 20, // Apply this style on screens greater than or equal to 'md'
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 16, // Apply this style on screens greater than or equal to 'sm'
    },
  },
  shuffleBtnMediaQuery: {
    [theme.breakpoints.down("md")]: {
      padding: "5px 10px",
      fontSize: "11px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2px 4px",
    },
  },
  ratingMediaQuery: {
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  tableCells: {
    [theme.breakpoints.down("md")]: {
      padding: "3px 2px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1px 1px",
    },
  },

  root: {
    backgroundColor: "green", // Default background color
    fontSize: 16, // Default font size
    color: "black", // Default text color
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "red",
      color: "blue",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 10, // Apply this style on screens greater than or equal to 'md'
      color: "red",
    },
  },
});

export const classes = styles(theme);
