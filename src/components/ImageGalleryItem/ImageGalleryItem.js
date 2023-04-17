import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  photoIndex,
  photoIndexUpdate,
  photosList,
  showModalsUpdate,
  item,
}) {
  const handlePhotoClick = event => {
    const newPhotoIndex = photosList.findIndex(
      item => item.webformatURL === event.currentTarget.src
    );
    photoIndexUpdate(newPhotoIndex);
    showModalsUpdate();
  };
  return (
    <img
      src={item.webformatURL}
      alt={item.tag}
      width="300"
      className={css.imageItem}
      onClick={handlePhotoClick}
    />
  );
}

// export default class ImageGalleryItem extends Component {
//   handlePhotoClick = event => {
//     const newPhotoIndex = this.props.photosList.findIndex(
//       item => item.webformatURL === event.currentTarget.src
//     );
//     this.props.photoIndexUpdate(newPhotoIndex);
//     this.props.showModalsUpdate();
//   };
//   render() {
//     const { item } = this.props;
//     return (
//       <img
//         src={item.webformatURL}
//         alt={item.tag}
//         width="300"
//         className={css.imageItem}
//         onClick={this.handlePhotoClick}
//       />
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  photoIndex: PropTypes.number.isRequired,
  photosList: PropTypes.array.isRequired,
  photoIndexUpdate: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string,
  }),
};
