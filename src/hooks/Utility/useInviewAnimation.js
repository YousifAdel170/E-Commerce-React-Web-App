/* eslint-disable react-hooks/exhaustive-deps */

// Import Hooks from React
import { useEffect, useRef, useState } from "react";

// Custom Hook to handle in-view animations using Intersection Observer API
const useInviewAnimation = () => {
  // Ref to the section element
  const sectionRef = useRef(null);

  //   State to track visibility of the section
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Observer Effect
  useEffect(() => {
    // Create an Intersection Observer to observe the section
    const observer = new IntersectionObserver(
      // Callback function to handle intersection changes
      ([entry]) => {
        // If the section is intersecting (visible in viewport)
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    // If the section ref is set, start observing it
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup function to unobserve the section when the component unmounts
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return [sectionRef, isVisible];
};

export default useInviewAnimation;
