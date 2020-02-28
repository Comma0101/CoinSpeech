import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import PaypalButton from "./PaypalButton";

function getModalStyle() {
  const top = 10;
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

class PaypalButtonModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { coins, classes } = this.props;

    return (
      <div>
        <Button
          className={classes.button}
          variant="contained"
          onClick={this.handleOpen}
        >
          Buy
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <PaypalButton modalControl={this.handleClose} coins={coins} />
        </Modal>
      </div>
    );
  }
}

PaypalButtonModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.

export default withStyles(styles)(PaypalButtonModal);
