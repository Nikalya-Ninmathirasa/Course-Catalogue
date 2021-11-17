import React, { useState, useEffect } from "react";
import CareerCounsellorForm from "../../components/Forms/CareerCounselorForm";
import CareerCounsellorCard from "../../components/Card/CareerCounselorCard";
import { Toolbar } from "@material-ui/core";
import Popup from "../../components/Popup/Popup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SearchRounded from "@material-ui/icons/SearchRounded";
import axios from "axios";
import Swal from "sweetalert2";
import { HavePermisson } from "../../components/hod/HavePermisson";

const CareerCounsellor = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchField, setSearchField] = useState("");
  const [careerCounsellorData, setCareerCounsellorData] = useState([]);
  const [filteredCareerCounsellor, setfilteredCareerCounsellor] = useState([]);

  function readAllCareerCounsellor() {
    return Promise.resolve().then((opts) => {
      return axios
        .get("http://localhost:5000/api/careercounsellor")
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("Unable access ...");
        });
    });
  }

  useEffect(() => {
    readAllCareerCounsellor().then((r) => setCareerCounsellorData(r));
  }, []);

  useEffect(() => {
    setfilteredCareerCounsellor(
      careerCounsellorData.filter(
        (careercounsellor) =>
          careercounsellor.counsellor_name
            .toLowerCase()
            .includes(searchName.toLowerCase()) &&
          careercounsellor.fieldofexpert
            .toLowerCase()
            .includes(searchField.toLowerCase())
      )
    );
  }, [searchName, searchField, careerCounsellorData]);

  const handleDelete = (id) => {
    const originalCareerCounsellor = filteredCareerCounsellor;
    Swal.fire({
      title: "Are you sure you want to delete this CareerCounsellor?",
      text: "You won't be able to revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const careercounsellor = originalCareerCounsellor.filter(
          (m) => m._id !== id
        );
        setfilteredCareerCounsellor(careercounsellor);
        axios
          .delete(`http://localhost:5000/api/careercounsellor/delete/${id}`)
          .then((res) => {
            Swal.mixin({
              toast: true,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
            }).fire({
              title: "CareerCounsellor deleted successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            setfilteredCareerCounsellor(originalCareerCounsellor);
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
        <div style={{ float: "right" }}>
          <Toolbar>
            <HavePermisson userRoles={["career_counsellor"]}>
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
            </HavePermisson>
          </Toolbar>
        </div>
      </div>
      <Popup
        title="Add CareerCounsellor Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CareerCounsellorForm />
      </Popup>

      <Grid
        style={{ float: "left" }}
        container
        justify="flex-start"
        spacing={3}
      >
        <TextField
          label="Search CareerCounsellor By Name"
          variant="outlined"
          onChange={(e) => {
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
        <TextField
          label="Search CareerCounsellor By Field"
          variant="outlined"
          onChange={(e) => {
            setSearchField(e.target.value);
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

      <Grid container justify="flex-start" spacing={3}>
        {(() => {
          const careercounsellor = [];
          filteredCareerCounsellor.map((r) => {
            careercounsellor.push(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CareerCounsellorCard
                  careerCounsellorData={r}
                  handleDelete={handleDelete}
                />
              </Grid>
            );
            return filteredCareerCounsellor;
          });
          return careercounsellor;
        })()}
      </Grid>
    </>
  );
};

export default CareerCounsellor;
