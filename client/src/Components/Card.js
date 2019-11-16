import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddComment from '@material-ui/icons/AddComment';
import Person from '@material-ui/icons/Person';
const styles = theme => ({
  card: {
    maxWidth: 700,
    marginBottom:10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button:{
    position: 'absolute',
    right: 10,
   
  },

  avatar: {
    backgroundColor: grey[500],
  },
});

class RecipeReviewCard extends React.Component {

  render() {
    const { classes,post } = this.props;
    const date=<Moment>{post.date}</Moment>
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <Person/>
            </Avatar>
          }
     
          title={post.name}
          subheader={date}
         
        />
    
        <CardContent>
          <Typography component="h1">
           {post.text}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} >
          <IconButton aria-label="Add to favorites" >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <AddComment />
          </IconButton>
     
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);