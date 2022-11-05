import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useHistory } from "react-router-dom";
import { Home, Event, Group } from "@material-ui/icons";

import { useStyles } from "./style";

export default function Slidebar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key={1}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            onClick={() => history.push("/app/posts")}
          />
        </ListItem>

        <ListItem button key={2}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText
            primary="Events"
            onClick={() => history.push("/app/events/1")}
          />
        </ListItem>

        <ListItem button key={3}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText
            primary="Clubs"
            onClick={() => history.push("/app/clubs")}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
