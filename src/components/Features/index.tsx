import AddToCalendar from "../../assets/AddToCalendar.gif";
import MoodHistory from "../../assets/MoodHistory.png";
import MoodGraph from "../../assets/MoodGraph.png";
import Aura from "../../assets/Aura.png";

const Features = () => {
  return (
    <div className="py-12 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-20">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Aura has a variety of features to offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Not just another Mood Tracker
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-y-10 md:gap-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <img src={AddToCalendar} alt="GIF on how to add to calendar" />
              <div className="flex flex-col">
                <h2 className="text-2xl text-center md:text-left md:text-4xl font-bold">
                  Add your mood to calendar
                </h2>
                <p className="text-lg text-center md:text-left md:text-2xl mt-4">
                  It's super easy to add your mood to the calendar with just few
                  clicks!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col">
                <h2 className="text-2xl text-center md:text-left md:text-4xl font-bold">
                  Mood History
                </h2>
                <p className="text-lg text-center md:text-left md:text-2xl mt-4">
                  View your mood history displayed similar to Github
                  contributions or as in a monthly calendar view!
                </p>
              </div>
              <img
                src={MoodHistory}
                alt="GIF on how to add to calendar"
                className="row-start-1 row-end-1 md:row-start-auto md:row-end-auto"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <img src={MoodGraph} alt="GIF on how to add to calendar" />
              <div className="flex flex-col">
                <h2 className="text-2xl text-center md:text-left md:text-4xl font-bold">
                  Analyse your mood
                </h2>
                <p className="text-lg text-center md:text-left md:text-2xl mt-4">
                  View and Analyse your mood in the form of beautiful graphs!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col">
                <h2 className="text-2xl text-center md:text-left md:text-4xl font-bold">
                  Enhance your mood with Aura
                </h2>
                <p className="text-lg text-center md:text-left md:text-2xl mt-4">
                  Listen to 20+ ambient noise to enlighten your mood and get
                  relief from stress and anxiety
                </p>
              </div>
              <img
                src={Aura}
                alt="GIF on how to add to calendar"
                className="row-start-1 row-end-1 md:row-start-auto md:row-end-auto"
              />
            </div>
          </div>
          {/*  row-start-1 row-end-1 */}
        </div>
      </div>
    </div>
  );
};

export default Features;
