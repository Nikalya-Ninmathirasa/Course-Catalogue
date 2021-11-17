import React, { useState, useEffect } from "react";
import InstituteRegistartion from "../../components/Forms/InstituteRegistartion";
import InstituteCard from "../../components/Card/InstituteCard";
import { Toolbar, ButtonGroup } from "@material-ui/core";
import Popup from "../../components/Popup/Popup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchRounded from "@material-ui/icons/SearchRounded";
import { InputAdornment } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Swal from "sweetalert2";
import { HavePermisson } from "../../components/hod/HavePermisson";
import { connect } from "react-redux";

const Institute = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [onlyMydata, setMydata] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [filteredInstitutes, setFileredInstitutes] = useState([]);
  const { user } = props;

  function readInstitute() {
    return Promise.resolve().then((opts) => {
      return axios
        .get("http://localhost:5000/api/institute")
        .then((response) => {
          // setUserData(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log("Unable access ...");
        });
    });
  }

  let [InstituteData, setInstituteData] = useState([]);
  useEffect(() => {
    readInstitute().then((r) => setInstituteData(r));
  }, []);

  useEffect(() => {
    setFileredInstitutes(
      InstituteData.filter(
        (institute) =>
          institute.InstituteName.toLowerCase().includes(
            searchName.toLowerCase()
          ) && (onlyMydata ? institute.creatorId === user._id : true)
      )
    );
  }, [searchName, InstituteData, onlyMydata, user]);

  const handleDelete = (id) => {
    const originalInstitutes = filteredInstitutes;
    Swal.fire({
      title: "Are you sure you want to delete this Institute?",
      text: "You won't be able to revert this change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const institutes = originalInstitutes.filter((m) => m._id !== id);
        setFileredInstitutes(institutes);
        axios
          .delete(`http://localhost:5000/api/institute/${id}`)
          .then((res) => {
            Swal.mixin({
              toast: true,
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
            }).fire({
              title: "Institute deleted successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            setFileredInstitutes(originalInstitutes);
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
      <div style={{}}>
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
                  All institutes
                </Button>
                <Button
                  onClick={() => {
                    setMydata(true);
                  }}
                >
                  My institutes
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
        title="Add Institute"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <InstituteRegistartion />
      </Popup>

      <Grid container justify="flex-start" spacing={4}>
        <span>
          <TextField
            paddingRight="20.25%"
            label="Search Institute"
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
        </span>
      </Grid>

      <Grid container justify="flex-start" spacing={3}>
        {(() => {
          const institute = [];
          filteredInstitutes.map((r) => {
            institute.push(
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <InstituteCard InstituteData={r} handleDelete={handleDelete} />
              </Grid>
            );
            return InstituteData;
          });
          return institute;
        })()}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, null)(Institute);
