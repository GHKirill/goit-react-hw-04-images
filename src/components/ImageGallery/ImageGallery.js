import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
const KEY = '33881811-455663e333f2bc5dbb769e41c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function ImageGallery({
  input,
  page,
  photoIndex,
  photosList,
  allPhotosNumber,
  getAllPhotosNumber,
  inputUpdate,
  photoIndexUpdate,
  photosListUpdate,
  showModalsUpdate,
  changeLoadingStatus,
}) {
  const fetchPage = useRef(1);
  const fetchInput = useRef('');

  useEffect(() => {
    if (page === 1 && fetchInput.current !== input) {
      fetchPage.current = 1;
    }
    if (input === '' || fetchPage.current !== page) {
      return;
    }
    const fetchData = async () => {
      try {
        fetchPage.current = page + 1;
        fetchInput.current = input;
        changeLoadingStatus(true);
        const response = await axios(
          `?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) {
          throw new Error(
            `No images in dataBase according to your query "${input}"`
          );
        }
        const gallery = response.data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        photosListUpdate(gallery);
        getAllPhotosNumber(response.data.totalHits);
        changeLoadingStatus(false);
        if (allPhotosNumber && allPhotosNumber - photosList.length <= 12) {
          toast.info('No more photos in this collection');
        }
      } catch (error) {
        toast.error(error.message);
        photosListUpdate([]);
        inputUpdate('');
        changeLoadingStatus(false);
      }
    };
    fetchData();
  }, [
    input,
    page,
    allPhotosNumber,
    getAllPhotosNumber,
    changeLoadingStatus,
    inputUpdate,
    photosListUpdate,
    photosList,
  ]);

  return (
    <>
      {photosList.length > 0 && (
        <ul className={css.imageGallery}>
          {photosList.map(item => (
            <li key={item.id} className={css.imageItem}>
              <ImageGalleryItem
                item={item}
                photoIndex={photoIndex}
                photosList={photosList}
                photoIndexUpdate={photoIndexUpdate}
                showModalsUpdate={showModalsUpdate}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  input: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  photoIndex: PropTypes.number.isRequired,
  photosList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  allPhotosNumber: PropTypes.number.isRequired,
  getAllPhotosNumber: PropTypes.func.isRequired,
  inputUpdate: PropTypes.func.isRequired,
  photosListUpdate: PropTypes.func.isRequired,
  photoIndexUpdate: PropTypes.func.isRequired,
  showModalsUpdate: PropTypes.func.isRequired,
  changeLoadingStatus: PropTypes.func.isRequired,
};
