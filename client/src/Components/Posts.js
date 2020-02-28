import TextInput from "./TextInput";
import Card from "./Card";
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import Spinner from "./Spinner";

const Posts = ({ getPosts, post: { posts, loading }, value }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  //const originalpost;

  if (value != "") {
    console.log(value.searchString.length);
    posts = posts.filter(function(i) {
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
              {posts.map(post => (
                <Card key={post._id} post={post} />
              ))}
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
