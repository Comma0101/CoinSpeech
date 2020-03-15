import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
    marginBottom: theme.spacing(2)
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1)
  }
});
const PasswordReset = props => {
  const { classes } = props;
  const [email, setEmail] = useState("");

  const onChange = e => setEmail(e.target.value);
  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // const obj = { email };
    const body = JSON.stringify({ email });
    // console.log(body);
    try {
      const res = await axios.post("/api/passwordreset", body, config);
    } catch (err) {
      const errors = err.response.data.errors;
    }
  };
  return (
    <div className={classes.paper}>
      <h1>Please Enter Your Registered Emial to Reset the Password</h1>
      <form onSubmit={e => onSubmit(e)} className={classes.form} noValidate>
        <TextField
          required
          type="text"
          id="Emial"
          label="Emial"
          variant="outlined"
          //value={email}
          onChange={e => onChange(e)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default withStyles(styles)(PasswordReset);
