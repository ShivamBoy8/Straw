import { FaTshirt } from "react-icons/fa";
import { PiShirtFoldedLight } from "react-icons/pi";
import {
  GiHoodie,
  GiArmoredPants,
  GiTrousers,
  GiRunningShoe,
  GiBilledCap,
  GiLargeDress,
  GiAmpleDress,
  GiLargePaintBrush,
} from "react-icons/gi";
import { TbJacket } from "react-icons/tb";
import { BsStars, BsHandbag } from "react-icons/bs";

export const categoryData = {
  Men: [
    { label: "ALL", value: "ALL", Icon: BsStars },
    { label: "NEW IN", value: "NEW_IN", Icon: BsStars },
    { label: "T-SHIRTS", value: "T-Shirts", Icon: FaTshirt },
    { label: "SHIRTS", value: "Shirts", Icon: PiShirtFoldedLight },
    { label: "HOODIES", value: "Hoodies", Icon: GiHoodie },
    { label: "JACKETS", value: "Jackets", Icon: TbJacket },
    { label: "JEANS", value: "Jeans", Icon: GiArmoredPants },
    { label: "TROUSERS", value: "Trousers", Icon: GiTrousers },
    { label: "FOOTWEAR", value: "Footwear", Icon: GiRunningShoe },
    { label: "ACCESSORIES", value: "Accessories", Icon: GiBilledCap },
  ],

  Women: [
    { label: "ALL", value: "ALL", Icon: BsStars },
    { label: "NEW IN", value: "NEW_IN", Icon: BsStars },
    { label: "DRESSES", value: "Dresses", Icon: GiLargeDress },
    { label: "TOPS", value: "Tops", Icon: FaTshirt },
    { label: "KURTIS", value: "Kurtis", Icon: GiAmpleDress },
    { label: "JEANS", value: "Jeans", Icon: GiArmoredPants },
    { label: "SKIRTS", value: "Skirts", Icon: GiLargePaintBrush },
    { label: "HANDBAGS", value: "Handbags", Icon: BsHandbag },
    { label: "FOOTWEAR", value: "Footwear", Icon: GiRunningShoe },
    { label: "ACCESSORIES", value: "Accessories", Icon: GiBilledCap },
  ],

  Kids: [
    { label: "ALL", value: "ALL", Icon: BsStars },
    { label: "NEW IN", value: "NEW_IN", Icon: BsStars },
    { label: "T-SHIRTS", value: "T-Shirts", Icon: FaTshirt },
    { label: "SHIRTS", value: "Shirts", Icon: PiShirtFoldedLight },
    { label: "SHORTS", value: "Shorts", Icon: GiTrousers },
    { label: "JEANS", value: "Jeans", Icon: GiArmoredPants },
    { label: "DRESSES", value: "Dresses", Icon: GiLargeDress },
    { label: "FOOTWEAR", value: "Footwear", Icon: GiRunningShoe },
    { label: "ACCESSORIES", value: "Accessories", Icon: GiBilledCap },
  ],
};