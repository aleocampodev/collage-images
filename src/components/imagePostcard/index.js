import React, { useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { Waypoint } from "react-waypoint";

const ImagePostCard = ({
  url,
  type,
  isOnly,
  mimeType,
  onHandleFile = () => {},
  index = 0,
  creator = 0,
}) => {
  const [play, setPlay] = useState(false);
  const [blur, setBlur] = useState(0);

  const getSizes = (type) => {
    let size = {};
    switch (type) {
      case "history":
        size = {
          width: "6rem",
          height: "12rem",
          borderRadius: "5px",
          position: "absolute",
          objectFit: "cover",
          opacity: 0.7,
        };
        break;
      case "history-purchased":
        size = {
          width: "100%",
          height: "10rem",
          objectFit: "contain",
          position: "absolute",
        };
        break;
      case "thumbnail":
        size = {
          width: "100% !important",
          height: "100% !important",
          borderRadius: "5px",
          maxHeight: "25rem !important",
        };
        break;
      case "publication":
        size = {
          width: "100% !important",
          height: "25rem !important",
          maxHeight: "25rem !important",
          filter: `blur(${blur}px)`,
        };
        break;
      case "video":
        size = {
          width: "100% !important",
          height: "100% !important",
          maxHeight: "25rem !important",
        };
        break;
      case "imageModal":
        size = { width: "100% !important", height: "25rem !important" };
        break;
      case "videoModal":
        size = { width: "100% !important", height: "25rem !important" };
        break;
      case "live":
        size = {
          width: "17rem",
          height: "13rem",
          borderRadius: "20px",
          position: "absolute",
        };
        break;
      case "category":
        size = { width: "8rem", height: "13rem", borderRadius: "20px" };
        break;
      case "previewPublication":
        size = {
          width: "100% !important",
          height: "17rem !important",
          filter: `blur(${blur}px)`,
        };
        break;
      case "sales-purchases":
        size = {
          width: "100% !important",
          height: "auto !important",
          objectFit: "contain",
        };
        break;
      default:
        size = { width: "50%", height: "17rem", borderRadius: "10px" };
        break;
    }
    return size;
  };

  const handleExitViewport = () => {
    setPlay(false);
  };

  const handleBlurChange = (event) => {
    setBlur(event.target.value);
    onHandleFile(event, index);
  };

  return (
    <>
      {type == "video" || type == "videoModal" ? (
        <Waypoint
          topOffset={
            window.innerHeight > 850
              ? "450px"
              : (window.innerHeight - 50) / 2 + 50
          }
          bottomOffset={
            window.innerHeight > 850
              ? "400px"
              : (window.innerHeight - 50) / 2 - 50
          }
          scrollableAncestor={window}
          onLeave={handleExitViewport}
        >
          <div>
            <ReactPlayer
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              url={url}
              width="100%"
              playsinline={true}
              height="25rem"
              controls={true}
              className="video-post-card"
              playing={play}
              onPlay={() => setPlay(true)}
            />
          </div>
        </Waypoint>
      ) : (
        <>
          <img className="image-post-card" style={getSizes(type)} src={url} />
          {creator == 1 ? (
            <>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={blur}
                onChange={(e) => handleBlurChange(e, index)}
              />
              <span className={"title-crop-intensitive"}>
                intensidad de privacidad
              </span>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default ImagePostCard;
