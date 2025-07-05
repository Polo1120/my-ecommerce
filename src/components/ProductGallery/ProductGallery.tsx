import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "./styles.css";

interface Image {
  imageUrl: string;
  imageText?: string;
}

interface Props {
  images: Image[];
  onSelectImage: (url: string) => void;
  mainImage: string;
}

const ProductGallery: React.FC<Props> = ({
  images,
  onSelectImage,
  mainImage,
}) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);

  const settingsMain = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2 || undefined,
    afterChange: (index: number) => {
      setCurrentIndex(index);
      onSelectImage(images[index].imageUrl);
    },
  };

  const settingsThumbs = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: Math.min(images.length, 8),
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
  };

  return (
    <div className="gallery-container">
      <div className="main-slider mobile">
        <Slider {...settingsMain}>
          {images.map((img, i) => (
            <div key={i} className="container-img 3">
              <img
                className="main-image e"
                src={img.imageUrl}
                alt={img.imageText || "Product"}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="desktop-gallery">
        <div className="thumbnail-slider-container">
          <Slider
            {...settingsThumbs}
            ref={(slider) => {
              setNav2(slider);
              slider2.current = slider;
            }}
          >
            {images.map((img, i) => (
              <div key={i} className={`container-img-thumbnail ${currentIndex === i ? "active" : ""}`} >
                <img
                  className={`thumbnail`}
                  src={img.imageUrl}
                  alt={img.imageText || "Thumbnail"}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="main-slider desktop">
          <Slider
            {...settingsMain}
            ref={(slider) => {
              setNav1(slider);
              slider1.current = slider;
            }}
          >
            {images.map((img, i) => (
              <div key={i} className="container-img">
                <img
                  className="main-image " 
                  src={img.imageUrl}
                  alt={img.imageText || "Product"}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
