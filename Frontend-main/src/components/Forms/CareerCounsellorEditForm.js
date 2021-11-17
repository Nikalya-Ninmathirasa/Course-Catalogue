import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const CareerCounsellorEdit = ({ careerCounsellorData }) => {
  console.log(careerCounsellorData);

  const classes = useStyles();

  const [counsellor_name, setcounsellor_name] = useState(careerCounsellorData.counsellor_name);
  const [designation, setdesignation] = useState(careerCounsellorData.designation);
  const [placeofwork, setplaceofwork] = useState(careerCounsellorData.placeofwork);
  const [fieldofexpert, setfieldofexpert] = useState(careerCounsellorData.fieldofexpert);
  const [linkedin, setlinkedin] = useState(careerCounsellorData.linkedin);
  const [personallink, setpersonallink] = useState(careerCounsellorData.personallink);
  const [contact, setcontact] = useState(careerCounsellorData.contact);
  const [description, setdescription] = useState(careerCounsellorData.description);

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

    try {
      await axios.put("http://localhost:5000/api//careercounsellor/update/" + careerCounsellorData._id, formdata);
      toast("CareerCounellor Updated");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  };

  return (
    <form className={classes.root} >
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
                        <FormControl variant="outlined" className={classes.formControl}  fullWidth>
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
                    style={{ display: 'none', }}
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
                    UPDATE
                    </Button>
                </div>
                <br/>
                <br/>
                <br/>
                <ToastContainer />
            </form>
        
  );
};

export default CareerCounsellorEdit;
