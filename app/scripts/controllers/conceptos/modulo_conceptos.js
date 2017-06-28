'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ConceptoConceptosConsultaCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('ConceptoConceptosConsultaCtrl', function (titanRequest,$window,$scope,$translate) {
    var self = this;
    self.id_edicion;
    self.alias_concepto_edicion;
    self.nombre_concepto_edicion;
    self.naturaleza_edicion;
    self.tipo_edicion;

  //  self.tipo="porcentaje";
    self.gridOptions_conceptos = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'NombreConcepto',  visible : false},
        {field: 'AliasConcepto',  displayName: $translate.instant('CONCEPTO'), },
        {field: 'Naturaleza',  displayName: $translate.instant('NATURALEZA')},
        {field: 'TipoConcepto',  displayName: 'Tipo'},
        {field: 'Acciones',
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.borrar(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.llenar_modal(row)" data-toggle="modal" data-target="#modal_edicion"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp'},
        ]

    };

    self.gridOptions_conceptos.onRegisterApi = function(gridApi){
        self.gridApi = gridApi;

    };

    self.gridOptions_conceptos.multiSelect = false;

    titanRequest.get('concepto','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions_conceptos.data = response.data;
    });

    $scope.llenar_modal = function(row){
      self.id_edicion = row.entity.Id
      self.alias_concepto_edicion = row.entity.AliasConcepto
      self.nombre_concepto_edicion = row.entity.NombreConcepto
      self.naturaleza_edicion = row.entity.Naturaleza
      self.tipo_edicion = row.entity.TipoConcepto
    };

    self.actualizar = function() {

      swal({
             html:
             "¿Está seguro de querer actualizar el concepto:"+
             "<br><b>Nombre:</b> "+self.alias_concepto_edicion+
             "<br><b>Naturaleza:</b> "+self.naturaleza_edicion+
             "<br><b>Tipo:</b> "+self.tipo_edicion+"?",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#449D44",
             cancelButtonColor: "#C9302C",
             confirmButtonText: "Confirmar",
             cancelButtonText: "Cancelar",
           }).then(function() {

             var concepto_editado = {
                   Id : self.id_edicion,
                   NombreConcepto: self.nombre_concepto_edicion,
                   Naturaleza: self.naturaleza_edicion,
                   AliasConcepto: self.alias_concepto_edicion,
                   TipoConcepto: self.tipo_edicion
                  };
                  titanRequest.put('concepto', concepto_editado.Id,concepto_editado).then(function(response) {
                    console.log(response.data);
                    if(response.data=="OK"){
                      swal({
                         html: "Registrado correctamente",
                         type: "success",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                        $window.location.href = '#/conceptos/modulo_conceptos';
                       })
                    }
                    else{
                      swal({
                         html: "Error",
                         type: "error",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                        $window.location.href = '#/conceptos/modulo_conceptos';
                       })
                    }
                  });

           }, function(dismiss) {
             if (dismiss === 'cancel') {

               //NO HACER NADA
               $window.location.href = '#/conceptos/modulo_conceptos';
             }
           })
     };

     $scope.borrar = function(row) {
       swal({
              html: "¿Está seguro de querer eliminar el concepto <b>"+row.entity.AliasConcepto+"</b>?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#449D44",
              cancelButtonColor: "#C9302C",
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
            }).then(function() {

              titanRequest.delete('concepto', row.entity.Id).then(function(response) {
                console.log(response.data);
                if(response.data=="OK"){
                  swal({
                     html: "Eliminado correctamente",
                     type: "success",
                     showCancelButton: false,
                     confirmButtonColor: "#449D44",
                     confirmButtonText: $translate.instant('VOLVER'),
                     }).then(function() {
                    $window.location.href = '#/conceptos/modulo_conceptos';
                   })
                }
                else{
                  swal({
                     html: "Error",
                     type: "error",
                     showCancelButton: false,
                     confirmButtonColor: "#449D44",
                     confirmButtonText: $translate.instant('VOLVER'),
                     }).then(function() {
                    $window.location.href = '#/conceptos/modulo_conceptos';
                   })
                }
              });


            }, function(dismiss) {
              if (dismiss === 'cancel') {
                //NO HACER NADA
                $window.location.href = '#/conceptos/modulo_conceptos';
              }
            })
          };


          self.anadir = function() {

            swal({
                   html:
                   "¿Está seguro de querer añadir el concepto:"+
                   "<br><b>Nombre:</b> "+self.alias_concepto_adicion+
                   "<br><b>Naturaleza:</b> "+self.naturaleza_adicion+
                   "<br><b>Tipo:</b> "+self.tipo_adicion+"?",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#449D44",
                   cancelButtonColor: "#C9302C",
                   confirmButtonText: "Confirmar",
                   cancelButtonText: "Cancelar",
                 }).then(function() {

                   var concepto_nuevo_temp = {

                         NombreConcepto: "nombrereglaxxx",
                         Naturaleza: self.naturaleza_adicion,
                         AliasConcepto: self.alias_concepto_adicion,
                         TipoConcepto: self.tipo_adicion
                        };

                        console.log(concepto_nuevo_temp)
                        titanRequest.post('concepto', concepto_nuevo_temp).then(function(response) {
                          console.log(response.data);
                          if(typeof(response.data)=="object"){

                            var concepto_nuevo = {
                                  Id: response.data.Id,
                                  NombreConcepto: "nombreregla" + response.data.Id.toString(),
                                  Naturaleza: response.data.Naturaleza,
                                  AliasConcepto: response.data.AliasConcepto,
                                  TipoConcepto: response.data.TipoConcepto
                            };

                            titanRequest.put('concepto', concepto_nuevo.Id,concepto_nuevo).then(function(response) {
                              console.log(response.data);
                              if(response.data=="OK"){
                                swal({
                                   html: "Registrado correctamente",
                                   type: "success",
                                   showCancelButton: false,
                                   confirmButtonColor: "#449D44",
                                   confirmButtonText: $translate.instant('VOLVER'),
                                   }).then(function() {
                                  $window.location.href = '#/conceptos/modulo_conceptos';
                                 })
                              }
                              else{
                                swal({
                                   html: "Error",
                                   type: "error",
                                   showCancelButton: false,
                                   confirmButtonColor: "#449D44",
                                   confirmButtonText: $translate.instant('VOLVER'),
                                   }).then(function() {
                                  $window.location.href = '#/conceptos/modulo_conceptos';
                                 })
                              }
                            });
                          }
                        });

                 }, function(dismiss) {
                   if (dismiss === 'cancel') {

                     $window.location.href = '#/conceptos/modulo_conceptos';
                   }
                 })
           };
  });
