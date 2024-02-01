import React, { useState } from 'react';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};
export const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({ ...INITIAL_STATE });
  };
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   onSubmit({ ...state });
  //   setState({ ...INITIAL_STATE });
  // };

  const { name, number } = state;
  return (
    <form className={css.contact_form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={css.for_label}>
        {' '}
        Name
        <input
          value={name}
          type="text"
          name="name"
          required
          className={css.for_input}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="number" className={css.for_lable}>
        {' '}
        Number
        <input
          value={number}
          type="tel"
          name="number"
          required
          className={css.for_input}
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

// export class ContactForm extends Component {
//   state = { ...INITIAL_STATE };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({
//       [name]: value,
//     });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.setState({ ...INITIAL_STATE });
//   };
//   render() {
//     const { name, number } = this.state;
//     return (
//       <form className={css.contact_form} onSubmit={this.handleSubmit}>
//         <label htmlFor="name" className={css.for_lable}>
//           {' '}
//           Name
//           <input
//             value={name}
//             type="text"
//             name="name"
//             required
//             className={css.for_input}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label htmlFor="number" className={css.for_lable}>
//           {' '}
//           Number
//           <input
//             value={number}
//             type="tel"
//             name="number"
//             required
//             className={css.for_input}
//             onChange={this.handleChange}
//           />
//         </label>
//         <button className={css.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }
