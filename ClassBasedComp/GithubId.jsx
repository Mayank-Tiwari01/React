import { Component } from "react";

class GithubId extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      idData : null
    };


  }

  async componentDidMount() {
    let userId = await fetch('https://api.github.com/users/Mayank-Tiwari01');
    userId = await userId.json();

    this.setState(() => ({
      idData : userId
    }))

    console.log(userId);
    
  }
  render() {
    const { idData } = this.state;
    if (idData === null)
      return <h1>Profile loading.....please wait</h1>

    let { name, bio, avatar_url} = idData;
    return(
      <>
        <div className="header">
          <h1>{name}</h1>
          <img src={avatar_url}></img>
        </div>
        <div className="body">
          <h2>{bio}</h2>
        </div>
      </>
    );
  }
}

export default GithubId;