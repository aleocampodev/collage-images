import React from "react";
import ImagePostCard from "../imagePostcard";
import { data } from "autoprefixer";

const ShowImage = (dataImages, setImages) => {
  const handleDescriptionChange = (index, e) => {
    const newImages = [...images];
    newImages[index].description = e.target.value;
    setImages(newImages);
  };

  return (
    <>
      {Object.values(dataImages).map((item, index) => (
        <div key={item.id}>
          <ImagePostCard />
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
