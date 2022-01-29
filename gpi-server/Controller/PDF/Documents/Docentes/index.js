module.exports = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
  
      <title>PDF Result Template</title>
      <style>
        html,
        body {
          background-color: #333 !important;
        }
        .invoice-box-local {
          background-color: #fff;
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          font-size: 16px;
          line-height: 24px;
          font-family: "Helvetica Neue", "Helvetica";
          color: #555;
        }
        @media only screen and (max-width: 600px) {
          .invoice-box-local table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
          .invoice-box-local table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
  
      <div class="invoice-box-local">
        <div>
          <div id="pageHeader" style="display: flex">
            <div style="width: 15%" class="d-flex justify-content-end">
              <img
                src="https://www.tijuana.tecnm.mx/wp-content/uploads/2015/03/IT-PUERTO-PE%C3%91ASCO.png"
                alt="ITSPP"
                style="width: 100%; max-width: 60px"
              />
            </div>
            <div class="pt-2 w-75 text-center text-uppercase">
              <strong style="font-size: medium"
                >Registro de Proyecto Institucional</strong
              >
              <br />
              <strong style="font-size: smaller"
                >Instituto Tecnológico Superior De Puerto Peñasco</strong
              >
            </div>
          </div>
          <br />
          <!-- Alumnos -->
          <div>
            <div class="text-uppercase d-flex">
              <div style="width: 10%"></div>
              <div><strong>Datos de los alumnos participantes</strong></div>
            </div>
            <div class="w-100 border border-3 border-dark px-1 py-3">
              <!-- Dynamically load students here -->
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div style="width: 60%"><strong>No. Control:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div style="width: 60%"><strong>No. Control:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div style="width: 60%"><strong>No. Control:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div style="width: 60%"><strong>No. Control:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <!-- Proyecto -->
          <div>
            <div class="text-uppercase d-flex">
              <div style="width: 10%"></div>
              <div><strong>Datos del proyecto</strong></div>
            </div>
            <div class="w-100 border border-3 border-dark px-1 py-3">
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 100%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Gestor de Proyecto Institucionales</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 50%">
                  <div class="me-2" style="width: fit-content">
                    <strong>Fecha de inicio:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-50 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>05/10/2021</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 50%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Fecha de Conclusion:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-50 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>10/01/2022</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 33%">
                  <div class="me-2" style="width: fit-content">
                    <strong>Tipo:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Paquete Tecnológico</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 33%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Objetivo:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Titulacion</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 33%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Estatus:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>En desarrollo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <!-- Docentes -->
          <div>
            <div class="text-uppercase d-flex">
              <div style="width: 10%"></div>
              <div><strong>Docentes</strong></div>
            </div>
            <div class="w-100 border border-3 border-dark px-1 py-3">
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div class="me-1" style="width: 75%">
                    <strong>No. Empleado:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div class="me-1" style="width: 75%">
                    <strong>No. Empleado:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div class="me-1" style="width: 75%">
                    <strong>No. Empleado:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 60%">
                  <div class="me-2"><strong>Nombre:</strong></div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Juan Perez</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 40%">
                  <div class="me-1" style="width: 75%">
                    <strong>No. Empleado:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>17303116</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <!-- Empresa -->
          <div>
            <div class="text-uppercase d-flex">
              <div style="width: 10%"></div>
              <div>
                <strong>Datos de la empresa, institución u organismo</strong>
              </div>
            </div>
            <div class="w-100 border border-3 border-dark px-1 py-3">
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 100%">
                  <div class="me-2" style="width: 26%">
                    <strong>Nombre de la Empresa:</strong>
                  </div>
                  <div
                    style="height: 1.2em; width: 74%"
                    class="px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Taqueria "Los Cuates"</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2 w-100">
                  <div class="me-2" style="width: fit-content">
                    <strong>Nombre del Contacto:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-75 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>Funalito Juarez</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2 w-100">
                  <div class="me-2" style="width: fit-content">
                    <strong>Correo:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>someEmail@test.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
    `;
};
