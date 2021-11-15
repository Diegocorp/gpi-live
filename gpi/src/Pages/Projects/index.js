import React, { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    async function fetchData() {
      toggleUserProjects
        ? await apis
            .getProjectsByCreator({ creatorID: user.employeeNumber })
            .then((result) => {
              setLoading(false);
              setProjectsData(result);
            })
        : await apis.getProjects().then((result) => {
            setLoading(false);
            setProjectsData(result);
          });
    }
    fetchData();
  }, [toggleUserProjects, user]);

  return (
    <div className=" w-100 h-100">
      <div className="w-100 h-100">
        <div className="container-fluid h-100 w-100">
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <div className="text-left h-100">
              <h2 className="text-dark">
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
