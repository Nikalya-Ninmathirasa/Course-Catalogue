import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, makeStyles, Typography } from "@material-ui/core";

import TextField from "../Core/TextField";
import Button from "../Core/Button";
import { useHistory } from "react-router";
import PasswordField from "../Core/PasswordField";

const useStyles = makeStyles((theme) => ({
  forgotText: {
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0px",
    color: "#4E5983",
    opacity: "0.48",
    marginTop: "10px",
  },
  icon: {
    width: "145px",
    height: "48px",
    marginBottom: "30px",
  },
}));

const SigninForm = ({ getValue, errorMsg }) => {
  console.log(errorMsg);
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      flexDirection="column"
      justifyContent="center"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be of minimum 6 characters")
            .max(255)
            .required("Password is required"),
        })}
        onSubmit={(data) => getValue(data)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="E-mail"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              variant="outlined"
              placeholder="Enter your e-mail"
            />
            <PasswordField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              variant="outlined"
              placeholder="Enter your password"
            />
            <Box>
              {errorMsg && (
                <div>
                  <p style={{ color: "red" }}>{errorMsg}</p>
                </div>
              )}
            </Box>
            <Box my={2}>
              <Button disabled={isSubmitting} type="submit" variant="contained">
                Sign in
              </Button>
            </Box>
            <Typography className={classes.forgotText}>
              Don't have an account?
            </Typography>
            <Box my={2}>
              <Button disabled={isSubmitting} onClick={() => history.push("/auth/signup")} variant="contained">
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default SigninForm;
