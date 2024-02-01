import React, { useState } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();
      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  };

  const addContact = data => {
    if (isDublicate(data)) {
      return Notify.failure(`${data.name} is already in contacts.`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [newContact, ...prevContacts];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };
  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredContact = () => {
    if (!filter) {
      return contacts;
    }
    const normalisedFilter = filter.toLocaleLowerCase();
    const filteredContact = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      return (
        normalizedName.includes(normalisedFilter) ||
        normalizedNumber.includes(normalisedFilter)
      );
    });
    return filteredContact;
  };

  const items = getFilteredContact();
  return (
    <>
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter changeFilter={changeFilter} />
        <ContactList items={items} deleteContact={deleteContact} />
      </div>
    </>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   isDublicate({ name, number }) {
//     const { contacts } = this.state;
//     const normalizedName = name.toLowerCase();
//     const normalizedNumber = number.toLowerCase();

//     const dublicate = contacts.find(item => {
//       const normalizedCurrentName = item.name.toLowerCase();
//       const normalizedCurrentNumber = item.number.toLowerCase();
//       return (
//         normalizedCurrentName === normalizedName ||
//         normalizedCurrentNumber === normalizedNumber
//       );
//     });
//     return Boolean(dublicate);
//   }

//   addContact = data => {
//     if (this.isDublicate(data)) {
//       return Notify.failure(`${data.name} is already in contacts.`);
//     }

//     this.setState(({ contacts }) => {
//       const newContact = {
//         id: nanoid(),
//         ...data,
//       };
//       return {
//         contacts: [newContact, ...contacts],
//       };
//     });
//   };

//   deleteContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(item => item.id !== id);
//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   changeFilter = ({ target }) => {
//     this.setState({
//       filter: target.value,
//     });
//   };

//   getFilteredContact() {
//     const { contacts, filter } = this.state;
//     if (!filter) {
//       return contacts;
//     }
//     const normalisedFilter = filter.toLocaleLowerCase();
//     const filteredContact = contacts.filter(({ name, number }) => {
//       const normalizedName = name.toLocaleLowerCase();
//       const normalizedNumber = number.toLocaleLowerCase();
//       return (
//         normalizedName.includes(normalisedFilter) ||
//         normalizedNumber.includes(normalisedFilter)
//       );
//     });
//     return filteredContact;
//   }

//   render() {
//     const { addContact, deleteContact, changeFilter } = this;
//     const contacts = this.getFilteredContact();
//     return (
//       <>
//         <div className={css.phonebook}>
//           <h1>Phonebook</h1>
//           <ContactForm onSubmit={addContact} />

//           <h2>Contacts</h2>
//           <Filter changeFilter={changeFilter} />
//           <ContactList items={contacts} deleteContact={deleteContact} />
//         </div>
//       </>
//     );
//   }
// }
