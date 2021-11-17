import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "44px",
  },
  containedText: {
    color: "#FFF",
  },
  outlined: {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    "&:hover": {
      borderWidth: "2px",
    }
  },
}));

const PrimaryButton = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      color="primary"
      disableElevation
      fullWidth
      classes={{
        root: classes.root,
        containedPrimary: classes.containedText,
        outlinedPrimary: classes.outlined,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
