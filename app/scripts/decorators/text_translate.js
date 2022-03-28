"use strict";

/**
* @ngdoc function
* @name titanClienteV2App.decorator:TextTranslate
* @description
* # TextTranslate
* Decorator of the titanClienteV2App
*/
var text_es = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
    ABIERTA: "Abierta",
    ABRIL: "Abril",
    ACCIONES: "Acciones",
    ACTIVACION_CONCEPTO_CORRECTA: "Activación realizada correctamente",
    ACTIVACION_CONCEPTO_INCORRECTA: "Error al activar concepto",
    ACTIVO: "Activo",
    ACTUALIZACION_CORRECTA: "Concepto actualizado correctamente",
    ACTUALIZACION_INCORRECTA: "Error al actualizar concepto",
    ADICION_CORRECTA: "Concepto agregado correctamente",
    ADICION_INCORRECTA: "Error al agregar concepto",
    AGOSTO: "Agosto",
    AGREGAR_NOVEDAD: "Agregar novedad",
    AHORROS: "Ahorros",
    ALERTA_BEN_CORRECTO: "Beneficiario registrado correctamente",
    ALERTA_BEN_INCORRECTO: "Error al registrar beneficiario",
    ALERTA_COMPLETAR_DATOS_EDICION: "Complete todos los datos",
    ALERTA_ELEGIR_PRELIQ: "Elija una preliquidación",
    ALERTA_NO_LIQUIDACION: "Esta preliquidación ya ha sido liquidada",
    ALERTA_NO_NOVEDADES: "No hay novedades registradas",
    ALERTA_PERSONAS_SELECCIONADAS: "Debe seleccionar personas para ser liquidadas",
    ALERTA_PERSONAS_SIN_SS: "No es posible realizar la liquidación. Las personas resaltadas no cuentan con sus datos de seguridad social completos",
    ALERTA_PRELIQUIDACION_CERRADA: "Esta preliquidación está cerrada",
    ALERTA_PRELIQUIDACION_OP: "Esta preliquidación está a la espera de orden de pago",
    ALERTA_REG_SUS_CORRECTO: "Se ha registrado correctamente el sustituto",
    ALERTA_REG_SUS_INCORRECTO: "Error al registrar sustituto",
    ALERTA_SELECCION_PERSONAS_PDF: "Seleccione personas para generar PDF",
    ALERTA_SUS_INCOMPLETO: "No hay datos para ingresar información de tutor",
    ANADIR_CONCEPTO: "Añadir concepto",
    ANADIR_NOMINA: "Añadir nómina",
    ANADIR_PRELIQ: "Añadir preliquidación",
    ANO_PRELIQ: "Año",
    APE_BEN: "Apellidos de los beneficiarios",
    APE_TUTOR: "Apellidos del tutor",
    APLICA_SUB_ESTUDIO: "Aplica subsidio de estudio",
    APLICA_SUB_FAMILIAR: "Aplica subsidio familiar",
    BANCO_ASOCIADO: "Banco asociado",
    BEN_ASOCIADO: "Beneficiario asociado",
    CAMBIOS_ESTADO_OP_INCORRECTO: "Error al solicitar orden de pago",
    CAMBIO_ESTADO_OP_CORRECTO: "Se ha solicitado orden de pago",
    CANCELAR: "Cancelar",
    CARGANDO: "Cargando",
    CEDULA_EXTRAN: "Cédula de extranjería",
    CED_CIU: "Cédula de ciudadanía",
    CERRADA: "Cerrada",
    CONCEPTO: "Concepto",
    CONCEPTOS_MENU: "Concepto",
    CONCEPTO_NOMBRE: "Nombre de concepto",
    CONCEPTO_PDF: "Concepto",
    CONFIRMACION_ACTIVAR: "¿Está seguro de querer activar el concepto: ",
    CONFIRMACION_ADICION: "¿Está seguro de querer agregar el concepto:",
    CONFIRMACION_DESACTIVAR: "¿Está seguro de querer inactivar el concepto: ",
    CONFIRMACION_EDICION: "¿Está seguro de querer actualizar el concepto:",
    CONFIRMACION_EDICION_NOV: "¿Está seguro que desea editar la novedad : ",
    CONFIRMACION_INACTIVIDAD_NOV: "¿Está seguro que desea inactivar la novedad : ",
    CONFIRMACION_NOVEDAD: "¿Está seguro de que quiere agregar esta novedad? Tenga en cuenta lo siguiente:",
    CONFIRMAR: "Confirmar",
    CONS_NOV_MENU: "Consultar novedades",
    CONTRATOS_PARA: "Contratos para",
    CORREO_ELEC: "Correo electrónico",
    CORRIENTE: "Corriente",
    CUOTAS_NOV: "Cuotas",
    DEPENDENCIA: "Dependencia",
    DESCUENTOS_PDF: "Descuentos",
    DESC_NOMINA: "Descripción",
    DESC_PRELIQ: "Descripción",
    DETALLE: "Detalle",
    DETALLE_EMP: "Detalle del empleado",
    DETALLE_DOC: "Detalle del docente",
    DETALLE_CONT: "Detalle del contratista",
    DETALLE_NOVEDAD: "Detalle de novedades",
    DETALLE_PAGO_PDF: "Detalle de pago",
    DEVENGOS_PDF: "Devengos",
    DICIEMBRE: "Diciembre",
    DOCUMENTO: "Documento",
    DOC_BEN_SUS: "Documento beneficiario sustituto",
    DOC_FUN_PEN: "Documento funcionario pensionado",
    EDICION_CORRECTA_NOV: "Novedad modificada correctamente",
    EDICION_INCORRECTA_NOV: "Error al modificar novedad",
    ELIMINACION_CORRECTA: "Concepto eliminado correctamente",
    ELIMINACION_INCORRECTA: "Error al eliminar concepto",
    ENERO: "Enero",
    ERROR_NOV_PRELIQ: "No se pueden agregar novedades a una preliquidación cerrada",
    ESTADO_BEN: "Estado",
    ESTADO_CONCEPTO: "Estado de concepto",
    ESTADO_NOMINA: "Estado",
    ESTADO_PRELIQ: "Estado",
    ESTADO_SUS: "Estado",
    EXPLICACION_NOV_SS: "Ingrese la fecha de inicio y fecha final de afectación de la novedad",
    EXPLICACION_NOV_FIJO: "Para la aplicación de la novedad de valor fijo, se debe registrar el valor MENSUAL y el número de cuotas, recuerde que empezará a aplicar desde el mes actual",
    EXPLICACION_NOV_PORCENTUAL: "La novedad porcentual se aplicará al valor de los honorarios del contrato seleccionado",
    FACULTAD: "Facultad",
    FEBRERO: "Febrero",
    FECHA_FIN: "Fecha de finalización",
    FECHA_INICIO: "Fecha de inicio",
    FECHA_NAC_BEN: "Fecha de nacimiento",
    FECHA_PDF: "Fecha",
    FECHA_PRELIQ: "Fecha de registro",
    FECHA_REGISTRO: "Fecha de registro",
    FEMENINO: "Femenino",
    GENERANDO: "Generando...",
    GENERAR: "Generar",
    GENERAR_DESAGREGADO: "Generar Desagregado",
    GENERAR_NECESIDAD: "Generar necesidad",
    GENERAR_OP: "Generar Orden de Pago",
    GENERAR_PDF: "Generar PDF",
    GENERO: "Género",
    HABILITAR_BENEFICIARIO: "Habilitar beneficiario",
    ID_BENEFICIARIO: "Identificación del beneficiario",
    INACTIVACION_CONCEPTO_CORRECTA: "Concepto inactivado correctamente",
    INACTIVACION_CONCEPTO_INCORRECTA: "Error al inactivar concepto",
    INACTIVIDAD_CORRECTA_NOV: "Novedad inactivada",
    INACTIVIDAD_INCORRECTA_NOV: "Error al inactivar novedad",
    INACTIVO: "Inactivo",
    INGRESAR_BEN: "Ingresar beneficiarios",
    INGRESAR_SUS: "Ingresar sustitutos",
    JULIO: "Julio",
    JUNIO: "Junio",
    MARZO: "Marzo",
    MASCULINO: "Masculino",
    MAYO: "Mayo",
    MENSAJE_INICIAL: "Oficina Asesora de Sistemas",
    MES_PRELIQ: "Mes",
    MODULO_REPORTES: "Módulo de Reportes",
    NATURALEZA: "Naturaleza",
    NATURALEZA_NOMBRE: "Naturaleza",
    NEC_SOLICITADA: "Necesidad solicitada",
    NIVEL: "Nivel",
    NO: "No",
    NOMBRE_BENEFICIARIO: "Beneficiario",
    NOMBRE_CONCEPTO_NOVEDAD: "Concepto",
    NOMBRE_NOMINA: "Nombre de la nómina",
    NOMBRE_ORDEN_PAGO: "Orden de pago",
    NOMBRE_PERSONA: "Nombre",
    NOMBRE_RUBRO: "Rubro",
    NOMBRE_RUBRO_ASOCIADO: "Rubro asociado",
    NOMINA_MENU: "Nóminas",
    NOMINA_REG_CORRECTA: "Nómina registrada correctamente",
    NOMINA_REG_INCORRECTA: "Error al registrar la nómina",
    NOM_BEN: "Nombres de los beneficiarios",
    NOM_TUTOR: "Nombres del tutor",
    NOVEDADES_MENU: "Novedades",
    NOVEDAD_REG_CORRECTO: "Novedad registrada correctamente",
    NOVEDAD_REG_ERROR: "Error al registrar novedad",
    NOVIEMBRE: "Noviembre",
    NO_DATA: "No hay datos disponibles",
    NO_PRELIQ: "No se ha generado preliquidación",
    NUMCUOTAS_CONCEPTO_NOVEDAD: "Número de cuotas",
    NUMERO_CONTACTO: "Número de contacto",
    NUMERO_CUENTA: "Número de cuenta bancaria",
    NUM_CONTRATO: "Número de contrato",
    NUM_DOC_BEN: "Número de documento",
    NUM_DOC_TUTOR: "Número de documento",
    OCTUBRE: "Octubre",
    OPCIONES_NOMINA: "Opciones",
    OPCIONES_PRELIQ: "Opciones",
    OP_PENDIENTES: "Órdenes de Pago pendientes",
    OP_SOLICITADA: "Orden de pago solicitada",
    PAGOS_REALIZAR: "Personas a liquidar en el presente periodo",
    PAGO_PERIODO_PDF: "Pagos periodo",
    PARENTESCO: "Parentesco",
    PARENTESCO_CON: "Pariente directo de",
    PENDIENTES_PAGO: "Personas pendientes de pago periodos anteriores",
    PENSIONADOS_MENU: "Pensionados",
    PORCENTAJE: "Porcentaje asignado sobre pensión",
    PRELIQUIDAR: "Preliquidar",
    PRELIQUIDACION: "Preliquidaciones",
    PRELIQUIDACION_EMP: "Preliquidación para",
    PRELIQ_NOMINA: "Personas a preliquidar para: ",
    PRELIQ_REG_CORRECTA: "Preliquidación registrada correctamente",
    PRELIQ_REG_INCORRECTA: "No hay registros para la preliquidación seleccionada",
    PRI_APE: "Primer apellido",
    PRI_NOM: "Primer nombre",
    PROYECTO_CURRICULAR: "Proyecto Curricular",
    REALIZA_PAGO: "Estado del pago",
    REGISTRAR: "Registrar",
    REG_NOV_MENU: "Registrar novedades",
    RESUMEN_PRELIQ: "Resumen de la preliquidación",
    SALIR: "Salir",
    SEG_APE: "Segundo apellido",
    SEG_NOM: "Segundo nombre",
    SELECCIONE: "Seleccione...",
    SELECCION_PERSONA: "Selección de persona",
    SEPTIEMBRE: "Septiembre",
    SI: "Sí",
    SUELDOS_NETOS: "Sueldos netos:",
    TARJETA_IDEN: "Tarjeta de identidad",
    TIPO: "Tipo",
    TIPO_CONCEPTO: "Tipo",
    TIPO_CUENTA: "Tipo de cuenta bancaria",
    TIPO_DOC_BEN: "Tipo de documento",
    TIPO_DOC_TUTOR: "Tipo de documento",
    TIPO_NOMBRE: "Tipo",
    TIPO_NOMINA: "Tipo de nómina",
    TITULO: "SISTEMA DE GESTIÓN DE NÓMINA",
    TITULO_ADICION_CONCEPTO: "Nuevo concepto",
    TITULO_DETALLE_PAGO_PDF: "DETALLE DE PAGO",
    TITULO_DETALLE_PRELIQ: "Detalle de preliquidación de ",
    TITULO_EDICION_CONCEPTO: "Edición de concepto",
    TITULO_EDICION_NOVEDAD: "Edición de novedad",
    TITULO_GENERAL_CONCEPTOS: "Conceptos registrados",
    TITULO_NOMINA_REGIS: "Nóminas registradas",
    TITULO_NOVEDADES: "Registro de novedades",
    TITULO_PRELIQ_REGIS: "Preliquidaciones para",
    TITULO_REG_BEN: "Registro de beneficiarios",
    TITULO_REG_NOMINA: "Registro de nómina",
    TITULO_REG_NOVEDAD: "Registro de nueva novedad",
    TITULO_REG_PRELIQ: "Registro de preliquidación",
    TITULO_REG_TUTOR: "Registro de tutor",
    TITULO_SUS: "Registro de sustituto",
    TITULO_TUTOR: " Si el sustituto es menor de edad, se debe ingresar con el respectivo tutor",
    TOTAL: "Total",
    TOTAL_CONT_LIQUIDADOS: "Total de personas preliquidadas",
    TOTAL_DESC: "Total descuentos:",
    TOTAL_DESCUENTOS_PDF: "Total descuentos",
    TOTAL_DEV: "Total devengado:",
    TOTAL_DEVENGADO_PDF: "Total devengado",
    TOTAL_DOCENTES: "Número total de docentes",
    TOTAL_NOMINA_DEPENDENCIA: "Total nómina por Dependencia",
    TOTAL_NOMINA_FACULTAD: "Total nómina por Facultad",
    TOTAL_NOMINA_PC: "Total de nómina por Proyecto Curricular",
    TOTAL_PAGAR: "Total a pagar:",
    VALOR: "Valor",
    VALOR_CONCEPTO: "Valor",
    VALOR_CONCEPTO_NOVEDAD: "Valor de novedad",
    VALOR_CONTRATO: "Valor Contrato",
    VALOR_TOTAL: "Valor total",
    VALOR_TOTAL_DESCUENTOS: "Valor total de descuentos",
    VALOR_PDF: "Valor",
    VER_PENDIENTES: "Ver pendientes",
    VIGENCIA: "Vigencia",
    VOLVER: "Volver",
    TOTAL_PAGAR_SALUD: "Total con salud",
    BTN: {
        EDITAR: "Editar",
        BORRAR: "Eliminar",
        INACTIVAR: "Inactivar",
        ACTIVAR: "Activar"

    },
};

var text_en = {
    ABIERTA: "Open",
    ABRIL: "April",
    ACCIONES: "Actions",
    ACTIVACION_CONCEPTO_CORRECTA: "Concept correctly activated",
    ACTIVACION_CONCEPTO_INCORRECTA: "Error activating concept",
    ACTIVO: "Active",
    ACTUALIZACION_CORRECTA: "Concept correctly updated",
    ACTUALIZACION_INCORRECTA: "Incorrect concept update",
    ADICION_CORRECTA: "Correct addition",
    ADICION_INCORRECTA: "Incorrect addition",
    AGOSTO: "August",
    AGREGAR_NOVEDAD: "Add change",
    AHORROS: "Savings",
    ALERTA_BEN_CORRECTO: "Beneficiary saved correctly",
    ALERTA_BEN_INCORRECTO: "Recording error",
    ALERTA_COMPLETAR_DATOS_EDICION: "Complete all data",
    ALERTA_NO_LIQUIDACION: "This Pre-liquidation has already been pay off",
    ALERTA_NO_NOVEDADES: "There are not recorded changes",
    ALERTA_PERSONAS_SELECCIONADAS: "You must select people to pay off",
    ALERTA_PERSONAS_SIN_SS: "The selected people cannot be pay off due to incomplete data",
    ALERTA_PRELIQUIDACION_CERRADA: "This pre-liquidation is closed",
    ALERTA_PRELIQUIDACION_OP: "This pre-liquidation is waiting for a payment order",
    ALERTA_REG_SUS_CORRECTO: "Substitute correctly recorded",
    ALERTA_REG_SUS_INCORRECTO: "Error in substitutes record",
    ALERTA_SELECCION_PERSONAS_PDF: "Please select people to generate PDF",
    ALERTA_SUS_INCOMPLETO: "There's no data to record information about tutor",
    ANADIR_CONCEPTO: "Add concept",
    ANADIR_NOMINA: "Add payslip",
    ANADIR_PRELIQ: "Add pre-liquidation",
    ANO_PRELIQ: "Year",
    APE_BEN: "Beneficiary's surname",
    APE_TUTOR: "Tutor's surnames",
    APLICA_SUB_ESTUDIO: "Applies study benefit",
    APLICA_SUB_FAMILIAR: "Applies family benefit",
    BANCO_ASOCIADO: "Associated bank",
    BEN_ASOCIADO: "Associated beneficiary",
    CAMBIOS_ESTADO_OP_INCORRECTO: "Error in payment order request ",
    CAMBIO_ESTADO_OP_CORRECTO: "Payment order requested",
    CANCELAR: "Cancel",
    CARGANDO: "Loading",
    CEDULA_EXTRAN: "Foreigner ID",
    CED_CIU: "Identification",
    CERRADA: "Closed",
    CONCEPTO: "Concept",
    CONCEPTOS_MENU: "Concepts",
    CONCEPTO_NOMBRE: "Concept name",
    CONCEPTO_PDF: "Concept",
    CONFIRMACION_ACTIVAR: "Are you sure that you want to activate the concept: ",
    CONFIRMACION_ADICION: "Are you sure that you want to add the concept:",
    CONFIRMACION_DESACTIVAR: "Are you sure that you want to deactivate the concept:",
    CONFIRMACION_EDICION: "Are you sure that you want to update the concept:",
    CONFIRMACION_EDICION_NOV: "Are you sure that you want to edit the change: ",
    CONFIRMACION_INACTIVIDAD_NOV: "Are you sure that you want to disable the change : ",
    CONFIRMACION_NOVEDAD: "are you sure that you want to add this novelty? Please note the following notice:",
    CONFIRMAR: "Confirm",
    CONS_NOV_MENU: "List changes",
    CONTRATOS_PARA: "Contract for",
    CORREO_ELEC: "E-mail",
    CORRIENTE: "Checking",
    CUOTAS_NOV: "Fees",
    DEPENDENCIA: "Department",
    DESCUENTOS_PDF: "Discounts",
    DESC_NOMINA: "Description",
    DESC_PRELIQ: "Description",
    DETALLE: "Detail",
    DETALLE_EMP: "Employees detail",
    DETALLE_DOC: "Teachers detail",
    DETALLE_CONT: "Contractors detail",
    DETALLE_NOVEDAD: "Changes detail",
    DETALLE_PAGO_PDF: "Payment detail",
    DEVENGOS_PDF: "Incomes",
    DICIEMBRE: "December",
    DOCUMENTO: "Identification",
    DOC_BEN_SUS: "Substitute ID",
    DOC_FUN_PEN: "Pensioned worker's ID",
    EDICION_CORRECTA_NOV: "Change correctly modified",
    EDICION_INCORRECTA_NOV: "Error in modifying change",
    ELIMINACION_CORRECTA: "Concept correctly deleted",
    ELIMINACION_INCORRECTA: "Error deleting concept",
    ENERO: "January",
    ESTADO_BEN: "Status",
    ESTADO_CONCEPTO: "Concept Status",
    ESTADO_NOMINA: "Status",
    ESTADO_PRELIQ: "Status",
    ESTADO_SUS: "Status",
    EXPLICACION_NOV_SS: "Ingrese la fecha de inicio y fecha final de afectación de la novedad",
    EXPLICACION_NOV_FIJO: "For the application of the fixed value novelty, the MONTHLY value and the number of installments must be registered, remember that it will begin to apply from the current month",
    EXPLICACION_NOV_PORCENTUAL: "The percentage change will be applied to the value of the fees of the selected contract",
    FACULTAD: "Facultad",
    FEBRERO: "February",
    FECHA_FIN: "End date",
    FECHA_INICIO: "Start date",
    FECHA_NAC_BEN: "Birthdate",
    FECHA_PDF: "Date",
    FECHA_PRELIQ: "Record date",
    FECHA_REGISTRO: "Record date",
    FEMENINO: "Female",
    GENERANDO: "Generating...",
    GENERAR: "Generate",
    GENERAR_DESAGREGADO: "Generate Individual Report",
    GENERAR_NECESIDAD: "Create necessity",
    GENERAR_OP: "Create payment order",
    GENERAR_PDF: "Generate PDF",
    GENERO: "Gender",
    HABILITAR_BENEFICIARIO: "Set up beneficiary",
    ID_BENEFICIARIO: "Beneficiary ID",
    INACTIVACION_CONCEPTO_CORRECTA: "Concepto correctly deactivated",
    INACTIVACION_CONCEPTO_INCORRECTA: "Error deactivating concept",
    INACTIVIDAD_CORRECTA_NOV: "Change correctly disabled",
    INACTIVIDAD_INCORRECTA_NOV: "Error in disabling change",
    INACTIVO: "Inactive",
    INGRESAR_BEN: "Record beneficiaries",
    INGRESAR_SUS: "Record substitutes",
    JULIO: "July",
    JUNIO: "June",
    MARZO: "March",
    MASCULINO: "Male",
    MAYO: "May",

    MENSAJE_INICIAL: "Now get to start to develop...",
    MES_PRELIQ: "Month",
    MODULO_REPORTES: "Módulo de reportes",
    NATURALEZA: "Nature",
    NATURALEZA_NOMBRE: "Nature",
    NEC_SOLICITADA: "Requested necessity",
    NIVEL: "Level",
    NO: "No",
    NO_DATA: "No data avaliable",
    NOMBRE_BENEFICIARIO: "Beneficiary",
    NOMBRE_CONCEPTO_NOVEDAD: "Concept",
    NOMBRE_NOMINA: "Payslips name",
    NOMBRE_ORDEN_PAGO: "Payment order",
    NOMBRE_PERSONA: "Name",
    NOMBRE_RUBRO: "Item",
    NOMBRE_RUBRO_ASOCIADO: "Associated item",
    NOMINA_MENU: "Payslips",
    NOMINA_REG_CORRECTA: "Payslip correctly recorded",
    NOMINA_REG_INCORRECTA: "Error in payslips record",
    NOM_BEN: "Beneficiaries name",
    NOM_TUTOR: "Tutors names",
    NOVEDADES_MENU: "Changes",
    NOVEDAD_REG_CORRECTO: "Change correctly recorded",
    NOVEDAD_REG_ERROR: "Error in changes' record",
    NOVIEMBRE: "November",
    NO_PRELIQ: "Pending pre-liquidation",
    NUMCUOTAS_CONCEPTO_NOVEDAD: "Fees",
    NUMERO_CONTACTO: "Contact number",
    NUMERO_CUENTA: "Bank account number",
    NUM_CONTRATO: "Contract number",
    NUM_DOC_BEN: "Identification",
    NUM_DOC_TUTOR: "Identification",
    OCTUBRE: "October",
    OPCIONES_NOMINA: "Options",
    OPCIONES_PRELIQ: "Options",
    OP_PENDIENTES: "Pending payment orders",
    OP_SOLICITADA: "Requested payment order",
    PAGOS_REALIZAR: "People to be paidin  this term",
    PAGO_PERIODO_PDF: "Payment for term: ",
    PARENTESCO: "Relationship",
    PARENTESCO_CON: "Relationship with",
    PENDIENTES_PAGO: "People with pending payment",
    PENSIONADOS_MENU: "Retirees",
    PORCENTAJE: "Pensions Percentage assigned to substitute",
    PRELIQUIDACION: "Pre-liquidations",
    PRELIQUIDACION_EMP: "Pre-liquidarion for",
    PRELIQ_NOMINA: "People for pre-liquidation in payslip: ",
    PRELIQ_REG_CORRECTA: "Pre-liquidation correctly recorded",
    PRELIQ_REG_INCORRECTA: "Error in pre-liquidation record",
    PRI_APE: "First lastname",
    PRI_NOM: "First name",
    PROYECTO_CURRICULAR: "Degree",
    REALIZA_PAGO: "Make payment?",
    REGISTRAR: "Record",
    REG_NOV_MENU: "Record changes",
    RESUMEN_PRELIQ: "Pre-liquidations summary",
    SALIR: "Exit",
    SEG_APE: "Second last name",
    SEG_NOM: "Second name",
    SELECCIONE: "Select...",
    SELECCION_PERSONA: "Person selection",
    SEPTIEMBRE: "September",
    SI: "Yes",
    SUELDOS_NETOS: "Net salaries:",
    TARJETA_IDEN: "Identity card",
    TIPO: "Type",
    TIPO_CONCEPTO: "Type",
    TIPO_CUENTA: "Bank account type",
    TIPO_DOC_BEN: "Identification type",
    TIPO_DOC_TUTOR: "Identification type",
    TIPO_NOMBRE: "Type",
    TIPO_NOMINA: "Payslip type",
    TITULO: "GENERATOR-OAS",
    TITULO_ADICION_CONCEPTO: "New concept",
    TITULO_DETALLE_PAGO_PDF: "Payment detail",
    TITULO_DETALLE_PRELIQ: "Pre-liquidation payslip detail: ",
    TITULO_EDICION_CONCEPTO: "Concept editing",
    TITULO_EDICION_NOVEDAD: "Change edit",
    TITULO_GENERAL_CONCEPTOS: "Recorded concepts",
    TITULO_NOMINA_REGIS: "Recorded Payslips",
    TITULO_NOVEDADES: "Changes record",
    TITULO_PRELIQ_REGIS: "Pre-liquidation to the payslip",
    TITULO_REG_BEN: "Beneficiaries record",
    TITULO_REG_NOMINA: "Payslips record",
    TITULO_REG_NOVEDAD: "Adding a new change",
    TITULO_REG_PRELIQ: "Pre-liquidations record",
    TITULO_REG_TUTOR: "Tutors record",
    TITULO_SUS: "Substitute record",
    TITULO_TUTOR: " If substitute is under eighteen, you must record a tutor",
    TOTAL: "Total",
    TOTAL_CONT_LIQUIDADOS: "Pre-liquidated contracts",
    TOTAL_DESC: "Total deducted:",
    TOTAL_DESCUENTOS_PDF: "Total deducted",
    TOTAL_DEV: "Total earned:",
    TOTAL_DEVENGADO_PDF: "Total payed",
    TOTAL_DOCENTES: "Total Professors",
    TOTAL_NOMINA_DEPENDENCIA: "Total Payment per Department",
    TOTAL_NOMINA_FACULTAD: "Total Payment per Faculty",
    TOTAL_NOMINA_PC: "Total Payment per Degree",
    TOTAL_PAGAR: "Total to pay:",
    VALOR: "Value",
    VALOR_CONCEPTO: "Value",
    VALOR_CONCEPTO_NOVEDAD: "Change value",
    VALOR_CONTRATO: "contract value",
    VALOR_TOTAL: "Total Value",
    VALOR_TOTAL_DESCUENTOS: "Total Discounts",
    TOTAL_PAGAR_SALUD: "Total whit helcare",
    VALOR_PDF: "Values",
    VIGENCIA: "Term",
    VOLVER: "Back",
    BTN: {
        EDITAR: "Edit",
        BORRAR: "Delete",
        INACTIVAR: "Inactivate",
        ACTIVAR: "Activate"
    },
};

angular.module('titanClienteV2App')
    .config(function ($translateProvider) {
        $translateProvider
            .translations("es", text_es)
            .translations("en", text_en);
        $translateProvider.preferredLanguage("es");
        $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
    });
