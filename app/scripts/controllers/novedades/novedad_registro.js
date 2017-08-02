'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadRegistroCtrl', function (titanRequest,$scope,$translate,$routeParams,$window) {
    var self = this;
    self.tipo = $routeParams.tipo;
    self.Nomina;
    self.CurrentDate = new Date();

    var tipo_vin = {
      Id: 0,
      Nombre: "",
      Activo: Boolean("true"),
    };

    var tipo_nom = {
      Id: 0,
      Nombre: self.tipo,
      Activo: Boolean("true"),
    };

    var nomina = {
      Id: 0,
      Descripcion : "",
    	TipoVinculacion: tipo_vin,
    	TipoNomina: tipo_nom,
    	Activo: Boolean("true"),
    };

    titanRequest.get('nomina','limit=0&query=TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc' ).then(function(response) {
       self.Nomina = response.data[0]

    });

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

    $scope.gridOptions_novedades = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'ValorNovedad' ,  displayName: "Valor de la novedad"},
        {field: 'NumCuotas' ,  displayName: "Número de cuotas"},
        {field: 'FechaRegistro' ,  displayName: "Fecha de registro", cellTemplate: '<span>{{row.entity.FechaRegistro| date:"yyyy-MM-dd":"+0900"}}</span>'},
        {field: 'Concepto.Id' ,  visible : false},
        {field: 'Concepto.AliasConcepto' ,  displayName: "Nombre del concepto"},
        {field: 'Activo' ,  displayName: "Estado"},
        {field: 'Acciones', displayName: $translate.instant('ACCIONES'),
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.borrar(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.llenar_modal(row)" data-toggle="modal" data-target="#modal_edicion_novedad"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp'},
      ],
      onRegisterApi : function( gridApi ) {
        self.gridApi = gridApi;
      }
    };

    $scope.gridOptions_conceptos = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'AliasConcepto',  displayName: $translate.instant('CONCEPTO')},
        {field: 'NaturalezaConcepto.Id',  visible:false},
        {field: 'TipoConcepto.Id',  visible: false},
        ]

      };


    $scope.gridOptions_personas.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.persona = row.entity

        titanRequest.get('concepto_por_persona','limit=0&query=Persona:'+$scope.persona.Id+',Nomina.TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc').then(function(response) {
            $scope.gridOptions_novedades.data = response.data;
        });
      });
    };

    $scope.gridOptions_conceptos.onRegisterApi = function(gridApi){
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.concepto = row.entity
        console.log($scope.concepto.TipoConcepto.Nombre)
        });
    };

    $scope.gridOptions_personas.multiSelect = false;
    $scope.gridOptions_novedades.multiSelect = false;
    $scope.gridOptions_conceptos.multiSelect = false;

    titanRequest.post('funcionario_proveedor',nomina).then(function(response) {
     $scope.gridOptions_personas.data = response.data;
   });




    self.listar_conceptos = function() {
       titanRequest.get('concepto_nomina','limit=0&sortby=Id&order=desc').then(function(response) {
       $scope.gridOptions_conceptos.data = response.data;
      });
     }

    self.Registrar = function(){
      var valor = parseFloat(self.ValorNovedad)
      var cuotas = parseInt(self.NumCuotas)

      if($scope.concepto.TipoConcepto.Nombre  === "porcentaje"){
        cuotas = 999;
      }

      if($scope.concepto.TipoConcepto.Nombre === "seguridad_social"){
        valor = 0;
        cuotas = 0;
      }



      var concepto = {Id : parseInt($scope.concepto.Id) };
      var persona = parseInt($scope.persona.Id);
      var nomina = {Id : parseInt(self.Nomina.Id) };
      var novedad_por_persona = {
        Concepto: concepto,
        Activo: Boolean("true"),
        FechaDesde: self.FechaInicio,
        FechaHasta: self.FechaFin,
        FechaRegistro: self.CurrentDate,
        NumCuotas: cuotas,
        Persona: persona,
        Nomina: nomina ,
        ValorNovedad: valor
      };


      console.log(novedad_por_persona);

      titanRequest.post('concepto_por_persona',novedad_por_persona).then(function(response) {
        console.log("post concepto")
        if(typeof(response.data)=="object"){
          swal({
             html: $translate.instant('NOVEDAD_REG_CORRECTO'),
             type: "success",
             showCancelButton: false,
             confirmButtonColor: "#449D44",
             confirmButtonText: $translate.instant('VOLVER'),
             }).then(function() {
            $window.location.href = '#/novedades/novedad_registro/'+self.tipo;
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
            $window.location.href = '#/novedades/novedad_registro/'+self.tipo;
           })
          console.log("error: "+response.data);
        }
      });


    };
  });
