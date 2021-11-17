import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import MyButton from "../../../components/Core/Button";

const roles = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "institute",
    label: "Institute",
  },
  {
    value: "career_counsellor",
    label: "Career Counsellor",
  },
];

const useStyles = makeStyles(() => ({
  root: {},
}));

const Signup = ({ ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
    state: "",
    country: "",
  });

  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/signup`, {
        user_firstname: values.firstName,
        user_lastname: values.lastName,
        email: values.email,
        phoneno: values.phone,
        country: values.country,
        state: values.state,
        role: values.role,
        password: values.password,
        status: values.role === "student" ? "active" : "pending",
      });
      console.log("Sign up", res);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      if (err.response) {
        if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg);
        } else if (err.response.data.msg) {
          setError(err.response.data.msg);
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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (isSuccess) {
    return (
      <>
        <Typography>Account created successfully!</Typography>
        <Box my={2}>
          <MyButton
            disabled={loading}
            onClick={() => history.push("/auth/login")}
            variant="contained"
          >
            Back to Sign in
          </MyButton>
        </Box>
      </>
    );
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="Create a new account" title="Signup" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={handleChange}
                required
                value={values.state}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Role"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.role}
                variant="outlined"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </Box>
      </Card>
      <Box my={1}>
        {errors && (
          <div>
            <p style={{ color: "red" }}>{errors}</p>
          </div>
        )}
      </Box>
      <Typography>Already have an account?</Typography>
      <Box my={2}>
        <MyButton
          disabled={loading}
          onClick={() => history.push("/auth/login")}
          variant="contained"
        >
          Back to Sign in
        </MyButton>
      </Box>
    </form>
  );
};

export default Signup;
