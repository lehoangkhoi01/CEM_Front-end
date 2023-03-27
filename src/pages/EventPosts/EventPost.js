import React, { useEffect, useState } from "react";
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
  Backdrop,
  CircularProgress,
  Typography,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Input,
  Snackbar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MuiAlert from "@material-ui/lab/Alert";
import {
  getPosts,
  getPostsByEventId,
  createPost,
} from "../../services/postService";
import { searchEvents } from "../../services/eventService";
import {
  getStudentAccount,
  getStudentClubProfile,
} from "../../services/userService";
import { pageSize } from "../../helpers/constant";
import { ref, storage, uploadBytesResumable } from "../../firebase/index";
import { useStyles } from "./style";
import jwtDecode from "jwt-decode";

const EventPost = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState([]);
  const [postClub, setPostClub] = useState("");
  const [student, setStudent] = useState({});
  const [imageList, setImageList] = useState([]);
  const [clubProfile, setClubProfile] = useState([]);
  const [clubEvent, setClubEvent] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    eventId: 0,
    picture: "",
    clubProfileId: 0,
  });

  const [openBackDrop, setOpenBackDrop] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    setOpenBackDrop(true);
    var searchQuery = props.location.search;
    if (searchQuery !== "") {
      var paramType = searchQuery.substr(
        searchQuery.indexOf("?") + 1,
        searchQuery.indexOf("=") - 1
      );
      if (paramType === "eventId") {
        var eventId = searchQuery.substr(searchQuery.indexOf("=") + 1);
        async function fetchData() {
          let result = await getPostsByEventId(eventId);
          if (result.ok) {
            setPostClub(result.data.value[0].ClubProfile.ClubName);
            setPosts(result.data.value.reverse());
          }
        }
        fetchData();
      }
    } else {
      async function fetchData() {
        let result = await getPosts(1, pageSize);
        if (result.ok) {
          setPosts(result.data.value.reverse());
          setPostClub("");
        }
      }
      fetchData();
    }

    setTimeout(() => {
      setOpenBackDrop(false);
    }, 3000);
  }, [props.location.search]);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  useEffect(() => {
    async function fetchStudentClubProfile() {
      let result = await getStudentClubProfile(student.studentAccountId);
      if (result.ok) {
        setClubProfile(result.data);
      }
    }
    if (student.studentAccountId) {
      fetchStudentClubProfile();
    }
  }, [student]);

  useEffect(() => {
    async function fetchEventByClub() {
      if (clubProfile.length > 0) {
        let dataQuery = {
          clubId: clubProfile[0].clubProfileId,
          eventStatus: 0,
          sortByCreatedDate: true,
        };
        let result = await searchEvents(dataQuery);
        if (result.ok) {
          setClubEvent(result.data.data);
          setNewPost((prevState) => ({
            ...prevState,
            eventId: result.data.data[0].id,
          }));
        }
      }
    }

    fetchEventByClub();
    setNewPost((prevState) => ({
      ...prevState,
      clubProfileId: clubProfile[0]?.clubProfileId,
    }));
  }, [clubProfile]);

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

    fetchAccount();
  }, []);

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
    var imageListObject = e.target.files;
    var numberImage = Object.keys(imageListObject).length;

    var images = [];
    for (var i = 0; i < numberImage; i++) {
      images.push(imageListObject[i]);
    }
    setImageList(images);
  };

  const handleNewPostChange = (e, propName) => {
    setNewPost((prevState) => ({
      ...prevState,
      [propName]: e.target.value,
    }));
  };

  const generateFolderFirebase = () => {
    return (
      student.studentAccountId.toString() + new Date().getTime().toString()
    );
  };

  const postData = async (data) => {
    let result = await createPost(data);
    console.log(result);
  };

  const handleOnSubmitForm = () => {
    let data = {
      ...newPost,
    };
    if (data.content !== "") {
      if (imageList.length > 0) {
        data.picture = generateFolderFirebase();

        const promises = [];
        imageList.map((image) => {
          const sotrageRef = ref(
            storage,
            `posts/${data.picture}/${image.name}`
          );
          const uploadTask = uploadBytesResumable(sotrageRef, image);
          promises.push(uploadTask);
          uploadTask.on("state_changed", (error) => console.log(error));
        });

        Promise.all(promises)
          .then(() => {
            data.picture = "posts/" + data.picture;
            postData(data);
          })
          .then((err) => console.log(err));
      } else {
        postData(data);
      }
    } else {
      setAlertType("error");
      setOpenSnackbar(true);
      setAlertMessage("The field Content should not be empty");
    }
  };

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
        <Alert severity={alertType}>{alertMessage}</Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {postClub !== "" ? (
        <Typography variant="h5">Posted by {postClub}</Typography>
      ) : (
        <></>
      )}

      {postList.map((post) => (
        <Post postDetail={post} />
      ))}

      <Fab
        onClick={handleClickOpen}
        aria-label="Add"
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>

      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <div className={classes.formGroup}>
              <TextField
                onChange={(e) => handleNewPostChange(e, "content")}
                id="postContent"
                label="Content"
                multiline
                fullWidth
                maxRows={4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.formGroup}>
              <div className={classes.formGroup}>
                <TextField
                  onChange={handleImageChange}
                  id="fileUpload"
                  label="Images"
                  type="file"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    accept: "image/jpeg, image/png",
                    multiple: true,
                  }}
                />
              </div>

              <FormControl className={classes.formControl}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Event
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-mutiple-name"
                  onChange={(e) => handleNewPostChange(e, "eventId")}
                  defaultValue={clubEvent.length > 0 ? clubEvent[0].id : null}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {clubEvent?.map((event) => (
                    <MenuItem key={event.id} value={event.id}>
                      {event.eventName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOnSubmitForm} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventPost;
