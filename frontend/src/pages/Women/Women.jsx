import CategoryLanding from "../../components/CategoryLanding/CategoryLanding";

import hero from "../../assets/assetsfooter/women.png";

import banner from "../../assets/assetsfooter/summarwomen.png";

export default function Women() {
  return (
    <CategoryLanding
      category="Women"
      heroImage={hero}
      heading="WOMEN"
      heroBackground="#f4eeeb"
      subline="Modern elegance."
     description="Thoughtfully crafted pieces that blend effortless elegance, modern tailoring, and timeless style for every occasion."
      bannerImage={banner}
      bannerTitle="NEW SEASON ARRIVALS"
      bannerSubtitle="Timeless silhouettes crafted for every occasion."
    />
  );
}