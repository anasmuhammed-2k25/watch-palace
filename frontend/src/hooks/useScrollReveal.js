import { useEffect } from "react";

/**
 * Custom Hook to reveal elements on scroll using IntersectionObserver.
 * Elements with the class '.reveal-target' will have '.reveal-active' added when in view.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          // Optional: stop observing once revealed for pure entrance animation
          // observer.unobserve(entry.target); 
        } else {
          // If you want them to fade out when scrolling away, uncomment below
          // entry.target.classList.remove("reveal-active");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Find all targets and observe them
    const targets = document.querySelectorAll(".reveal-target");
    targets.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []); // Empty array ensures this runs once after mount
};

export default useScrollReveal;
