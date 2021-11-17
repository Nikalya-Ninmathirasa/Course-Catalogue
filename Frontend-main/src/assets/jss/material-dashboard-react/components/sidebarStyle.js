import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
} from "../../material-dashboard-react.js";

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    }
  },
  logo: {
    position: "relative",
    padding: "4px 15px",
    zIndex: "4"
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  logoImage: {
    width: "100%",
    display: "flex",
    maxHeight: "100px",
    justifyContent: "center"
    
  },
  img: {
    width: "109px",
    height:"100px",
    border: "0"
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "black"
    }
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 0 0 0",
    borderRadius: "4px 0px 0px 4px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    paddingLeft:"45px",
    backgroundColor: "transparent",
    ...defaultFont
  },
  itemIcon: {
    width: "16px",
    height: "16px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginTop:"6px",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    fill:"none",
    stroke:"rgba(134, 141, 170, 1)",
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "16px",
    color: "rgba(134, 141, 170, 1)"
  },
  whiteFont: {
    color: "rgba(77, 182, 172, 1)",
    fill:"none",
    stroke:"rgba(77, 182, 172, 1)"
  },
  comduit: {
    borderRight:"5px solid rgba(77, 182, 172, 1)",
    "&:hover,&:focus": {
      borderRight:"5px solid rgba(77, 182, 172, 1)",
    }
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch"
  },
  logOut: {
    "&:before": {
      content: '""',
      position: "absolute",
      top: "0",
      height: "1px",
      right: "40px",
      width: "calc(100% - 80px)",
      backgroundColor: "rgba(134, 141, 170, 0.2)",
    },
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "100%",
      bottom: "13px",
      
    }
  },
  logoutItem:{
    display:"flex",
    justifyContent:"center",
    padding:"10px 15px"
  },
  logoutText:{
    flex:"none",
    marginRight:"20px"

  }
});

export default sidebarStyle;
