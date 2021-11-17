import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import routes from "../public.js";

let route = null;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        route = prop;
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect exact from="/auth" to="/auth/login" />
  </Switch>
);

const StyledPaper = withStyles((theme) => ({
  elevation0: {
    [theme.breakpoints.up("md")]: {
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.04)",
      border: "0.25px solid rgba(237, 237, 237, 1)",
    },
    width: "100%",
  },
}))(Paper);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    display: "none",
    backgroundColor: "rgba(253, 253, 253, 1)",
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  img: {
    paddingBottom: "25px",
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={false} md={6} className={classes.image}>
        <div className={classes.container}>
          <Box align="center" px={10}>
            <img alt="Sign in" src={route.image} className={classes.img} />
            <Typography variant="h5">{route.title}</Typography>
            <Typography variant="subtitle1">{route.text}</Typography>
          </Box>
        </div>
      </Grid>
      <Grid item sm={12} md={6} component={StyledPaper} elevation={0} square>
        <div className={classes.container}>
          <div className={classes.paper}>{switchRoutes}</div>
        </div>
      </Grid>
    </Grid>
  );
}
