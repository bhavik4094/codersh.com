// /* eslint-disable react/prop-types */
// function Dropdown({ children, noShape }) {
//   return <ul className={`sub-menu ${noShape && "shape-none"}`}>{children}</ul>;
// }

// export default Dropdown;
/* eslint-disable react/prop-types */
import React from "react";
import Mega_Menu2 from "../../../home-one/header/Mega_Menu2";

function Dropdown({ children, noShape }) {
  const isMegaMenu2 =
    React.Children.count(children) === 1 && children.type === Mega_Menu2;

  return (
    <ul
      className={`sub-menu ${noShape ? "shape-none" : ""} ${
        isMegaMenu2 ? "sub-menu2" : ""
      }`}
    >
      {children}
    </ul>
  );
}

export default Dropdown;
