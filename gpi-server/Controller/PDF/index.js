const { response } = require("express");
const fs = require("fs");
const pdf = require("html-pdf");
const pdfDocente = require("./Documents/Docentes/index.js");

buildDocentePDF = (req, res) => {
  pdf.create(pdfDocente, {}).toFile(`${__dirname}/document.pdf`, (err) => {
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
