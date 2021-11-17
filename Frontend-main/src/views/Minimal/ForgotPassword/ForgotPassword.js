import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../assets/img/app-logo-large.png';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color:'white',
  },
  logo: {
    width: "159px",
    height:"100px",
    border: "0",
    marginBottom:'30px'
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
              <React.Fragment>
                <img src={logo} alt="logo" className={classes.logo} />
                <form className={classes.form} noValidate action="/">
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    RESET PASSWORD
                    </Button>
                    
                </form>
              </React.Fragment>
  );
}