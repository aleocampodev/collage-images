import React from "react";
import ImagePostCard from "../imagePostcard";

const ShowImage = ({ images, setImages }) => {
  const handleDescriptionChange = (index, e) => {
    const newImages = [...images];
    newImages[index].description = e.target.value;
    setImages(newImages);
  };

  console.log(images);

  return (
    <>
      {images.map((item, index) => (
        <div key={item.id}>
          <img src={item.preview} alt="uploaded" />
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleDescriptionChange(index, e)}
          />
        </div>
      ))}
    </>
  );
};

export default ShowImage;
