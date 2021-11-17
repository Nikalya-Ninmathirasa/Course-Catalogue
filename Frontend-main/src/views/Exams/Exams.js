import React, { useEffect, useState } from "react";
import ExamForm from "../../components/Forms/ExamForm";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  ButtonGroup,
} from "@material-ui/core";
import Popup from "../../components/Popup/Popup";
import Examcard from "../../components/Card/Examcard";
import Grid from "@material-ui/core/Grid";
import { InputAdornment } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchRounded from "@material-ui/icons/SearchRounded";
import axios from "axios";
import Swal from "sweetalert2";
import CloseIcon from "@material-ui/icons/Close";
import { HavePermisson } from "../../components/hod/HavePermisson";
import { connect } from "react-redux";

const Exams = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [onlyMydata, setMydata] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [examData, setExamData] = useState([]);
  const [filteredExams, setFileredExams] = useState([]);
  const { user } = props;

  let handleChange2 = (event) => {
    setSearchCategory(event.target.value);
    console.log(searchCategory);
  };
  function readAllExams() {
    return Promise.resolve().then((opts) => {
      return axios
        .get("http://localhost:5000/api/exam")
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("Unable access ...");
        });
    });
  }

  useEffect(() => {
    readAllExams().then((r) => setExamData(r));
  }, []);

  useEffect(() => {
    setFileredExams(
      examData.filter(
        (exaam) =>
          exaam.exam_name.toLowerCase().includes(searchName.toLowerCase()) &&
          exaam.category
            .toLowerCase()
            .includes(searchCategory && searchCategory.toLowerCase()) &&
          (onlyMydata ? exaam.creatorId === user._id : true)
      )
    );
  }, [searchName, searchCategory, examData, onlyMydata, user]);

  const handleDelete = (id) => {
    const originalExams = filteredExams;
    Swal.fire({
      title: "Are you sure you want to delete this exam?",
      text: "You won't be able to revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const exams = originalExams.filter((m) => m._id !== id);
        setFileredExams(exams);
        axios
          .delete(`http://localhost:5000/api/exam/${id}`)
          .then((res) => {
            Swal.mixin({
              toast: true,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
            }).fire({
              title: "Exam deleted successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            setFileredExams(originalExams);
            console.log(err.response);
            Swal.mixin({
              toast: true,
              icon: "error",
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
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
      <div>
        <HavePermisson userRoles={["institute"]}>
          <div style={{ float: "right" }}>
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
                  All Exams
                </Button>
                <Button
                  onClick={() => {
                    setMydata(true);
                  }}
                >
                  My Exams
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
      <Popup title="Add Exam" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <ExamForm />
      </Popup>

      <Grid container justify="flex-start" spacing={1}>
        <Grid item xs={3}>
          <TextField
            paddingRight="20.25%"
            label="Search Exam"
            variant="outlined"
            onChange={(e) => {
              console.log("Pass");
              setSearchName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
            style={{ paddingBottom: "20px" }}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined">
            <InputLabel>Category</InputLabel>

            <Select
              endAdornment={
                <IconButton onClick={() => setSearchCategory("")}>
                  <CloseIcon />
                </IconButton>
              }
              value={searchCategory}
              key={searchCategory}
              onChange={handleChange2}
            >
              {examData &&
                [...new Set(examData.map((op) => op.category))].map(
                  (option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justify="flex-start" spacing={3}>
        {filteredExams &&
          (() => {
            const exams = [];

            filteredExams.map((r) => {
              exams.push(
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Examcard examData={r} handleDelete={handleDelete} />
                </Grid>
              );
              return filteredExams;
            });

            return exams;
          })()}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Exams);
