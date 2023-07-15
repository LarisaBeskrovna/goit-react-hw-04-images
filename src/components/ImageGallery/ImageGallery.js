import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.imagegallery}>
      {images.length > 0 &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            item={image}
            selectedImage={onOpenModal}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
