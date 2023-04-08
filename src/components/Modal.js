import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import ShowImage from "./ShowImage";

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonFiles = useRef();
  const [images, setImages] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleShowImages = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = i;
      const reader = new FileReader();

      reader.onload = (event) => {
        const newImage = {
          id,
          file,
          description: "",
          preview: event.target.result,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      };

      if (imagesArray.length === files.length) {
        setImages(imagesArray);
      }

      reader.readAsDataURL(file);
    }
  };

  console.log(images, "img");

  return (
    <div>
      <button
        onClick={openModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <label htmlFor="upload-files" className="upload-files w-100">
            <div className="upload-files-button">
              <div className="container-icon">
                <BsFillPlusSquareFill size="3em" />
              </div>
              <label htmlFor="upload-files" className={"files-selector m-3"}>
                Seleccionar archivos ...
              </label>
              <input
                id="upload-files"
                ref={buttonFiles}
                type="file"
                name="images"
                onChange={handleShowImages}
                accept=".mp4, .mov, .png, .jpeg, .jpg, .avi, .m4v"
                multiple
              />
            </div>
          </label>
        </div>
        <ShowImage dataImages={images} setImages={setImages} />
        <p>This is the modal content.</p>
        <button
          onClick={closeModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  );
}

export default CustomModal;
