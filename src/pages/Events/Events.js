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
} from "@material-ui/core";

import { useStyles } from "./style";
import PaginationOutlined from "../../components/Pagination/Pagination";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { events } from "../../testData";
import CreatEventForm from "../../components/CreateEventForm/CreateEventForm";
import { getPageCount, getEvents } from "../../services/eventService";
import { pageSize } from "../../helpers/constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Events = (props) => {
  const classes = useStyles();
  const [eventList, setEventList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setCurrentPage(props.match.params.page);
  }, [props.match.params.page]);

  useEffect(() => {
    async function fetchData() {
      let resultPageCount = await getPageCount(pageSize);

      if (resultPageCount.ok) {
        setPageCount(resultPageCount.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      let result = await getEvents(currentPage, pageSize);
      if (result.ok) {
        setEventList(result.data.data);
      }
    }

    fetchEvents();
  }, [currentPage]);

  return (
    <Container className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Events</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create new events
          </Button>
        </Grid>
        {eventList.map((event) => (
          <Grid item xs={4} xl={3}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
      <PaginationOutlined
        currentPage={currentPage}
        totalPage={pageCount}
        url="/app/events"
      />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Event Form
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent style={{ margin: "20px 0" }}>
          <DialogContentText>
            Please fill your this form to create an event.
          </DialogContentText>
          <CreatEventForm
            handleSubmit={handleSubmitForm}
            className={classes.dialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Events;
