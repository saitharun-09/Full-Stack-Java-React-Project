import { useState, useEffect } from "react";
import img1 from '../Assets/01-Ferrari.avif'
import img2 from '../Assets/02-Mclaren.avif'
import img3 from '../Assets/03-Mercedes.avif'
import img4 from '../Assets/04-Williams.avif'
import img5 from '../Assets/06-RedBull.avif'
import img6 from '../Assets/05-Aston Martin.avif'
import './ImgSlider.css'

function ImgSlider() {
    const images = [img1, img2, img3, img4, img5, img6];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    function goToPrev(){
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    function goToNext(){
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
    
    return (
        <div className="imgSliderContainer">
            <button className="prevBtn" onClick={goToPrev}>{"<"}</button>
            <img src={images[currentIndex]} alt="Slider" className="sliderImg"/>
            <button className="nextBtn" onClick={goToNext}>{">"}</button>
        </div>
    );
}

export default ImgSlider;