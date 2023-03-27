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
  fab: {
    position: "fixed",
    bottom: "20px",
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  formControl: {
    marginRight: theme.spacing(3),
    flexBasis: "50%",
    flexGrow: 1,
  },
}));
