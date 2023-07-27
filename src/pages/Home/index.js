import React from "react";
import Hero from "./components/Hero/Hero";
import GetStarted from "./components/GetStarted/GetStarted";
import ChatRequest from "./components/ChatRequest/ChatRequest";
import MakeAWill from "./components/MakeAWill/MakeAWill";
import MakeAWillToday from "./components/MakeAWillToday/MakeAWillToday";
import Stats from "./components/Stats/Stats";
import LegalAndSafe from "./components/LegalAndSafe/LegalAndSafe";
import Testimonials from "./components/Testimonials/Testimonials";
// import Advantages from "./components/Advantages/Advantages";
import CreateWill from "../../components/Common/CreateWill/CreateWill";
import FAQ from "./components/FAQ/FAQ";
import Blogs from "../../components/Common/Blogs/Blogs";

const Home = () => {

  return (
    <>
      <Hero />
      <GetStarted />
      <ChatRequest />
      <MakeAWill />
      <MakeAWillToday />
      <Stats />
      <LegalAndSafe />
      <Testimonials />
      {/* <Advantages /> */}
      <CreateWill />
      <FAQ />
      <Blogs />
    </>
  );
};

export default Home;
