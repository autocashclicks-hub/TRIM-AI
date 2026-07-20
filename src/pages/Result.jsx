import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Result.css";

export default function Result() {

  const data = JSON.parse(localStorage.getItem("analysis"));

  const [previewImage, setPreviewImage] = useState(null);

  const imageMap = {
    "Buzz Cut": "/hairstyles/buzz-cut.png",
    "Crew Cut": "/hairstyles/crew-cut.png",
    "French Crop": "/hairstyles/french-crop.png",
    "Textured Fringe": "/hairstyles/textured-fringe.png",
    "Textured Crop": "/hairstyles/textured-crop.png",
    "Quiff": "/hairstyles/quiff.png",
    "Pompadour": "/hairstyles/pompadour.png",
    "Side Part": "/hairstyles/side-part.png",
    "Slick Back": "/hairstyles/slick-back.png",
    "Middle Part": "/hairstyles/middle-part.png",
    "Undercut": "/hairstyles/undercut.png"
  };

  if (!data || !data.success) {
    return (
      <div className="resultPage emptyPage">

        <div className="emptyCard">

          <h1>No Analysis Found</h1>

          <p>
            Please scan your face first.
          </p>

          <Link to="/">
            <button>
              Go Home
            </button>
          </Link>

        </div>

      </div>
    );
  }

  const best = data.bestHaircut;

  const heroImage =
    imageMap[best.name] ||
    "/hairstyles/textured-crop.png";

  return (

<div className="resultPage">

      <motion.div
        className="heroCard"
        initial={{ opacity:0,y:40 }}
        animate={{ opacity:1,y:0 }}
        transition={{ duration:.6 }}
      >

      <div className="heroImage">

  <img
    src={heroImage}
    alt={best.name}
    onClick={() => setPreviewImage(heroImage)}
    style={{ cursor: "zoom-in" }}
  />

</div>

        <div className="heroContent">

          <span className="aiBadge">
            🤖 TRIM AI
          </span>

          <div className="faceBadge">
            {data.faceShape} Face Shape
          </div>

          <h1>
            {best.name}
          </h1>

          <div className="heroMatch">
            ⭐ {best.match}% Match
          </div>

          <p>
            {best.reason}
          </p>

        </div>

      </motion.div>

      <h2 className="sectionTitle">
        More Recommendations
      </h2>

      <div className="stylesGrid">

            {data.recommendations.map((item, index) => {

          const image =
            imageMap[item.name] ||
            "/hairstyles/textured-crop.png";

          return (

            <motion.div
              key={index}
              className="styleCard"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08
              }}
              whileHover={{
                scale: 1.03,
                y: -8
              }}
            >

              <img
                src={image}
                alt={item.name}
                onClick={() =>
                  setPreviewImage(image)
                }
                style={{
                  cursor: "zoom-in"
                }}
              />

              <div className="styleContent">

                <h3>
                  {item.name}
                </h3>

                <div className="matchBadge">
                  ⭐ {item.match}% Match
                </div>

                <p>
                  {item.reason}
                </p>

                <small>
                  Recommended for your
                  <strong> {data.faceShape}</strong>
                  {" "}face shape.
                </small>

              </div>

            </motion.div>

          );

        })}

      </div>

      <div className="bottomButtons">

        <Link to="/scan">
          <button className="secondaryBtn">
            📷 Scan Again
          </button>
        </Link>

        <Link to="/">
          <button className="primaryBtn">
            🏠 Back Home
          </button>
        </Link>

      </div>

         {previewImage && (
  <div
    className="imagePreview"
    onClick={() => setPreviewImage(null)}
  >
    <img
      src={previewImage}
      alt="Preview"
      onClick={(e) => e.stopPropagation()}
    />

    <button
      className="closePreview"
      onClick={() => setPreviewImage(null)}
    >
      ✕
    </button>
  </div>
)}

    </div>

  );
}