'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadRegistroCtrl', function (titanRequest,$scope,$translate,$routeParams) {
    var self = this;
    self.tipo = $routeParams.tipo;
  //  self.tipo="porcentaje";


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


    $scope.gridOptions_personas.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.persona = row.entity

      });
    };
    self.gridOptions_conceptos.multiSelect = false;
    self.gridOptions_nominas.multiSelect = false;
    $scope.gridOptions_personas.multiSelect = false;

    titanRequest.get('concepto_nomina','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions_conceptos.data = response.data;
    });
    titanRequest.get('nomina','limit=0&sortby=Id&order=desc&query=Activo:TRUE,TipoNomina.Nombre:'+self.tipo).then(function(response) {
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
      if ($scope.concepto.TipoConcepto  === "porcentaje" && valor >= 0 && valor <= 100){
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
    }
    else{
      swal({
         html: "Inserte un porcentaje válido",
         type: "error",
         showCancelButton: false,
         confirmButtonColor: "#449D44",
         confirmButtonText: $translate.instant('VOLVER'),
         }).then(function() {
        $window.location.href = '#/novedades/novedad_registro';
       })
    }

    };
  });
