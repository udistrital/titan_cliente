'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadConsultaCtrl
 * @description
 * # NovedadesNovedadConsultaCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadConsultaCtrl', function (titanRequest,$translate) {
    var self = this;
    self.gridOptions = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Concepto.AliasConcepto',  displayName:  $translate.instant('CONCEPTO')},
        {field: 'Concepto.Naturaleza' , displayName: $translate.instant('NATURALEZA')},
        {field: 'Tipo', displayName: $translate.instant('TIPO_CONCEPTO')  },
        {field: 'ValorNovedad' , displayName: $translate.instant('VALOR_CONCEPTO')  },
        {field: 'FechaDesde' , displayName: $translate.instant('FECHA_INICIO') , cellTemplate: '<span>{{row.entity.FechaDesde | date:"yyyy-MM-dd":"+0900"}}</span>' },
        {field: 'FechaHasta' , displayName: $translate.instant('FECHA_FIN') , cellTemplate: '<span>{{row.entity.FechaHasta | date:"yyyy-MM-dd":"+0900"}}</span>' },
        {field: 'Nomina.Nombre' , displayName: $translate.instant('NOMBRE_NOMINA')  },
        {field: 'Nomina.Periodo' , displayName: $translate.instant('PERIODO_NOMINA')  },
        {field: 'Persona.NomProveedor' , displayName: $translate.instant('NOMBRE_PERSONA') },
        {field: 'Persona.NumDocumento' , displayName: $translate.instant('DOCUMENTO')  },
        ]

    };
    titanRequest.get('concepto_por_persona','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions.data = response.data;
    });
  });
