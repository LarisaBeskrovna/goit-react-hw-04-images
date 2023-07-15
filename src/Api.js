import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36583088-3efc413f562b1d456ac479a3a';

export const fetchImages = async (query, page) => {
  const images = await axios.get(
    `${URL}?&q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return images.data;
};
