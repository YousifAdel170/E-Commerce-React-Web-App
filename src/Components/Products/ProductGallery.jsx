/* eslint-disable react/prop-types */
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import RightButton from "./RightButton";
import LeftButton from "./LeftButton";

const ProductGallery = ({ images }) => {
  return (
    <div
      className="product-gallary-card d-flex justfiy-content-center  align-items-center
    pt-2"
    >
      <ImageGallery
        items={images}
        // defaultImage={mobile}
        showFullscreenButton={false}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={false}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};

export default ProductGallery;
