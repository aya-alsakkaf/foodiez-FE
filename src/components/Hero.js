import React, { useContext } from "react";
import chef from "../assets/images/Chef-cuate.svg";
import { UserContext } from "../context/UserContext";

const Hero = () => {
  const user = useContext(UserContext);
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chef} className="max-w-lg rounded-lg" alt="chef saute" />
        <div>
          <h1 className="text-5xl mainFont">Unleash your inner chef!</h1>
          <p className="py-6 subFont lg:w-max">
            Embrace the joy of cooking with Foodiez - Where every ingredient
            tells a story
          </p>
          {user ? null : (
            <button className="btn bg-red-700 text-white mainFont hover:text-black">
              LOGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
