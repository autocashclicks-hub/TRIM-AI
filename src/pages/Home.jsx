import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <span className="badge">
          AI Powered Haircut Recommendation
        </span>

        <h1>
          TRIM<span>AI</span>
        </h1>

        <h2>
          Find The Perfect Haircut For Your Face
        </h2>

        <p>
          Scan your face in seconds and let AI recommend hairstyles
          that best match your face shape.
        </p>

        <Link to="/scan">
          <button className="startBtn">
            Start Scan
          </button>
        </Link>

      </motion.div>

    </div>
  );
}