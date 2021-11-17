import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import Popup from "../../components/Popup/Popup";
import EventEditForm from "../../components/Forms/EventEditForm";
import { HavePermisson, Authorization } from "../hod/HavePermisson";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.eventData.image}
          title="Workshop"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.eventData.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b> Date : </b> {props.eventData.date} <br />
            <b>Time :</b> {props.eventData.time} <br />
            <b> Location</b> : {props.eventData.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <HavePermisson userRoles={["student"]}>
          <Button
            size="small"
            color="primary"
            target="_blank"
            href="https://forms.gle/kpgs1esmtE4NivCk7"
          >
            Register
          </Button>
        </HavePermisson>
        <Authorization creatorId={props.eventData.creatorId}>
          <div>
            <IconButton color="inherit" aria-label="delete">
              <DeleteOutlinedIcon
                fontSize="small"
                onClick={() => props.handleDelete(props.eventData._id)}
              />
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
      </CardActions>

      <Popup
        title="Edit Event"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EventEditForm
          eventData={props.eventData}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </Card>
  );
}
