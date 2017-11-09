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
        {field: 'Descripcion',    displayName:$translate.instant('DESC_NOMINA')},
        {field: 'TipoNomina',     visible : false},
        {field: 'Activo',    displayName:$translate.instant('ESTADO_NOMINA'), cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.Activo ? 'Activa' : 'Inactiva'}}</div>"},
        {field: 'Opciones',displayName:$translate.instant('OPCIONES_NOMINA'),  cellTemplate: '<button class="btn" ng-click="grid.appScope.nominaConsulta.consulta_preliquidacion(row)">'+$translate.instant('PRELIQUIDACION')+'</button>'}
      ]

    };
     titanRequest.get('nomina','limit=0&query=TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc').then(function(response) {
       console.log(response)
      self.gridOptions.data = response.data;
     });


     titanRequest.get('tipo_nomina','limit=0&query=Nombre:'+self.tipo+'&sortby=Id&order=desc' ).then(function(response) {
        self.tipoNomina = response.data

     });


     self.limpiar = function() {
        self.formVisibility = false;
     };

     self.transformar_bool = function(row) {
      return row.entity.Activo ? 'active' : 'inactive';
   };

   /*

     self.registrar_nomina = function() {
        var objeto_tipo_nomina = JSON.parse(self.selectTipoNomina);

        var tipo_nomina = {
     		   Id : objeto_tipo_nomina.Id
     	   };

        var nomina = {
              Descripcion: objeto_tipo_nomina.Descripcion,
              TipoNomina: tipo_nomina,
              Activo: Boolean("true")

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

     */
      self.consulta_preliquidacion = function(row){
      	var tipo_nomina = {
        Id :  row.entity.TipoNomina.Id ,
     		Nombre :row.entity.TipoNomina.Nombre,
        Descripcion: row.entity.TipoNomina.Descripcion
     	};

        self.nomina = nomina;
        self.nomina.Id = row.entity.Id;
        self.nomina.Descripcion= row.entity.Descripcion;
        self.nomina.TipoNomina = tipo_nomina;
        self.nomina.Activo = row.entity.Activo;
        $window.location.href = '#/preliquidacion/preliquidacion_registro';

      };



  });
