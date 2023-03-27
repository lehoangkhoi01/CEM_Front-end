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

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  subtitle: {
    fontWeight: "bold",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
  },
  avatars: {
    display: "flex",
  },

  largeIcon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },

  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "10px",
  },

  link: {
    display: "flex",
    alignItems: "center",
  },
  media: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
    height: "60vh",
    objectFit: "contain",
  },
  borderGrid: {
    borderBottom: "1px solid black",
    textAlign: "center",
  },
  borderRight: {
    borderRight: "1px solid black",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
