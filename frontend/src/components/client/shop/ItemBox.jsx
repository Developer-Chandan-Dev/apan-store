/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./style.css";
import { Image, Star } from "lucide-react";

const ItemBox = ({ _id, name, category, price, imageUrl, rating }) => {
  return (
    <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
      <Link to={`/shop/${_id}`}>
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-fit cursor-pointer"
              alt={name}
            />
          ) : (
            <Image className="w-full h-full text-gray-300" />
          )}
        </div>
      </Link>
      <div className="flex-center flex-col py-5">
        <p>{category}</p>
        <h4 className="text-lg font-semibold py-1">{name}</h4>
        <div className="flex-center">
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
        </div>
        <p className="mt-1">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ItemBox;
