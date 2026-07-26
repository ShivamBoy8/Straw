import CategoryLanding from "../../components/CategoryLanding/CategoryLanding";

import hero from "../../assets/assetsfooter/kids.png";
import banner from "../../assets/assetsfooter/summarkids.png";

export default function Kids() {
  return (
    <CategoryLanding
      category="Kids"
      heroImage={hero}
      heading="KIDS"
      heroBackground="#eee4dc"
      subline="Made for every adventure."
      description="Comfortable, durable, and playful essentials designed to keep up with every jump, laugh, and new discovery."
      bannerImage={banner}
      bannerTitle="EVERYDAY ADVENTURES"
      bannerSubtitle="Fun styles designed to move with every little step."
    />
  );
}
