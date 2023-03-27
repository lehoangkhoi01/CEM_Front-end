import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    maxWidth: "unset",
    minHeight: "90vh",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inputRoot: {
    marginRight: "40px",
    backgroundColor: "#ECEFF1",
    borderRadius: "5px",
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
