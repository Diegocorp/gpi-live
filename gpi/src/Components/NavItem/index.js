import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { ProjectContext } from "../../Utils/ProjectContext";

const NavItem = ({ guest, id, icon, title, extraStyles, children }) => {
  let { userID, page } = useParams();
  const { setProject } = useContext(ProjectContext);
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });
  const styleSelected = "nav-link active font-weight-bold ";
  const styleUnSelected = "nav-link";
  const Nav =
    "d-flex flex-column justify-content-center text-center align-items-center text-decoration-none ";

  return (
    <li
      className={`nav-item d-flex flex-column align-items-center justify-content-center h6 ${
        extraStyles ? extraStyles : ""
      }`}
      role="presentation"
      style={guest ? { display: "none" } : null}
      onClick={() => {
        setProject({});
      }}
    >
      <Link
        id={id}
        className={
          Nav +
          (isMobile ? "" : page === `${id}` ? styleSelected : styleUnSelected)
        }
        style={
          isMobile
            ? { width: "100%" }
            : page === `${id}`
            ? {}
            : { color: "rgba(255,255,255,.5)" }
        }
        to={!userID ? `/guest/${id}` : `/user/${userID}/${id}`}
      >
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
        {title}
      </Link>
      {children}
    </li>
  );
};

export default NavItem;
