import React, { useState } from 'react';
import {withStyles,createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import Appnavbar from './Navbar';
import {connect} from 'react-redux';
import Posts from './Posts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SidePanel from './SidePanel';
import{setAlert} from '../actions/alert'


const themee = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightMedium: 500,
    body1: {
      fontWeight:500,
      fontStyle: 'sans-serif',
    },
    button: {
      fontSize: 15,
      fontStyle: 'BlinkMacSystemFont',
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  
  },
  inline: {
    display: 'inline'
  },
  grid: {
    width: 1200,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 10px)'
    }
  },
  
  
  box: {
    marginBottom: 40,
    height:'auto'
   
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  
  },
  paper1: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
})
const main=(props)=>  {
  
    const { classes ,setAlert} = props;
    const [searchString,setsearchString] = useState('')
    const handleChange = (e) => {
      setsearchString({ searchString:e.target.value });
    }

  console.log(searchString)
    return (
    
      <MuiThemeProvider theme={themee}>  
      <React.Fragment>
          <CssBaseline />
          <Appnavbar Searchinput={handleChange} />
          <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={3} alignItems="flex-start" justify="center" container className={classes.grid}>
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                   
            <SidePanel/>
        
                  </div>
               
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper className={classes.paper1}>
                  <div className={classes.box}>
                       <Posts value={searchString}/>
                     
                  </div>
             
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='inherit' variant="subtitle1">
                    Announcement!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Buy the coin and fucking post your speech!
                    </Typography>
                  </div>
                </Paper>
              </Grid>
        
            </Grid>
          </Grid>
       
        </div>
     </React.Fragment>
     </MuiThemeProvider>
    );
  }

export default connect(null,{setAlert})(withStyles(styles)(main));