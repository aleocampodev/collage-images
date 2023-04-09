import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import "../styles/styles.module.css";
import ShowImage from "./ShowImage";
import axios from "axios";

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
        setImages([...images, newImage]);
      };

      if (imagesArray.length === files.length) {
        setImages(imagesArray);
      }

      reader.readAsDataURL(file);
    }
  };

  const sendData = async () => {
    const response = await axios("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": " multipart/form-data",
        onUploadProgress: (event) => {
          const p = Math.round((event.loaded * 100) / event.total);
          setProgress(p);
        },
      },
      data: images,
    });
  };

  console.log(images);

  return (
    <div>
      <button
        onClick={openModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 button"
      >
        Create
      </button>
      <>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="w-9/12 mt-8 modal"
        >
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div>
              <label htmlFor="upload-files" className="upload-files w-100">
                <div className="upload-files-button">
                  <div className="container-icon">
                    <BsFillPlusSquareFill size="3em" />
                  </div>
                  <label
                    htmlFor="upload-files"
                    className={"files-selector m-3"}
                  >
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
            {images.length > 0 && (
              <ShowImage images={images} setImages={setImages} />
            )}
            {images.length > 0 && (
              <button
                onClick={() => sendData()}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Image
              </button>
            )}

            <button
              onClick={closeModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close Modal
            </button>
          </div>
        </Modal>
      </>
    </div>
  );
}

export default CustomModal;
