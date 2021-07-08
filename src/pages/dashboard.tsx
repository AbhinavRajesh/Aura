import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Calendar from "src/components/Calendar";
import AddToCalendar from "src/components/AddToCalendar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main
        id="dashboard"
        className="mt-10 mx-8 lg:mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 min-h-85 flex flex-col"
      >
        <AddToCalendar />
        <Calendar />
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
