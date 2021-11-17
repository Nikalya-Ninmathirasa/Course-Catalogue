import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
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

const CareerCounsellorForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = props;

  const [counsellor_name, setcounsellor_name] = useState("");
  const [designation, setdesignation] = useState("");
  const [placeofwork, setplaceofwork] = useState("");
  const [fieldofexpert, setfieldofexpert] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [personallink, setpersonallink] = useState("");
  const [contact, setcontact] = useState("");
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
    formdata.append("counsellor_name", counsellor_name);
    formdata.append("designation", designation);
    formdata.append("placeofwork", placeofwork);
    formdata.append("fieldofexpert", fieldofexpert);
    formdata.append("linkedin", linkedin);
    formdata.append("personallink", personallink);
    formdata.append("contact", contact);
    formdata.append("description", description);
    formdata.append("creatorId", user._id);

    await axios
      .post("http://localhost:5000/api/careercounsellor/new", formdata)
      .then(
        (res) => console.log("res", res.data),
        toast("New CareerCounsellor is Created"),
        window.location.reload()
      )
      .catch((error) => console.error(error));
  };

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="counsellor_name"
            onChange={(e) => setcounsellor_name(e.target.value)}
            label="Name"
            placeholder="Enter CareerCounsellor Name"
            variant="outlined"
            value={counsellor_name}
          />
          <TextField
            name="designation"
            onChange={(e) => setdesignation(e.target.value)}
            label="Designation"
            placeholder="Enter CareerCounsellor Designation"
            variant="outlined"
            value={designation}
          />
          <TextField
            name="placeofwork"
            onChange={(e) => setplaceofwork(e.target.value)}
            label="Place of Work"
            placeholder="Enter CareerCounsellor Place of Work"
            variant="outlined"
            value={placeofwork}
          />
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel>Field of Expert</InputLabel>
              <Select
                name="fieldofexpert"
                value={fieldofexpert}
                onChange={(e) => setfieldofexpert(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Accounts">Accounts</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Innovation">Innovation</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Agriculture">Agriculture</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="linkedin"
            onChange={(e) => setlinkedin(e.target.value)}
            label="LinkedIn Profile Link"
            placeholder="Paste Your LinkedIn Link"
            variant="outlined"
            value={linkedin}
          />
          <TextField
            name="personallink"
            onChange={(e) => setpersonallink(e.target.value)}
            label="Personal Profile Link"
            placeholder="Paste Your Personal Profile Link"
            variant="outlined"
            value={personallink}
          />
          <TextField
            name="contact"
            type="number"
            onChange={(e) => setcontact(e.target.value)}
            label="Contanct Number"
            placeholder="Enter your Contanct Number"
            variant="outlined"
            value={contact}
          />
        </Grid>
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

export default connect(mapStateToProps, null)(CareerCounsellorForm);
