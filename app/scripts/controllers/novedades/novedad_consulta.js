'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NovedadesNovedadConsultaCtrl
 * @description
 * # NovedadesNovedadConsultaCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('NovedadesNovedadConsultaCtrl', function (titanRequest) {
    var self = this;
    self.gridOptions = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Concepto.AliasConcepto',  displayName: 'Concepto' },
        {field: 'Concepto.Naturaleza' , displayName: 'Naturaleza'  },
        {field: 'Tipo'  },
        {field: 'ValorNovedad' , displayName: 'Valor'  },
        {field: 'FechaDesde' , displayName: 'Fecha de Inicio' , cellTemplate: '<span>{{row.entity.FechaDesde | date:"yyyy-MM-dd":"+0900"}}</span>' },
        {field: 'FechaHasta' , displayName: 'Fecha Finalización' , cellTemplate: '<span>{{row.entity.FechaHasta | date:"yyyy-MM-dd":"+0900"}}</span>' },
        {field: 'Nomina.Nombre' , displayName: 'Nomina'  },
        {field: 'Nomina.Periodo' , displayName: 'Vigencia'  },
        {field: 'Persona.NomProveedor' , displayName: 'Vigencia'  },
        {field: 'Persona.NumDocumento' , displayName: 'Vigencia'  },
        ]

    };
    titanRequest.get('concepto_por_persona','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions.data = response.data;
    });
  });
