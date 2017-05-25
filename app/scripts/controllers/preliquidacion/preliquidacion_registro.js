'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionRegistroCtrl
 * @description
 * # PreliquidacionPreliquidacionRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
.factory("preliquidacion",function(){
        return {};
  })
  .controller('PreliquidacionPreliquidacionRegistroCtrl', function (titanRequest,nomina,preliquidacion,$window,$translate) {
  	var self = this;
  	self.formVisibility = false;
    self.loading = false;
    self.nomina = nomina;
    self.CurrentDate = new Date();

    self.ShowForm = function(){
      self.formVisibility = true;

    };

    self.gridOptions = {

      enableFiltering : false,
      enableSorting : true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'Nombre',displayName: $translate.instant('NOMBRE_PRELIQ')},
        {field: 'Descripcion', displayName: $translate.instant('DESC_PRELIQ')},
        {field: 'Fecha', displayName: $translate.instant('FECHA_PRELIQ'), cellTemplate: '<span>{{row.entity.Fecha | date:"yyyy-MM-dd" :"+0900"}}</span>'},
        {field: 'Estado', displayName: $translate.instant('ESTADO_PRELIQ')},
        {field: 'Tipo', displayName: $translate.instant('TIPO_PRELIQ')},
        {field: 'Opciones',displayName: $translate.instant('OPCIONES_PRELIQ'),cellTemplate: '<button class="btn btn btn-sm btn-primary" ng-click="grid.appScope.preliquidacionRegistro.generar_preliquidacion(row)">'+$translate.instant('GENERAR')+'</button><button class="btn btn-sm btn-primary" ng-click="grid.appScope.preliquidacionRegistro.detalle_preliquidacion(row)">'+$translate.instant('DETALLE')+'</button>'},
                 /*{field: 'tipo',width: '10%', enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor', cellClass:'aligncenter', editDropdownValueLabel: 'tipo', resizable : false, displayName: 'TIPO' , editDropdownOptionsArray: [
                      { id: 'C', tipo: 'Cerrada' },
                      { id: 'A', tipo: 'Abierta' },
                      { id: 'N', tipo: 'Numerica' }
                    ]}*/
      ]
    };
     titanRequest.get('preliquidacion','limit=0&query=Nomina.Id:'+self.nomina.Id+'&sortby=Id&order=desc').then(function(response) {
      self.gridOptions.data = response.data;
     });

     self.limpiar = function() {
        self.formVisibility = false;
     };


     self.registrar_preliqu = function() {
      var nomina = {
        Id : parseInt(self.nomina.Id)
      };
        var pliquidacion = {
              Nombre: self.nombrePreliquidacion,
              Descripcion: self.descripcionPreliquidacion,
              Nomina: nomina,
              IdUsuario: 1,
              Estado: self.selectEstado,
              Tipo: self.selectTipo,
              Fecha: self.CurrentDate,
              FechaInicio:  self.FechaInicio,
              FechaFin: self.FechaFin,
              Liquidada: self.Liquidada
          };

            titanRequest.post('preliquidacion', pliquidacion).then(function(response) {
              console.log(response.data);
              if(typeof(response.data)=="object"){
                alert("Preliquidacion "+response.data.Nombre+" registrada correctamente");
                titanRequest.get('preliquidacion','limit=0&query=Nomina.Id:'+self.nomina.Id+'&sortby=Id&order=desc').then(function(response) {
                  self.gridOptions.data = response.data;
                 });
              }
              if(typeof(response.data)=="string"){
                alert("error: "+response.data);
              }});;

        self.formVisibility = false;
     };

     self.generar_preliquidacion = function(row){
        self.preliquidacion = preliquidacion;
        self.preliquidacion.Id = row.entity.Id;
        self.preliquidacion.Nombre = row.entity.Nombre;
        self.preliquidacion.Estado = row.entity.Estado;
        self.preliquidacion.Descripcion = row.entity.Descripcion;
        self.preliquidacion.Fecha = row.entity.Fecha;
        self.preliquidacion.FechaInicio = row.entity.FechaInicio;
        self.preliquidacion.FechaFin = row.entity.FechaFin;
        self.preliquidacion.Nomina = self.nomina
        self.preliquidacion.Liquidada = row.entity.Liquidada;
        self.preliquidacion.Tipo = row.entity.Tipo;
        $window.location.href = '#/preliquidacion/preliquidacion_personas';
     };

     self.detalle_preliquidacion = function(row){
        self.preliquidacion = preliquidacion;
        self.preliquidacion.Id = row.entity.Id;
        self.preliquidacion.Fecha = row.entity.Fecha;
        self.preliquidacion.FechaInicio = row.entity.FechaInicio;
        self.preliquidacion.FechaFin = row.entity.FechaFin;
        self.preliquidacion.Nomina = self.nomina
        self.preliquidacion.Tipo = row.entity.Tipo;
        self.preliquidacion.Liquidada = row.entity.Liquidada;
        console.log(row.entity);
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
     };

  });
