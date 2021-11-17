import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import Popup from "../../components/Popup/Popup";
import InstituteEditForm from "../../components/Forms/InstituteEditForm";
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

export default function InstituteCard(props) {
  const classes = useStyles();

  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="course" className={classes.avatar}>
            {props.InstituteData.InstituteName.split('')[0]}
          </Avatar>
        }
        title={
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            {props.InstituteData.InstituteName}
          </Grid>
        }
      />
      <CardMedia className={classes.media} image={props.InstituteData.image} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Institute Type : {props.InstituteData.InstituteType}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          District : {props.InstituteData.District}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Address : {props.InstituteData.Address}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Email : {props.InstituteData.Email}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Contact Number : {props.InstituteData.ContactNumber}
        </Typography>
        <Authorization creatorId={props.InstituteData.creatorId}>
          <div>
            <IconButton
              color="inherit"
              aria-label="delete"
              onClick={() => {
                props.handleDelete(props.InstituteData._id);
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
          title="Edit Course"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <InstituteEditForm
            InstituteData={props.InstituteData}
            setOpenPopup={setOpenPopup}
          />
        </Popup>
      </CardContent>
    </Card>
  );
}
