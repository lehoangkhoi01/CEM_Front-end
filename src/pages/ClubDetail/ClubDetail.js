import React, { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Link,
} from "@material-ui/core";
import EventCard from "../../components/EventCard/EventCard";
import { useStyles } from "./style";
import jwtDecode from "jwt-decode";
import { getStudentAccount } from "../../services/userService";
import { getClubDetail } from "../../services/clubService";
import { searchEvents } from "../../services/eventService";
import { convertDateTimeToString } from "../../helpers/datetimeUtil";
import { pageSize } from "../../helpers/constant";
import PaginationOutlined from "../../components/Pagination/Pagination";

const ClubDetail = (props) => {
  const classes = useStyles();
  const [clubDetail, setClubDetail] = useState({});
  const [eventList, setEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [student, setStudent] = useState({});

  useEffect(() => {
    var token = localStorage.getItem("token");
    var tokenObject = jwtDecode(token);
    async function fetchAccount() {
      const email =
        tokenObject[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];
      let result = await getStudentAccount(email);
      if (result.ok) {
        setStudent(result.data);
      }
    }

    async function fetchClubDetail() {
      const id = props.match.params.id;
      let result = await getClubDetail(id);
      if (result.ok) {
        setClubDetail(result.data);
      }
    }

    async function fetchEventsByClub() {
      const id = props.match.params.id;
      let dataQuery = {
        pageIndex: currentPage,
        pageSize: pageSize,
        clubId: id,
        sortByCreatedDate: true,
      };
      let result = await searchEvents(dataQuery);

      if (result.ok) {
        setEventList(result.data.data);
        setTotalPage(result.data.totalPage);
      }
    }

    fetchAccount();
    fetchClubDetail();
    fetchEventsByClub();
  }, [props.match.params.id, currentPage]);

  useEffect(() => {
    var searchQuery = props.location.search;
    setCurrentPage(
      Number.parseInt(searchQuery.substr(searchQuery.indexOf("=") + 1))
    );
  }, [props.location.search]);

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
              <Typography>{clubDetail.summary}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Foundation date: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {clubDetail.foundationDate
                  ? convertDateTimeToString(clubDetail.foundationDate)
                  : ""}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Members: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {clubDetail.memeberInfos ? clubDetail.memeberInfos.length : ""}
              </Typography>
            </Grid>

            <Grid item xs={6} className={classes.navContainer}>
              <Link variant="h6" href="/app/clubs" className={classes.nav}>
                See all clubs
              </Link>
            </Grid>
          </Grid>

          <Grid style={{ margin: "10px auto" }} container spacing={4}>
            {eventList.map((event) => (
              <Grid item xs={4} xl={3}>
                <EventCard key={event.id} event={event} />
              </Grid>
            ))}
          </Grid>
          <PaginationOutlined
            currentPage={currentPage}
            totalPage={totalPage}
            url={`/app/club/${clubDetail.clubProfileId}`}
            searchQuery={`page=${currentPage}`}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ClubDetail;
