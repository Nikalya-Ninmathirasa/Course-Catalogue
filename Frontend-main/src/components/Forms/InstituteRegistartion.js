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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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

const InstituteReg = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [InstituteName, setInstituteName] = useState("");
  const [InstituteType, setInstituteType] = useState("");
  const [District, setDistrict] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");

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
    formdata.append("InstituteName", InstituteName);
    formdata.append("InstituteType", InstituteType);
    formdata.append("District", District);
    formdata.append("Address", Address);
    formdata.append("Email", Email);
    formdata.append("ContactNumber", ContactNumber);
    formdata.append("creatorId", user._id);

    await axios
      .post("http://localhost:5000/api/institute/new", formdata)
      .then(
        (res) => console.log("res", res.data),
        toast("New Institute is Created"),
        window.location.reload()
      )

      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <Typography className={classes.title} variant="h4" component="h4">
          Institute
        </Typography>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          name="InstituteName"
          type="text"
          label="Institute Name"
          placeholder="Enter the Institute Name"
          fullWidth
          variant="outlined"
          onChange={(e) => setInstituteName(e.target.value)}
          value={InstituteName}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <InputLabel>InstituteType</InputLabel>
          <Select
            name="InstituteType"
            value={InstituteType}
            onChange={(e) => setInstituteType(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          name="Address"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          placeholder="Enter the institute Address"
          variant="outlined"
          fullWidth
          value={Address}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <FormControl variant="filled" className={classes.formControl} fullWidth>
          <InputLabel>District</InputLabel>
          <Select
            name="District"
            value={District}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Ampara">Ampara</MenuItem>
            <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
            <MenuItem value="Badulla">Badulla</MenuItem>
            <MenuItem value="Batticaloa">Batticaloa</MenuItem>
            <MenuItem value="Colombo">Colombo</MenuItem>
            <MenuItem value="Galle">Galle</MenuItem>
            <MenuItem value="Gampaha">Gampaha</MenuItem>
            <MenuItem value="Hambantota">Hambantota</MenuItem>
            <MenuItem value="Jaffna">Jaffna</MenuItem>
            <MenuItem value="Kalutara">Kalutara</MenuItem>
            <MenuItem value="Kandy">Kandy</MenuItem>
            <MenuItem value="Kegalle">Kegalle</MenuItem>
            <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
            <MenuItem value="Kurunegala">Kurunegala</MenuItem>
            <MenuItem value="Mannar">Mannar</MenuItem>
            <MenuItem value="Matale">Matale</MenuItem>
            <MenuItem value="Matara">Matara</MenuItem>
            <MenuItem value="Moneragala">Moneragala</MenuItem>
            <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
            <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
            <MenuItem value="Polannaruwa">Polannaruwa</MenuItem>
            <MenuItem value="Puttalam">Puttalam</MenuItem>
            <MenuItem value="Ratnapura">Ratnapura</MenuItem>
            <MenuItem value="Trincomalee">Trincomalee</MenuItem>
            <MenuItem value="Vavuniya">Vavuniya</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          name="Email"
          type="Email"
          label="Email Address"
          placeholder="Enter email address of Institute"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          value={Email}
        />
      </Grid>

      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <TextField
          name="ContactNumber"
          type="text"
          label="ContactNumber"
          placeholder="ContactNumber"
          onChange={(e) => setContactNumber(e.target.value)}
          multiline
          fullWidth
          variant="outlined"
          value={ContactNumber}
        />
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
            color="white"
          >
            Upload Institute Logo
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

export default connect(mapStateToProps, null)(InstituteReg);
