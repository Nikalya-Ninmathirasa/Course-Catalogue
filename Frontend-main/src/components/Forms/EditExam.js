import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ExamEdit = ({ examData, setOpenPopup }) => {
  console.log(examData);

  const classes = useStyles();

  const [values, setValues] = useState({
    exam_name: examData.exam_name,
    location: examData.location,
    time: examData.time,
    date: examData.date,
    category: examData.category,
    fee: examData.fee,
    email: examData.email,
    comments: examData.comments,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/exam/" + examData._id, {
        ...examData,
        ...values,
      });
      toast("Exam updated");
      window.location.reload();
      setOpenPopup(false);
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <Typography className={classes.title} variant="h4" component="h4">
          Enter Exam Information
        </Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"exam_name"}
          name={"exam_name"}
          type={"text"}
          label={"Exam Name"}
          placeholder={"Enter the name of the exam"}
          fullWidth
          variant="outlined"
          onChange={handleChange}
          value={values.exam_name}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"location"}
          name={"location"}
          type={"text"}
          onChange={handleChange}
          label={"Location"}
          placeholder={"Enter location of exam"}
          variant="outlined"
          value={values.location}
        />
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id="date"
          label="Exam date"
          type="date"
          defaultValue="2017-05-24"
          onChange={handleChange}
          value={values.date}
          variant="outlined"
          className={classes.textField}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id="time"
          label="Alarm clock"
          type="time"
          defaultValue="07:30"
          onChange={handleChange}
          value={values.time}
          className={classes.textField}
          variant="outlined"
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={values.category}
            onChange={handleChange}
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Accounting">Accounting</MenuItem>
            <MenuItem value="Law">Law</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"fee"}
          name={"fee"}
          type={"text"}
          label={"Fee"}
          placeholder={"Exam fees"}
          onChange={handleChange}
          variant="outlined"
          value={values.fee}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"email"}
          name={"email"}
          type={"email"}
          label={"Email address"}
          placeholder={"Enter email address for queries"}
          onChange={handleChange}
          variant="outlined"
          value={values.email}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"comments"}
          name={"comments"}
          type={"text"}
          label={"Important Comments"}
          placeholder={"Enter important details"}
          onChange={handleChange}
          multiline
          rows={10}
          variant="outlined"
          value={values.comments}
        />
      </Grid>

      <Grid>
        <div style={{}}>
          <div style={{ float: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save Changes
            </Button>
          </div>
        </div>
        <ToastContainer />
      </Grid>
    </form>
  );
};

export default ExamEdit;
