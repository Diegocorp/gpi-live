module.exports = ({
  proyectName,
  startDate,
  conclusionDate,
  typeProyect,
  objectiveProject,
  statusProject,
  enterpriseProject,
  enterpriseContact,
  firstNameContact,
  lastNameContact,
  studentMember,
  teacherMember,
}) => {
  function printStudents(studentObject) {
    let html = "";
    for (var student in studentObject) {
      html += `
      <div class="d-flex w-100 mb-2">
      <div class="d-flex me-2" style="width: 60%">
        <div class="me-2"><strong>Nombre:</strong></div>
        <div
          style="height: 1.2em"
          class="data-text w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
        >
          <span>${studentObject[student][0]}</span>
        </div>
      </div>
      <div class="d-flex me-2" style="width: 40%">
        <div style="width: 45%"><strong>No. Control:</strong></div>
        <div
          style="height: 1.2em"
          class="data-text w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
        >
          <span>${studentObject[student][1]}</span>
        </div>
      </div>
    </div>
      `;
    }
    return html;
  }

  function printTeachers(teacherObject) {
    let html = "";
    for (var teacher in teacherObject) {
      html += `
      <div class="d-flex mb-2 w-100">
        <div class="d-flex me-2" style="width: 60%">
          <div class="me-2"><strong>Nombre:</strong></div>
          <div
          style="height: 1.2em"
          class="data-text w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
          >
            <span>${teacherObject[teacher][0]}</span>
          </div>
        </div>
        <div class="d-flex me-2" style="width: 40%">
          <div class="me-1" style="width: 55%">
            <strong>No. Empleado:</strong>
          </div>
          <div
          style="height: 1.2em"
          class="data-text w-100 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
          >
            <span>${teacherObject[teacher][1]}</span>
          </div>
        </div>
      </div>
      `;
    }
    return html;
  }

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
        .data-text{
          padding-bottom: 15px;
        }
        @media only screen and (max-width: 600px) {
          .invoice-box-local table tr.top table td {
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
  
      <div>
        <div style="font-size: 12px;">
          <!-- Alumnos -->
          <div class="mt-2">
            <div class="text-uppercase d-flex">
              <div style="width: 10%"></div>
              <div><strong>Datos de los alumnos participantes</strong></div>
            </div>
            <div class="w-100 border border-3 border-dark px-1 py-3">
              <!-- Dynamically load students here -->
              ${printStudents(studentMember)}  
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
                    class="data-text w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${proyectName}</span>
                  </div>
                </div>
              </div>
              <div class="d-flex mb-2 w-100">
                <div class="d-flex me-2" style="width: 50%">
                  <div class="me-2" style="width: fit-content">
                    <strong>Fecha de Inicio:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="data-text w-50 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${startDate}</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 50%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Fecha de Conclusion:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="data-text w-50 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${conclusionDate}</span>
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
                    class="data-text w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${typeProyect}</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 33%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Objetivo:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="data-text w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${objectiveProject}</span>
                  </div>
                </div>
                <div class="d-flex me-2" style="width: 33%">
                  <div style="width: fit-content" class="me-2">
                    <strong>Estatus:</strong>
                  </div>
                  <div
                    style="height: 1.2em"
                    class="data-text w-75 text-center px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${statusProject}</span>
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
            <!-- Dynamically load students here -->
            ${printTeachers(teacherMember)}  
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
                  <div class="me-2" style="width: fit-content">
                    <strong>Nombre de la Empresa:</strong>
                  </div>
                  <div
                    style="height: 1.2em; width: 74%"
                    class="data-text px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${enterpriseProject}</span>
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
                    class="data-text w-75 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${firstNameContact} ${lastNameContact}</span>
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
                    class="data-text w-100 px-2 border border-top-0 border-end-0 border-start-0 border-dark"
                  >
                    <span>${enterpriseContact}</span>
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
