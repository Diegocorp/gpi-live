import React, { useContext } from "react";
import { UserContext } from "../../Utils/UserContext";
import CreateProject from "../CreateProject";
import CreateResidencyProject from "../CreateResidencyProject";

const Project = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-100">
      {user.department === "residencias" ? (
        <CreateResidencyProject title="Vista de proyecto" edit={true} />
      ) : (
        <CreateProject title="Vista de proyecto" edit={true} />
      )}
    </div>
  );
};

export default Project;
