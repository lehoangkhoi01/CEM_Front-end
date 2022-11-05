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
}));
