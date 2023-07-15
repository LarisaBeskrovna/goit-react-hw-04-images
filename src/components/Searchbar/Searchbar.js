import styles from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    valueInput: '',
  };

  handleInput = event => {
    this.setState({ valueInput: event.target.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.valueInput.trim() === '') {
      alert('Enter a request!');
      return;
    }

    this.props.onSubmit(this.state.valueInput);
    this.setState({ valueInput: '' });
    event.currentTarget.reset();
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.search_form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.searchform_button}>
            <span className={styles.searchform_button_label}>Search</span>
          </button>

          <input
            className={styles.searchform_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  valueInput: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
