import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactsForm from './ContactsForm/ContactsForm'
import Filter from './Filter/Filter'
import ContactsList from './ContactsList/ContactsList'
const style = {
      padding:20
    };


export default class App extends Component {
    state = {
        contacts: [{name:'Dima',number:'+380994457869',id:'21'},{name:'Alex',number:'+380994457861',id:'22'},{name:'Vova',number:'+380994457666',id:'23'},{name:'Valya',number:'+380669957869',id:'24'}],
        filter:''
    }

    onHandleSubmitContact = ({name,number}) => {
        const addContact = ({
            id: uuidv4(),
            name,
            number
        })

        this.state.contacts.find(contact => contact.name.toLowerCase() === addContact.name.toLowerCase()) ? alert(`${name} is already in contacts`) : this.setState(({ contacts }) => ({
            contacts: [addContact, ...contacts]
        }))

    }

    onDeleteContact = (id) => {
        this.setState((prev) => ({
            contacts: prev.contacts.filter(item => item.id !== id)
        }))
    }

      changeFilterInput = e => {
    this.setState({ filter: e.target.value });
    };
    
  onFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim()),
    );
  };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts')
        const parsedContacts = JSON.parse(contacts)
        if (parsedContacts) {
            this.setState({contacts:parsedContacts})
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
        }
    }

    render() {
        const {filter } = this.state;
        return (
            <div style={style}>
  <h1>Phonebook</h1>
                <ContactsForm onHandleSubmit={this.onHandleSubmitContact}/>

  <h2>Contacts</h2>
                <Filter value={filter} filtered={this.changeFilterInput}/>
                <ContactsList deleteContact={this.onDeleteContact} contacts={this.onFilteredContacts()}/>
</div>
        )
    }
}
