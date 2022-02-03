const { response } = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const logo = `${__dirname}/Documents/Assets/itspp-logo.png`;
const pdfTemplate = require(`${__dirname}/Documents/Docentes`);

function base64Encode(file) {
  return fs.readFileSync(file, { encoding: "base64" });
}

buildDocentePDF = async (req, res) => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // create a new page
  const page = await browser.newPage();

  // set your html as the pages content
  await page.setContent(pdfTemplate(req.body.dataObject), {
    waitUntil: "domcontentloaded",
  });

  // create a .pdf file
  await page.pdf({
    format: "Letter",
    path: `${__dirname}/document.pdf`,
    displayHeaderFooter: true,
    headerTemplate: `<div id="header-template" style="font-size:10px !important; width: 100%; color:#808080; padding-left:10px; display: flex; margin-bottom: 20px">
    <div id="pageHeader" style="display: flex; width: 100%;">
          <div style="width: 15%; display: flex; justify-content: flex-end">
            <img
              src="data:image/png;base64,${base64Encode(logo)}"
              alt="ITSPP"
              style="width: 100%; max-width: 50px"
            />
          </div>
          <div style="padding-top: 12px; width: 75%; text-transform: uppercase; text-align: center">
            <div><strong style="font-size: 12px"
              >Registro de Proyecto Institucional</strong
            ></div>
            <div><strong style="font-size: 8px"
              >Instituto Tecnológico Superior De Puerto Peñasco</strong
            >
            </div>
          </div>
        </div>
    </div>`,
    footerTemplate:
      '<div id="footer-template" style="font-size:1px !important; color:#808080; padding-left:10px"></div>',
    margin: {
      top: "100px",
      bottom: "100px",
      right: "30px",
      left: "30px",
    },
  });

  // close the browser
  await browser.close();
  res.send(Promise.resolve());
};

fetchDocentePDF = (req, res) => {
  res.sendFile(`${__dirname}/document.pdf`);
};

module.exports = {
  buildDocentePDF,
  fetchDocentePDF,
};
