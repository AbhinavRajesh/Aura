import { Howl } from "howler";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import sounds from "../utils/sounds";
import Layout from "src/components/Layout";

const Aura = () => {
  const [cachedSound] = useState({});
  const [active, setActive] = useState<number[]>([]);
  const [loading, setLoading] = useState<number | null>(null);

  const play = (id: number) => {
    const soundName = sounds.filter((sound) => sound.id === id)[0].sound;

    if (typeof cachedSound[id] === "undefined") {
      setLoading(id);
      cachedSound[id] = new Howl({
        src: [`/sounds/${soundName}.mp3`],
        loop: true,
        onload: function () {
          setActive((prev) => [...prev, id]);
          setLoading(null);
          cachedSound[id].play();
        },
      });
    } else {
      if (cachedSound[id].playing()) {
        cachedSound[id].fade(1, 0, 1000);
        setTimeout(function () {
          cachedSound[id].pause();
          setActive((prev) => prev.filter((i) => i !== id));
        }, 1000);
      } else {
        cachedSound[id].play();
        cachedSound[id].fade(0, 0.8, 1000);
        setActive((prev) => [...prev, id]);
      }
    }
  };

  useEffect(() => {
    return () => {
      for (let sound in cachedSound) {
        cachedSound[sound].stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Aura</h1>
        <p className="text-lg font-medium my-2">
          Listen to ambient sounds to improve your mood :D
        </p>
        <div className="flex flex-wrap">
          {sounds.map((sound) => (
            <div
              className={`p-4 sm:p-8 rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer h-12 sm:h-10 capitalize m-1 transition-all duration-300 ease-in-out ${
                active.includes(sound.id) && "bg-blue-600 text-white"
              } ${loading === sound.id && "bg-gray-100 text-gray-400"}`}
              data-sound={sound.sound}
              key={sound.id}
              onClick={() => play(sound.id)}
            >
              {sound.sound.split("-").join(" ")}
              {loading === sound.id && (
                <LoadingOutlined className="mt-1 mb-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Aura;
