import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="flex flex-col justify-center items-center text-center mt-16"
    >
      <p className="font-bold text-sm">
        Made with 💖 by{" "}
        <a
          href="https://github.com/AbhinavRajesh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Abhinav Rajesh
        </a>
      </p>
      <a
        href="https://github.com/AbhinavRajesh/Aura"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 font-bold mb-4"
      >
        Leaving a ⭐ for the repo would make my day :D
      </a>
    </footer>
  );
};

export default Footer;
