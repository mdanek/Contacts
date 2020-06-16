import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }));
    ContactsAPI.remove(contact);
  };
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} 
          />
        )} />
        <Route path='/create' component={CreateContact} />
      </div>
    );
  }
}

export default App;
