import {
  Avatar,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { clubs } from "../../testData";

const ClubDetail = () => {
  const classes = useStyles();
  const [clubDetail, setClubDetail] = useState({});

  useEffect(() => {
    setClubDetail(clubs[1]);
  }, []);
  return (
    <Container className={classes.container}>
      <Card>
        <CardContent>
          <div className={classes.headerContainer}>
            <Avatar
              variant="square"
              src={clubDetail.avatar}
              className={classes.avatar}
            />
            <Typography
              component="div"
              className={classes.clubName}
              variant="h3"
            >
              {clubDetail.clubName}
            </Typography>
          </div>
          <Grid container className={classes.grid}>
            <Grid item xs={6}>
              <Typography variant="h6">Description: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{clubDetail.clubDescription}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Foundation date: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{clubDetail.foundationDate}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Members: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{clubDetail.totalMembers}</Typography>
            </Grid>

            <Grid item xs={6} className={classes.navContainer}>
              <Link variant="h6" href="/app/clubs" className={classes.nav}>
                See all clubs
              </Link>
              <Link variant="h6" href="/app/events" className={classes.nav}>
                Club's events
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ClubDetail;
