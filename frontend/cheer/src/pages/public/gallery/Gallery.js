import React, { useState, useEffect } from 'react';
import './Gallery.css';

// Assuming you have imported or defined fallback images
import fallbackImage1 from '../../../resources/images/gallery.jpg';
import fallbackImage2 from '../../../resources/images/gallery2.jpg';
import fallbackImage3 from '../../../resources/images/gallery3.jpg';

const fallbackImages = [fallbackImage1, fallbackImage2, fallbackImage3]; // Array of fallback images

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/gallery/api/images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentImageIndex((prevIndex) => {
          return (prevIndex - 1 + images.length) % images.length;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]); 

  const openFullscreen = () => {
    const elem = document.getElementById("gallery-image");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const handleImageError = () => {
    // Update the src of the image to the next fallback image
    const nextFallbackIndex = (currentFallbackIndex + 1) % fallbackImages.length;
    setCurrentFallbackIndex(nextFallbackIndex);
    const imgElement = document.getElementById("gallery-image");
    imgElement.src = fallbackImages[nextFallbackIndex];
  };
  const isFallbackImage = images.length === 0 || images[currentImageIndex] === undefined;
  return (
    <div className="gallery-container">
      {images.length > 0 && (
        <img
          src={images[currentImageIndex].thumbnail || fallbackImages[currentFallbackIndex]}
          alt=""
          id="gallery-image"
          className="gallery-image"
          onError={handleImageError}
          style= {{
            // maxWidth: isFallbackImage ? '50%' : '500%'
            maxWidth: isFallbackImage ? '50%' : '100%',
            width: isFallbackImage ? 'auto' : '30%', // Assuming you want API images to be slightly larger
            objectFit: 'cover' // Helps maintain aspect ratio without distortion
          }}
        />
      )}
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={openFullscreen}>Fullscreen</button>
      </div>
    </div>
  );
};

export default Gallery;
