import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 50vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/app");
  };

  return (
    <Container>
      <h2>404 - Page not found</h2>
      <p>The page you were looking for could not be found.</p>
      <p>You can try searching for something, or:</p>
      <Button onClick={handleClick} variant="contained" color="primary">
        Go to the homepage
      </Button>
    </Container>
  );
};

export default NotFound;
