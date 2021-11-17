import React, { useState, useEffect } from "react";
import CourseForm from "../../components/Forms/CourseForm";
import CourseCard from "../../components/Card/CourseCard";
import Popup from "../../components/Popup/Popup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SearchRounded from "@material-ui/icons/SearchRounded";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  ButtonGroup,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Swal from "sweetalert2";
import { HavePermisson } from "../../components/hod/HavePermisson";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
     
      height:37,
      paddingTop:1,
      minWidth: 190
    
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    
    height:10
  },
}));
const Courses = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [openPopup, setOpenPopup] = useState(false);
  const [onlyMydata, setMydata] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [SearchStream, setSearchStream] = useState("");
  const [SearchLevel, setSearchLevel] = useState("");
  const [SearchCategory, setSearchCategory] = useState("");
  const [CourseData, setCourseData] = useState([]);
  const [filteredCourses, setFileredCourses] = useState([]);
  const [cost, setCost] = useState("");
  const [radiovalue, setradioValue] = React.useState("");
  const [radiomedium, setradioMedium] = React.useState("");
  const [duration, setDuration] = React.useState("");

  let handleChange2 = (event) => {
    setSearchCategory(event.target.value);
    console.log(SearchCategory);
  };

  let handleChangeStream = (event) => {
    setSearchStream(event.target.value);
    console.log(SearchStream);
  };

  let handleChangeLevel = (event) => {
    setSearchLevel(event.target.value);
    console.log(SearchLevel);
  };

  const handleRadioChange = (event) => {
    setradioValue(event.target.value);
    console.log(radiovalue);
  };

  const handleRadioChangemedium = (event) => {
    setradioMedium(event.target.value);
    console.log(radiomedium);
  };

  const handlecost = (event) => {
    setCost(event.target.value);
    console.log(cost);
    const filterType = event.target.value.split("_")[0];
    if (filterType === "free") {
      setFileredCourses(CourseData.filter((e) => e.cost == null));
    } else {
      const filterValue = parseInt(event.target.value.split("_")[1]);
      if (filterType === "lt") {
        setFileredCourses(CourseData.filter((e) => e.cost < filterValue));
      } else {
        setFileredCourses(CourseData.filter((e) => e.cost >= filterValue));
      }
    }
  };

  const handleduration = (event) => {
    setDuration(event.target.value);
    console.log(duration);
    const filterType = event.target.value.split("_")[0];
    if (filterType === "free") {
      setFileredCourses(CourseData.filter((e) => e.durationofstudy == null));
    } else {
      const filterValue = parseInt(event.target.value.split("_")[1]);
      if (filterType === "lt") {
        setFileredCourses(
          CourseData.filter((e) => e.durationofstudy < filterValue)
        );
      } else {
        setFileredCourses(
          CourseData.filter((e) => e.durationofstudy >= filterValue)
        );
      }
    }
  };


  const allcost = () => {
    setCost("gte_0");
    console.log(cost);
    const filterType = "gte_0";
    if (filterType === "gte_0") {
      setFileredCourses(CourseData.filter((e) => e.cost > 0));
    }
    }

    const anytime = () => {
      setDuration("gte_0");
      console.log(duration);
      const filterType = "gte_0";
      if (filterType === "gte_0") {
        setFileredCourses(CourseData.filter((e) => e.durationofstudy > 0));
      }
      }


  const handlereset = () => {
    setradioMedium("");
    setradioValue("");
    setSearchLevel("");
    setSearchCategory("");
    setSearchStream("");
    setSearchName("");
    setCost(" ");
    setDuration("");
  };

  function readAllCourse() {
    return Promise.resolve().then((opts) => {
      return axios
        .get("http://localhost:5000/api/course")
        .then((response) => {
          // setUserData(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log("Unable access ...");
        });
    });
  }

  useEffect(() => {
    readAllCourse().then((r) => setCourseData(r));
  }, []);

  useEffect(() => {
    setFileredCourses(
      CourseData.filter(
        (course) =>
          course.course_name.toLowerCase().includes(searchName.toLowerCase()) &&
          course.fieldofstudy
            .toLowerCase()
            .includes(SearchCategory && SearchCategory.toLowerCase()) &&
          course.courselevel
            .toLowerCase()
            .includes(SearchLevel && SearchLevel.toLowerCase()) &&
          course.results
            .toLowerCase()
            .includes(SearchStream && SearchStream.toLowerCase()) &&
          course.mediumofstudy
            .toLowerCase()
            .includes(radiomedium && radiomedium.toLowerCase()) &&
          course.modeofstudy
            .toLowerCase()
            .includes(radiovalue && radiovalue.toLowerCase()) &&
          (onlyMydata ? course.creatorId === user._id : true)

        //  && (checkOnline == "true" ) ? course:course.modeofstudy.includes(course.modeofstudy=="Online")
      )
    );
  }, [
    searchName,
    SearchCategory,
    SearchLevel,
    SearchStream,
    radiovalue,
    radiomedium,
    CourseData,
    onlyMydata,
    user,
  ]);

  const handleDelete = (id) => {
    const originalCourses = filteredCourses;
    Swal.fire({
      title: "Are you sure you want to delete this course?",
      text: "You won't be able to revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const courses = originalCourses.filter((m) => m._id !== id);
        setFileredCourses(courses);
        axios
          .delete(`http://localhost:5000/api/course/delete/${id}`)
          .then((res) => {
            Swal.mixin({
              toast: true,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
            }).fire({
              title: "Exam deleted successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            setFileredCourses(originalCourses);
            console.log(err.response);
            Swal.mixin({
              toast: true,
              icon: "error",
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
            }).fire({
              title: err.response.data.message,
              type: "error",
            });
          });
      }
    });
  };

  return (
    <>
      <div style={{}}>
        <HavePermisson userRoles={["institute"]}>
          <div style={{ float: "right", marginBottom: "20px" }}>
            <Toolbar>
              <ButtonGroup
                disableElevation
                variant="contained"
                color="primary"
                style={{ marginRight: "20px" }}
              >
                <Button
                  onClick={() => {
                    setMydata(false);
                  }}
                >
                  All Courses
                </Button>
                <Button
                  onClick={() => {
                    setMydata(true);
                  }}
                >
                  My Courses
                </Button>
              </ButtonGroup>
              <Button
                onClick={() => {
                  setOpenPopup(true);
                }}
                variant="contained"
                color="primary"
              >
                {" "}
                Add
              </Button>
            </Toolbar>
          </div>
        </HavePermisson>
      </div>
      <Popup
        title="Add Course Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CourseForm />
      </Popup>
      <div>
        <Paper>
            <Grid >
              <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center">
                <TextField 
                    size = "small"
                    minWidth 
                    className={classes.root}
                    label="Search Course By Name"
                    variant="outlined"
                    onChange={(e) => {
                        setSearchName(e.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchRounded/>
                            </InputAdornment>
                        ),
                    }}
                    
                />


                <FormControl variant="outlined">
                    <InputLabel>
                      Field of Study
                    </InputLabel>
                    
                    <Select endAdornment={<IconButton onClick={()=> setSearchCategory("") }>
                       <CloseIcon />
                       </IconButton>}
                       className={classes.root}
                       label = " Field of Study"
                       value={SearchCategory}
                       key={SearchCategory}
                       onChange={handleChange2}>
                             {CourseData && [...new Set(CourseData.map((op) => op.fieldofstudy))].map((option, index) => (
                                <MenuItem key={index} value={option} >
                                 {option}
                                </MenuItem>
                                 ))}
                     </Select>
                </FormControl>

                <FormControl
                 variant="outlined"
                 >
                    <InputLabel>
                        AL Stream
                    </InputLabel>
                    
                    <Select  endAdornment={<IconButton onClick={()=> setSearchStream("")}>
                       <CloseIcon />
                       </IconButton>}
                        className={classes.root}
                        label = "AL Stream" 
                        value={SearchStream}
                        key={SearchStream}
                        onChange={handleChangeStream}>
                             {CourseData && [...new Set(CourseData.map((op) => op.results))].map((option, index) => (
                                <MenuItem key={index} value={option} >
                                 {option}
                                </MenuItem>
                                 ))}
                     </Select>
                </FormControl>
                
                <FormControl variant="outlined" >
                    <InputLabel>
                        Level of Study
                    </InputLabel>
                    
                    <Select
                    
                    endAdornment={<IconButton onClick={()=> setSearchLevel("")}>
                       <CloseIcon />
                       </IconButton>}
                        className={classes.root}
                        label = "Level of Study" 
                        value={SearchLevel}
                        key={SearchLevel}
                       onChange={handleChangeLevel}>
                             {CourseData && [...new Set(CourseData.map((op) => op.courselevel))].map((option, index) => (
                                <MenuItem key={index} value={option} >
                                 {option}
                                </MenuItem>
                                 ))}
                     </Select>
                </FormControl>
                <FormControl variant="outlined" >
                    <InputLabel>
                        Filter by duration
                    </InputLabel>
                    
                    <Select endAdornment={<IconButton onClick={anytime}>
                       <CloseIcon />
                       </IconButton>}
                        className={classes.root}
                        label = "Duration" 
                        value={duration}
                        key={duration}
                       onChange={handleduration}>
                            
                          <MenuItem value={'free'}>None</MenuItem>
                          <MenuItem value={'lt_1'}>Less than 1 year</MenuItem>
                          <MenuItem value={'lt_2'}>Less than 2 year</MenuItem>
                          <MenuItem value={'lt_4'}>Less than 4 year</MenuItem>
                          <MenuItem value={'gte_3'}>More</MenuItem>
                          <MenuItem value={'gte_0'}>All</MenuItem>
                     </Select>
                </FormControl>
                </Grid>
                <br/>
                <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                
                <FormControl  >
      <FormLabel component="legend">Mode of Study</FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="All"  onChange={handleRadioChange} value={radiovalue} >
        <FormControlLabel
          value="Online"
          control={<Radio color="primary" />}
          label="Online"
          labelPlacement="Online"
        />
        <FormControlLabel
          value="Physical"
          control={<Radio color="primary" />}
          label="Physical"
          labelPlacement="Physical"
        />
           
      <FormControlLabel
        control={<Radio
        checked={radiovalue === ''}
        onChange={()=> setradioValue("") }
        value=""
        
      />}
      label="All"
      />
      </RadioGroup>
    </FormControl>
    
    <FormControl variant="outlined" >
                    <InputLabel>
                        Filter by cost
                    </InputLabel>
                    
                    <Select endAdornment={<IconButton onClick={allcost}>
                       <CloseIcon />
                       </IconButton>}
                        className={classes.root}
                        label = "Cost" 
                        value={cost}
                        key={cost}
                       onChange={handlecost}>
                            
                          <MenuItem value={'free'}>Free</MenuItem>
                          <MenuItem value={'lt_25000'}>Less than 25000</MenuItem>
                          <MenuItem value={'lt_50000'}>Less than 50000</MenuItem>
                          <MenuItem value={'lt_100000'}>Less than 100000</MenuItem>
                          <MenuItem value={'gte_100000'}>More</MenuItem>
                          <MenuItem value={'gte_0'}>All</MenuItem>
                     </Select>
                </FormControl>
                 
                <FormControl >
      <FormLabel component="legend">Medium of Study</FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="All"  onChange={handleRadioChangemedium} value={radiomedium} >
        <FormControlLabel
          value="English"
          control={<Radio color="primary" />}
          label="English"
          labelPlacement="English"
        />
        <FormControlLabel
          value="Sinhala"
          control={<Radio color="primary" />}
          label="Sinhala"
          labelPlacement="Sinhala"
        />

         <FormControlLabel
          value="Tamil"
          control={<Radio color="primary" />}
          label="Tamil"
          labelPlacement="Tamil"
        />
        
        <FormControlLabel
        control={<Radio
        checked={radiomedium === ''}
        onChange={()=> setradioMedium("") }
        value=""
        
      />}
      label="All"
      />

      </RadioGroup>
           
      </FormControl>
                   
               
            </Grid>
            </Grid>
           </Paper>
          </div>
          <br/><br/>

        <Grid container justify="flex-start" spacing={3}>
          {filteredCourses &&
            (() => {
              const courses = [];

              filteredCourses.map((r) => {
                courses.push(
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CourseCard CourseData={r} handleDelete={handleDelete} />
                  </Grid>
                );
                return filteredCourses;
              });

              return courses;
            })()}
        </Grid>
    
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Courses);