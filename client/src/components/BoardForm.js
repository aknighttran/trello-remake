import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';

class BoardForm extends React.Component {
  state = { name: "" };

  componentDidMount() {
    if (this.props.edit)
      axios.get(`/api/boards/${this.props.match.params.id}`)
        .then( res => this.setState({...res.data, }))
  }

  handleChange = (e) => {
    const {name, value, } = e.target;
    this.setState({ [name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.edit) {
      axios.put(`/api/boards/${this.props.match.params.id}`, { ...this.state })
        .then(res => this.props.history.push(`/boards/${res.data.id}`))
    } else {
      axios.post(`/api/boards`, { ...this.state })
        .then( res => this.props.history.push(`/boards/${res.data.id}`))
    }
  }

  render() {
    const { name, } = this.state;
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input 
          name='name'
          placeholder='Name'
          label='Name'
          value={name}
          onChange={this.handleChange}
        />
        <Form.Button color='black'>
          Submit
        </Form.Button>
      </Form>
    )
  }


}

export default BoardForm