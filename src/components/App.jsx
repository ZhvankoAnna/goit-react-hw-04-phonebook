import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from 'components/app.module.css';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? [...initialState]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFormData = data => {
    const newName = data.name;
    const isDublicate = contacts.find(item => item.name === newName);
    if (isDublicate) {
      return Notify.failure(`${newName} is already in contacts`);
    }
    const newObj = { id: nanoid(5), ...data };
    setContacts(prevContacts => [...prevContacts, newObj]);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDeleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const handleFilterChange = ({ target }) => (setFilter(target.value));

  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={getFormData} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {contacts.length !== 0 && (
        <ContactList arr={filteredContacts} onDeleteContact={onDeleteContact} />
      )}
    </div>
  );
};

export default App;

/*
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'))
    if(savedContacts) {
      this.setState({contacts: savedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  getFormData = data => {
    const { contacts } = this.state;
    const newName = data.name;
    const isDublicate = contacts.find(item => item.name === newName);
    if (isDublicate) {
      return Notify.failure(`${newName} is already in contacts`);
    }
    const newObj = { id: nanoid(5), ...data };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newObj],
    }));
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  onDeleteContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newArr = contacts.filter(item => item.id !== id);
      return { contacts: newArr };
    });
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { getFormData, handleFilterChange, onDeleteContact } = this;
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={getFormData} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        {this.state.contacts.length !== 0 && (
          <ContactList
            arr={filteredContacts}
            onDeleteContact={onDeleteContact}
          />
        )}
      </div>
    );
  }
}
*/
