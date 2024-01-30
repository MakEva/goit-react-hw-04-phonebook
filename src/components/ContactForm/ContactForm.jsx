import { Component } from 'react';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};
export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...INITIAL_STATE });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={css.contact_form} onSubmit={this.handleSubmit}>
        <label htmlFor="name" className={css.for_lable}>
          {' '}
          Name
          <input
            value={name}
            type="text"
            name="name"
            required
            className={css.for_input}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
