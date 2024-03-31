import React, { useState, useEffect } from 'react';
import './Gallery.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/gallery/api/images');
        const data = await response.json();

        const updatedImages = data.map((image) => ({
          original: image.thumbnail || image.original,
          thumbnail: image.thumbnail,
        }));

        setImages(updatedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <ImageGallery items={images} />
    </div>
  );
};

export default Gallery;
