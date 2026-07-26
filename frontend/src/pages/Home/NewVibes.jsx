import React from "react";
import BannerSection from "../../components/Banner/Bannersection";
import vibesImage from "../../assets/assetsfooter/newvibes.jpeg";

const NewVibes = () => {
  return (
    <BannerSection
      image={vibesImage}
      bgColor="#c8c5c1"         
      eyebrow="NEW SEASON"
      heading={["NEW", "VIBES"]}
      description="Discover everything new and now."
      buttonText="EXPLORE COLLECTION"
      align="left"
      minHeight="560px"
    />
  );
};

export default NewVibes;