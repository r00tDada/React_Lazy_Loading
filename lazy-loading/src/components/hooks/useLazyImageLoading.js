import { useEffect } from "react";

function useLazyImageLoading(options) {
  useEffect(() => {
    const imageElements = document.querySelectorAll(".lazy_image");
    const observer = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const pendingImage = entry.target;
        pendingImage.src = pendingImage.dataset.src;
        pendingImage.classList.remove("lazy_image");
        imgObserver.unobserve(pendingImage);
      });
    }, options);
    imageElements.forEach((image) => {
      observer.observe(image);
    });
  });
}

export default useLazyImageLoading;
