
import "./App.css";
import Background from "./Components/Background/Background";
import Home from "./Sections/Home/Home";

const App = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#f3f6f9] overflow-x-hidden">
      {/* 1. Transparent 3D Interactive Droplet Parallax Background */}
      <Background />

      {/* 2. Scrolling Layout Layer */}
      <main className="relative z-10 w-full min-h-screen pointer-events-none">
        {/* Home Section */}
        <section
          id="home"
          className="w-full min-h-screen flex items-center justify-center pointer-events-none"
        >
          <Home />
        </section>
      </main>
    </div>
  );
};

export default App;