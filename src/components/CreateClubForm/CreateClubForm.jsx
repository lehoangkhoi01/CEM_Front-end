import React from "react";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./style";

const CreateClubForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.formGroup}>
        <TextField
          id="clubName"
          label="Club name"
          multiline
          maxRows={3}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Total member"
          id="totalMember"
          type="number"
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
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="fileUpload"
          label="Club avatar"
          type="file"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ accept: "image/jpeg, image/png", multiple: true }}
        />
      </div>

      <div className={classes.formGroup}>
        <TextField
          id="clubDescription"
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
  );
};

export default CreateClubForm;
