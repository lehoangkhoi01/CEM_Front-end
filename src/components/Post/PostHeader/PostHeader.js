import { Avatar, CardHeader, Typography } from "@material-ui/core";
import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { useStyles } from "./style";
import { convertDatatime } from "../../../helpers/datetimeUtil";

const PostHeader = ({ postDetail }) => {
  const classes = useStyles();
  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src={postDetail.ClubProfile.Avatar}
        />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={
        <Typography variant="h6">{postDetail.ClubProfile.ClubName}</Typography>
      }
      subheader={
        <Typography variant="subtitle2">
          {convertDatatime(postDetail.CreatedDate)}
        </Typography>
      }
    />
  );
};

export default PostHeader;
