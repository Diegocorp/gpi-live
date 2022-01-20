const { response } = require("express");
const pdf = require("html-pdf");
const pdfDocente = require("../../Documents/Docentes");

buildDocentePDF = (req, res) => {
  pdf
    .create(pdfDocente(req.body), {})
    .toFile(`${__dirname}/document.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
};

fetchDocentePDF = (req, res) => {
  res.sendFile(`${__dirname}/document.pdf`);
};

module.exports = {
  buildDocentePDF,
  fetchDocentePDF,
};
