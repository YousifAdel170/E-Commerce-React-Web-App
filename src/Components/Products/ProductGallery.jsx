/* eslint-disable react/prop-types */

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { motion, AnimatePresence } from "framer-motion";
import SliderButton from "./SliderButton";
import "./ProductGallery.css";
import ProductGalleryHook from "../../hooks/products/ProductGalleryHook";

const ProductGallery = ({ images }) => {
  const [
    overlayIndex,
    closeOverlay,
    onStopOverlayClick,
    showThumbnails,
    setCurrentIndex,
    onImageClick,
    currentIndex,
  ] = ProductGalleryHook(images);

  return (
    <>
      <AnimatePresence>
        {overlayIndex !== null && (
          <motion.div
            className="overlay overlay-active"
            role="dialog"
            aria-modal="true"
            onClick={closeOverlay}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="overlay-close"
              onClick={closeOverlay}
              aria-label="Close image overlay"
            >
              &times;
            </button>

            <motion.div
              onClick={onStopOverlayClick}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ImageGallery
                items={images}
                startIndex={overlayIndex}
                // showThumbnails={showThumbnails}
                showFullscreenButton={false}
                showPlayButton={false}
                renderRightNav={(onClick, disabled) => (
                  <SliderButton
                    onClick={onClick}
                    direction="right"
                    disabled={disabled}
                    ariaLabel="التالي"
                    tabIndex={0}
                  />
                )}
                renderLeftNav={(onClick, disabled) => (
                  <SliderButton
                    onClick={onClick}
                    direction="left"
                    disabled={disabled}
                    ariaLabel="السابق"
                    tabIndex={0}
                  />
                )}
                additionalClass="overlay-image-gallery"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="product-gallery-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="region"
        aria-label="معرض صور المنتج"
        tabIndex={-1}
        aria-live="polite"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <div className="gallery-wrapper">
          <div className="image-gallery-container">
            <ImageGallery
              items={images}
              showFullscreenButton={false}
              isRTL={true}
              showPlayButton={false}
              showThumbnails={showThumbnails}
              lazyLoad={true}
              showIndex={false}
              slideDuration={450}
              renderRightNav={(onClick, disabled) => (
                <SliderButton
                  onClick={onClick}
                  direction="right"
                  disabled={disabled}
                  ariaLabel="التالي"
                  tabIndex={0}
                />
              )}
              renderLeftNav={(onClick, disabled) => (
                <SliderButton
                  onClick={onClick}
                  direction="left"
                  disabled={disabled}
                  ariaLabel="السابق"
                  tabIndex={0}
                />
              )}
              additionalClass="product-image-gallery"
              onClick={onImageClick}
              onSlide={(index) => setCurrentIndex(index)}
            />

            {images.length ? (
              <div className="image-index-badge">
                📸 {currentIndex + 1}/{images.length}
              </div>
            ) : null}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ProductGallery;
