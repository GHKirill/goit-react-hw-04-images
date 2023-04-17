import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';

export function App() {
  const [queryWord, setQueryWord] = useState('');
  const [page, setPage] = useState(1);
  const [photosList, setPhotoslist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [wrongQuery, setWrongQuery] = useState(false);
  const [allPhotosNumbers, setAllPhotosNumbers] = useState(0);
  const handleFormSubmit = input => {
    setQueryWord(input.trim());
    setPhotoslist([]);
    setWrongQuery(false);
    setPage(1);
  };
  const handleInputUpdate = queryWord => {
    setQueryWord(queryWord);
    setWrongQuery(true);
  };
  const setButtonSearchEnabled = () => {
    setWrongQuery(false);
    setAllPhotosNumbers(0);
  };
  // const handlingLoading = loading => {
  //   setLoading(loading);
  // };
  const handlingButtonIncreasePage = page => {
    setPage(page);
  };
  const handlingPhotosListUpdate = newList => {
    setPhotoslist(prevList => [...prevList, ...newList]);
  };
  const handlingPhotoIndexUpdate = photoIndex => {
    setPhotoIndex(photoIndex);
  };
  const getAllPhotosNumber = number => {
    setAllPhotosNumbers(number);
  };
  const resetLoadingStatus = status => {
    setLoading(status);
  };
  const handleShowModals = () => {
    setShowModals(true);
  };
  const toggleModal = () => {
    setShowModals(!showModals);
  };
  return (
    <>
      <div>
        {showModals && (
          <Modal closeModalWindow={toggleModal}>
            <img
              src={photosList[photoIndex].largeImageURL}
              alt={photosList[photoIndex].tag}
              className={css.image}
            />
          </Modal>
        )}
      </div>
      <SearchBar
        queryWord={queryWord}
        wrongQuery={wrongQuery}
        onSubmit={input => handleFormSubmit(input)}
        setButtonEnabled={() => setButtonSearchEnabled()}
        photosList={photosList}
        allPhotosNumber={allPhotosNumbers}
      />
      <ImageGallery
        input={queryWord}
        page={page}
        photoIndex={photoIndex}
        photosList={photosList}
        allPhotosNumber={allPhotosNumbers}
        getAllPhotosNumber={number => getAllPhotosNumber(number)}
        inputUpdate={input => handleInputUpdate(input)}
        photosListUpdate={newList => handlingPhotosListUpdate(newList)}
        photoIndexUpdate={newIndex => handlingPhotoIndexUpdate(newIndex)}
        showModalsUpdate={() => handleShowModals()}
        changeLoadingStatus={status => resetLoadingStatus(status)}
      />
      <Button
        addPage={page => handlingButtonIncreasePage(page)}
        page={page}
        wrongQuery={wrongQuery}
        allPhotosNumber={allPhotosNumbers}
        currentPhotosNumber={photosList}
        loading={loading}
        changeLoadingStatus={status => resetLoadingStatus(status)}
      />
      <ToastContainer autoClose={3000} />
    </>
  );
}
