'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ConceptoConceptosConsultaCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('ConceptoConceptosConsultaCtrl', function (titanRequest,$scope,$translate) {
    var self = this;
  //  self.tipo="porcentaje";
    self.gridOptions_conceptos = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'AliasConcepto',  displayName: $translate.instant('CONCEPTO')},
        {field: 'Naturaleza',  displayName: $translate.instant('NATURALEZA')},
        {field: 'TipoConcepto',  displayName: 'Tipo'},
        {field: 'Acciones',
cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.deleteRow(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.actualizar(row); change_state()" ng-show="on_off"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.actualizar(row);change_state()" ng-hide="on_off"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp;<button type="button" class="btn btn-primary btn-circle" ng-click="grid.appScope.visualizar(row);grid.appScope.showAdvanced($event, row)" data-toggle="modal" data-target="#exampleModalLong"><i class="glyphicon glyphicon-eye-open"></i></button>'},
        ]

    };

    self.gridOptions_conceptos.onRegisterApi = function(gridApi){
      //set gridApi on scope
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.concepto = row.entity

      });
    };

    self.gridOptions_conceptos.multiSelect = false;

    titanRequest.get('concepto','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions_conceptos.data = response.data;
    });

  });
