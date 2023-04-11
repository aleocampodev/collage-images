import React from "react";
import ImagePostCard from "../imagePostcard";
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
          <img
            src={item.preview}
            alt="uploaded"
            className={style.imageUploaded}
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
