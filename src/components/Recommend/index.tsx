import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface Props {
  setDisplayRecommendation: Dispatch<SetStateAction<boolean>>;
}

const Recommend = ({ setDisplayRecommendation }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl rounded-md shadow w-full p-8 bg-white h-64 fixed bottom-2 left-1/2 transform -translate-x-1/2">
      <span
        className="text-3xl font-bold top-2 absolute right-5 cursor-pointer p-2"
        onClick={() => setDisplayRecommendation(false)}
      >
        &times;
      </span>
      <h2 className="font-semibold text-center text-2xl">
        Sad to hear you had a bad day :(
      </h2>
      <p className="text-base text-center my-4">
        Listen to 20+ ambient noise to enlighten your mood and get relief from
        stress and anxiety
      </p>
      <Link
        to="/aura"
        className="bg-blue-600 py-2 px-8 rounded text-white hover:bg-blue-500 hover:text-white font-semibold text-base"
      >
        Enhance your mood
      </Link>
    </div>
  );
};

export default Recommend;
