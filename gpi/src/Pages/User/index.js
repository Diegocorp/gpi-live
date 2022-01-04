import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../Utils/UserContext";
import "./styles.css";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import apis from "../../API";

const UserPage = (props) => {
  // obtener setUser de UserContext
  const { user, setUser } = useContext(UserContext);
  const [enabled, setEnabled] = useState(true);
  const [userData, setUserData] = useState(user);
  const [file, setFile] = useState({
    file: null,
  });
  const isMobile = useMediaQuery({ query: `(max-width: 1200px)` });

  //Gestionar el evento de los cambios a los datos de usuario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //Gestionar el cambio al ingreso del foto de perfil del usuario
  const handleFileChange = (e) => {
    const filed = document.querySelector("input[type=file]").files[0];
    setFile({ file: filed });
    setUserData((prevState) => ({
      ...prevState,
      image: `IMAGE-${userData._id}`,
      imageURL: URL.createObjectURL(filed),
    }));

    const preview = document.querySelector("#preview");
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convertir el archivo de imagen a base64 string
        preview.src = reader.result;
      },
      false
    );
    if (filed) {
      reader.readAsDataURL(filed);
    }
  };

  //gestion del boton de subir los cambios de los datos a la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    let editingPassword = false;

    if (!enabled) {
      const newPassword = document.getElementById("newPassword").value;
      const repeatNewPassword =
        document.getElementById("repeatNewPassword").value;
      if (newPassword === repeatNewPassword) {
        userData.password = newPassword;
      } else {
        store.addNotification({
          title: "Las contraseñas no son iguales",
          message:
            "Las contraseñas introducidas no son iguales entre si, favor de introducirlas correctamente",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3500,
            onScreen: true,
          },
        });
        editingPassword = true;
      }
    }

    if (editingPassword === false) {
      try {
        apis.updateUser(userData);
        //subir imagen al bucket de s3
        const formData = new FormData();
        formData.append("imageName", userData.image);
        formData.append("image", file.file);
        apis.postFile(formData);
        const picture = await apis.getFile({ fileName: userData.image });
        setUserData((prev) => ({
          ...prev,
          imageURL: `${picture}#t=${performance.now()}`,
        }));
        setUser(userData);
        store.addNotification({
          title: "Guardado con éxito",
          message: "Nueva configuración de usuario guardada con éxito.",
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
      } catch (error) {
        alert(error);
      }
    }
  };

  //enable new password div
  const enableChangePassword = () => {
    setEnabled(!enabled);
  };

  return (
    <div className={`container-fluid  ${isMobile ? "" : "text-left"}`}>
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">
          <strong>Perfil</strong>
        </h2>
      </div>

      <form
        className="needs-validation"
        name="userForm"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="row justify-content-md-center">
          <div className="col-lg-8">
            <div className="row ">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 font-weight-bold">
                      Configuracion de Usuario
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="form-row">
                      <div className="row col-12 col-md-6">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="username">
                              <strong>Nombre de Usuario</strong>
                            </label>
                            <input
                              required={true}
                              value={userData.userName}
                              id="userName"
                              onChange={handleChange}
                              className="form-control"
                              type="text"
                              placeholder="Nombre de Usuario"
                              name="username"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email">
                              <strong>Correo Electronico</strong>
                            </label>
                            <input
                              required={true}
                              value={userData.email}
                              id="email"
                              onChange={handleChange}
                              className="form-control"
                              type="email"
                              placeholder="Correo Electronico"
                              name="email"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="first_name">
                              <strong>Nombre(s)</strong>
                            </label>
                            <input
                              required={true}
                              value={userData.firstName}
                              id="firstName"
                              onChange={handleChange}
                              className="form-control"
                              type="text"
                              placeholder="Nombre(s)"
                              name="first_name"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="last_name">
                              <strong>Apellido(s)</strong>
                            </label>
                            <input
                              required={true}
                              value={userData.lastName}
                              id="lastName"
                              onChange={handleChange}
                              className="form-control"
                              type="text"
                              placeholder="Apellido(s)"
                              name="last_name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row col-12 col-md-6 m-md-2">
                        {/* User configuration */}
                        <div className="col-12 m-md-3">
                          <div className="card shadow justify-content-md-center">
                            <div className="card-header py-3">
                              <p className="text-primary m-0 font-weight-bold">
                                Imágen de perfil
                              </p>
                            </div>
                            <div className="card-body text-center shadow">
                              <img
                                id="preview"
                                className="rounded border border-dark mb-3 mt-4 img-fluid"
                                src={user.imageURL}
                                width="160"
                                height="160"
                                alt="user profile"
                              />
                              <div className="form-group mb-3">
                                <input
                                  type="file"
                                  name="image"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* User configuration */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="address">
                        <strong>Academia</strong>
                      </label>
                      <input
                        required={true}
                        value={userData.academy}
                        id="academy"
                        onChange={handleChange}
                        className="form-control"
                        type="text"
                        placeholder="Academia"
                        name="address"
                      />
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="city">
                            <strong>Numero de Empleado</strong>
                          </label>
                          <input
                            disabled
                            required={true}
                            value={userData.employeeNumber}
                            id="employeeNumber"
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            placeholder="Numero de Empleado"
                            name="city"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div class="form-check my-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onClick={enableChangePassword}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Cambiar contraseña
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">
                        <strong>Nueva Contraseña</strong>
                      </label>
                      <input
                        disabled={enabled}
                        required={true}
                        id="newPassword"
                        onChange={handleChange}
                        className="form-control"
                        type="password"
                        placeholder="Nueva Contraseña"
                        name="newPassword"
                      />
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="city">
                            <strong>Confirmar Nueva Contraseña</strong>
                          </label>
                          <input
                            disabled={enabled}
                            required={true}
                            id="repeatNewPassword"
                            onChange={handleChange}
                            className="form-control"
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            name="repeatNewPassword"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="form-row">
                      <div className="form-group justify-content-md-center">
                        <button
                          id="profileBtn"
                          className="btn btn-primary text-capitalize font-weight-bold"
                          type="submit"
                        >
                          Guardar Configuracion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="card shadow mb-5"></div>
    </div>
  );
};

export default UserPage;
