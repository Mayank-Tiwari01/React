import React, { Component } from "react";
import PropTypes from 'prop-types';

class GithubId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idData: null
    };
  }

  async componentDidMount() {
    const { username } = this.props;
    try {
      let response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let userId = await response.json();

      this.setState({
        idData: userId
      });
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  render() {
    const { idData } = this.state;

    if (idData === null) {
      return <h1>Profile loading.....please wait</h1>;
    }

    const { name, bio, avatar_url } = idData;

    return (
      <>
        <div className="header">
          <h1>{name}</h1>
          <img src={avatar_url} alt={`${name}'s avatar`} />
        </div>
        <div className="body">
          <h2>{bio}</h2>
        </div>
      </>
    );
  }
}

GithubId.propTypes = {
  username: PropTypes.string.isRequired
};

export default GithubId;
