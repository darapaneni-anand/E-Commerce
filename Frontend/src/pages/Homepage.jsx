import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import PopularWomen from "../components/Popularwomen";
import Offers from "../components/Offers";
import NewCollections from "../components/NewCollections";
import Newsletter from "../components/NewsLetter";

import Authpage from"./AuthPage";



function HomePage() {
  return (
    <div>
   <Hero/>
   <PopularWomen/>
   <Offers/>
   <NewCollections/>
   <Newsletter/>
  
  
   </div>
  );
}

export default HomePage;
