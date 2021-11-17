import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../../assets/img/app-logo-large.png";
import SignInForm from "../../../components/Forms/SignInForm";
import { loginUser } from "../../../services/authService";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
  },
  logo: {
    width: "159px",
    height: "100px",
    border: "0",
    marginBottom: "30px",
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [errors, setError] = React.useState("");

  const login = async (data) => {
    setError("");
    try {
      await loginUser(data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.message) {
          setError( err.response.data.message);
        } else {
          setError(
            "An error occurred during authentication! please try again later."
          );
        }
      } else if (err.message) {
        setError(err.message);
      }
    }
  };

  return (
    <React.Fragment>
      <img src={logo} alt="logo" className={classes.logo} />
      <SignInForm errorMsg={errors} getValue={(val) => login(val)} />
    </React.Fragment>
  );
}
