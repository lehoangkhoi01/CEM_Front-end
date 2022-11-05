import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "../../components/Card/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";
import CreateClubForm from "../../components/CreateClubForm/CreateClubForm";
import { clubs } from "../../testData";
import { getClubs } from "../../services/clubService";

const Club = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [clubList, setClubList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      let result = await getClubs();
      console.log(result);

      if (result.ok) {
        setClubList(result.data.data);
      }
    }
    fetchData();
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">Clubs</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Create new club
          </Button>
        </Grid>
        {clubList.map((club) => (
          <Grid key={club.clubProfileId} item xs={4} xl={3}>
            <Card club={club} />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">Club Form</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill your club's information in this form.
          </DialogContentText>
          <CreateClubForm className={classes.dialog} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Club;
