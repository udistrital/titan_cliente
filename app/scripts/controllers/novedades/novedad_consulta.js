'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadConsultaCtrl
 * @description
 * # NovedadesNovedadConsultaCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadConsultaCtrl', function (titanRequest,$translate,$routeParams) {
    var self = this;
    self.tipo = $routeParams.tipo;
  
    self.gridOptions = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Persona' , displayName: $translate.instant('NOMBRE_PERSONA') },
        {field: 'Concepto.AliasConcepto',  displayName:  $translate.instant('CONCEPTO')},
        {field: 'ValorNovedad' , displayName: $translate.instant('VALOR_CONCEPTO')  },
        {field: 'NumCuotas' , displayName: "Número de cuotas" },
        {field: 'FechaRegisto' , displayName: "Fecha de registro" , cellTemplate: '<span>{{row.entity.FechaHasta | date:"yyyy-MM-dd":"+0900"}}</span>' },
        {field: 'Nomina.Descripcion' , displayName: $translate.instant('NOMBRE_NOMINA')  },

      ]


    };
    titanRequest.get('concepto_por_persona','limit=0&query=Nomina.TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc').then(function(response) {
     self.gridOptions.data = response.data;

    });


  });
