import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import DatePicker from './DatePicker';
import './PostEdit.css';
import { Container, Typography, Grid, TextField, Divider, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class PostEdit extends Component {

  emptyItem = {
    title: '',
    text: '',
    author: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
      this.setState({item: post});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
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
    this.props.history.push('/');
  }

  render() {
    const {item} = this.state;
    const title = <Typography className="title" variant="h3" gutterBottom>{item.id ? 'Edit Post' : 'Add Post'}</Typography>;

    return <div className="edit">
      <AppNavbar/>
      <Container>
        {title}
        <form onSubmit={this.handleSubmit}>
          <Grid container>
            <TextField className="root" variant="outlined" label="Title" name="title" value={item.title || ''}
                   onChange={this.handleChange} autoComplete="title"/>
            <TextareaAutosize className="text" aria-label="empty textarea"
            placeholder="   Input your text here..." name="text" value={item.text || ''}
                   onChange={this.handleChange} autoComplete="text-level1"/>
            <TextField className="root" variant="outlined" label="Author" name="author" value={item.author || ''}
                   onChange={this.handleChange} autoComplete="text-level1"/>
            <Grid className="root">
            <Button variant="contained" color="primary" type="submit">Save</Button>{' '}
            <Button variant="contained" href={"/"}>Cancel</Button>
            </Grid>
            </Grid>            
        </form>
        </Container>
    </div>
  }
}

export default withRouter(PostEdit);
