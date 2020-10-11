import { Typography, Container, Card, CardContent, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar'; 
import './PostPage.css';

class PostPage extends Component {
  emptyItem = {
    title: '',
    text: '',
    author: '',
    date: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
      this.setState({item: post});
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/post', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/posts');
  }

  render() {
    const {item} = this.state;

    return <div class="page">
      <AppNavbar/>
      <Container>
            <Typography className="title" variant="h3" gutterBottom>{item.title}</Typography>
            <Card>
            <CardContent>
              <Typography variant="body1" gutterBottom>{item.text}</Typography>
              </CardContent>
            </Card>
          <div><Typography variant="subtitle2" gutterBottom>Author: {item.author}, Date of publication: {item.date}</Typography></div>
          <Container>
            <Button variant="contained" href="/">Back</Button>
          </Container>
      </Container>
    </div>
  }
}

  

export default withRouter(PostPage);