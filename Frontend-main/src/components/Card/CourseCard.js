import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import Grid from "@material-ui/core/Grid";
import Popup from "../../components/Popup/Popup";
import CourseEditForm from "../../components/Forms/CourseEditForm";
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
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
  const [expanded, setExpanded] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  const directTo = "/Courses/CourseView";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          title={
            <Grid container item xs={12} sm={12} md={12} lg={12}>
              {props.CourseData.course_name}
            </Grid>
          }
        />
        <CardMedia className={classes.media} image={props.CourseData.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Course Field : {props.CourseData.fieldofstudy}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Course Medium : {props.CourseData.mediumofstudy}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Mode of Study : {props.CourseData.modeofstudy}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Course Level : {props.CourseData.courselevel}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Authorization creatorId={props.CourseData.creatorId}>
        <div>
          <IconButton
            color="inherit"
            aria-label="delete"
            onClick={() => {
              props.handleDelete(props.CourseData._id);
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
          {/* <IconButton color="inherit" aria-label="view">
            <Link to={directTo}>
              <VisibilityOutlinedIcon fontSize="small" />
            </Link>
          </IconButton> */}
        </div>
      </Authorization>
      <Popup
        title="Edit Course"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CourseEditForm
          CourseData={props.CourseData}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Duration : {props.CourseData.durationofstudy} Years
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Course Cost : {props.CourseData.cost} LKR
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
