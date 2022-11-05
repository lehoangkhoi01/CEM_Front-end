import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    marginBottom: "100px",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    maxWidth: "unset",
    minHeight: "90vh",
  },

  headerContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },

  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },

  clubName: {
    display: "flex",
    alignItems: "center",
  },

  grid: {
    flexGrow: 1,
  },

  navContainer: {
    marginTop: "20px",
  },

  nav: {
    margin: "20px",
  },
}));
