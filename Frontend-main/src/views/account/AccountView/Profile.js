import React , {useState} from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, } from '@material-ui/core';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: '/src/assets/img/SE.jfif',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));





const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
  
    image : "",
  
  });
  const handleImageChange = (e) => {
    setValues({...values, image: e.target.files[0]})
}

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      <Grid>
        <input
          name="image"  
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          id="icon-button-file"
          style={{ display: 'none', }}
          />
        <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          component="span"
          className={classes.button}
          size="large"
          color="white"
          >
           Upload Image
        </Button>
        </label>
       </Grid>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
