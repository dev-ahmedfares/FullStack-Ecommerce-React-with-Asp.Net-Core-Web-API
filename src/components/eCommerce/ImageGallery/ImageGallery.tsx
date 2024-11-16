import { useState } from "react";
import styles from "./styles.module.css";

const { imageGallery, activeImgStyle } = styles;
type TImageProps = {
  imgArr: { img: string; num: number }[];
};

export default function ImageGallery({ imgArr }: TImageProps) {

  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className={imageGallery}>
      <ul>
        {imgArr.map((image) => (
          <li
            key={image.num}
            onClick={() => setActiveImg(image.num)}
            className={image.num === activeImg ? activeImgStyle : ""}
          >
            <img src={image.img} alt="image" />
          </li>
        ))}
      </ul>
      <div>
        <img
          src={imgArr[activeImg].img}
          alt="big image"
        />
      </div>
    </div>
  );
}
