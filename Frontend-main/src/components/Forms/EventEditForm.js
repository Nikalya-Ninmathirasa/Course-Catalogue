import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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

const EventEdit = ({ eventData }) => {
  console.log(eventData);

  const classes = useStyles();
 
  const [title, settitle] = useState(eventData.title);
  const [location, setlocation] = useState(eventData.location);
  const [time, settime] = useState(eventData.time);
  const [date, setdate] = useState(eventData.date);
  const [registrationurl, setregistrationurl] = useState(eventData.registrationurl);
  const [description, setdescription] = useState(eventData.description);
  const [fee, setfee] = useState(eventData.fee);

  const [fileData, setFileData] = useState();

  const [file, setFile] = useState();

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    setFile(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

      formdata.append("image", fileData);
      formdata.append("title", title);
      formdata.append("location", location);
      formdata.append("time", time);
      formdata.append("date", date);
      formdata.append("registrationurl", registrationurl);
      formdata.append("description", description);
      formdata.append("fee", fee);

  try {
    await axios.put("http://localhost:5000/api/event/" + eventData._id, formdata);
    toast("Event Updated");
    window.location.reload();
  } catch (err) {
    console.log(err);
    toast(err.message);
  }
};

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <Typography className={classes.title} variant="h4" component="h4">
          Edit Event Information
        </Typography>
      </Grid>
      <Grid container>
                <Grid item xs={6}>  
                    <TextField
                        name="title"
                        onChange={(e) => settitle(e.target.value)}
                        label="Name"
                        placeholder="Enter Event Name"
                        variant="outlined"
                        value={title}
                    />
                    <TextField
                        name="fieldofstudy"
                        onChange={(e) => setlocation(e.target.value)}
                        label="Location"
                        placeholder="Enter location"
                        variant="outlined"
                        value={location}
                    />
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        onChange={(e) => settime(e.target.value)}
                        value={time}
                        className={classes.textField}
                        variant="outlined"
                        
                    />
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12}>
      <TextField
           id="date"
           label="Exam date"
           type="date"
           onChange={(e) => setdate(e.target.value)}
           value={date}
           variant="outlined"
           className={classes.textField}
    
        />
     
                    <TextField
                        name="duration"
                        onChange={(e) => setregistrationurl(e.target.value)}
                        label="Registartion Url"
                        placeholder="Link for registration"
                        variant="outlined"
                        value={registrationurl}
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
                <TextField
                    name="fee"
                    onChange={(e) => setfee(e.target.value)}
                    label="Fee"
                    placeholder="Enter fee"
                    variant="outlined"
                    value={fee}
                    />
                   
                </Grid>
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
        <br />
      <br />
      <br />
        <ToastContainer />
      </Grid>
      
    </form>
  );
};

export default EventEdit;