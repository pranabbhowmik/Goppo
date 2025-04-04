import React from "react";
import GoppoSeo from "../../components/GoppoSeo";

const Genderbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <>
      <GoppoSeo />
      <div className="flex ">
        <div className="form-control ">
          <label
            className={`label gap-2 cursor-pointer ${
              selectedGender === "male" ? "selected" : ""
            } `}
          >
            <span className="label-text text-gray-300">Male</span>
            <input
              type="checkbox"
              className="checkbox checkbox-success "
              checked={selectedGender === "male"}
              onChange={() => onCheckboxChange("male")}
            />
          </label>
        </div>
        <div className="form-control">
          <label
            className={`label gap-2 cursor-pointer  ${
              selectedGender === "female" ? "selected" : ""
            }`}
          >
            <span className="label-text text-gray-300">Female</span>
            <input
              type="checkbox"
              className="checkbox checkbox-secondary"
              checked={selectedGender === "female"}
              onChange={() => onCheckboxChange("female")}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Genderbox;
