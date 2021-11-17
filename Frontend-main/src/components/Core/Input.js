import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = () => ({
  shrink: {
    transform: 'translate(0px, 0px) scale(1) !important',
    fontSize: '16px',
    color: '#4E5983',
  },
  inputRoot: {
    height: 'auto',
    marginTop: '23px',
    '& > fieldset': {
      border: '0.75px solid #3F44511F',
      top: '-2px',
      bottom: '-2px',
      '& > legend': {
        display: 'none',
      },
    },
    '&:hover': {
      '& > fieldset': {
        border: '2px solid #4cc4b3 !important',
      },
    },
  },
  input: {
    padding: '14.5px 14px !important',
  },
  helperRoot: {
    margin: '3px 0 0 0',
    fontSize: '14px',
    paddingBottom: '8px'
  },
  textfeild: {
    width: props => props.fullWidth ? '100%' : 'auto',
    minHeight: '90px',
  }
});


const InputField = (props) => {
  const [value, setValue] = useState(props.value);
  const handleChange = (event) => {
    const { getValue } = props;
    if (getValue) {
      getValue(event.target.value);
    }
    setValue(event.target.value);
  };

  

  const {
    classes,
    error,
    errorMessage,
    type,
    id,
    name,
    ...rest
  } = props;

  return (
    <div className={classes.textfeild}>
      <TextField
        id={id}
        name={name}
        error={error}
        type={type === 'number' ? 'text' : type}
        value={value}
        helperText={error && errorMessage}
        InputLabelProps={{
          shrink: true,
          classes: {
            shrink: classes.shrink,
          },
        }}
        
        FormHelperTextProps={{
          classes: {
            root: classes.helperRoot,
          },
        }}
        onChange={(event) => handleChange(event)}
        variant={'outlined'}
        {...rest}
      />
    </div>
  );
};

InputField.defaultProps = {
  error: false,
  errorMessage: 'The field is required',
  value: '',
  name: 'name',
  id: 'id',
  type: 'text',
};

InputField.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

export default withStyles(styles)(InputField);
