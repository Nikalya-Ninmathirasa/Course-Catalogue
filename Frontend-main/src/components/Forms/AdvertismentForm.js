import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
}));

const AdvertismentForm = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [ad_name, setad_name] = useState("");
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
    formdata.append("ad_name", ad_name);
    formdata.append("creatorId", user._id);

    await axios
      .post("http://localhost:5000/api/ad/new", formdata)
      .then(
        (res) => console.log("res", res.data),
        toast("New Advertisment is Created"),
        window.location.reload()
      )
      .catch((error) => console.error(error));
  };

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="ad_name"
            onChange={(e) => setad_name(e.target.value)}
            label="Name"
            placeholder="Enter Advertisment"
            variant="outlined"
            value={ad_name}
          />
        </Grid>
      </Grid>
      <Grid>
        <input
          name="file"
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleFileChange}
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
          Publish
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

export default connect(mapStateToProps, null)(AdvertismentForm);
