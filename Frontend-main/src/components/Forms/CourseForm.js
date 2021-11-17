import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const CourseForm = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [course_name, setcourse_name] = useState("");
  const [mediumofstudy, setmediumofstudy] = useState("");
  const [modeofstudy, setmodeofstudy] = useState("");
  const [fieldofstudy, setfieldofstudy] = useState("");
  const [courselevel, setcourselevel] = useState("");
  const [durationofstudy, setdurationofstudy] = useState("");
  const [cost, setcost] = useState("");
  const [results, setresults] = useState("");
  const [description, setdescription] = useState("");

  const [fileData, setFileData] = useState();

  const [file, setFile] = useState("");

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    setFile(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("image", fileData);
    formdata.append("course_name", course_name);
    formdata.append("mediumofstudy", mediumofstudy);
    formdata.append("modeofstudy", modeofstudy);
    formdata.append("fieldofstudy", fieldofstudy);
    formdata.append("courselevel", courselevel);
    formdata.append("durationofstudy", durationofstudy);
    formdata.append("cost", cost);
    formdata.append("results", results);
    formdata.append("description", description);
    formdata.append("creatorId", user._id);

    await axios
      .post("http://localhost:5000/api/course", formdata)
      .then(
        (res) => console.log("res", res.data),
        toast("New Course is Created"),
        window.location.reload()
      )

      .catch((error) => console.error(error));
  };

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="course_name"
            onChange={(e) => setcourse_name(e.target.value)}
            label="Name"
            placeholder="Enter Course Name"
            variant="outlined"
            value={course_name}
          />
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Medium of Study</InputLabel>
              <Select
                name="mediumofstudy"
                value={mediumofstudy}
                onChange={(e) => setmediumofstudy(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Sinhala">Sinhala</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Mode of Study</InputLabel>
              <Select
                name="modeofstudy"
                value={modeofstudy}
                onChange={(e) => setmodeofstudy(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Physical">Physical</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Field of Study</InputLabel>
              <Select
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={(e) => setfieldofstudy(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>
                Course <i class="fa fa-level-down" aria-hidden="true"></i>
              </InputLabel>
              <Select
                name="courselevel"
                value={courselevel}
                onChange={(e) => setcourselevel(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
                <MenuItem value="Degree">Degree</MenuItem>
                <MenuItem value="HND">HND</MenuItem>
                <MenuItem value="Diploma">Diploma level</MenuItem>
                <MenuItem value="Certificate">Certificate Level</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Duration of Study</InputLabel>
              <Select
                name="durationofstudy"
                value={durationofstudy}
                onChange={(e) => setdurationofstudy(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="5">5 Years</MenuItem>
                <MenuItem value="4">4 Years</MenuItem>
                <MenuItem value="3">3 Years</MenuItem>
                <MenuItem value="2">2 Years</MenuItem>
                <MenuItem value="1">1 Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="cost"
            type="number"
            onChange={(e) => setcost(e.target.value)}
            label="Cost"
            placeholder="Enter Course Cost"
            variant="outlined"
            value={cost}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" component="h5">
        Related Stream
      </Typography>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          fullWidth
        >
          <InputLabel>
            A/L Stream <i class="fa fa-level-down" aria-hidden="true"></i>
          </InputLabel>
          <Select
            name="results"
            value={results}
            onChange={(e) => setresults(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Physical Science Stream">
              Physical Science Stream
            </MenuItem>
            <MenuItem value="Biological Science Stream">
              Biological Science Stream
            </MenuItem>
            <MenuItem value="Commerce Stream">Commerce Stream</MenuItem>
            <MenuItem value="Arts Stream">Arts Stream</MenuItem>
            <MenuItem value="Technology Stream">Technology Stream</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <TextField
        name="description"
        onChange={(e) => setdescription(e.target.value)}
        label="Description"
        multiline
        rows={10}
        placeholder="Enter Description"
        variant="outlined"
        value={description}
      />
      <Grid>
        <input
          name="file"
          color="primary"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          value={file}
          id="icon-button-file"
          style={{ display: "none" }}
        />
        <label htmlFor="icon-button-file">
          <Button
            variant="contained"
            fullWidth
            component="span"
            className={classes.button}
            size="large"
            color="primary"
          >
            Upload Image
          </Button>
        </label>
      </Grid>
      <div className="col-md-2">
        <img src={preview} alt="preview_image" className="img img-fluid m-2" />
      </div>
      <div>
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
      <br />
      <br />
      <br />
      <ToastContainer />
    </form>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(CourseForm);
