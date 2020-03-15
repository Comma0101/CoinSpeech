import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SignIn from "./SignIn";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
});

const ConfirmModal = props => {
  const [modalStyle] = useState(getModalStyle);
  //const [callback] = useState(null);
  //   const [submitted] = useState(callback);
  const { classes, texts, modalControl } = props;
  console.log("im the message", texts);
  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Are you sure you want to post ?</h2>
      <p id="simple-modal-description">Please Confirm the message to post:</p>
      <h1>{texts}</h1>
      <Button onClick={modalControl}>Confirm</Button>
    </div>
  );
};

ConfirmModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(ConfirmModal);
