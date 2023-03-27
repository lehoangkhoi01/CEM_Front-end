import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  eventName: {
    "-webkit-line-clamp": 1,
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-box-orient": "vertical",
  },
  clubName: {
    "-webkit-line-clamp": 1,
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-box-orient": "vertical",
  }
}));
