import React from "react";
import ImagePostCard from "../imagePostcard";
import Image from "next/image";
import style from "../../styles/index.module.css";

const ShowImage = ({ images, setImages }) => {
  const handleDescriptionChange = (index, e) => {
    const newImages = [...images];
    newImages[index].description = e.target.value;
    setImages(newImages);
  };

  console.log(images);

  return (
    <div className="flex justify-center mt-24">
      {images.map((item, index) => (
        <div key={item.id}>
          <Image
            src={URL.createObjectURL(item)}
            alt="uploaded"
            className={style.imageUploaded}
            width="100"
            height="100"
          />
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleDescriptionChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default ShowImage;
