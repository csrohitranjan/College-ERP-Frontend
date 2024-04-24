import { Header } from "src/components/customComponents/Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
