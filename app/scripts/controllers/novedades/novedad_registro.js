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
    self.id_edicion;
    self.id_concepto_edicion;
    self.tipo_concepto_edicion;
    self.activo_edicion;
    self.num_cuotas_edicion;
    self.id_nomina_edicion;
    self.valor_novedad_edicion;
    self.persona_edicion

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
        {field: 'Concepto.Id' ,  visible : false},
        {field: 'Concepto.AliasConcepto' ,  displayName: "Concepto"},
        {field: 'Concepto.TipoConcepto.Nombre' ,  visible:false},
        {field: 'ValorNovedad' ,  displayName: "Valor Novedad"},
        {field: 'NumCuotas' ,  displayName: "Número Cuotas"},
        {field: 'FechaDesde' ,  visible:false},
        {field: 'FechaHasta' ,  visible:false},
        {field: 'FechaRegistro' ,  displayName: "Fecha de registro", cellTemplate: '<span>{{row.entity.FechaRegistro| date:"yyyy-MM-dd":"+0900"}}</span>'},
        {field: 'Activo' ,  visible:false},
        {field: 'Nomina.Id' ,  visible:false},
        {field: 'Acciones', displayName: $translate.instant('ACCIONES'),
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.inactivar_novedad(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.llenar_modal(row)" data-toggle="modal" data-target="#modal_edicion_novedad"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp'},
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

        titanRequest.get('concepto_por_persona','limit=0&query=Activo:TRUE,Persona:'+$scope.persona.Id+',Nomina.TipoNomina.Nombre:'+self.tipo+'&sortby=Id&order=desc').then(function(response) {
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
               $('#modal_adicion_novedad').modal('hide');
                 $window.location.reload();
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
               $('#modal_adicion_novedad').modal('hide');
                 $window.location.reload();
           })
          console.log("error: "+response.data);
        }
      });
    };

    $scope.inactivar_novedad = function(row) {
      swal({
             html: "¿Está seguro que desea inactivar esta novedad?",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#449D44",
             cancelButtonColor: "#C9302C",
             confirmButtonText: $translate.instant('CONFIRMAR'),
             cancelButtonText: $translate.instant('CANCELAR'),
           }).then(function() {
             var nomina_novedad = {
               Id: parseInt(row.entity.Nomina.Id)
             }
             var concepto_novedad = {
               Id: parseInt(row.entity.Concepto.Id)
             }

             var novedad_por_persona_a_inactivar = {
               Id: row.entity.Id,
               Concepto: concepto_novedad,
               Activo: Boolean(false),
               FechaDesde: row.entity.FechaDesde,
               FechaHasta: row.entity.FechaHasta,
               FechaRegistro: row.entity.FechaRegistro,
               NumCuotas: row.entity.NumCuotas,
               Persona: row.entity.Persona,
               Nomina: nomina_novedad,
               ValorNovedad: row.entity.ValorNovedad
             };

             titanRequest.put('concepto_por_persona', novedad_por_persona_a_inactivar.Id, novedad_por_persona_a_inactivar).then(function(response) {
               if(response.data=="OK"){
                 swal({
                    html: "Novedad inactivada",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {
                      $window.location.reload();
                  })
               }
               else{
                 swal({
                    html: "Error al inactivar novedad",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {
                      $window.location.reload();
                  })
               }
             });


           }, function(dismiss) {
             if (dismiss === 'cancel') {
               //NO HACER NADA
               $window.location.reload();
             }
           })
         };

         $scope.llenar_modal = function(row){

           self.id_edicion =  row.entity.Id
           self.id_concepto_edicion = row.entity.Concepto.Id
           self.tipo_concepto_edicion = row.entity.Concepto.TipoConcepto.Nombre
           self.activo_edicion = row.entity.Activo
           self.num_cuotas_edicion = row.entity.NumCuotas
           self.id_nomina_edicion = row.entity.Nomina.Id
           self.valor_novedad_edicion = row.entity.ValorNovedad
           self.persona_edicion = row.entity.Persona
         };

         self.Editar = function(){

           swal({
                  html: "¿Está seguro que desea editar esta novedad?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#449D44",
                  cancelButtonColor: "#C9302C",
                  confirmButtonText: $translate.instant('CONFIRMAR'),
                  cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function() {
                  var nomina_novedad = {
                    Id: parseInt(self.id_nomina_edicion )
                  }
                  var concepto_novedad = {
                    Id: parseInt(self.id_concepto_edicion)
                  }

                  var novedad_por_persona_a_editar = {
                    Id: parseInt(self.id_edicion),
                    Concepto: concepto_novedad,
                    Activo: Boolean("true"),
                    FechaDesde:  self.FechaInicio,
                    FechaHasta: self.FechaFin,
                    FechaRegistro: self.CurrentDate,
                    NumCuotas: parseInt(self.num_cuotas_edicion),
                    Persona: parseInt(self.persona_edicion),
                    Nomina: nomina_novedad,
                    ValorNovedad: parseFloat(self.valor_novedad_edicion)
                  };

                  titanRequest.put('concepto_por_persona', novedad_por_persona_a_editar.Id, novedad_por_persona_a_editar).then(function(response) {
                    if(response.data=="OK"){
                      swal({
                         html: "Novedad modificada",
                         type: "success",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                           $window.location.reload();
                       })
                    }
                    else{
                      swal({
                         html: "Error al modificar novedad",
                         type: "error",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                           $window.location.reload();
                       })
                    }
                  });


                }, function(dismiss) {
                  if (dismiss === 'cancel') {
                    //NO HACER NADA
                    $window.location.reload();
                  }
                })
         };



  });
