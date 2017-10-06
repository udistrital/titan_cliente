'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionPersonasCtrl
 * @description
 * # PreliquidacionPreliquidacionPersonasCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('PreliquidacionPreliquidacionPersonasCtrl', function (titanMidRequest,preliquidacion,titanRequest,nomina,$window,$translate) {
   var self = this;
   self.nomina = nomina;
   self.preliquidacion = preliquidacion
   self.generar_disponibilidad;
   self.btnGenerartxt = $translate.instant('GENERAR');
   self.saving = false;
    console.log(self.preliquidacion);
    if (self.nomina.TipoNomina.Descripcion === "Vinculacion Docente Honorarios" || self.nomina.TipoNomina.Descripcion === "Vinculacion Docentes Salarios"){
    	self.gridOptions = {
	      enableFiltering : true,
	      enableSorting : true,
	      enableRowSelection: true,
	      enableSelectAll: true,
	      columnDefs : [
	        {field: 'Id',             visible : false},
          {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
          {field: 'NombreProveedor',  displayName:  $translate.instant('NOMBRE_PERSONA')},
          {field: 'NumeroContrato' ,  displayName: $translate.instant('NUM_CONTRATO')},
          {field: 'VigenciaContrato', displayName:  $translate.instant('VIGENCIA')},
	        {field: 'IdEPS',  visible : false},
          {field: 'IdARL',  visible : false},
          {field: 'IdFondoPension',  visible : false},
          {field: 'IdCajaCompensacion',  visible : false},
	      ],
	      onRegisterApi : function( gridApi ) {
	        self.gridApi = gridApi;
	      }
	    };


    	 titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
      	 self.gridOptions.data = response.data;
     });

   	  self.generar_preliquidacion = function(){
        var personas = self.gridApi.selection.getSelectedRows();

        var personas_a_liquidar = [];
        for (var i=0; i < personas.length; i++){
         var persona = { IdPersona : personas[i].Id ,
                         NumDocumento: personas[i].NumDocumento,
                         NumeroContrato :  personas[i].NumeroContrato,
                         VigenciaContrato :  parseInt(personas[i].VigenciaContrato)
                        };

          personas_a_liquidar.push(persona)
        }
        var datos_preliquidacion = {
        	Preliquidacion : self.preliquidacion,
        	PersonasPreLiquidacion : personas_a_liquidar

        };
        titanRequest.delete('detalle_preliquidacion',''+self.preliquidacion.Id).then(function(response) {
          console.log("respuesta a borrar")
          console.log(response.data)
     	});

     	self.saving =true;
     	self.btnGenerartxt = $translate.instant('GENERANDO');
        titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

              self.saving =false;
              self.btnGenerartxt= $translate.instant('GENERAR');
              $window.location.href = '#/preliquidacion/preliquidacion_detalle';
            });;

    };

  }
   if (self.nomina.TipoNomina.Descripcion === "Funcionarios de planta"){
        var rowtpl='<div ng-class="{\'personas_liquidar\':true, \'personas_no_liquidar\':row.entity.IdEPS==0 || row.entity.IdARL==0 || row.entity.IdFondoPension==0 || row.entity.IdCajaCompensacion==0}"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
        self.gridOptions = {
  	      enableFiltering : true,
  	      enableSorting : true,
  	      enableRowSelection: true,
  	      enableSelectAll: true,
          rowTemplate:rowtpl,
  	      columnDefs : [
  	        {field: 'Id',             visible : false},
            {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
            {field: 'NombreProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
            {field: 'NumeroContrato',  displayName:  $translate.instant('NUM_CONTRATO')},
            {field: 'VigenciaContrato', displayName:  $translate.instant('VIGENCIA')},
  	      ],
  	      onRegisterApi : function( gridApi ) {
  	        self.gridApi = gridApi;
  	      }
  	    };

        titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
      	 self.gridOptions.data = response.data;
         console.log(response.data)
});

       self.generar_preliquidacion = function(){
         var personas = self.gridApi.selection.getSelectedRows();
         var personas_sin_ss = []
         var personas_a_liquidar = [];
         for (var i=0; i < personas.length; i++){
           if(personas[i].IdEPS === 0 || personas[i].IdARL === 0 || personas[i].IdFondoPension === 0 || personas[i].IdCajaCompensacion === 0){
             //swal("¡ERROR!","No se puede realizar liquidación","error")
             var persona = { IdPersona : personas[i].Id ,
                              NumDocumento: personas[i].NumDocumento,
                              NumeroContrato :  personas[i].NumeroContrato,
                              VigenciaContrato :  parseInt(personas[i].VigenciaContrato)
                            };
             personas_sin_ss.push(persona)
           }
         }
           if(personas_sin_ss.length != 0){
             swal({
                html: $translate.instant('ALERTA_PERSONAS_SIN_SS'),
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('VOLVER'),
                cancelButtonText: $translate.instant('SALIR'),
              }).then(function() {
                //si da click en ir a contratistas
                $window.location.href = '#/nomina/nomina_consulta';
              }, function(dismiss) {

                if (dismiss === 'cancel') {
                  //si da click en Salir
                  $window.location.href = '#/nomina/nomina_consulta';
                }
              })
           }
           else{
             for (var i=0; i < personas.length; i++){
              var persona = { IdPersona : personas[i].Id ,
                              NumDocumento: personas[i].NumDocumento,
                              NumeroContrato :  personas[i].NumeroContrato,
                              VigenciaContrato :  parseInt(personas[i].VigenciaContrato)
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
               self.btnGenerartxt = $translate.instant('GENERANDO');
                titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

                      self.saving =false;
                      self.btnGenerartxt=$translate.instant('GENERAR');
                      $window.location.href = '#/preliquidacion/preliquidacion_detalle';
                    });;

           }
         }


     };




      if (self.nomina.TipoNomina.Descripcion === "Docentes de planta"){
          self.gridOptions = {
            enableFiltering : true,
            enableSorting : true,
            enableRowSelection: true,
            enableSelectAll: true,
            columnDefs : [
              {field: 'Id',             visible : false},
              {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
              {field: 'NombreProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
              {field: 'NumeroContrato' ,  displayName:  $translate.instant('NUM_CONTRATO')},
              {field: 'VigenciaContrato', displayName:  $translate.instant('VIGENCIA')},

            ],
            onRegisterApi : function( gridApi ) {
              self.gridApi = gridApi;
            }

          };
           titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
             self.gridOptions.data = response.data;
 });

  self.generar_preliquidacion = function(){
    var personas = self.gridApi.selection.getSelectedRows();

    var personas_a_liquidar = [];
    for (var i=0; i < personas.length; i++){
     var persona = { IdPersona : personas[i].Id ,
                    NumDocumento: personas[i].NumDocumento,
                     NumeroContrato :  personas[i].NumeroContrato,
                     VigenciaContrato :  parseInt(personas[i].VigenciaContrato)
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
  self.btnGenerartxt = $translate.instant('GENERANDO');
    titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

          self.saving =false;
         self.btnGenerartxt=$translate.instant('GENERAR')
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
        });;

};

}

if (self.nomina.TipoNomina.Descripcion === "Contrato de Prestacion de Servicios Profesionales o Apoyo a la Gestion"){
        self.gridOptions = {
            enableFiltering : true,
            enableSorting : true,
            enableRowSelection: true,
            enableSelectAll: true,
            columnDefs : [
            {field: 'Id',             visible : false},
            {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
            {field: 'NombreProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
            {field: 'NumeroContrato' ,  displayName:  $translate.instant('NUM_CONTRATO')},
            {field: 'VigenciaContrato', displayName:  $translate.instant('VIGENCIA')},

            ],
            onRegisterApi : function( gridApi ) {
            self.gridApi = gridApi;
            }

      };
      titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
      self.gridOptions.data = response.data;
});

      self.generar_preliquidacion = function(){
        var personas = self.gridApi.selection.getSelectedRows();

        var personas_a_liquidar = [];
        for (var i=0; i < personas.length; i++){
        var persona = { IdPersona : personas[i].Id ,
                      NumDocumento: personas[i].NumDocumento,
                       NumeroContrato :  personas[i].NumeroContrato,
                       VigenciaContrato :  parseInt(personas[i].VigenciaContrato)

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
      self.btnGenerartxt = $translate.instant('GENERANDO');
      titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

          self.saving =false;
         self.btnGenerartxt=$translate.instant('GENERAR')
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
        });;

    };

    }

if (self.nomina.TipoNomina.Nombre === "PE"){
  self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableSelectAll: true,
      columnDefs : [
      {field: 'Id',             visible : false},
      {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
      {field: 'NombreProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
      {field: 'NumeroContrato' ,  displayName:  $translate.instant('NUM_CONTRATO')},
      {field: 'VigenciaContrato', displayName:  $translate.instant('VIGENCIA')},

      ],
      onRegisterApi : function( gridApi ) {
      self.gridApi = gridApi;
      }

    };
    titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
      self.gridOptions.data = response.data;
    });

    self.generar_preliquidacion = function(){
        var personas = self.gridApi.selection.getSelectedRows();

        var personas_a_liquidar = [];
        for (var i=0; i < personas.length; i++){
        var persona = { IdPersona : personas[i].Id ,
                        NumDocumento: personas[i].NumDocumento,
                       NumeroContrato :  personas[i].NumeroContrato,
                       VigenciaContrato :  parseInt(personas[i].VigenciaContrato)
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
    self.btnGenerartxt = $translate.instant('GENERANDO');
    titanMidRequest.post('preliquidacion', datos_preliquidacion).then(function(response) {

        self.saving =false;
       self.btnGenerartxt=$translate.instant('GENERAR');
      $window.location.href = '#/preliquidacion/preliquidacion_detalle';
      });;

    };

    }
  });
