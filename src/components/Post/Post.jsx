import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import BasicImageList from "../ImageList/ImageList";
import PostHeader from "./PostHeader/PostHeader";
import { useStyles } from "./style";


const Post = ({postDetail}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <PostHeader postDetail={postDetail}/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postDetail.Content}
        </Typography>
      </CardContent>
      <BasicImageList folderPic={postDetail.Picture}/>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
