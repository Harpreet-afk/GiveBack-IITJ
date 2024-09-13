import React, { useEffect, useRef, useState } from 'react';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { motion, AnimatePresence } from 'framer-motion';
import { heroData } from '../data/carousel';

const SlideImage = React.memo(({ imageUrl, index, currentSlide }) => {
  const parallaxStyle = {
    transform: `translateX(${(index - currentSlide) * 20}%)`,
    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
        ...parallaxStyle
      }}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  );
});

const SlideContent = React.memo(({ heading, subheading }) => (
  <motion.div 
    className="relative h-full flex flex-col justify-center items-start text-white text-left px-8 md:px-16 max-w-2xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.h3 
      className="font-['Roboto_Slab'] text-2xl md:text-3xl italic font-extralight tracking-[3px] text-white/70 mb-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
    >
      {subheading}
    </motion.h3>
    <motion.h2 
      className="font-['Montserrat'] text-3xl md:text-5xl uppercase tracking-[3px] mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
    >
      {heading}
    </motion.h2>
    <motion.a 
      href="#"
      rel="noopener noreferrer" 
      className="border border-white py-2 px-4 md:py-3 md:px-6 uppercase font-['Montserrat'] text-sm md:text-base tracking-[2px] text-white no-underline transition-all duration-200 hover:bg-white hover:text-black"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Explore More
    </motion.a>
  </motion.div>
));

const Slide = ({ data, index, currentSlide }) => (
  <div className="carousel-cell w-full h-full relative">
    <SlideImage imageUrl={data.imageUrl} index={index} currentSlide={currentSlide} />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    <AnimatePresence>
      {currentSlide === index && (
        <SlideContent heading={data.haeding} subheading={data.subheading} />
      )}
    </AnimatePresence>
  </div>
);

const HeroSlider = () => {
  const carouselRef = useRef(null);
  const flickityRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const options = {
      accessibility: true,
      prevNextButtons: false,
      pageDots: true,
      setGallerySize: false,
      autoPlay: 2000,
      wrapAround: true,
      pauseAutoPlayOnHover: true,
      arrowShape: {
        x0: 10, x1: 60, y1: 50, x2: 60, y2: 45, x3: 15
      }
    };

    flickityRef.current = new Flickity(carouselRef.current, options);

    flickityRef.current.on('change', (index) => {
      setCurrentSlide(index);
    });

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-[90vh] overflow-hidden">
      <div ref={carouselRef} className="w-full h-full">
        {heroData.map((slide, index) => (
          <Slide key={index} data={slide} index={index} currentSlide={currentSlide} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;