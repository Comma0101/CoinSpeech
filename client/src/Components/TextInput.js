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

  return (
    <div>
      <Alert />
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            onChange={e => setText(e.target.value)}
            value={text}
            placeholder="Post Here"
            multiline
          />

          <Divider className={classes.divider} />
          <IconButton
            type="submit"
            color="default"
            className={classes.iconButton}
            aria-label="Directions"
          >
            <Send />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
};

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(withStyles(styles)(TextInput));
