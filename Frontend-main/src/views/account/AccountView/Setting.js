import React, { useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { get } from "lodash";
import { updateUser, updatePassword } from "../../../services/authService";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Setting = ({ user, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: get(user, "user_firstname", ""),
    lastName: get(user, "user_lastname", ""),
    email: get(user, "email", ""),
    phone: get(user, "phoneno", ""),
    state: get(user, "state", ""),
    country: get(user, "country", ""),
  });

  const [passwords, setPasswordds] = useState({
    password: "",
    new_password: "",
  });

  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updateUser(
        {
          user_firstname: values.firstName,
          user_lastname: values.lastName,
          email: values.email,
          phoneno: values.phone,
          country: values.country,
          state: values.state,
        },
        user._id
      );
      toast("Settings updated successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("Settings update Failed!");
      console.log(err.response);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await updatePassword(
        {
          password: passwords.password,
          new_password: passwords.new_password,
        },
        user._id
      );
      toast("Password updated successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("Password update Failed!");
      console.log(err.response);
      if (err.response.data) {
        setError(err.response.data.message);
      }
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangePassword = (event) => {
    setPasswordds({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card
        className={clsx(classes.root, className)}
        {...rest}
        style={{ marginBottom: "10px" }}
      >
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} />
            <Typography color="textPrimary" gutterBottom variant="h4">
              {`${user.user_firstname}`}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${user.state} ${user.country}`}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            ></Typography>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
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
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
          >
            Update details
          </Button>
        </Box>
      </Card>
      <Card style={{ marginTop: "10px" }}>
        <CardHeader
          subheader="You can change your password here"
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="password"
                type="password"
                onChange={handleChangePassword}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="new_password"
                type="password"
                onChange={handleChangePassword}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box my={1}>
            {errors && (
              <div>
                <p style={{ color: "red" }}>{errors}</p>
              </div>
            )}
          </Box>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            type="submit"
            onClick={handleSubmitPassword}
          >
            Change Password
          </Button>
        </Box>
      </Card>
      <ToastContainer />
    </form>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Setting);
