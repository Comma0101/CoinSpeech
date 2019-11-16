import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Coin from './Coin'
import Appnavbar from './Navbar';

import axios from 'axios';
const styles = theme => ({
  
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap',
    marginBottom:theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select:{
    fullWidth: true,
  }
});

 const Checkout=(props)=> {
  const {classes} = props;
  const [coin, setCoin] = React.useState('');
  const [open, setOpen] = React.useState(false);
  function handleChange(event) {
    setCoin(event.target.value);
  
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
const onSubmit = async e =>{
    e.preventDefault();
    // fetch("/api/payment", {
    //   method: "post",
    //   body: JSON.stringify(
    //    {name:'coin'}),
    //   headers: {
    //     "x-auth-token": localStorage.token,
    //     "Content-Type":"application/x-www-form-urlencoded"
    //   },
    // }).then((res)=>{console.log(res)}).then(data=>{console.log(data)})
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
        'Content-Type': 'application/json'
      }
    };
    const obj = { coins: coin};
    const body = JSON.stringify(obj);
    
  try {
    const res = await axios.post('/api/payment', body, config);
    console.log(res.data)

  } catch (err) {
    const errors = err.response.data.errors;

 
  }

}
const ele=[]
for(let i= 0;i<100;i++){
  ele.push(i)
}
  return (
      <div> 
      <Appnavbar/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Coin/>
        </Avatar>
       
        <Typography component="h1" variant="h5">
          Buy Coin
        </Typography>
        <form className={classes.form} noValidate onSubmit={e=>onSubmit(e)}>
         
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">coins</InputLabel>
        <Select
          open={open}
          autoWidth={true}
          onClose={handleClose}
          onOpen={handleOpen}
          value={coin}
          onChange={handleChange}
          inputProps={{
            name: 'coin',
            id: 'demo-controlled-open-select',
          }}
        >
          {/* <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem> */}
          {ele.map(value => (
          <MenuItem key={value}value={value}>{value} </MenuItem >
        ))}
        </Select>
      </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Buy
          </Button>
      
     
        </form>
      </div>
    
    </Container>
    </div> 
  );
}
export default withStyles(styles)(Checkout);