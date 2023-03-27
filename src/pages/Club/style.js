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
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
