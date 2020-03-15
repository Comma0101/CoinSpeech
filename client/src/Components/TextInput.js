import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import { addPost } from "../actions/post";
import { connect } from "react-redux";
import Alert from "./Alert";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 700,
    marginBottom: 10
  },
  input: {
    marginLeft: 18,
    flex: 2
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing()
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

const TextInput = props => {
  const { classes, addPost } = props;
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const handlesubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  const handlechange = e => {
    setText(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Alert />
      {/* <form onSubmit={handlesubmit}> */}
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          onChange={handlechange}
          value={text}
          placeholder="Post Here"
          multiline
        />

        <Divider className={classes.divider} />

        <IconButton
          //type="submit"
          color="default"
          className={classes.iconButton}
          aria-label="Directions"
          onClick={handleOpen}
        >
          <Send />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handlesubmit}>
            <DialogTitle id="alert-dialog-title">
              {"Please Confirm the Message You Want to Post"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button type="reset" onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <Confirm modalControl={handleClose} texts={text} />
          </Modal> */}
      </Paper>
      {/* </form> */}
    </div>
  );
};

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(withStyles(styles)(TextInput));
