import Header from "./components/Header";
import Hero from "./components/Hero";
import Hook from "./components/Hook";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Engineering from "./components/Engineering";
import TechMap from "./components/TechMap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen w-full bg-[#F6F0E8]">
        <div className="flex w-full flex-col text-[#302832]">
          <Hero />
          <Hook />
          <Journey />
          <Projects />
          <Engineering />
          <TechMap />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}
