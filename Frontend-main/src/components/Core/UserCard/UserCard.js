import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  small: {
    width: "32px",
    height: "32px",
  }
}));

const StyledCard = withStyles({
    root: {
      background: 'transparent',

    },

  })(Card);



const Usercard= (props)=> {
    const classes = useStyles();
  return (
    <StyledCard elevation={0}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.small}/>
        }
        title={props.name}
      />
    </StyledCard>
  );
}

export default Usercard;