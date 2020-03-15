import TextInput from "./TextInput";
import Card from "./Card";
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import Spinner from "./Spinner";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
const Posts = ({ getPosts, post: { posts, loading }, value }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  //const originalpost;
  const [load, setload] = useState(5);
  let data = new Array();
  for (let i = 0; i < load && posts.length; i++) {
    data[i] = posts[i];
  }
  const loadmore = () => {
    let reminder = posts.length % 5;

    if (reminder > 0 && posts.length - load == reminder) {
      setload(load + reminder);
    } else if (load == posts.length) {
      setload(posts.length);
    } else {
      setload(load + 5);
    }
  };
  console.log(load);
  console.log(posts.length);
  // if (load == posts.length) {
  //   return <Alert severity="warning">You have reached end of posts!</Alert>;
  // }
  if (value != "") {
    console.log(value.searchString.length);
    data = posts.filter(function(i) {
      return i.text.toLowerCase().match(value.searchString);
    });
  }
  return (
    <div>
      <TextInput />

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className="lead">
              <i className="fas fa-user" /> Welcome to the community
            </p>

            <div className="posts">
              {data.map(post => (
                <Card key={post._id} post={post} />
              ))}
              {load == posts.length ? (
                <h1>You have reached end of posts!</h1>
              ) : (
                <Button variant="contained" color="primary" onClick={loadmore}>
                  Load More
                </Button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
