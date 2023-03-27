import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    marginTop: "50px",
  },
  pagination: {
    "& > ul": {
      justifyContent: "center",
    },
  },
}));

export default function PaginationOutlined({
  currentPage = 1,
  totalPage = 5,
  url,
  searchQuery = null,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        searchQuery ? (<Pagination
        page={Number.parseInt(currentPage)}
        className={classes.pagination}
        count={totalPage}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${url}?${searchQuery}`}
            {...item}
          />
        )}
      />)
        : (<Pagination
        page={Number.parseInt(currentPage)}
        className={classes.pagination}
        count={totalPage}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${url}/${item.page}`}
            {...item}
          />
        )}
      />)

      }
      
    </div>
  );
}
