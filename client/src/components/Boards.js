import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Item, Button, Icon, } from 'semantic-ui-react';




class Boards extends React.Component {
  state = { boards: [], };

  componentDidMount() {
    axios.get('/api/boards')
      .then( res => this.setState({ boards: res.data, }));
  }

  renderBoards = () => {
    return this.state.boards.map (b => (
      <Item key={b.id}>
        <div>
          <Link to={`/boards/${b.id}`}>
            <Button size='mini' color="green">
              View
            </Button>
          </Link>
        </div>
        <Item.Content>
          <Item.Header>{b.name}</Item.Header>
        </Item.Content>
      </Item>
    ))
  }

  render() {
    return (
      <div>
        <h1>Boards</h1>
        <br />
        <Link to="/boards/new">
          <Button icon color="black" size='mini'>
            <Icon name='add' />
            Add Board
          </Button>
        </Link>
        <br />
        <br />
        <Item.Group>
          { this.renderBoards() }
        </Item.Group>
      </div>
    )
  }

}

export default Boards;