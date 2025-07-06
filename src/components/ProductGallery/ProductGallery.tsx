import React, { useEffect, useRef, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);

  useEffect(() => {
    const index = images.findIndex((img) => img.imageUrl === mainImage);
    if (index >= 0) {
      setCurrentIndex(index);
      slider1.current?.slickGoTo(index);
      slider2.current?.slickGoTo(index);
    }
  }, [mainImage, images]);

  const settingsMain = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: slider2.current || undefined,
    afterChange: (index: number) => {
      setCurrentIndex(index);
      onSelectImage(images[index].imageUrl);
    },
  };

  const settingsThumbs = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: Math.min(images.length, 6),
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    asNavFor: slider1.current || undefined,
  };

  return (
    <div className="gallery-container">
      <div className="main-slider mobile">
        <Slider {...settingsMain} ref={slider1}>
          {images.map((img, i) => (
            <div key={i} className="container-img">
              <img
                className="main-image"
                src={img.imageUrl}
                alt={img.imageText || "Product"}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="desktop-gallery">
        <div className="thumbnail-slider-container">
          <Slider {...settingsThumbs} ref={slider2}>
            {images.map((img, i) => (
              <div
                key={i}
                className={`container-img-thumbnail ${
                  currentIndex === i ? "active" : ""
                }`}
              >
                <img
                  className="thumbnail"
                  src={img.imageUrl}
                  alt={img.imageText || "Thumbnail"}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="main-slider desktop">
          <Slider {...settingsMain} ref={slider1}>
            {images.map((img, i) => (
              <div key={i} className="container-img">
                <img
                  className="main-image"
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
