"use strict";

/**
 * @ngdoc function
 * @name titanClienteV2App.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the titanClienteV2App
 */
var text_es = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Ahora puede comenzar con el desarrollo ...",
  VOLVER: "Volver",
  SALIR: "Salir",
  REGISTRAR: "Registrar",
  CANCELAR: "Cancelar",

  //Formulario registro nómina
  ANADIR_NOMINA: "Añadir nómina",
  TITULO_REG_NOMINA: "Registro de nómina",
  NOMBRE_NOMINA : "Nombre de la nómina",
  DESC_NOMINA: "Descripción",
  VINC_NOMINA: "Vinculación",
  TIPO_NOMINA: "Tipo",
  ESTADO_NOMINA: "Estado",
  PERIODO_NOMINA: "Periodo",
  OPCIONES_NOMINA: "Opciones",
  TITULO_NOMINA_REGIS: "Nóminas registradas"
};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ...",
  VOLVER: "Back",
  SALIR: "Exit",
  REGISTRAR: "Record",
  CANCELAR: "Cancel",
  //Formulario registro nómina
  ANADIR_NOMINA: "Add payslip",
  TITULO_REG_NOMINA: "Payslip's record",
  NOMBRE_NOMINA : "Payslip's name",
  DESC_NOMINA : "Description",
  VINC_NOMINA: "Outreach",
  TIPO_NOMINA: "Type",
  ESTADO_NOMINA: "Status",
  PERIODO_NOMINA: "Term",
  OPCIONES_NOMINA: "Options",
  TITULO_NOMINA_REGIS: "Recorded Payslips"

};

angular.module('titanClienteV2App')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
