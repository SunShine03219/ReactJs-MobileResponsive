import React from "react";

import Hero from "./components/Hero/Hero";
import MissonAndValues from "./components/MissonAndValues/MissonAndValues";
// import Passdown from "./components/Passdown/Passdown";
// import KeyMembers from "./components/KeyMembers/KeyMembers";
// import OurTeam from "./components/OurTeam/OurTeam";
// import WhyUs from "./components/WhyUs/WhyUs";
import CreateWill from "../../components/Common/CreateWill/CreateWill";
import ContactUs from "./components/ContactUs/ContactUs";

const AboutUs = () => {
  return (
    <>
      <Hero />
      <MissonAndValues />
      {/* <Passdown />
      <KeyMembers />
      <OurTeam />
      <WhyUs /> */}
      <CreateWill />
      <ContactUs />
    </>
  )
};

export default AboutUs;