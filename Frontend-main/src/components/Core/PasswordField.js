import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "./TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  iconRoot: {
    height: 40,
  },
}));

const PasswordField = (props) => {
  const classes = useStyles();
  const [isShow, setShow] = useState(false);
  const icon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShow(!isShow)}
          edge="end"
          classes={{ root: classes.iconRoot }}
        >
          {isShow ? (
            <Visibility style={{ width: "20px" }} />
          ) : (
            <VisibilityOff style={{ width: "20px" }} />
          )}
        </IconButton>
      </InputAdornment>
    );
  };
  return (
    <TextField
      InputProps={{
        endAdornment: icon(),
      }}
      type={isShow ? "text" : "password"}
      {...props}
    />
  );
};

export default PasswordField;
