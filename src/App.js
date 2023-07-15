import styles from './App.module.css';
import { Button } from './/components/Button/Button';
import { ImageGallery } from './/components/ImageGallery/ImageGallery';
import { Loader } from './/components/Loader/Loader';
import { Modal } from './/components/Modal/Modal';
import { Searchbar } from './/components/Searchbar/Searchbar';
import { fetchImages } from './Api';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    totalHits: 0,
    isModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchImages(query, page);
        if (images.hits.length === 0) {
          alert('Nothing found!');
        }

        this.setState({
          images: [...prevState.images, ...images.hits],
          totalHits: images.totalHits,
        });
      } catch (error) {
        this.setState({ error });
        alert('error: ' + this.state.error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmit = searchQuery => {
    this.setState({ query: searchQuery, page: 1, images: [] });
  };
  loadMore = e => {
    e.preventDefault();

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = imageURL => {
    this.setState({ isModal: true, selectedImage: imageURL });
  };

  onCloseModal = () => {
    this.setState({ isModal: false, selectedImage: '' });
  };

  render() {
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.formSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          images={this.state.images}
          onOpenModal={this.onOpenModal}
        />

        {this.state.page < Math.ceil(this.state.totalHits / 12) ? (
          <Button onClick={this.loadMore} />
        ) : null}
        {this.state.isModal && (
          <Modal
            largeImage={this.state.selectedImage}
            onClick={this.onCloseModal}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
