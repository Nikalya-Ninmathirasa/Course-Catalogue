import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import Popup from "../../components/Popup/Popup";
import ExamEditForm from "../../components/Forms/EditExam";
import { Link } from "react-router-dom";
import { Authorization } from "../hod/HavePermisson";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "10.25%",
  },
  body: {
    height: 130,
    paddingTop: "3%",
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
    backgroundColor: "Primary",
  },
}));

export default function Examcard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.media}
        style={{ backgroundColor: "#4DB6AC" }}
        title={<h5>{props.examData.exam_name}</h5>}
      />

      <CardContent>
        <Authorization creatorId={props.examData.creatorId}>
          <div>
            <IconButton color="inherit" aria-label="delete">
              <DeleteOutlinedIcon
                fontSize="small"
                onClick={() => props.handleDelete(props.examData._id)}
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
        <Typography variant="body2" color="textSecondary" component="p">
          <b> Date : </b> {props.examData.date}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          <b> Time :</b> {props.examData.time}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          <b> Location</b> : {props.examData.location}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          <b> Exam fee :</b> {props.examData.fee} lkr
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Button
            size="small"
            color="primary"
            target="_blank"
            href="https://www.sl-stb.org/exam/"
          >
            More info
          </Button>
        </Typography>
        <div></div>
      </CardContent>
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
            <b> Contact us :</b>{" "}
            <Link href="" onClick={props.examData.email}>
              {props.examData.email}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Comments </b> : {props.examData.comments}
          </Typography>
        </CardContent>
      </Collapse>
      <Popup
        title="Edit Exam"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ExamEditForm examData={props.examData} setOpenPopup={setOpenPopup} />
      </Popup>
    </Card>
  );
}
