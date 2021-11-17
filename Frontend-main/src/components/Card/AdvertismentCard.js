import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import Popup from "../../components/Popup/Popup";
import AdvertismentEditForm from "../../components/Forms/AdvertismentEditForm";
import { Authorization } from "../hod/HavePermisson";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "50.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CourseCard(props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="advertisment" className={classes.avatar}>
            A
          </Avatar>
        }
        title={
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            {props.advertismentData.ad_name}
          </Grid>
        }
      />
      <CardMedia className={classes.media} image={props.advertismentData.image} />
      <Authorization creatorId={props.advertismentData.creatorId}>
        <div>
          <IconButton
            color="inherit"
            aria-label="delete"
            onClick={() => {
              props.handleDelete(props.advertismentData._id);
            }}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="delete"
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </div>
      </Authorization>
      <Popup
        title="Edit Advertisment"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AdvertismentEditForm advertismentData={props.advertismentData} setOpenPopup={setOpenPopup}/>
      </Popup>
    </Card>
  );
}
