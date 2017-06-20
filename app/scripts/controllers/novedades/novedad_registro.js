'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadRegistroCtrl', function (titanRequest,$scope,$translate) {
    var self = this;
  //  self.tipo="porcentaje";
    self.gridOptions_conceptos = {

      enableFiltering : false,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'AliasConcepto',  displayName: $translate.instant('CONCEPTO')},
        {field: 'Naturaleza',  displayName: $translate.instant('NATURALEZA')},
        {field: 'TipoConcepto',  visible: false},
        ]

    };
    self.gridOptions_nominas = {

      enableFiltering : false,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Nombre',  displayName: $translate.instant('NOMBRE_NOMINA') },
        {field: 'Descripcion' ,  displayName: $translate.instant('DESC_NOMINA')},
          {field: 'Periodo',  displayName: $translate.instant('  PERIODO_NOMINA')        },
        ]

    };
    $scope.gridOptions_personas = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'NumeroContrato' ,  displayName: $translate.instant('NUM_CONTRATO')},
        {field: 'NombreProveedor',  displayName: $translate.instant('NOMBRE_PERSONA')},
        {field: 'NumDocumento',  displayName: $translate.instant('DOCUMENTO')},



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
      var valor = parseInt(self.ValorNovedad)
      var cuotas = parseInt(self.NumCuotas)

      if($scope.concepto.TipoConcepto  === "porcentaje"){
        cuotas = 999;
      }

      if($scope.concepto.TipoConcepto === "seguridad_social"){
        valor = 0;
        cuotas = 0;
      }

      var concepto = {Id : $scope.concepto.Id };
      var persona = {Id : $scope.persona.Id };
      var nomina = {Id : $scope.nomina.Id };
      var novedad_por_persona = {
        Concepto: concepto,
        EstadoNovedad: "Activo",
        FechaDesde: self.FechaInicio,
        FechaHasta: self.FechaFin,
        FechaRegistro: self.FechaRegistro,
        NumCuotas: cuotas,
        Persona: persona,
        Nomina: nomina ,
        ValorNovedad: valor
      };
      console.log(novedad_por_persona);
      titanRequest.post('concepto_por_persona',novedad_por_persona).then(function(response) {
        if(typeof(response.data)=="object"){
          swal({
             html: $translate.instant('NOVEDAD_REG_CORRECTO'),
             type: "success",
             showCancelButton: false,
             confirmButtonColor: "#449D44",
             confirmButtonText: $translate.instant('VOLVER'),
             }).then(function() {
            $window.location.href = '#/novedades/novedad_registro';
           })

        }
        if(typeof(response.data)=="string"){
          swal({
             html: $translate.instant('NOVEDAD_REG_ERROR'),
             type: "error",
             showCancelButton: false,
             confirmButtonColor: "#449D44",
             confirmButtonText: $translate.instant('VOLVER'),
             }).then(function() {
            $window.location.href = '#/novedades/novedad_registro';
           })
          console.log("error: "+response.data);
        }
      });

    };
  });
