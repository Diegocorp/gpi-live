import React, { useContext } from "react";
import "./styles.css";
import NavItem from "../NavItem";
import NavButton from "../NavButton";
import {
  faUser,
  faTable,
  faFileAlt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { GuestContext } from "../../Utils/GuestContext";
import tecLogo from "../../Assets/img/tecnm-1.png";

const NavBar = () => {
  const { guest } = useContext(GuestContext);

  return (
    <div className={`d-flex flex-column h-100`} id="Navbar__Container">
      {/* Open/Close NavBar Button */}
      <span className="mt-2 w-100 justify-content-center d-flex z-depth-3 position-relative">
        <NavButton />
      </span>
      {/* Nav List Items */}
      <nav
        id="NavBar"
        className={
          "navbar navbar-expand-lg navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary h-100"
        }
      >
        <div
          className="container-fluid d-flex h-100 flex-column p-0 collapse navbar-collapse h-100"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav h-100 text-left pl-0 mt-3 justify-content-around d-flex flex-column">
            <NavItem id="statistics" icon={faChartBar} title="Estadisticas" />
            {guest ? null : <NavItem id="me" icon={faUser} title="Perfil" />}
            <NavItem id="projects" icon={faTable} title="Proyectos" />
            {guest ? null : (
              <NavItem
                id="create"
                icon={faFileAlt}
                title="Gestor de Proyectos"
              />
            )}
          </ul>
        </div>
      </nav>
      {/* Logo */}
      <span>
        <img
          src={tecLogo}
          id="tecLogo"
          alt="TecNM"
          className="w-75 h-75 rounded-circle"
        />
        <h3 className="text-white">
          <strong>GPI</strong>
        </h3>
      </span>
    </div>
  );
};

export default NavBar;
