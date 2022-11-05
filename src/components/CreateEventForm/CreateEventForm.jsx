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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";
import { useTheme } from "@material-ui/core/styles";

const CreateEventForm = ({ handleSubmit }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [coopClubs, setCoopClubs] = useState([]);
  const [eventCategory, setEventCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [activityCount, setActivityCount] = useState(1);
  const [activities, setActivities] = useState([]);

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
  const categories = ["Academic", "Workshop", "Performance"];
  const types = ["Internal", "External"];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSelectClubsChange = (event) => {
    setCoopClubs(event.target.value);
  };

  const handleSelectEventCategoryChange = (event) => {
    setEventCategory(event.target.value);
  };

  const handleSelectEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleIncreaseActivity = () => {
    if (activityCount < 5) {
      setActivityCount(activityCount + 1);
    }
  };

  const handleOnSubmit = () => {
    const data = { eventCategory, eventType };
    handleSubmit(data);
  };

  useEffect(() => {
    setEventCategory(categories[0]);
    setEventType(types[0]);
  }, []);

  return (
    <div className={classes.root}>
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
        />

        <TextField
          label="Place"
          id="place"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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
                style={getStyles(club, coopClubs, theme)}
              >
                {club}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.formGroup}>
        <TextField
          id="eventStartTime"
          label="Event start time"
          type="datetime-local"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="eventEndTime"
          label="Event end time"
          type="datetime-local"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className={classes.formGroup}>
          <TextField
            id="fileUpload"
            label="Event promo image"
            type="file"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ accept: "image/jpeg, image/png", multiple: true }}
          />
        </div>
      </div>

      <div className={classes.formGroup}>
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
                style={getStyles(category, eventCategory, theme)}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="eventType"
            defaultValue={types[0]}
            onChange={handleSelectEventTypeChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {types.map((type) => (
              <MenuItem
                key={type}
                value={type}
                style={getStyles(type, eventType, theme)}
              >
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={classes.formGroup}></div>
      </div>

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
                multiline
                maxRows={3}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="eventStartTime"
                label="Activity start time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="eventEndTime"
                label="Activity end time"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="activityPlace1"
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
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateEventForm;
