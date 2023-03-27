import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%",
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
  description: {
    minHeight: "40px",
    "-webkit-line-clamp": 2,
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-box-orient": "vertical",
  },
  clubName: {
    minHeight: "65px",
    "-webkit-line-clamp": 2,
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-box-orient": "vertical",
  },
});

export default function MediaCard({ club }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={club.avatar}
          title={club.clubName}
        />
        <CardContent>
          <Typography
            className={classes.clubName}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {club.clubName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            {club.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={Link}
          size="medium"
          color="primary"
          to={`/app/club/${club.clubProfileId}?page=1`}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
