import CategoryLanding from "../../components/CategoryLanding/CategoryLanding";

import hero from "../../assets/assetsfooter/newVibes.jpeg";

import banner from "../../assets/assetsfooter/summarmen.png";

export default function Men() {
  return (
    <CategoryLanding
      category="Men"
      heroImage={hero}
      heroBackground="#c6c1be"
      heading="MEN"
      subline="Timeless style. Modern edge."
      description="Crafted for confidence with refined essentials, tailored silhouettes, and versatile pieces that move effortlessly from workdays to weekends."
      bannerImage={banner}
      bannerTitle="SUMMER ESSENTIALS"
      bannerSubtitle="Discover lightweight styles made for every moment."
    />
  );
}
