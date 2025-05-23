import { useEffect, useState } from "react";

const ProductGalleryHook = (images) => {
  const [overlayIndex, setOverlayIndex] = useState(null);

  const openOverlayAtIndex = (index) => setOverlayIndex(index);

  const closeOverlay = () => setOverlayIndex(null);

  // Stop overlay close on clicks inside the gallery area
  const onStopOverlayClick = (e) => e.stopPropagation();

  // Handler for clicking thumbnails in main gallery
  const onImageClick = (event) => {
    // Get clicked src
    const clickedSrc = event.target.src;
    // Find index in images array by original url
    const idx = images.findIndex((img) => img.original === clickedSrc);
    if (idx !== -1) {
      openOverlayAtIndex(idx);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showThumbnails, setShowThumbnails] = useState(true);

  useEffect(() => setShowThumbnails(window.innerWidth >= 768), []);

  return [
    overlayIndex,
    closeOverlay,
    onStopOverlayClick,
    showThumbnails,
    setCurrentIndex,
    onImageClick,
    currentIndex,
  ];
};

export default ProductGalleryHook;
