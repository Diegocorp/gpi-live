import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { store } from "react-notifications-component";
import { UserContext } from "../../Utils/UserContext";
import { GuestContext } from "../../Utils/GuestContext";
import { ProjectContext } from "../../Utils/ProjectContext";
import "./styles.css";
import apis from "../../API";
import AddStudent from "../../Components/AddStudent";
import AddTeacher from "../../Components/AddTeacher";
import AddDoc from "../../Components/AddDoc";
import "react-notifications-component/dist/theme.css";

const CreateProject = ({ title, edit }) => {
  let { id } = useParams();
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const { guest } = useContext(GuestContext);
  const isMobile = useMediaQuery({ query: `(max-width: 750px)` });
  const [dataObject, setDataObject] = useState({
    proyectName: "",
    releaseDate: "",
    startDate: "",
    conclusionDate: "",
    typeProyect: "Desarrollo de software",
    objectiveProject: "Objetivo del proyecto",
    statusProject: "Cancelado",
    projectComment: "",
    enterpriseProject: "",
    enterpriseContact: "",
    firstNameContact: "",
    lastNameContact: "",
    studentMember: {},
    teacherMember: {},
    projectFileName: {},
    creatorID: "",
  });
  const [documentUploads, setDocumentUploads] = useState({});
  const [addStudent, setAddStudent] = useState([]);
  const [addTeacher, setAddTeacher] = useState([]);

  useEffect(() => {
    let pageItems = document.getElementById("projectID");
    let selectItems = document.querySelectorAll(".form-group > select");
    if (Object.keys(project).length > 0) {
      setDataObject(project);
      if (!project.creatorID) {
        setDataObject((prev) => ({
          ...prev,
          typeProyect: "Desarrollo de software",
          objectiveProject: "Objetivo del proyecto",
          statusProject: "Cancelado",
        }));
      }
      if (project.studentMember) {
        setAddStudent(
          Object.keys(project.studentMember).map((key) => [
            project.studentMember[key],
          ])
        );
      }
      if (project.teacherMember) {
        setAddTeacher(
          Object.keys(project.teacherMember).map((key) => [
            project.teacherMember[key],
          ])
        );
      }
    }

    if (project) {
      if (user.employeeNumber && project.creatorID) {
        if (project.creatorID.toString() !== user.employeeNumber.toString()) {
          for (let i = 0, len = pageItems.length; i < len; ++i) {
            pageItems.elements[i].readOnly = true;
          }
          for (let i = 0; i < selectItems.length; ++i) {
            selectItems[i].setAttribute("disabled", "");
          }
        }
        if (project.creatorID === user.employeeNumber) {
          for (let i = 0, len = pageItems.elements.length; i < len; ++i) {
            pageItems.elements[i].readOnly = false;
          }
        }
      }
      if (guest) {
        for (let i = 0, len = pageItems.elements.length; i < len; ++i) {
          pageItems.elements[i].readOnly = true;
        }
        for (let i = 0; i < selectItems.length; ++i) {
          selectItems[i].setAttribute("disabled", "");
        }
      }
    }

    if (!project.creatorID && user.employeeNumber) {
      setDataObject((prev) => ({
        ...prev,
        creatorID: user.employeeNumber,
      }));
    }
  }, [guest, user, project]);

  const handleType = (e) => {
    const { id, value } = e.target;
    setDataObject((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function handleStudents(key) {
    setAddStudent((prevState) => [...prevState, key]);
  }

  function deleteStudent(key) {
    setAddStudent(() => addStudent.filter((n) => n !== key));
  }

  function handleTeachers(key) {
    setAddTeacher((prevState) => [...prevState, key]);
  }

  function deleteTeacher(key) {
    setAddTeacher(addTeacher.filter((item) => item !== key));
  }

  const downloadPDF = async () => {
    const payload = { dataObject };
    apis.buildDocentePDF(payload);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    Object.keys(dataObject.studentMember)
      .map((value) => {
        if (
          !dataObject.studentMember[value][0] ||
          !dataObject.studentMember[value][1]
        ) {
          delete dataObject.studentMember[value];
        }
      })
      .filter((n) => n);

    Object.keys(dataObject.teacherMember)
      .map((value) => {
        if (
          !dataObject.teacherMember[value][0] ||
          !dataObject.teacherMember[value][1] ||
          !dataObject.teacherMember[value][2]
        ) {
          delete dataObject.teacherMember[value];
        }
      })
      .filter((n) => n);

    try {
      if (!edit) {
        //project info upload to database then upload document
        apis
          .postProject(dataObject)
          .then((response) => {
            for (var key in documentUploads) {
              let formData = new FormData();
              formData.append("fileName", documentUploads[key].name);
              formData.append("document", documentUploads[key]);
              apis.postDocument({ id: response.data.id, formData });
            }
          })
          .then(() => {
            store.addNotification({
              title: "Proyecto registrado con exito",
              message:
                "El proyecto se ha registrado con exito en la base de datos.",
              type: "default",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
            });
          })
          .catch((error) => {
            // handle error
            console.log(error);
            store.addNotification({
              title: "Falla en creación del proyecto",
              message: "Falta llenar uno o más campos.",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
            });
          });
      } else {
        await apis
          .putProject(dataObject)
          .then(() => {
            // Use an algorithm that checks for differences in both objects and erase the differences from s3
            for (var key in project.projectFileName) {
              if (!dataObject.projectFileName.hasOwnProperty(`${key}`)) {
                apis.deleteDocument({
                  _id: id,
                  projectFileName: project.projectFileName[key],
                });
              }
            }
          })
          .then(() => {
            for (var key in documentUploads) {
              let formData = new FormData();
              formData.append("fileName", documentUploads[key].name);
              formData.append("document", documentUploads[key]);
              apis.postDocument({ id: id, formData });
            }
          })
          .then(() => {
            store.addNotification({
              title: "Proyecto actualizado con exito",
              message:
                "El proyecto se ha actualizado con exito en la base de datos",
              type: "info",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
            });
          })
          .catch((error) => {
            // handle error
            console.log(error);
            store.addNotification({
              title: "Falla en la edición del proyecto",
              message: "Falta llenar uno o más campos.",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3500,
                onScreen: true,
              },
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Project
  const deleteProject = async () => {
    const payload = {
      id: id,
    };
    apis
      .deleteProject(payload)
      .then((result) => {
        store.addNotification({
          title: "Proyecto eliminado",
          message: "El proyecto se ha eliminado con exito de la base de datos",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
      })
      .then(() => {
        //Delete all objects from folder and delete folder
        apis.deleteDirectory({ id: id });
      });
  };

  return (
    <div className={`container-fluid  ${isMobile ? "" : "text-left"}`}>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h2>
          <strong>{title ? title : "Gestión de Proyecto"}</strong>
        </h2>
      </div>
      <div className="row" />
      <form id="projectID" className={`needs-validation`} onSubmit={onSubmit}>
        <div className="col-xl-12 offset-xl-0">
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos del proyecto
              </p>
            </div>
            <div className="card-body">
              <div className="form-row flex-column flex-md-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="proyectname">
                      <strong>Nombre del proyecto</strong>
                    </label>
                    <input
                      name="proyectname"
                      id="proyectName"
                      value={dataObject.proyectName}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Nombre del proyecto"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="releaseDate">
                      <strong>Fecha de liberacion</strong>
                    </label>
                    <input
                      name="releaseDate"
                      id="releaseDate"
                      value={dataObject.releaseDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row flex-column flex-md-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      <strong>Periodo de Inicio</strong>
                    </label>
                    <input
                      name="startDate"
                      id="startDate"
                      value={dataObject.startDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="conclusionDate">
                      <strong>Periodo de conclusion</strong>
                    </label>
                    <input
                      name="conclusionDate"
                      id="conclusionDate"
                      value={dataObject.conclusionDate}
                      onChange={handleType}
                      required={true}
                      className="border rounded form-control"
                      type="date"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div id="selectArea" className="form-row flex-column flex-md-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Tipo de proyecto</strong>
                    </label>
                    <select
                      id="typeProyect"
                      value={dataObject.typeProyect}
                      onChange={handleType}
                      className="border rounded form-control selectArea"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Tipo de proyecto">
                        <option value="Desarrollo de software">
                          Desarrollo de software
                        </option>
                        <option value="Paquete tecnologico">
                          Paquete tecnologico
                        </option>
                        <option value="Servicio tecnologico">
                          Servicio tecnologico
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <strong>Objetivo del proyecto</strong>
                    </label>
                    <select
                      id="objectiveProject"
                      value={dataObject.objectiveProject}
                      onChange={handleType}
                      className="border rounded form-control selectArea"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Objetivo del proyecto">
                        <option value="Integrador">Integrador</option>
                        <option value="Titulacion">Titulacion</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="last_name">
                      <strong>Estatus del proyecto</strong>
                      <br />
                    </label>
                    <select
                      id="statusProject"
                      value={dataObject.statusProject}
                      onChange={handleType}
                      className="border rounded form-control selectArea"
                      style={{
                        color: "rgb(110, 112, 126)",
                        padding: "6px 12px",
                      }}
                    >
                      <optgroup label="Estatus del proyecto">
                        <option value="Cancelado">Cancelado</option>
                        <option value="En desarrollo">En desarrollo</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Implementado">Implementado</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="city">
                        <strong>Comentarios u Observaciones</strong>
                      </label>
                      <textarea
                        id="projectComment"
                        value={dataObject.projectComment}
                        onChange={handleType}
                        className="border rounded form-control"
                        style={{
                          padding: "6px 12px",
                          color: "rgb(110, 112, 126)",
                          height: "100px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col">
                      <div className="form-group">
                        {project.projectFileName ? (
                          <AddDoc
                            projectFileName={dataObject.projectFileName}
                            savedFiles={project.projectFileName}
                            setDataObject={setDataObject}
                            setDocumentUploads={setDocumentUploads}
                            documentUploads={documentUploads}
                          />
                        ) : (
                          <AddDoc
                            projectFileName={dataObject.projectFileName}
                            savedFiles={false}
                            setDataObject={setDataObject}
                            setDocumentUploads={setDocumentUploads}
                            documentUploads={documentUploads}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow mb-3">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de la empresa
              </p>
            </div>
            <div className="card-body">
              <div className="form-row flex-column flex-md-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="enterpriseProject">
                      <strong>Nombre de la empresa</strong>
                    </label>
                    <input
                      name="enterpriseProject"
                      id="enterpriseProject"
                      value={dataObject.enterpriseProject}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="enterpriseContact">
                      <strong>Correo electronico de la empresa</strong>
                      <br />
                    </label>
                    <input
                      name="enterpriseContact"
                      id="enterpriseContact"
                      value={dataObject.enterpriseContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="email"
                      placeholder="ejemplo@ejemplo.com"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row flex-column flex-md-row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstNameContact">
                      <strong>Nombre(s)</strong>
                    </label>
                    <input
                      name="firstNameContact"
                      id="firstNameContact"
                      value={dataObject.firstNameContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Juan"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastNameContact">
                      <strong>Apellido(s)</strong>
                    </label>
                    <input
                      name="lastNameContact"
                      id="lastNameContact"
                      value={dataObject.lastNameContact}
                      onChange={handleType}
                      required={true}
                      className="form-control"
                      type="text"
                      placeholder="Perez"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de los alumnos participantes
              </p>
            </div>
            <div className="card-body">
              <div className="dynamic-wrap-student">
                {addStudent.length === 0
                  ? setAddStudent((prevState) => [
                      ...prevState,
                      Math.floor(Math.random() * 1000),
                    ])
                  : null}
                {addStudent.map((value, index) => {
                  if (index === addStudent.length - 1) {
                    return (
                      <AddStudent
                        handleAdd={handleStudents}
                        handleDelete={deleteStudent}
                        trigger={true}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addStudent={addStudent}
                      />
                    );
                  }
                  return (
                    <AddStudent
                      handleAdd={handleStudents}
                      handleDelete={deleteStudent}
                      trigger={false}
                      key={value}
                      dataKey={value}
                      dataObject={dataObject}
                      setDataObject={setDataObject}
                      index={index}
                      addStudent={addStudent}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-header py-3">
              <p className="text-primary m-0 font-weight-bold">
                Datos de los maestros participantes
              </p>
            </div>
            <div className="card-body">
              <div className="dynamic-wrap-teacher">
                {addTeacher.length === 0
                  ? setAddTeacher((prevState) => [
                      ...prevState,
                      Math.floor(Math.random() * 1000),
                    ])
                  : null}
                {addTeacher.map((value, index) => {
                  if (index === addTeacher.length - 1) {
                    return (
                      <AddTeacher
                        handleAdd={handleTeachers}
                        handleDelete={deleteTeacher}
                        trigger={true}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addTeacher={addTeacher}
                      />
                    );
                  } else {
                    return (
                      <AddTeacher
                        handleAdd={handleTeachers}
                        handleDelete={deleteTeacher}
                        trigger={false}
                        key={value}
                        dataKey={value}
                        dataObject={dataObject}
                        setDataObject={setDataObject}
                        index={index}
                        addTeacher={addTeacher}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {guest ? (
            <div
              className="form-group mt-4 d-flex w-100 flex-column flex-md-row justify-content-center justify-content-md-around"
              style={isMobile ? { height: "8vh" } : null}
            >
              {project ? (
                <button
                  className="btn btn-outline-primary text-capitalize font-weight-bold"
                  type="button"
                  onClick={() => downloadPDF()}
                >
                  Descargar documento
                </button>
              ) : (
                <span className="d-none" />
              )}
            </div>
          ) : (
            <div
              className="form-group mt-4 d-flex w-100 flex-column flex-md-row justify-content-around justify-content-md-around"
              style={isMobile ? { height: "20vh" } : null}
            >
              {project.creatorID ? (
                project.creatorID.toString() ===
                user.employeeNumber.toString() ? (
                  <button
                    id="proyectBtn"
                    className="btn btn-outline-primary text-capitalize font-weight-bold"
                    type="submit"
                  >
                    Guardar datos
                  </button>
                ) : (
                  <span className="d-none" />
                )
              ) : (
                <button
                  id="proyectBtn"
                  className="btn btn-outline-primary text-capitalize font-weight-bold"
                  type="submit"
                >
                  Guardar datos
                </button>
              )}
              {project ? (
                <button
                  className="btn btn-outline-primary text-capitalize font-weight-bold"
                  type="button"
                  onClick={() => downloadPDF()}
                >
                  Descargar documento
                </button>
              ) : (
                <span className="d-none" />
              )}

              {project.creatorID ? (
                project.creatorID.toString() ===
                user.employeeNumber.toString() ? (
                  <button
                    onClick={deleteProject}
                    id="deleteBtn"
                    className="btn btn-outline-danger text-capitalize font-weight-bold"
                    style={edit ? { display: "block" } : { display: "none" }}
                    type="button"
                  >
                    Eliminar Proyecto
                  </button>
                ) : (
                  <span className="d-none" />
                )
              ) : (
                <button
                  onClick={deleteProject}
                  id="deleteBtn"
                  className="btn btn-outline-danger text-capitalize font-weight-bold"
                  style={edit ? { display: "block" } : { display: "none" }}
                  type="button"
                >
                  Eliminar Proyecto
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
