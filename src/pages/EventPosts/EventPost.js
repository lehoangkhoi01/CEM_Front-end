import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Post from "../../components/Post/Post";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";

const EventPost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className={classes.container}>
      <Post />
      <Post />
      <Post />

      <Fab
        onClick={handleClickOpen}
        aria-label="Add"
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>

      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventPost;
