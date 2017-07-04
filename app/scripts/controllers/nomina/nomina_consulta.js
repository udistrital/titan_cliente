'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:NominaNominaConsultaCtrl
 * @description
 * # NominaNominaConsultaCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
   .factory("nomina",function(){
	    return {};
   })
  .controller('NominaNominaConsultaCtrl', function (titanRequest, $window,nomina,$translate,$routeParams) {

  var self = this;
  self.tipo = $routeParams.tipo;


  self.formVisibility = false;

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
        {field: 'Nombre',  displayName: $translate.instant('NOMBRE_NOMINA')},
        {field: 'Descripcion',displayName: $translate.instant('DESC_NOMINA')},
        {field: 'Vinculacion.Nombre',    displayName: $translate.instant('VINC_NOMINA')},
        {field: 'Estado', displayName: $translate.instant('ESTADO_NOMINA')},
        {field: 'Periodo', displayName: $translate.instant('PERIODO_NOMINA')},
        {field: 'Opciones',displayName:$translate.instant('OPCIONES_NOMINA'),  cellTemplate: '<button class="btn" ng-click="grid.appScope.nominaConsulta.consulta_preliquidacion(row)">'+$translate.instant('PRELIQUIDACION')+'</button>'}
      ]

    };
     titanRequest.get('nomina','limit=0&query=TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc').then(function(response) {
      self.gridOptions.data = response.data;
     });


     titanRequest.get('tipo_nomina','limit=0&query=Nombre:'+self.tipo+'&sortby=Id&order=desc' ).then(function(response) {
      self.tipoNomina = response.data[0].Id

     });

     titanRequest.get('tipo_vinculacion','limit=0').then(function(response) {
      self.tipoVinculacion = response.data;
     });

     self.limpiar = function() {
        self.formVisibility = false;
     };


     self.registrar_nomina = function() {
     	var tipo_nomina = {
     		Id : self.tipoNomina
     	};


     	var tipo_vinculacion = {
     		Id :  parseInt(self.selectVinculacion)
     	};
        var nomina = {
              Nombre: self.nombreNomina,
              Descripcion: self.descripcionNomina,
              Vinculacion: tipo_vinculacion,
              TipoNomina: tipo_nomina,
              Estado: self.selectEstado,
              Periodo: self.periodoNomina
          };


            titanRequest.post('nomina', nomina).then(function(response) {
              console.log(response.data);
              if(typeof(response.data)=="object"){
                swal({
                   html: $translate.instant('NOMINA_REG_CORRECTA'),
                   type: "success",
                   showCancelButton: false,
                   confirmButtonColor: "#449D44",
                   confirmButtonText: $translate.instant('VOLVER'),
                   }).then(function() {
                  $window.location.href = '#/nomina/nomina_consulta/'+self.tipo;
                 })

                titanRequest.get('nomina','limit=0&sortby=Id&order=desc').then(function(response) {
                 self.gridOptions.data = response.data;
                });
              }
              if(typeof(response.data)=="string"){
                swal({
                   html: $translate.instant('NOMINA_REG_INCORRECTA'),
                   type: "error",
                   showCancelButton: false,
                   confirmButtonColor: "#449D44",
                   confirmButtonText: $translate.instant('VOLVER'),
                   }).then(function() {
                  $window.location.href = '#/nomina/nomina_consulta/'+self.tipo;
                 })
              }
            });;

        self.formVisibility = false;
     };


      self.consulta_preliquidacion = function(row){
      	var tipo_nomina = {
        Id :  row.entity.TipoNomina.Id ,
     		Nombre :row.entity.TipoNomina.Nombre
     	};
     	var tipo_vinculacion = {
        Id :  row.entity.Vinculacion.Id,
     		Nombre :  row.entity.Vinculacion.Nombre
     	};
        self.nomina = nomina;
        self.nomina.Id = row.entity.Id;
        self.nomina.Vinculacion = tipo_vinculacion;
        self.nomina.TipoNomina = tipo_nomina;
        self.nomina.Periodo = row.entity.Periodo;
        $window.location.href = '#/preliquidacion/preliquidacion_registro';

      };

//consulta_preliquidacion(row)

  });
