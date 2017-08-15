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
        {field: 'Descripcion', displayName: $translate.instant('DESC_PRELIQ')},
        {field: 'Mes', displayName: $translate.instant('MES_PRELIQ')},
        {field: 'Ano', displayName: $translate.instant('ANO_PRELIQ')},
        {field: 'FechaRegistro', displayName: $translate.instant('FECHA_PRELIQ'), cellTemplate: '<span>{{row.entity.FechaRegistro | date:"yyyy-MM-dd" :"+0900"}}</span>'},
        {field: 'EstadoPreliquidacion.Nombre', displayName: $translate.instant('ESTADO_PRELIQ')},
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

     titanRequest.get('estado_preliquidacion','limit=0&query=Nombre:Abierta').then(function(response) {
      self.EstadoPreliquidacion = response.data;
      console.log(self.EstadoPreliquidacion)
     });

     self.limpiar = function() {
        self.formVisibility = false;
     };


     self.registrar_preliqu = function() {
      var nomina = {
        Id : parseInt(self.nomina.Id)
      };

      var estado_preliquidacion = {
        Id : parseInt(self.EstadoPreliquidacion[0].Id)
      };

        var pliquidacion = {

              Nomina: nomina,
              Descripcion: self.nomina.Descripcion+"-"+self.AnoPreliq+self.MesPreliq ,
              Mes: parseInt(self.MesPreliq),
              Ano: parseInt(self.AnoPreliq),
              FechaRegistro: self.CurrentDate,
              EstadoPreliquidacion: estado_preliquidacion,

          };

            titanRequest.post('preliquidacion', pliquidacion).then(function(response) {
              console.log(response.data);
              if(typeof(response.data)=="object"){
                swal({
                   html: $translate.instant('PRELIQ_REG_CORRECTA'),
                   type: "success",
                   showCancelButton: false,
                   confirmButtonColor: "#449D44",
                   confirmButtonText: $translate.instant('VOLVER'),
                   }).then(function() {
                  $window.location.href = '#/nomina/nomina_consulta/'+self.nomina.TipoNomina.Nombre;
                 })

                titanRequest.get('preliquidacion','limit=0&query=Nomina.Id:'+self.nomina.Id+'&sortby=Id&order=desc').then(function(response) {
                  self.gridOptions.data = response.data;
                 });
              }
              if(typeof(response.data)=="string"){
                swal({
                   html: $translate.instant('PRELIQ_REG_INCORRECTA'),
                   type: "error",
                   showCancelButton: false,
                   confirmButtonColor: "#449D44",
                   confirmButtonText: $translate.instant('VOLVER'),
                   }).then(function() {
                  $window.location.href = '#/nomina/nomina_consulta/'+self.nomina.TipoNomina.Nombre;
                 })
                console.log("error: "+response.data);
              }});;

        self.formVisibility = false;
     };

     self.generar_preliquidacion = function(row){
       if(row.entity.EstadoPreliquidacion.Nombre == 'Cerrada'){
         swal({
            html: $translate.instant('ALERTA_PRELIQUIDACION_CERRADA'),
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
       }else{
        self.preliquidacion = preliquidacion;
        self.preliquidacion.Id = row.entity.Id;
        self.preliquidacion.Descripcion = row.entity.Descripcion;
        self.preliquidacion.Mes = row.entity.Mes;
        self.preliquidacion.Ano = row.entity.Ano;
        self.preliquidacion.EstadoPreliquidacion = row.entity.EstadoPreliquidacion;
        self.preliquidacion.FechaRegistro = row.entity.FechaRegistro;
        self.preliquidacion.Nomina = self.nomina
        $window.location.href = '#/preliquidacion/preliquidacion_personas';
      }
     };

     self.detalle_preliquidacion = function(row){
       self.preliquidacion = preliquidacion;
       self.preliquidacion.Id = row.entity.Id;
       self.preliquidacion.Descripcion = row.entity.Descripcion;
       self.preliquidacion.Mes = row.entity.Mes;
       self.preliquidacion.Ano = row.entity.Ano;
       self.preliquidacion.EstadoPreliquidacion = row.entity.EstadoPreliquidacion;
       self.preliquidacion.FechaRegistro = row.entity.FechaRegistro;
       self.preliquidacion.Nomina = self.nomina
        console.log(row.entity);
        $window.location.href = '#/preliquidacion/preliquidacion_detalle';
     };

  });
