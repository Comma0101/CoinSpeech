import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SignIn from "./SignIn";

function getModalStyle() {
  const top = 25;
  const left = 25;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  }
});

const SigninModal = props => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes, SigninModalRef } = props;

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleOpen}
      >
        Sign In
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <SignIn modalControl={handleClose} />
      </Modal>
    </div>
  );
};

SigninModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(SigninModal);
