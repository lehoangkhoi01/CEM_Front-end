import { Avatar, CardHeader, Typography } from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { useStyles } from "./style";

const PostHeader = () => {
  const classes = useStyles();
  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={<Typography variant="h6">F-Code</Typography>}
      subheader={
        <Typography variant="subtitle2">September 19, 2022</Typography>
      }
    />
  );
};

export default PostHeader;
