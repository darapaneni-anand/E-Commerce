import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import PopularWomen from "../components/Popularwomen";
import Offers from "../components/Offers";
import NewCollections from "../components/NewCollections";


import Authpage from"./AuthPage";



function HomePage() {
  return (
    <div>
   <Hero/>
   <PopularWomen/>
   <Offers/>
   <NewCollections/>

  
  
   </div>
  );
}

export default HomePage;
