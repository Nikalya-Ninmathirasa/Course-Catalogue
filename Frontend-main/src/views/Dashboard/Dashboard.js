import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getUserCount, getCourseCount, getExamCount } from "../../services/staticService";

import classes from "./Dash.module.css";

const StyledPaper = withStyles(() => ({
  elevation0: {
    boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.02)",
  },
}))(Paper);

export default function SpacingGrid() {
  const [stats, setStats] = React.useState({});
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const getStats = async () => {
    try {
      const userCount = await getUserCount();
      const courceCount = await getCourseCount();
      const examCount = await getExamCount();

      setStats({
        userCount: userCount,
        courceCount: courceCount,
        examCount: examCount
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  React.useEffect(() => {
    getStats();
  }, []);
  return (
    <React.Fragment>
      <Box mb={3}>
        <Box mb={2}>
          <Typography variant="h6">Stats</Typography>
        </Box>
        <Grid container justify="flex-start" spacing={4}>
          {[
            { title: 'Users', value: stats['userCount'], type: " " },
            { title: 'Courses',value: stats['courceCount'], type: "success" },
            { title: 'Exams',value: stats['examCount'], type: "warning" },
          ].map((item) => (
            <Grid key={item.title} item xs={6} sm={3} md={3} lg={2}>
              <StyledPaper className={classes.container} elevation={0}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <div className={classes.number + " " + classes[item.type]}>
                  <Typography color="inherit" variant="h5">
                    {item.value}
                  </Typography>
                </div>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
