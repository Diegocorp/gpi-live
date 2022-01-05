import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import CustomTable from "../../Components/Table";
import apis from "../../API";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "../../Utils/UserContext";
import "./styles.css";

const Projects = () => {
  const [projectsData, setProjectsData] = useState({});
  const [toggleUserProjects, setToggleUserProjects] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ query: `(max-width: 570px)` });

  useEffect(() => {
    async function fetchData() {
      toggleUserProjects
        ? await apis
            .getProjectsByCreator({
              department: user.department,
              creatorID: user.employeeNumber,
            })
            .then((result) => {
              setLoading(false);
              setProjectsData(result);
            })
        : await apis
            .getProjectsByDepartment({ department: user.department })
            .then((result) => {
              setLoading(false);
              setProjectsData(result);
            });
    }
    fetchData();
  }, [toggleUserProjects, user]);

  return (
    <div className=" w-100 h-100">
      <div className="w-100 h-100">
        <div
          className={`container-fluid w-100 h-100  ${
            isMobile ? "" : "text-left"
          }`}
        >
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <div className="d-block justify-content-between align-items-center mb-4">
              <h2 className="text-dark mb-3">
                <strong>Proyectos</strong>
              </h2>
              <CustomTable
                projectsData={projectsData}
                setToggleUserProjects={setToggleUserProjects}
                toggleUserProjects={toggleUserProjects}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
