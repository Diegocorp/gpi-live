const { response } = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");

buildDocentePDF = async (req, res) => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // create a new page
  const page = await browser.newPage();

  // set your html as the pages content
  const html = fs.readFileSync(
    `${__dirname}/Documents/Docentes/docente-pdf.html`,
    "utf8"
  );
  await page.setContent(html, {
    waitUntil: "domcontentloaded",
  });

  // create a .pdf file
  await page.pdf({
    format: "A4",
    path: `${__dirname}/document.pdf`,
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
