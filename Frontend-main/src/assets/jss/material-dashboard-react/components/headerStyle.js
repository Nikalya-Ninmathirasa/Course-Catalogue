import {
  container,
  drawerWidth
} from "../../material-dashboard-react.js";

const headerStyle = theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor:"rgba(250,250,250,1)"
    },
    backgroundColor:"rgba(250,250,250,1)",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    width: "100%",
    paddingTop: "40px",
    zIndex: "1029",
    border: "0",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "50px",
    [theme.breakpoints.up("md")]: {
      paddingLeft:"35px",
    }
  },
  flex: {
    flex: 1
  },
  title: {
    fontFamily: "PT Sans",
    fontWeight: "700",
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "24px",
    borderRadius: "3px",
    textTransform: "none",
    color: "rgba(24, 29, 51, 1)",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
});

export default headerStyle;
