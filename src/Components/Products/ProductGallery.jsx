/* eslint-disable react/prop-types */

// Import External Library Styles
import "react-image-gallery/styles/css/image-gallery.css";

// Import Components
import ImageGallery from "react-image-gallery";
import RightButton from "./RightButton";
import LeftButton from "./LeftButton";

// Import Used CSS
import "./ProductModule.css";

// Component responsible for displaying the product image gallery
const ProductGallery = ({ images }) => {
  return (
    <div className="product-gallary-card">
      <div className="d-flex align-items-center">
        <ImageGallery
          items={images}
          // defaultImage={mobile}
          showFullscreenButton={false} // Hide full screen option
          isRTL={true} // Enable RTL layout
          showPlayButton={false} // Hide slideshow play button
          showThumbnails={false} // Hide thumbnail previews
          renderRightNav={RightButton} // Custom right navigation button
          renderLeftNav={LeftButton} // Custom left navigation button
        />
      </div>
    </div>
  );
};

// Export the component as default
export default ProductGallery;
