import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Card,
  Avatar,
  Button,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useStyles } from "./style";
import { convertDateTimeToString } from "../../helpers/datetimeUtil";
import { Link } from "react-router-dom";

export default function RecipeReviewCard({ event, isFollowed = false }) {
  const classes = useStyles();
  const [follow, setFollow] = useState(isFollowed);
  const ownerClub = event.clubInfos.find((e) => e.isOwner === true);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={ownerClub.avatar}
            alt={ownerClub.clubName}
          />
        }
        title={<Typography className={classes.clubName}>{ownerClub.clubName}</Typography>}
        subheader={convertDateTimeToString(event.eventStartTime)}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={event.image}
          title={event.clubName}
        />
        <CardContent>
          <Typography className={classes.eventName} variant="h6" color="textSecondary" component="p">
            {event.eventName}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        {follow ? (
          <IconButton aria-label="add to favorites">
            <FavoriteIcon style={{ color: red[500] }} />
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        )}
        <Button component={Link} size="medium" color="primary" to={`/app/event/${event.id}`}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
