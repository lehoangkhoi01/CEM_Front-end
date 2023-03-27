import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  Container,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  InputBase,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { useStyles } from "./style";
import PaginationOutlined from "../../components/Pagination/Pagination";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CreatEventForm from "../../components/CreateEventForm/CreateEventForm";
import {
  getPageCount,
  getEvents,
  searchEvents,
  createEvent,
  searchOnDraft,
} from "../../services/eventService";
import { pageSize } from "../../helpers/constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminDraftEvents = (props) => {
  const classes = useStyles();
  const [eventList, setEventList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [openBackDrop, setOpenBackDrop] = useState(true);

  const onHandleSearch = async (e) => {
    if (e.keyCode === 13) {
      setOpenBackDrop(true);
      let dataQuery = {
        eventName: e.target.value,
        pageIndex: 1,
        pageSize: pageSize,
      };
      let result = await searchOnDraft(dataQuery);
      if (result.ok) {
        setPageCount(result.data.totalPage);
        setEventList(result.data.data);
        setTimeout(() => {
          setOpenBackDrop(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(props.match.params.page);
  }, [props.match.params.page]);

  // useEffect(() => {
  //   async function fetchData() {
  //     let resultPageCount = await getPageCount(pageSize);
  //     if (resultPageCount.ok) {
  //       setPageCount(resultPageCount.data);
  //     }
  //   }
  //   fetchData();
  //   setTimeout(() => {
  //     setOpenBackDrop(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      let dataQuery = {
        pageIndex: 1,
        pageSize: pageSize,
        sortByCreatedDate: true,
      };
      let result = await searchOnDraft(dataQuery);
      if (result.ok) {
        setPageCount(result.data.totalPage);
        setEventList(result.data.data);
      }
    }
    fetchData();
    setTimeout(() => {
      setOpenBackDrop(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setOpenBackDrop(true);
    async function fetchEvents() {
      let dataQuery = {
        pageIndex: currentPage,
        pageSize: pageSize,
        sortByCreatedDate: true,
      };
      let result = await searchOnDraft(dataQuery);
      if (result.ok) {
        setEventList(result.data.data);
      }
    }

    fetchEvents();
    setTimeout(() => {
      setOpenBackDrop(false);
    }, 1000);
  }, [currentPage]);

  return (
    <Container className={classes.container}>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Draft Events</Typography>
        </Grid>
        <Grid
          style={{ display: "flex", justifyContent: "space-between" }}
          item
          xs={12}
        >
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onKeyDown={onHandleSearch}
          />
        </Grid>
        {eventList.map((event) => (
          <Grid item xs={4} xl={3}>
            <EventCard key={event.id} event={event} />
          </Grid>
        ))}
      </Grid>
      <PaginationOutlined
        currentPage={currentPage}
        totalPage={pageCount}
        url="/app/admin/draft"
      />
    </Container>
  );
};

export default AdminDraftEvents;
