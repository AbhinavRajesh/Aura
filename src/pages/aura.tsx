import { Howl } from "howler";
import { useState, useEffect } from "react";
import sounds from "../utils/sounds";

const Aura = () => {
  const [cachedSound] = useState({});
  const [active, setActive] = useState<number[]>([]);

  const play = (id: number) => {
    const soundName = sounds.filter((sound) => sound.id === id)[0].sound;

    if (typeof cachedSound[id] === "undefined") {
      cachedSound[id] = new Howl({
        src: [`/sounds/${soundName}.mp3`],
        loop: true,
        onload: function () {
          setActive((prev) => [...prev, id]);
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
    <>
      <div className="sounds">
        <h1 className="sounds__heading">Ambient Sounds</h1>
        <div className="flex flex-wrap space-x-5 space-y-5">
          {sounds.map((sound) => (
            <div
              className={`p-8 rounded-lg bg-white cursor-pointer capitalize ${
                active.includes(sound.id) && "bg-blue-600 text-white"
              }`}
              data-sound={sound.sound}
              key={sound.id}
              onClick={() => play(sound.id)}
            >
              {sound.sound.split("-").join(" ")}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Aura;
