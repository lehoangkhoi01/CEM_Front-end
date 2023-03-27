import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexBasis: "50%",
    flexGrow: 1,
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
  chips: {
    display: "flex",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  activitySection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: "50px",
    position: "relative",
  },
  activityWWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: "0px",
    right: theme.spacing(2),
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
