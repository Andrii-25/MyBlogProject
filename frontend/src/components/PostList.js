import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppNavbar from './AppNavbar';
import './PostList.css';
import { Container, Typography, Grid, 
Card, CardMedia, CardContent, CardActions, Button, CardActionArea, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
  


class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/posts')
      .then(response => response.json())
      .then(data => this.setState({posts: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPosts = [...this.state.posts].filter(i => i.id !== id);
      this.setState({posts: updatedPosts});
    });
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
     return <div className="w-100 p-1" style={{display: 'flex',}}><CircularProgress disableShrink /></div>;
   }

    const postList = posts.map(post => {
      //const text = `${post.text || ' '} ${post.author || ' '} ${post.date || ' '}`;
      return <Card key={post.id} className="root">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://source.unsplash.com/random"
          title="Contemplative Reptile"
        />
        <CardContent className="content">
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="small" color="primary" href={"/more/" + post.id}>
          Learn More
        </Button>
        <Button variant="contained" size="small" color="primary" href={"/posts/" + post.id}>
          Edit
        </Button>
        <Button variant="contained" size="small" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.remove(post.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
      });

    return (
      <div>
        <AppNavbar/>
        <Paper className="mainFeaturePost" style={{backgroundImage: `url(https://images.unsplash.com/photo-1592065128658-cfe046043c1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80)`}}>
        <Container fixed>
          <Grid container>
            <div className="">
          <Grid item md={6}>
            <div className="mainFeaturePostContent">
              <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom>
                Just Simple Blog
              </Typography>
            </div>
          </Grid>
          </div>
          </Grid>
        </Container>
      </Paper>

        <Container className="cardGrid" maxWidth="md">
        <Grid container spacing={4}>
          {postList}
          </Grid>
          </Container>
      </div>
    );
  }
}

export default PostList;