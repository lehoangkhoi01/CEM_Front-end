import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  Fab,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";
import { createEvent, addEventActivity } from "../../services/eventService";
import {
  getStudentAccount,
  getStudentClubProfile,
} from "../../services/userService";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/index";
import jwtDecode from "jwt-decode";

const CreateEventForm = () => {
  const defaultActivityList = [
    {
      EventActivityName: "",
      Content: "",
      Location: "",
      StartTime: "",
      EndTime: "",
      EventId: 0,
    },
    {
      EventActivityName: "",
      Content: "",
      Location: "",
      StartTime: "",
      EndTime: "",
      EventId: 0,
    },
    {
      EventActivityName: "",
      Content: "",
      Location: "",
      StartTime: "",
      EndTime: "",
      EventId: 0,
    },
    {
      EventActivityName: "",
      Content: "",
      Location: "",
      StartTime: "",
      EndTime: "",
      EventId: 0,
    },
    {
      EventActivityName: "",
      Content: "",
      Location: "",
      StartTime: "",
      EndTime: "",
      EventId: 0,
    },
  ];

  const classes = useStyles();
  const [coopClubs, setCoopClubs] = useState([]);
  const [eventCategory, setEventCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [image, setImage] = useState({});
  const [clubProfile, setClubProfile] = useState([]);
  const [status, setStatus] = useState("");

  const [student, setStudent] = useState({});
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [activityCount, setActivityCount] = useState(1);
  const [activities, setActivities] = useState(defaultActivityList);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alartMessage, setAlertMessage] = useState(
    "Create event successfully!"
  );

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

  const clubs = ["F-Code", "FEV", "FTI", "FFV", "FFC", "SITI", "MEC"];
  const categories = ["Academic", "Performance", "Workshop", "Talkshow"];
  const types = [
    {
      key: true,
      value: "Internal",
    },
    {
      key: false,
      value: "External",
    },
  ];
  const eventStatus = ["DRAFT", "PUBLISHED"];

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSelectClubsChange = (event) => {
    setCoopClubs(event.target.value);
  };

  const handleSelectEventCategoryChange = (event) => {
    setEventCategory(event.target.value);
  };

  const handleSelectEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleSelectEventStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleEventPlaceChange = (e) => {
    setEventPlace(e.target.value);
  };

  const handleEventStarttimeChange = (e) => {
    setEventStartTime(e.target.value);
  };

  const handleEventEndtimeChange = (e) => {
    setEventEndTime(e.target.value);
  };

  const handleIncreaseActivity = () => {
    if (activityCount < 5) {
      setActivityCount(activityCount + 1);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    setOpenBackDrop(true);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "events/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            eventName: eventName,
            description: eventDescription,
            place: eventPlace,
            eventStartTime: eventStartTime,
            eventEndTime: eventEndTime,
            eventCategory: eventCategory,
            isInternal: eventType,
            owningClubProfileId: clubProfile[0].clubProfileId,
            clubProfileIds: coopClubs,
            eventStatus: status,
            images: downloadURL,
          };
          console.log(data);
          handleOnSubmit(data);
        });
      }
    );
  };

  //-------------- Activity ---------------
  const handleActivityPropsChange = (e, key, propName) => {
    let newData = [...activities];
    newData[key][propName] = e.target.value;
    setActivities(newData);
  };

  const CreateActivity = async (eventId) => {
    activities.forEach(async (activity) => {
      if (activity.EventActivityName !== "") {
        activity.EventId = eventId;
        let result = await addEventActivity(activity);
        console.log(result);
      }
    });
    setOpenBackDrop(false);
  };
  //------------------------------------

  const handleOnSubmit = async (data) => {
    let result = await createEvent(data);
    if (result.ok) {
      await CreateActivity(result.data);
      setOpenSnackbar(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      if (result.status === 400) {
        setAlertType("error");
        setAlertMessage(result.data.title);
        setOpenSnackbar(true);
        setOpenBackDrop(false);
      }
    }
  };

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
    setEventCategory(categories[0]);
    setEventType(types[0]["key"]);
  }, []);

  useEffect(() => {
    async function fetchStudentClubProfile() {
      let result = await getStudentClubProfile(student.studentAccountId);
      if (result.ok) {
        console.log(result.data);
        setClubProfile(result.data);
      }
    }
    if (student.studentAccountId) {
      fetchStudentClubProfile();
    }
  }, [student]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className={classes.root}>
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

      <div className={classes.formGroup}>
        <TextField
          id="eventName"
          label="Event name"
          multiline
          maxRows={3}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEventNameChange}
        />

        <TextField
          label="Place"
          id="place"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEventPlaceChange}
        />

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Coop clubs (optional)
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-mutiple-name"
            multiple
            value={coopClubs}
            onChange={handleSelectClubsChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {clubs.map((club) => (
              <MenuItem
                key={club}
                value={club}
                //style={getStyles(club, coopClubs, theme)}
              >
                {club}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="eventCategory"
            defaultValue={categories[0]}
            onChange={handleSelectEventCategoryChange}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem
                key={category}
                value={category}
                //style={getStyles(category, eventCategory, theme)}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.formGroup}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="eventType"
            defaultValue={types[0].key}
            onChange={handleSelectEventTypeChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {types.map((type) => (
              <MenuItem
                key={type.value}
                value={type.key}
                //style={getStyles(type.key, eventType, theme)}
              >
                {type.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="eventStartTime"
          label="Event start time"
          type="datetime-local"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEventStarttimeChange}
        />

        <TextField
          id="eventEndTime"
          label="Event end time"
          type="datetime-local"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEventEndtimeChange}
        />

        <div className={classes.formGroup}>
          <TextField
            id="fileUpload"
            label="Event promo image"
            type="file"
            onChange={handleImageChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ accept: "image/jpeg, image/png", multiple: true }}
          />
        </div>

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="eventStatus"
            defaultValue={eventStatus[0]}
            onChange={handleSelectEventStatus}
            MenuProps={MenuProps}
          >
            {eventStatus.map((status) => (
              <MenuItem
                key={status}
                value={status}
                //style={getStyles(category, eventCategory, theme)}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.formGroup}></div>

      <div className={classes.formGroup}>
        <TextField
          id="eventDescription"
          label="Description"
          multiline
          fullWidth
          maxRows={4}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEventDescriptionChange}
        />
      </div>

      <div className={classes.activitySection}>
        <Typography variant="h5" style={{ margin: "10px 0" }}>
          Activities
        </Typography>
        {[...Array(activityCount).keys()].map((key) => (
          <div className={classes.activityWWrapper}>
            <Typography variant="h6">Activity {key + 1}</Typography>
            <div className={classes.formGroup}>
              <TextField
                id={`activity${key + 1}`}
                label="Activity name"
                onChange={(e) =>
                  handleActivityPropsChange(e, key, "EventActivityName")
                }
                multiline
                maxRows={3}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id={`activityContent${key + 1}`}
                label="Content"
                onChange={(e) => handleActivityPropsChange(e, key, "Content")}
                multiline
                maxRows={3}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id={`activityStart${key + 1}`}
                label="Activity start time"
                type="datetime-local"
                onChange={(e) => handleActivityPropsChange(e, key, "StartTime")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id={`activityEnd${key + 1}`}
                label="Activity end time"
                type="datetime-local"
                onChange={(e) => handleActivityPropsChange(e, key, "EndTime")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id={`location${key + 1}`}
                onChange={(e) => handleActivityPropsChange(e, key, "Location")}
                label="Place"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        ))}

        <Fab
          onClick={handleIncreaseActivity}
          aria-label="Add"
          className={classes.fab}
          color="primary"
        >
          <AddIcon />
        </Fab>
      </div>

      <div className={classes.button}>
        <Button
          style={{ width: "20%" }}
          size="medium"
          variant="contained"
          color="primary"
          onClick={uploadImage}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateEventForm;
