import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Card from "../../components/Card/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";
import { getClubs, createNewClub } from "../../services/clubService";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/index";

const Club = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [image, setImage] = useState({});
  const [newClub, setNewClub] = useState({
    clubName: "",
    summary: "",
    avatar: "",
    foundationDate: "",
    socialAddress: "",
    memberInforMap: {
      "": true,
    },
  });

  const [openBackDrop, setOpenBackDrop] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("eerror");
  const [alartMessage, setAlertMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setOpenBackDrop(true);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "clubs/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let data = { ...newClub };
          data.avatar = downloadURL;
          handlePostData(data);
        });
      }
    );
  };

  const handlePostData = async (data) => {
    let result = await createNewClub(data);
    console.log(result);
    if (result.ok) {
      setOpenBackDrop(false);
      setOpen(false);
      window.location.reload();
      setAlertType("success");
      setAlertMessage("Create club successfully");
      setOpenSnackbar(true);
    } else {
      if (result.status === 400) {
        setOpenBackDrop(false);
        setAlertType("error");
        setAlertMessage(result.data.title);
        setOpenSnackbar(true);
      }
    }
  };

  const handleNewClubPropChange = (e, prop) => {
    setNewClub((prevState) => ({
      ...prevState,
      [prop]: e.target.value,
    }));
  };

  const handleNewClubEmailChange = (e) => {
    setNewClub((prevState) => ({
      ...prevState,
      memberInforMap: {
        [e.target.value]: true,
      },
    }));
  };

  useEffect(() => {
    async function fetchData() {
      let result = await getClubs();
      if (result.ok) {
        setClubList(result.data.data);
      }
    }
    fetchData();
    setTimeout(() => {
      setOpenBackDrop(false);
    }, 2000);
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <Container className={classes.container}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={alertType}>{alartMessage}</Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
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

      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">Club Form</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill your club's information in this form.
          </DialogContentText>
          <div className={classes.root}>
            <div className={classes.formGroup}>
              <TextField
                id="clubName"
                onChange={(e) => handleNewClubPropChange(e, "clubName")}
                label="Club name"
                multiline
                maxRows={3}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="socialAddress"
                type="text"
                label="Social address"
                onChange={(e) => handleNewClubPropChange(e, "socialAddress")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formGroup}>
              <TextField
                id="date"
                label="Foundation date"
                type="date"
                onChange={(e) => handleNewClubPropChange(e, "foundationDate")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="fileUpload"
                label="Club avatar"
                type="file"
                onChange={handleImageChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ accept: "image/jpeg, image/png", multiple: true }}
              />
            </div>

            <div className={classes.formGroup}>
              <TextField
                id="email"
                label="Chairman's email"
                type="text"
                onChange={(e) => handleNewClubEmailChange(e)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formGroup}>
              <TextField
                id="clubDescription"
                onChange={(e) => handleNewClubPropChange(e, "summary")}
                label="Short description"
                multiline
                fullWidth
                maxRows={4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Club;
