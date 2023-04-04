import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { handleFile } from "../helpers";

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonFiles = useRef();
  const [form, setForm] = useState({
    title_gallery: "",
    files_description: [],
  });
  const [files, setFiles] = useState([]);
  const [textMaxLength, setTextMaxLength] = useState(255);
  const [titleMaxLength, setTitleMaxLength] = useState(100);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleShowImages = (e) => {
    const items = handleFile(e);
    console.log(items);
    if (items === false) {
      return;
    }
    setForm({
      ...form,
      ...{
        files_description: [...form.files_description, ...items],
      },
    });
  };

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
