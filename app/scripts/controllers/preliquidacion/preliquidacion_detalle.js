'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionDetalleCtrl
 * @description
 * # PreliquidacionPreliquidacionDetalleCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('PreliquidacionPreliquidacionDetalleCtrl', function ($scope,titanMidRequest,titanRequest,preliquidacion,$window,$translate) {
    var self = this;
    self.resumen_conceptos;
    self.seleccion_sueldoNeto = 0;
    self.preliquidacion = preliquidacion;
    self.gridOptions = {
	      enableFiltering : false,
	      enableSorting : true,
	      enableRowSelection: true,
	      enableSelectAll: true,
	      columnDefs : [
	        {field: 'IdPersona',             visible : false},
          {field: 'NumeroContrato' , displayName: $translate.instant('NUM_CONTRATO'), cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.preliquidacionDetalle.ver_seleccion_persona(row)" >{{row.entity.NumeroContrato}}</button>'},
	        {field: 'NomProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
	        {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},
	      ],
	      onRegisterApi : function( gridApi ) {
	        self.gridApi = gridApi;
	        self.gridApi.selection.on.rowSelectionChanged($scope,function(row){
        		$scope.cdp = $scope.gridApi.selection.getSelectedRows();
        		alert("ece");
      		});
	      }
	    };

	    self.CalcularTotalesNomina = function(){
	    	var seleccion_personas = self.gridApi.selection.getSelectedRows();
	    	var temp_sueldo_neto = 0;
	    	var temp_resumen_conceptos = {};
      	 	for (var i=0; i < seleccion_personas.length; i++){
      	 		for (var j=0; j< seleccion_personas[i].Conceptos.length; j++){
      	 			if(seleccion_personas[i].Conceptos[j].Naturaleza === "devengo"){
     					temp_sueldo_neto = temp_sueldo_neto+parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					if(temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] += parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] = parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}
	     			}else if (seleccion_personas[i].Conceptos[j].Naturaleza === "descuento"){
	     				temp_sueldo_neto = temp_sueldo_neto-parseInt(seleccion_personas[i].Conceptos[j].Valor);
	     				if(temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] += parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[seleccion_personas[i].Conceptos[j].Nombre] = parseInt(seleccion_personas[i].Conceptos[j].Valor);
     					}
	     			}
      	 		}

      	 	}
      	 	self.total_sueldos_neto = temp_sueldo_neto;
      	 	self.resumen_conceptos = temp_resumen_conceptos;
	    };

		titanRequest.post('preliquidacion/resumen', preliquidacion).then(function(response) {
      	 	var temp_resumen_conceptos = {};
      	 	var temp_sueldo_neto = 0;
      	 	for (var i=0; i < response.data.length; i++){
      	 		for (var j=0; j< response.data[i].Conceptos.length; j++){
      	 			if(response.data[i].Conceptos[j].Naturaleza === "devengo"){
     					temp_sueldo_neto = temp_sueldo_neto+parseInt(response.data[i].Conceptos[j].Valor);
     					if(temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] += parseInt(response.data[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] = parseInt(response.data[i].Conceptos[j].Valor);
     					}
	     			}else if (response.data[i].Conceptos[j].Naturaleza === "descuento"){
	     				temp_sueldo_neto = temp_sueldo_neto-parseInt(response.data[i].Conceptos[j].Valor);
	     				if(temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] != null){
     						temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] += parseInt(response.data[i].Conceptos[j].Valor);
     					}else{
     						temp_resumen_conceptos[response.data[i].Conceptos[j].Nombre] = parseInt(response.data[i].Conceptos[j].Valor);
     					}
	     			}
      	 		}

      	 	}
      	 	self.gridOptions.data = response.data;
      	 	self.total_sueldos_neto = temp_sueldo_neto;
      	 	self.resumen_conceptos = temp_resumen_conceptos;

     	});

     	self.ver_seleccion_persona = function(row){
     		self.seleccion_conceptos = null;
     		self.seleccion_conceptos = row.entity.Conceptos
     		var temp_sueldo_neto = 0;
     		var temp_total_desc = 0;
     		var temp_total_devengo = 0;
     		var total_conceptos = [];
     		for (var i=0; i < self.seleccion_conceptos.length; i++){
     			if(self.seleccion_conceptos[i].Naturaleza === "devengo"){
     				temp_sueldo_neto = temp_sueldo_neto+parseInt(self.seleccion_conceptos[i].Valor);
     				temp_total_devengo = temp_total_devengo  + parseInt(self.seleccion_conceptos[i].Valor);
     			}else if (self.seleccion_conceptos[i].Naturaleza === "descuento"){
     				temp_sueldo_neto = temp_sueldo_neto-parseInt(self.seleccion_conceptos[i].Valor);
     				temp_total_desc = temp_total_desc + parseInt(self.seleccion_conceptos[i].Valor);
     			}

     		}
     		self.seleccion_sueldoNeto = temp_sueldo_neto;
     		self.seleccion_tot_descuentos = temp_total_desc;
     		self.seleccion_tot_devengo = temp_total_devengo;
     	};

      self.liquidar = function(){
        var seleccion_personas = self.gridApi.selection.getSelectedRows();
        var personas = [];
        for (var i=0; i < seleccion_personas.length; i++){
          personas[i] = seleccion_personas[i].IdPersona
        }
        var tam = seleccion_personas.length
        personas[tam] = preliquidacion.Id
        console.log(seleccion_personas)
        console.log(personas)
        var datos = { preliquidacion:preliquidacion, personas: personas}

        titanMidRequest.post('liquidacion',datos).then(function(response) {
          console.log(response.data)
        if(response.data === "Ok"){
          self.saving =false;
          self.btnGenerartxt= $translate.instant('GENERAR');;
          $window.location.href = '#/liquidacion/liquidacion_detalle';
        }else{
          swal({
             html: "Esta preliquidación ya ha sido liquidada",
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


      });
      };
  });
