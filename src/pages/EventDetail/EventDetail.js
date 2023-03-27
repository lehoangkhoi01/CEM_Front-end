import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Divider,
  Avatar,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { Favorite } from "@material-ui/icons";
import { getEventDetail, updateEvent } from "../../services/eventService";
import { convertFullDateTime } from "../../helpers/datetimeUtil";
import { Link, useHistory } from "react-router-dom";

const EventDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [eventDetail, setEventDetail] = useState({});
  const [clubInfos, setClubInfos] = useState([]);
  const [activities, setActivities] = useState([]);

  const [owningClub, setOwningClub] = useState(0);
  const [clubProfile, setClubProfile] = useState([]);

  const [openBackDrop, setOpenBackDrop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const id = props.match.params.id;
      let result = await getEventDetail(id);
      if (result.ok) {
        setEventDetail(result.data);
        setActivities(result.data.eventActivities);
      }
    }
    fetchData();
  }, [props.match.params.id]);

  useEffect(() => {
    console.log(eventDetail);
    if (eventDetail && eventDetail.clubInfos) {
      var owningClub = eventDetail.clubInfos.find(
        (club) => (club.isOwner = true)
      );
      setOwningClub(owningClub.clubProfileId);

      var coopClubs = eventDetail.clubInfos.filter(
        (club) => club.isOwner !== true
      );
      coopClubs.forEach((club) => {
        setClubProfile((prev) => [...prev, club.clubProfileId]);
      });
    }
  }, [eventDetail]);

  const handleApproveDraftEvent = async () => {
    setOpenBackDrop(true);
    let data = {
      eventName: eventDetail.eventName,
      description: eventDetail.description,
      place: eventDetail.place,
      eventStartTime:
        eventDetail.eventStartTime.split(" ")[0] +
        "T" +
        eventDetail.eventStartTime.split(" ")[1],
      eventEndTime:
        eventDetail.eventEndTime.split(" ")[0] +
        "T" +
        eventDetail.eventEndTime.split(" ")[1],
      eventStatus: "PUBLISHED",
      eventCategory: eventDetail.eventCategory,
      owningClubProfileId: owningClub,
      clubProfileIds: clubProfile,
    };
    let result = await updateEvent(eventDetail.id, data);
    if (result.ok) {
      history.push("/app/events/1");
    }
  };

  const renderButton = () => {
    if (eventDetail.eventStatus === "DRAFT") {
      return (
        <Button
          style={{ width: "15ch", height: "5vh" }}
          variant="contained"
          color="primary"
          onClick={handleApproveDraftEvent}
        >
          Publish
        </Button>
      );
    } else return <div></div>;
  };

  return (
    <Container className={classes.container}>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            {eventDetail.eventName}
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {eventDetail.description}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Typography>
            <span className={classes.subtitle} style={{ lineHeight: "2" }}>
              ⏰Date & Time:{" "}
            </span>
            {convertFullDateTime(eventDetail.eventStartTime)}
          </Typography>
          <Typography>
            <span style={{ lineHeight: "2" }} className={classes.subtitle}>
              🏣Place:{" "}
            </span>
            {eventDetail.place}
          </Typography>

          <CardMedia
            component="img"
            className={classes.media}
            alt={eventDetail.eventName}
            image={eventDetail.image}
            title={eventDetail.eventName}
          />

          <Typography
            variant="h4"
            style={{ marginTop: "40px", textAlign: "center" }}
          >
            Activities
          </Typography>
          <Grid container className={classes.grid}>
            <Grid
              className={`${classes.borderGrid} ${classes.borderRight}`}
              item
              xs={2}
            >
              <Typography variant="h6">Activities</Typography>
            </Grid>
            <Grid
              className={`${classes.borderGrid} ${classes.borderRight}`}
              item
              xs={6}
            >
              <Typography variant="h6">Content</Typography>
            </Grid>
            <Grid
              className={`${classes.borderGrid} ${classes.borderRight}`}
              item
              xs={2}
            >
              <Typography variant="h6">Place</Typography>
            </Grid>
            <Grid className={`${classes.borderGrid}`} item xs={2}>
              <Typography variant="h6">Start time</Typography>
            </Grid>
            {activities.map((activity) => (
              <>
                <Grid
                  className={`${classes.borderGrid} ${classes.borderRight}`}
                  item
                  xs={2}
                >
                  <Typography>{activity.eventActivityName}</Typography>
                </Grid>
                <Grid
                  className={`${classes.borderGrid} ${classes.borderRight}`}
                  item
                  xs={6}
                >
                  <Typography>{activity.content}</Typography>
                </Grid>
                <Grid
                  className={`${classes.borderGrid} ${classes.borderRight}`}
                  item
                  xs={2}
                >
                  <Typography>{activity.location}</Typography>
                </Grid>
                <Grid className={`${classes.borderGrid}`} item xs={2}>
                  <Typography>{activity.startTime}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="follow">
            <Favorite className={classes.largeIcon} />
          </IconButton>
        </CardActions>
        <Divider style={{ width: "95%", margin: "5px auto" }} />
        <div className={classes.footer}>
          {eventDetail.eventStatus === "PUBLISHED" ? (
            <Typography
              component={Link}
              to={`/app/posts/?eventId=${eventDetail.id}`}
              className={classes.link}
            >
              Read more posts
            </Typography>
          ) : (
            renderButton()
          )}

          <div className={classes.avatars}>
            {eventDetail?.clubInfos?.map((club) => (
              <Avatar
                alt="Remy Sharp"
                src={club.avatar}
                className={classes.largeAvatar}
              />
            ))}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default EventDetail;
