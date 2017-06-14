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
  GENERAR: "Generar",
  DETALLE: "Detalle",
  GENERAR_PDF: "Generar PDF",
  SI:"Sí",
  NO:"No",
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
  PRELIQUIDACION: "Preliquidaciones",
  TITULO_NOMINA_REGIS: "Nóminas registradas",

  //Formulario registro preliquidacion
  ANADIR_PRELIQ: "Añadir preliquidación",
  TITULO_REG_PRELIQ: "Registro de preliquidación",
  NOMBRE_PRELIQ: "Nombre de la preliquidación",
  DESC_PRELIQ: "Descripción",
  ESTADO_PRELIQ: "Estado",
  TIPO_PRELIQ: "Tipo",
  TITULO_PRELIQ_REGIS: "Preliquidaciones para la nómina",
  FECHA_PRELIQ: "Fecha registro",
  OPCIONES_PRELIQ: "Opciones",

  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "Personas a preliquidar en nómina: ",
  NUM_CONTRATO: "Número de contrato",
  NOMBRE_PERSONA: "Nombre",
  DOCUMENTO: "Documento",

  //Interfaz de detalle de preliquidacion
  TITULO_DETALLE_PRELIQ :"Detalle de preliquidación de la nómina",
  RESUMEN_PRELIQ: "Resumen de la preliquidación",
  CONCEPTO: "Concepto",
  VALOR: "Valor",
  NATURALEZA: "Naturaleza",
  TIPO: "Tipo",
  TOTAL: "Total",
  TOTAL_DEV: "Total devengado:",
  TOTAL_DESC: "Total descuentos:",
  TOTAL_PAGAR: "Total a pagar:",
  SUELDOS_NETOS: "Sueldos netos:",
  LIQUIDAR:"Liquidar",
  DETALLE_EMP: "Detalle del empleado",

  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Detalle de liquidación de la nómina",
  RESUMEN_LIQ: "Resumen de la liquidación",

  //REGISTRO NOVEDADES
  REGISTRO_NOVEDAD: "Registro de novedad",
  DETALLE_NOVEDAD: "Detalle de novedad",
  TIPO_CONCEPTO: "Tipo",
  VALOR_CONCEPTO: "Valor",
  FECHA_INICIO:"Fecha de inicio",
  FECHA_FIN:"Fecha de finalización",
  PORCENTAJE: "Porcentaje",
  FIJO: "Fijo",
  PERSONA: "Persona",
  SELECCION_CONCEPTO: "Selección de concepto de novedad",
  SELECCION_NOMINA:"Selección de nómina",
  SELECCION_PERSONA:"Selección de persona",

  //FORMULARIO beneficiarios
  TITULO_REG_BEN: "Registro de beneficiarios",
  TIPO_DOC_BEN:"Tipo de documento",
  NUM_DOC_BEN:"Número de documento",
  NOM_BEN: "Nombres de los beneficiarios",
  APE_BEN: "Apellido de los beneficiarios",
  PARENTESCO: "Parentesto",
  PARENTESCO_CON: "Pariente directo de",
  GENERO: "Género",
  CORREO_ELEC: "Correo electrónico",
  NUMERO_CONTACTO:"Número de contacto",
  FECHA_NAC_BEN:"Fecha de nacimiento",
  APLICA_SUB_FAMILIAR: "Aplica subsidio familiar",
  APLICA_SUB_ESTUDIO: "Aplica subsidio de estudio",
  TIPO_CUENTA: "Tipo de cuenta bancaria",
  NUMERO_CUENTA: "Número de cuenta bancaria",
  BANCO_ASOCIADO: "Banco asociado",
  ESTADO_BEN: "Estado",
  SELECCIONE: "Seleccione...",
  CED_CIU: "Cédula de ciudadania",
  CEDULA_EXTRAN: "Cédula de extranjería",
  TARJETA_IDEN: "Tarjeta de identidad",
  MASCULINO: "Masculino",
  FEMENINO: "Femenino",
  PRI_APE_BEN:"Primer apellido",
  SEG_APE_BEN:"Segundo apellido",
  PRI_NOM_BEN:"Primer nombre",
  SEG_NOM_BEN:"Segundo nombre",
  ACTIVO:"Activo",
  INACTIVO:"Inactivo",
  AHORROS:"Ahorros",
  CORRIENTE:"Corriente",

  CARGO_BEN:"Cargo",
  PAIS_NA_BEN:"País nacimiento",
  PERFIL_BEN:"Perfil",

};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ...",
  VOLVER: "Back",
  SALIR: "Exit",
  REGISTRAR: "Record",
  CANCELAR: "Cancel",
  GENERAR: "Generate",
  DETALLE: "Detail",
  GENERAR_PDF: "Generate PDF",
  SI:"Yes",
  NO:"No",
  //Formulario registro y visualizaión nómina
  ANADIR_NOMINA: "Add payslip",
  TITULO_REG_NOMINA: "Payslip's record",
  NOMBRE_NOMINA : "Payslip's name",
  DESC_NOMINA : "Description",
  VINC_NOMINA: "Outreach",
  TIPO_NOMINA: "Type",
  ESTADO_NOMINA: "Status",
  PERIODO_NOMINA: "Term",
  OPCIONES_NOMINA: "Options",
  PRELIQUIDACION: "Preliquidations",
  TITULO_NOMINA_REGIS: "Recorded Payslips",

  //Formulario registro y visualización de preliquidacion
  ANADIR_PRELIQ: "Add pre-liquidation",
  TITULO_REG_PRELIQ: "Pre-liquidation's record",
  NOMBRE_PRELIQ: "Pre-liquidation's name",
  DESC_PRELIQ: "Description",
  ESTADO_PRELIQ: "Status",
  TIPO_PRELIQ: "Type",
  TITULO_PRELIQ_REGIS: "Pre-liquidation to the payslip",
  FECHA_PRELIQ: "Record date",
  OPCIONES_PRELIQ: "Options",

  //Interfaz de listado de personas a preliquidar
  PRELIQ_NOMINA: "People for pre-liquidation in payslip: ",
  NUM_CONTRATO: "Contract Number",
  NOMBRE_PERSONA: "Name",
  DOCUMENTO: "Identification",

  //Interfaz de detalle de preliquidacion
  TITULO_DETALLE_PRELIQ :"Pre-liquidation payslip detail: ",
  RESUMEN_PRELIQ: "Pre-liquidation's summary",
  CONCEPTO: "Concept",
  VALOR: "Value",
  NATURALEZA: "Nature",
  TIPO: "Type",
  TOTAL: "Total",
  TOTAL_DEV: "Total earned:",
  TOTAL_DESC: "Total deducted:",
  TOTAL_PAGAR: "Total to pay:",
  SUELDOS_NETOS: "Net salaries:",
  LIQUIDAR:"Pay off",
  DETALLE_EMP: "Employee's detail",

  //Interfaz de detalle de liquidacion
  TITULO_DETALLE_LIQ :"Liquidation payslip detail: ",
  RESUMEN_LIQ: "Liquidation's summary",

  //REGISTRO novedades
  REGISTRO_NOVEDAD: "Changes's record",
  DETALLE_NOVEDAD: "Changes's detail",
  TIPO_CONCEPTO: "Type",
  VALOR_CONCEPTO: "Value",
  FECHA_INICIO:"Start date",
  FECHA_FIN:"End date",
  PORCENTAJE: "Percentage",
  FIJO: "Fixed",
  PERSONA: "Person",
  SELECCION_CONCEPTO: "Change's concept selection",
  SELECCION_NOMINA:"Payslip's selection",
  SELECCION_PERSONA:"Person selection",

  //FORMULARIO beneficiarios
  TITULO_REG_BEN: "Beneficiary's record",
  TIPO_DOC_BEN:"Identification type",
  NUM_DOC_BEN:"Identification",
  NOM_BEN: "Beneficiary's name",
  APE_BEN: "Beneficiary's surname",
  PARENTESCO: "Relationship",
  PARENTESCO_CON: "Relationship with",
  GENERO: "Gender",
  CORREO_ELEC: "E-mail",
  NUMERO_CONTACTO:"Contact number",
  FECHA_NAC_BEN:"Birthdate",
  APLICA_SUB_FAMILIAR: "Applies family subsidy",
  APLICA_SUB_ESTUDIO: "Applies study subsidy",
  TIPO_CUENTA: "Bank account type",
  NUMERO_CUENTA: "Bank account number",
  BANCO_ASOCIADO: "Associated bank",
  ESTADO_BEN: "Status",
  SELECCIONE: "Select...",
  CED_CIU: "Identification",
  CEDULA_EXTRAN: "Foreigner ID",
  TARJETA_IDEN: "Identity card",
  MASCULINO: "Male",
  FEMENINO: "Female",
  PRI_APE_BEN:"First surname",
  SEG_APE_BEN:"Second surname",
  PRI_NOM_BEN:"First name",
  SEG_NOM_BEN:"Second name",
  ACTIVO:"Active",
  INACTIVO:"Inactive",
  AHORROS:"Savings",
  CORRIENTE:"Checking",

  CARGO_BEN:"Cargo",
  PAIS_NA_BEN:"País nacimiento",
  PERFIL_BEN:"Perfil",

};

angular.module('titanClienteV2App')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
