import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Appnavbar from './Navbar';
import {connect} from 'react-redux';
import{loadUser } from '../actions/auth'
const styles = theme => ({
    main: {
        width: 'auto',
        height:'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3) ,
        [theme.breakpoints.up(400 + theme.spacing(3*2))]: {
          width: 400,
        height:900,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
  card: {
    maxWidth: 400,
    maxHeight:900
  },
  

  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom : theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
      fullWidth: true,
   
    
  },

  cardcontent:{
  
  },
 
});

const Profile =(props)=> {
 
 
 
    const { classes,loadUser,isAuthenticated,user } =props;

    if(isAuthenticated){
      loadUser()
      //console.log(user)
    }
    const date=<Moment>{user.date}</Moment>
    return (
        <div> 
          <Appnavbar/>
        <main className={classes.main}>
      
         <CssBaseline />
         <Paper className={classes.paper}>
      
      <Paper className={classes.paper}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {user.name}
            </Avatar>
          }
          title={user.name}
          subheader={date}
        />
         <CardContent width="100%" className={classes.cardcontent} >
    <Typography >
          Here is how many coin you have!
        </Typography>
        <Typography >
          {user.coins}
        </Typography>
    </CardContent>
        </Paper>
  
     
      </Paper>
         </main>
         </div>
    );
  }


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps= state =>({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})
export default connect(mapStateToProps,{loadUser})(withStyles(styles)(Profile));