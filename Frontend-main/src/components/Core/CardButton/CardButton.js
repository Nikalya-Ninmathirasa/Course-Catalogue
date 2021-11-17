import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  container: {
    height: "102px",
    width:'100%',
    borderRadius: "4px",
    color: "rgba(24, 29, 51, 1)",
    fontFamily: 'PT Sans',
    fontSize: "16px",
    backgroundColor:'rgba(255,255,255,1)',
    boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.02)"
  }
});

  export default function CardButton(props) {
    const classes = useStyles();
    return (
        <Button className={classes.container}>{props.children}</Button>
    );
}