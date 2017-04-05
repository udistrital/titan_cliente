'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionPersonasCtrl
 * @description
 * # PreliquidacionPreliquidacionPersonasCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('PreliquidacionPreliquidacionPersonasCtrl', function (titanMidRequest,titanRequest,preliquidacion,$window) {
   var self = this;
   self.preliquidacion = preliquidacion;
   self.generar_disponibilidad;
   self.btnGenerartxt = "Generar";
   self.saving = false;
    console.log(self.preliquidacion);
    if (self.preliquidacion.Nomina.TipoNomina.Nombre === "HC" || self.preliquidacion.Nomina.TipoNomina.Nombre === "HC-SALARIOS"){
    	self.gridOptions = {
	      enableFiltering : true,
	      enableSorting : true,
	      enableRowSelection: true,
	      enableSelectAll: true,
	      columnDefs : [
	        {field: 'Id',             visible : false},
          {field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
	        {field: 'NombreProveedor',  displayName: 'Nombre'},
	        {field: 'NumDocumento',  displayName: 'Documento'},
	      ],
	      onRegisterApi : function( gridApi ) {
	        self.gridApi = gridApi;
	      }

	    };
    	 titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
      	 self.gridOptions.data = response.data;
     });

   	  self.generar_preliquidacion = function(){
        var personas = self.gridApi.selection.getSelectedRows();

        var personas_a_liquidar = [];
        for (var i=0; i < personas.length; i++){
         var persona = { IdPersona : personas[i].Id ,
                         NumeroContrato :  personas[i].NumeroContrato
                        };

          personas_a_liquidar.push(persona)
        }
        var datos_preliquidacion = {
        	Preliquidacion : self.preliquidacion,
        	PersonasPreLiquidacion : personas_a_liquidar

        };
        titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

     	});

     	self.saving =true;
     	self.btnGenerartxt = "Generando...";
        titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

              self.saving =false;
              self.btnGenerartxt="Generar";
              $window.location.href = '#/preliquidacion/preliquidacion_detalle';
            });;

    };

  }
   if (self.preliquidacion.Nomina.TipoNomina.Nombre === "FP"){

        self.gridOptions = {
  	      enableFiltering : true,
  	      enableSorting : true,
  	      enableRowSelection: true,
  	      enableSelectAll: true,
  	      columnDefs : [
  	        {field: 'Id',             visible : false},
            {field: 'NombreProveedor',  displayName: 'Nombre'},
            {field: 'NumDocumento',  displayName: 'Numero de cedula'},
            {field: 'NumeroContrato',  displayName: 'Numero de contrato'},
  	      ],
  	      onRegisterApi : function( gridApi ) {
  	        self.gridApi = gridApi;
  	      }
  	    };

        titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
      	 self.gridOptions.data = response.data;
});

       self.generar_preliquidacion = function(){
         var personas = self.gridApi.selection.getSelectedRows();
         var personas_a_liquidar = [];
         for (var i=0; i < personas.length; i++){
          var persona = { IdPersona : personas[i].Id ,
                           NumeroContrato :  personas[i].NumeroContrato

                         };
             personas_a_liquidar.push(persona)
         }
         var datos_preliquidacion = {
          Preliquidacion : self.preliquidacion,
          PersonasPreLiquidacion : personas_a_liquidar

         };
         titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

        });

        self.saving =true;
        self.btnGenerartxt = "Generando...";
         titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

               self.saving =false;
               self.btnGenerartxt="Generar";
               $window.location.href = '#/preliquidacion/preliquidacion_detalle';
             });;

     };

      }


      if (self.preliquidacion.Nomina.TipoNomina.Nombre === "DP"){
  self.gridOptions = {
    enableFiltering : true,
    enableSorting : true,
    enableRowSelection: true,
    enableSelectAll: true,
    columnDefs : [
      {field: 'Id',             visible : false},
      {field: 'NombreProveedor',  displayName: 'Nombre'},
      {field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
      {field: 'NumDocumento',  displayName: 'Documento'},
    ],
    onRegisterApi : function( gridApi ) {
      self.gridApi = gridApi;
    }

  };
   titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
     self.gridOptions.data = response.data;
 });

  self.generar_preliquidacion = function(){
    var personas = self.gridApi.selection.getSelectedRows();

    var personas_a_liquidar = [];
    for (var i=0; i < personas.length; i++){
     var persona = { IdPersona : personas[i].Id ,
                     NumeroContrato :  personas[i].NumeroContrato
                    };

      personas_a_liquidar.push(persona)
    }
    var datos_preliquidacion = {
      Preliquidacion : self.preliquidacion,
      PersonasPreLiquidacion : personas_a_liquidar

    };
    titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {
  });

  self.saving =true;
  self.btnGenerartxt = "Generando...";
    titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

          self.saving =false;
         self.btnGenerartxt="Generar";
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
        });;

};

}

if (self.preliquidacion.Nomina.TipoNomina.Nombre === "PE"){
  self.gridOptions = {
enableFiltering : true,
enableSorting : true,
enableRowSelection: true,
enableSelectAll: true,
columnDefs : [
{field: 'Id',             visible : false},
{field: 'NombreProveedor',  displayName: 'Nombre'},
{field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
{field: 'NumDocumento',  displayName: 'Documento'},
],
onRegisterApi : function( gridApi ) {
self.gridApi = gridApi;
}

};
titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
self.gridOptions.data = response.data;
});

self.generar_preliquidacion = function(){
var personas = self.gridApi.selection.getSelectedRows();

var personas_a_liquidar = [];
for (var i=0; i < personas.length; i++){
var persona = { IdPersona : personas[i].Id ,
               NumeroContrato :  personas[i].NumeroContrato
              };

personas_a_liquidar.push(persona)
}
var datos_preliquidacion = {
Preliquidacion : self.preliquidacion,
PersonasPreLiquidacion : personas_a_liquidar

};
titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

});

self.saving =true;
self.btnGenerartxt = "Generando...";
titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

    self.saving =false;
   self.btnGenerartxt="Generar";
  $window.location.href = '#/preliquidacion/preliquidacion_detalle';
  });;

};

}

if (self.preliquidacion.Nomina.TipoNomina.Nombre === "PE"){
  self.gridOptions = {
enableFiltering : true,
enableSorting : true,
enableRowSelection: true,
enableSelectAll: true,
columnDefs : [
{field: 'Id',             visible : false},
{field: 'NombreProveedor',  displayName: 'Nombre'},
{field: 'NumeroContrato' ,  displayName: 'Numero de Contrato'},
{field: 'NumDocumento',  displayName: 'Documento'},
],
onRegisterApi : function( gridApi ) {
self.gridApi = gridApi;
}

};
titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
self.gridOptions.data = response.data;
});

self.generar_preliquidacion = function(){
var personas = self.gridApi.selection.getSelectedRows();

var personas_a_liquidar = [];
for (var i=0; i < personas.length; i++){
var persona = { IdPersona : personas[i].Id ,
               NumeroContrato :  personas[i].NumeroContrato
              };

personas_a_liquidar.push(persona)
}
var datos_preliquidacion = {
Preliquidacion : self.preliquidacion,
PersonasPreLiquidacion : personas_a_liquidar

};
titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {

});

self.saving =true;
self.btnGenerartxt = "Generando...";
titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

    self.saving =false;
   self.btnGenerartxt="Generar";
  $window.location.href = '#/preliquidacion/preliquidacion_detalle';
  });;

};

}
  });
