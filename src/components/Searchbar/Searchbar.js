import styles from './Searchbar.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function Searchbar(props) {
  const [valueInput, setValueInput] = useState('');

  const handleInput = event => {
    setValueInput(event.target.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (valueInput.trim() === '') {
      alert('Enter a request!');
      return;
    }

    props.onSubmit(valueInput);
    setValueInput('');
    event.currentTarget.reset();
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchform_button}>
          <span className={styles.searchform_button_label}>Search</span>
        </button>

        <input
          className={styles.searchform_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  valueInput: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
