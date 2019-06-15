import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ''
    };
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    clearQuery = () => {
        this.setState({ query: '' });
    }
    render() {
        const { onDeleteContact, onNavigate, contacts } = this.props;
        const { query } = this.state;
        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query, 'i'));
            showingContacts = contacts.filter((contact) => match.test(contact.name));
        }
        else {
            showingContacts = contacts;
        }
        showingContacts.sort(sortBy('name'))
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        value={query}
                        placeholder="Search Contacts"
                        onChange={(event) => this.updateQuery(event.target.value)} />
                    <Link to="/create" className="add-contact">Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total.</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                <ol className="contact-list">
                {console.log(showingContacts)}
                    {showingContacts.map(contacts => (
                        <li key={contacts.id} className="contact-list-item">
                            <div className="contact-avatar" style={{ backgroundImage: `url(${contacts.avatarURL})` }} />
                            <div className="contact-details">
                                <p>{contacts.name}</p>
                                <p>{contacts.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contacts)} className="contact-remove">Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;