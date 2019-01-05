import React from 'react';
import { Form } from 'semantic-ui-react';

class ListForm extends React.Component {
  state = { name: "" };

  componentDidMount() {
    if (this.props.id)
      this.setState({ ...this.props })
  }
  handleChange = (e) => {
    const { name, value, } = e.target; 
    this.setState({ [name]: value, })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.add(this.state)
    this.setState({ name: '', })
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
          required
          onChange={this.handleChange}
        />
        <Form.Button color='black'>
          Submit
        </Form.Button>
      </Form>
    )
  }


}

export default ListForm