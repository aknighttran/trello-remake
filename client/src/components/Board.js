import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Header, Button, Grid, Item } from 'semantic-ui-react';
import List from './List'
import ListForm from './ListForm'

class Board extends React.Component {
  state = { board: {}, lists: [], };

  componentDidMount() {
    const { id, } = this.props.match.params;
    axios.get(`/api/boards/${id}`)
      .then( res => this.setState({ board: res.data, }))
    // axios.get(`/api/boards/${id}/lists`)
    //   .then( res => this.setState({ posts: res.data, }))
  }

  handleDelete = (id) => {
    const remove = window.confirm("Are you sure you want to delete this blog?")
    if (remove)
      axios.delete(`/api/boards/${id}`)
        .then( res => this.props.history.push('/boards'))
  }

  renderLists = () => {
    return this.state.lists.map( i => (
      <List key={i.id} {...i} />
    ))
  }

  // <Button onClick={this.toggleForm} size='mini' >{ showForm ? 'Hide' : 'Add Items'}</Button>
  // {showForm ? this.listForm() : this.renderLists()}

  addList = (list) => {
    axios.post(`/api/boards/${this.props.match.params.id}/lists`, { list })
      .then(res => {
        this.setState({ lists: [res.data, ...this.state.lists], showForm: false})
      })
  }

  listForm = () => {
    return <ListForm add={this.addList} />
  }


  render () {
    const { board: { id, name, }, } = this.state;
    return (
      <div>
        <Header >{name}</Header>
          <div>
            <Link to={`/boards/${id}/edit`}>
              <Button 
                style={{'fontSize': '10px'}} 
                circular color='black' 
                icon='edit' 
              />
            </Link>
            <Button 
              style={{'fontSize': '10px'}} 
              circular color='black' 
              icon='delete' 
              onClick={() => this.handleDelete(id)}
            />
          </div>
        <br />
        <Link to={`/boards/${id}/lists/new`}>
          <Button size='mini'>Add a List</Button>
        </Link>
        <Grid>
            <Grid.Row>
              <Grid.Column  columns={3}>
                <Item.Group>
                     
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    )
  }

}

export default Board;