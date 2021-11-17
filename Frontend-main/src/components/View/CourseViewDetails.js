import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Divider,
    Grid,
    TextField,
    makeStyles
    } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CourseViewDetails = () => {
  const classes = useStyles();

  return (
    <form>
    <Card>
      <Divider />
      <CardActions>
      <Grid>
        <input
          name="image"  
          color="primary"
          accept="image/*"
          type="file"
          id="icon-button-file"
          style={{ display: 'none', }}
          />
        <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          component="span"
          className={classes.button}
          size="large"
          color="primary"
          >
           Upload Image
        </Button>
        </label>
       </Grid>
      </CardActions>
    </Card>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CourseViewDetails;
