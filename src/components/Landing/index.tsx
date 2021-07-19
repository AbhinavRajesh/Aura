/* eslint-disable jsx-a11y/anchor-is-valid */
import { useClerk } from "@clerk/clerk-react";

const Landing = () => {
  const { openSignUp } = useClerk();

  return (
    <main
      id="home"
      className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 min-h-85 flex justify-start items-center"
    >
      <div className="text-left w-full">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl lg:text-7xl max-w-3xl">
          <span className="block md:inline">Your </span>{" "}
          <span className="block text-blue-600 md:inline">mood</span>{" "}
          <span className="block md:inline">
            {" "}
            is the most important thing in your life.
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
          Keep track of your mood and improve the quality of your life
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-start mx-auto w-full">
          <a
            href="#feature"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xl"
          >
            Features
          </a>
          <a
            href="#"
            className="ml-4 px-4 py-2 border-blue-600 border hover:border-blue-500 text-blue-600 hover:text-blue-500 rounded text-xl"
            onClick={() => openSignUp()}
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
};

export default Landing;
