import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Category.css';
import { FaTshirt } from "react-icons/fa";
import { PiShirtFoldedLight } from "react-icons/pi";
import { GiHoodie, GiArmoredPants, GiTrousers, GiRunningShoe, GiBilledCap } from "react-icons/gi";
import { TbJacket } from "react-icons/tb";


import { 
  BsSearch,
  BsStars
} from 'react-icons/bs';


const Category = () => {
  const categories = [
    { name: 'NEW IN', Icon: BsStars },
    { name: 'T-SHIRTS', Icon: FaTshirt },
    { name: 'SHIRTS', Icon: PiShirtFoldedLight },
    { name: 'HOODIES & SWEATSHIRTS', Icon: GiHoodie },
    { name: 'JACKETS', Icon: TbJacket },
    { name: 'JEANS', Icon: GiArmoredPants },
    { name: 'TROUSERS', Icon: GiTrousers },
    { name: 'FOOTWEAR', Icon: GiRunningShoe },
    { name: 'ACCESSORIES', Icon: GiBilledCap },
  ];

  return (
    <div>
      {/* Categories Bar */}
      <section className="border-bottom py-4">
        <div className="container-fluid px-4 px-md-5">
          {/* Grid on Mobile (<768px) -> Flex single row on Tablet & Laptop (>=768px) */}
          <div className="row row-cols-3 g-2 g-sm-3 d-md-flex flex-md-nowrap justify-md-content-between overflow-md-x-auto pb-md-2 category-scroll-container text-center align-items-center">
            {categories.map((cat, idx) => {
              const CategoryIcon = cat.Icon;
              return (
                <div key={idx} className="col flex-md-shrink-0 flex-lg-shrink-1">
                  <div className="p-1 p-md-2 cursor-pointer category-item">
                    <CategoryIcon size={24} className="mb-2 d-block mx-auto category-icon" />
                    <span className="d-block category-label text-md-nowrap">{cat.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}; //  Close the function component before exporting

export default Category;