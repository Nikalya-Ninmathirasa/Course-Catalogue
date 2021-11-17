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
import { connect } from "react-redux";

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

const ExamForm = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [exam_name, setexam_name] = useState("");
  const [location, setlocation] = useState("");
  const [time, settime] = useState("");
  const [date, setdate] = useState("");
  const [category, setcategory] = useState("");
  const [fee, setfee] = useState("");
  const [email, setemail] = useState("");
  const [comments, setcomments] = useState("");
  // const [image, setimage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(values);
    try {
      const res = await axios.post("http://localhost:5000/api/exam/new", {
        exam_name,
        location,
        time,
        date,
        category,
        fee,
        email,
        comments,
        creatorId: user._id,
      });
      console.log("Exam Add ===> ", res);
      toast("New Exam is Created");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };

  return (
    <form className={classes.root}>
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
          onChange={(e) => setexam_name(e.target.value)}
          value={exam_name}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"location"}
          name={"location"}
          type={"text"}
          onChange={(e) => setlocation(e.target.value)}
          label={"Location"}
          placeholder={"Enter location of exam"}
          variant="outlined"
          value={location}
        />
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"date"}
          name={"date"}
          type={"date"}
          onChange={(e) => setdate(e.target.value)}
          label={"Date"}
          placeholder={"Select a date"}
          variant="outlined"
          value={date}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"time"}
          name={"time"}
          type={"time"}
          onChange={(e) => settime(e.target.value)}
          label={"Time"}
          placeholder={"Select a time"}
          variant="outlined"
          value={time}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            id={"category"}
            name={"category"}
            type={"text"}
            onChange={(e) => setcategory(e.target.value)}
            label={"category"}
            placeholder={"Select a category"}
            variant="outlined"
            value={category}
            defaultValue=" "
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
          onChange={(e) => setfee(e.target.value)}
          variant="outlined"
          value={fee}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"email"}
          name={"email"}
          type={"email"}
          label={"Email address"}
          placeholder={"Enter email address for queries"}
          onChange={(e) => setemail(e.target.value)}
          variant="outlined"
          value={email}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          id={"comments"}
          name={"comments"}
          type={"text"}
          label={"Important Comments"}
          placeholder={"Enter important details"}
          onChange={(e) => setcomments(e.target.value)}
          multiline
          rows={10}
          variant="outlined"
          value={comments}
        />
      </Grid>

      <Grid>
        <div></div>
        <div style={{}}>
          <div style={{ float: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}
            >
              ADD
            </Button>
          </div>
        </div>
      </Grid>
      <ToastContainer />
    </form>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(ExamForm);
