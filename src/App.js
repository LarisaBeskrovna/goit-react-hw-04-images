import styles from './App.module.css';
import { Button } from './/components/Button/Button';
import { ImageGallery } from './/components/ImageGallery/ImageGallery';
import { Loader } from './/components/Loader/Loader';
import Modal from './/components/Modal/Modal';
import { Searchbar } from './/components/Searchbar/Searchbar';
import { fetchImages } from './Api';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query === '') return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const images = await fetchImages(query, page);
        if (images.hits.length === 0) {
          alert('Nothing found!');
          return;
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setTotalHits(images.totalHits);
      } catch (error) {
        setError(error);
        alert('error: ' + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const formSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };
  const loadMore = e => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = imageURL => {
    setIsModal(true);
    setSelectedImage(imageURL);
  };

  const onCloseModal = () => {
    setIsModal(false);
    setSelectedImage('');
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={formSubmit} />
      {isLoading && <Loader />}
      {error ? (
        <h2 className={styles.error}>{error}</h2>
      ) : (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {page < Math.ceil(totalHits / 12) ? <Button onClick={loadMore} /> : null}
      {isModal && (
        <Modal
          largeImage={selectedImage}
          onClick={onCloseModal}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

export default App;
