import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import PaypalButton from "./PaypalButton";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

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

const PaypalButtonModal = props => {
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { coins, classes } = props;

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleOpen}
        fullWidth
      >
        Buy
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">The Total is {coins} $</h2>

          <PaypalButton modalControl={handleClose} coins={coins} />
        </div>
      </Modal>
    </div>
  );
};

PaypalButtonModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(PaypalButtonModal);
