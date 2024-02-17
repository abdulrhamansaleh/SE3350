import React from 'react'
import './Gallery.css'
import 'react-image-gallery/styles/css/image-gallery.css';

import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

class Gallery extends React.Component {
  render() {
    return <div className="gallery-container"><ImageGallery items={images} /></div>;
  }
}

export default Gallery;