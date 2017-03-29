'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadRegistroCtrl', function (titanRequest,$scope) {
    var self = this;
    self.tipo="porcentaje";
    self.gridOptions_conceptos = {

      enableFiltering : false,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'AliasConcepto',  displayName: 'Nombre' },
        {field: 'Naturaleza'        },
        ]

    };
    self.gridOptions_nominas = {

      enableFiltering : false,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Nombre',  displayName: 'Nombre' },
        {field: 'Descripcion'        },
          {field: 'Periodo'        },
        ]

    };
    $scope.gridOptions_personas = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
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
    self.gridOptions_conceptos.onRegisterApi = function(gridApi){
      //set gridApi on scope
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.concepto = row.entity

      });
    };
    self.gridOptions_nominas.onRegisterApi = function(gridApi){
      //set gridApi on scope
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.nomina = row.entity;
        $scope.persona = null;
        var preliquidacion = {Nomina: $scope.nomina,
                              FechaInicio: new Date(),
                              FechaFin: new Date()};
        titanRequest.post('funcionario_proveedor',preliquidacion).then(function(response) {
       	 $scope.gridOptions_personas.data = response.data;
      });
      });
    };
    $scope.gridOptions_personas.onRegisterApi = function(gridApi){
      //set gridApi on scope
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.persona = row.entity

      });
    };
    self.gridOptions_conceptos.multiSelect = false;
    self.gridOptions_nominas.multiSelect = false;
      $scope.gridOptions_personas.multiSelect = false;
    titanRequest.get('concepto','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions_conceptos.data = response.data;
    });
    titanRequest.get('nomina','limit=0&sortby=Id&order=desc&query=Estado:Activo').then(function(response) {
     self.gridOptions_nominas.data = response.data;
    });

    self.Registrar = function(){
      var valor = parseFloat(self.valor);
      if(self.tipo === "porcentaje"){
        valor = valor / 100;
      }
      var concepto = {Id : $scope.concepto.Id };
      var persona = {Id : $scope.persona.Id };
      var nomina = {Id : $scope.nomina.Id };
      var novedad_por_persona = {
        Concepto: concepto,
        EstadoNovedad: "Activo",
        FechaDesde: self.FechaInicio,
        FechaHasta: self.FechaFin,
        NumCuotas: 0,
        Persona: persona,
        Nomina: nomina ,
        Tipo: self.tipo,
        ValorNovedad: valor
      };
      console.log(novedad_por_persona);
      titanRequest.post('concepto_por_persona',novedad_por_persona).then(function(response) {
        if(typeof(response.data)=="object"){
          alert("Novedad registrada correctamente");

        }
        if(typeof(response.data)=="string"){
          alert("error: "+response.data);
        }
      });

    };
  });
