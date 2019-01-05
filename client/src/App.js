import React, {Fragment, }  from 'react';
import { Route, Switch, } from 'react-router-dom';
import { Container, } from 'semantic-ui-react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Boards from './components/Boards';
import BoardForm from './components/BoardForm';
import Board from './components/Board';
import NoMatch from './components/NoMatch';


const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/boards/new" component={BoardForm} />
        <Route exact path="/boards/:id/edit" render={props => <BoardForm edit {...props} />} />
        <Route exact path="/boards/:id" component={Board} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;