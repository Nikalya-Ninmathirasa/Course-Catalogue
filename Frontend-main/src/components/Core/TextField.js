import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "7px",
  },
  label: {
    fontFamily: "PT Sans",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#3F4451",
    opacity: 1,
  },
  outline: {
    borderColor: "#3F44511F",
  },
  inputRoot: {
    opacity: 1,
  },
  input: {
    height: "7px",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    fontFamily: "PT Sans",
    "&::placeholder": {
      color: "#181D333E",
      opacity: 1,
    },
  },
}));

const BasicTextField = (props) => {
  const classes = useStyles();
  const { label, InputLabelProps, InputProps, ...rest } = props;

  return (
    <>
      <InputLabel {...InputLabelProps} className={classes.label}>
        {label}
      </InputLabel>
      <TextField
        classes={{ root: classes.root }}
        InputProps={{
          classes: {
            root: classes.inputRoot,
            notchedOutline: classes.outline,
            input: classes.input,
          },
          ...InputProps,
        }}
        variant="outlined"
        {...rest}
      />
    </>
  );
};

export default BasicTextField;
