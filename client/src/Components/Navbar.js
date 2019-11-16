import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Link as RouterLink } from 'react-router-dom';
import SigninModal from './SigninModal'
import RegisterModal from './RegisterModal'
import {loadUser} from '../actions/auth'
import {logout} from '../actions/auth'
import {connect} from 'react-redux';
import Link from '@material-ui/core/Link';

function getModalStyle() {
  const top = 20;
  const left = 20 ;

  return {
    top: `${top}%`,
    margin:'auto',
    left: `${left}%`,
   // transform: `translate(-${top}%, -${left}%)`,
  };
}
const styles = theme => ({
  palette: {
    primary: purple,
    secondery: green,
  },
  root: {
    width: '100%',
   
   
  },
  link:{
    textDecoration: 'none',
    color:'black'
  },

  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  authbutton:{
    display: 'flex',
  

  },
  link:{
    color:"inherit",
    underline:"none"
    
  }
});
const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CollisionLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
));
const  Navbar =(props) => {
  
  const [anchorEl,setAnchorEl] = useState(
    null
)
 
 const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

 const handleMenuClose = () => {
    setAnchorEl( null );
  };

const handleLogout=()=>{
  handleMenuClose();
  logout()
}


    const { classes,isAuthenticated, logout } = props;
  
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <div className={classes.link} >
      <Menu 
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        
      >
       
     <Link component={RouterLink} to="/Profile"  className={classes.link} underline="none">
        <MenuItem onClick={handleMenuClose}  >
        Profile 
        </MenuItem>
        </Link>
        <Link component={RouterLink} underline="none" to="/Checkout" className={classes.link} >
        <MenuItem> 
       Coin</MenuItem>
       </Link>
       
       <MenuItem onClick={handleLogout}> 
        Sign Out</MenuItem>
      </Menu>
      </div>
    );
    const authButton=(
    <div className={classes.authbutton} >
      <SigninModal/>
       <RegisterModal/>
       </div>
    ) 
    
    const accounticon = (
      <IconButton
      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    )
   

  
 
  return (
    <div className={classes.root}>
        
      <AppBar position="static" color="default" >
        <Toolbar>
        <Link component={RouterLink} to="/" className={classes.link}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          </Link>
          <Divider className={classes.divider} />
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
           Coin Speech
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
            onChange={props.Searchinput}
            
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
         
       
            
            <div>
            {isAuthenticated ? (
        <IconButton
        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      ) : (
       
     authButton
       
      )}
              </div>
                 
        </Toolbar>
      </AppBar>
   
      {renderMenu}
    </div>
  );
}


Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated:PropTypes.bool,
};
const mapStateToProps= state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loadUser,logout})(withStyles(styles)(Navbar));