import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({
  wrongQuery,
  allPhotosNumber,
  photosList,
  queryWord,
  onSubmit,
  setButtonEnabled,
}) {
  const [input, setInput] = useState('');

  const handleFormInput = event => {
    const { value } = event.currentTarget;
    setInput(value.toLowerCase());
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (input.trim() === '') {
      toast.error('please input correct word');
      return;
    }
    if (input.trim() === queryWord) {
      toast.error(
        'please input another search word or press button "load next"'
      );
      return;
    }
    onSubmit(input);
  };
  const handleFormInputClick = event => {
    setInput('');
    setButtonEnabled();
  };

  return (
    <div className={css.form}>
      <form onSubmit={handleFormSubmit} className={css.formSearchBar}>
        {wrongQuery ||
        (allPhotosNumber && allPhotosNumber === photosList.length) ? (
          <button type="submit" disabled={true} className={css.formButton}>
            <FaSearch />
          </button>
        ) : (
          <button type="submit" className={css.formButton}>
            <FaSearch />
          </button>
        )}
        <input
          type="text"
          name="input"
          value={input}
          onChange={handleFormInput}
          onClick={handleFormInputClick}
          className={css.inputForm}
        ></input>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  queryWord: PropTypes.string.isRequired,
  wrongQuery: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setButtonEnabled: PropTypes.func.isRequired,
  allPhotosNumber: PropTypes.number.isRequired,
};
