import {
  drawerWidth,
  transition,
  container
} from "../../material-dashboard-react.js";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    backgroundColor:"rgba(250, 250, 250, 1)",
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    [theme.breakpoints.up("md")]: {
      paddingLeft:"40px",
      paddingRight:"40px"
    },
    marginTop: "70px",
    padding: "30px 15px",
    paddingBottom: "20px",
    minHeight: "calc(100vh - 123px)"
  },
  container: {
    ...container,
    marginTop: "30px"
  }
});

export default appStyle;
