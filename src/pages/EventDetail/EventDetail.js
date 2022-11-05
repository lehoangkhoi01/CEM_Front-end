import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Divider,
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { events } from "../../testData";
import { Favorite } from "@material-ui/icons";

const EventDetail = () => {
  const classes = useStyles();
  const [eventDetail, setEventDetail] = useState({});

  useEffect(() => {
    setEventDetail(events[0]);
  }, []);

  return (
    <Container className={classes.container}>
      <Card>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {eventDetail.eventName}
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {eventDetail.content}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Typography>
            <span className={classes.subtitle}>⏰Date & Time: </span>
            {eventDetail.time}
          </Typography>
          <Typography>
            <span className={classes.subtitle}>🏣Place: </span>
            {eventDetail.place}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          className={classes.media}
          alt={eventDetail.eventName}
          height="100%"
          image={eventDetail.eventImage}
          title={eventDetail.eventName}
        />
        <CardActions disableSpacing>
          <IconButton size="medium" aria-label="follow">
            <Favorite />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default EventDetail;
