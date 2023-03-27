import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    height: 450,
  },
}));

export const useImageStyle = makeStyles({
  root: {
    width: "100%", 
    padding: "2px",
    height: "unset"
  }
}, { name: 'MuiImageListItem' });

