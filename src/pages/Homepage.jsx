import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import PopularWomen from "../components/Popularwomen";
import Offers from "../components/Offers";
import NewCollections from "../components/NewCollections";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";



function HomePage() {
  return (
    <div>
   <Hero/>
   <PopularWomen/>
   <Offers/>
   <NewCollections/>
   <Newsletter/>
   <Footer/>
  
   </div>
  );
}

export default HomePage;
