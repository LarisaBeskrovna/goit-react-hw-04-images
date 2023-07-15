import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, selectedImage }) => {
  return (
    <li className={styles.imagegalleryitem} key={item.id}>
      <img
        className={styles.imagegalleryitem_image}
        src={item.webformatURL}
        alt={item.tags}
        onClick={() => selectedImage(item.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.array.isRequired,
  selectedImage: PropTypes.func.isRequired,
};
