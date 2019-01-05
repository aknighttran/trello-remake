import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Header, Button, } from 'semantic-ui-react';
import List from './List'
import ListForm from './ListForm'

class Board extends React.Component {
  state = { board: {}, lists: [], };

  componentDidMount() {
    const { id, } = this.props.match.params;
    axios.get(`/api/boards/${id}`)
      .then( res => this.setState({ board: res.data, }))
    axios.get(`/api/boards/${id}/lists`)
      .then( res => this.setState({ lists: res.data, }))
  }

  handleDelete = (id) => {
    const remove = window.confirm("Are you sure you want to delete this board?")
    if (remove)
      axios.delete(`/api/boards/${id}`)
        .then( res => this.props.history.push('/boards'))
  }

  renderLists = () => {
    return this.state.lists.map( i => (
      <List key={i.id} {...i} remove={this.removeList} update={this.updateList}/>
    ))
  }

  updateList = (id) => {
    const bId = this.props.match.params.id;
    axios.put(`/api/lists/${bId}/lists/${id}`)
      .then( res => {
        const lists = this.state.lists.map( t => {
          if (t.id === id)
            return res.data;
          return t;
        });
        this.setState({ lists });
      })
  }

  removeList = (id) => {
    const remove = window.confirm("Are you sure you want to delete this List?");
    const bId = this.props.match.params.id;
    if (remove)
      axios.delete(`/api/board/${bId}/lists/${id}`)
        .then( res => {
          const lists = this.state.lists.filter( i => {
            if (i.id !== id) 
              return i;  
            return null;
          });
          this.setState({ lists, });
        })
  }

  addList = (list) => {
    axios.post(`/api/boards/${this.props.match.params.id}/lists`, { list })
      .then(res => {
        this.setState({ lists: [res.data, ...this.state.lists], showForm: false})
      })
  }


  listForm = () => {
    return <ListForm add={this.addList} />
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
      })
  }


  render () {
    const { board: { id, name, }, showForm } = this.state;
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
        <div>
          <Button onClick={this.toggleForm} size='mini' >{ showForm ? 'Hide' : 'Add List'}</Button>
          {showForm ? this.listForm() : this.renderLists()}
        </div>
      </div>
    )
  }

}

export default Board;