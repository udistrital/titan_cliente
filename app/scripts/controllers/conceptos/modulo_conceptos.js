'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ConceptoConceptosConsultaCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
  .controller('ConceptoConceptosConsultaCtrl', function (titanRequest,$scope,$translate,$route,$window) {
    var self = this;
    self.id_edicion;
    self.alias_concepto_edicion;
    self.nombre_concepto_edicion;
    $scope.botones = [
            { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
            { clase_color: "borrar", clase_css: "fa fa-trash fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.BORRAR'), operacion: 'delete', estado: true }
          ];
  //  self.tipo="porcentaje";
    self.gridOptions_conceptos = {

      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,

      columnDefs : [
        {field: 'Id',             visible : false},
        {field: 'NombreConcepto',  visible : false},
        {field: 'NaturalezaConcepto.Id',  visible : false},
        {field: 'TipoConcepto.Id',  visible : false},
        {
          field: 'AliasConcepto',
          displayName: $translate.instant('CONCEPTO_NOMBRE'),
          width: '50%',
        },
        {
          field: 'NaturalezaConcepto.Nombre',
          displayName: $translate.instant('NATURALEZA_NOMBRE'),
          width: '20%',
          cellFilter: "filtro_naturaleza_concepto:row.entity"
        },
        {
          field: 'TipoConcepto.Nombre',
          displayName: $translate.instant('TIPO_NOMBRE'),
          width: '20%',
          cellFilter: "filtro_tipo_concepto:row.entity"
        },
        {
          field: 'Acciones',
          displayName: $translate.instant('ACCIONES'),
          width: '10%',
         cellTemplate: '<center><btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones" fila="row"></btn-registro><center>'
        }
    ]
    };



    self.gridOptions_conceptos.onRegisterApi = function(gridApi){
        self.gridApi = gridApi;

    };

    self.gridOptions_conceptos.multiSelect = false;

    titanRequest.get('concepto_nomina','limit=0&sortby=Id&order=desc').then(function(response) {
     self.gridOptions_conceptos.data = response.data;
    });

    titanRequest.get('naturaleza_concepto_nomina','limit=0&sortby=Id&order=desc').then(function(response) {
     self.NaturalezaConcepto = response.data;
    });

    titanRequest.get('tipo_concepto_nomina','limit=0&sortby=Id&order=desc').then(function(response) {
     self.TipoConcepto = response.data;
    });

    $scope.loadrow = function(row, operacion) {
           self.operacion = operacion;
           switch (operacion) {
               case "edit":
               $scope.llenar_modal(row);
                $('#modal_edicion').modal('show');
                 break;
               case "delete":
                   $scope.borrar(row);
                   break;
               default:
           }
       };


    $scope.llenar_modal = function(row){

      self.id_edicion = row.entity.Id
      self.alias_concepto_edicion = row.entity.AliasConcepto
      self.nombre_concepto_edicion = row.entity.NombreConcepto

    };

    self.actualizar = function() {

      if(self.alias_concepto_edicion && self.selectNaturalezaConcepto && self.selectTipoConcepto){
      var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
      var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);

      swal({
             html:
             $translate.instant('CONFIRMACION_EDICION')+
             "<br><b>"+$translate.instant('CONCEPTO_NOMBRE')+":</b> "+self.alias_concepto_edicion+
             "<br><b>"+$translate.instant('NATURALEZA_NOMBRE')+":</b> "+objeto_naturaleza_concepto.Descripcion+
             "<br><b>"+$translate.instant('TIPO')+":</b> "+objeto_tipo_concepto.Descripcion+"?",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#449D44",
             cancelButtonColor: "#C9302C",
             confirmButtonText: $translate.instant('CONFIRMAR'),
             cancelButtonText: $translate.instant('CANCELAR'),
           }).then(function() {



             var naturaleza_concepto = {
          		   Id : objeto_naturaleza_concepto.Id
          	   };

               var tipo_concepto = {
                   Id : objeto_tipo_concepto.Id
                 };


             var concepto_editado = {
                   Id : self.id_edicion,
                   NombreConcepto: self.nombre_concepto_edicion,
                   NaturalezaConcepto: naturaleza_concepto,
                   AliasConcepto: self.alias_concepto_edicion,
                   TipoConcepto: tipo_concepto
                  };

                  titanRequest.put('concepto_nomina', concepto_editado.Id,concepto_editado).then(function(response) {

                    if(response.data=="OK"){
                      swal({
                         html: $translate.instant('ACTUALIZACION_CORRECTA'),
                         type: "success",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                        $('#modal_edicion').modal('hide');
                          $window.location.reload();
                       })
                    }
                    else{
                      swal({
                         html: $translate.instant('ACTUALIZACION_INCORRECTA'),
                         type: "error",
                         showCancelButton: false,
                         confirmButtonColor: "#449D44",
                         confirmButtonText: $translate.instant('VOLVER'),
                         }).then(function() {
                          $('#modal_edicion').modal('hide');
                          $window.location.reload();
                       })
                    }
                  });

           }, function(dismiss) {
             if (dismiss === 'cancel') {

                 $('#modal_edicion').modal('hide');
                // $window.location.reload();
             }
           })
         }else{
           swal({
              html: $translate.instant('ALERTA_COMPLETAR_DATOS_EDICION'),
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#449D44",
              confirmButtonText: $translate.instant('VOLVER'),
              })
         }
     };

     $scope.borrar = function(row) {
       swal({
              html: $translate.instant('CONFIRMACION_ELIMINACION')+"<b>"+row.entity.AliasConcepto+"</b>?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#449D44",
              cancelButtonColor: "#C9302C",
              confirmButtonText: $translate.instant('CONFIRMAR'),
              cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function() {

              titanRequest.delete('concepto_nomina', row.entity.Id).then(function(response) {
              
                if(response.data=="OK"){
                  swal({
                     html: $translate.instant('ELIMINACION_CORRECTA'),
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
                     html: $translate.instant('ELIMINACION_INCORRECTA'),
                     type: "error",
                     showCancelButton: false,
                     confirmButtonColor: "#449D44",
                     confirmButtonText: $translate.instant('VOLVER'),
                     }).then(function() {
                       $window.location.reload();
                   })
                }
              });


            })
          };


          self.anadir = function() {

            if(self.alias_concepto_adicion && self.selectNaturalezaConcepto && self.selectTipoConcepto){
            var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
            var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);
            swal({
                   html:
                   $translate.instant('CONFIRMACION_ADICION')+
                   "<br><b>"+$translate.instant('CONCEPTO_NOMBRE')+":</b> "+self.alias_concepto_adicion+
                   "<br><b>"+$translate.instant('NATURALEZA_NOMBRE')+":</b> "+objeto_naturaleza_concepto.Descripcion+
                   "<br><b>"+$translate.instant('TIPO')+":</b> "+objeto_tipo_concepto.Descripcion+"?",
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#449D44",
                   cancelButtonColor: "#C9302C",
                   confirmButtonText: $translate.instant('CONFIRMAR'),
                   cancelButtonText: $translate.instant('CANCELAR'),
                 }).then(function() {

                   var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                   var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);

                   var naturaleza_concepto = {
                      Id : objeto_naturaleza_concepto.Id
                    };

                     var tipo_concepto = {
                         Id : objeto_tipo_concepto.Id
                       };

                   var concepto_nuevo_temp = {

                         NombreConcepto: "nombrereglaxxx",
                         NaturalezaConcepto: naturaleza_concepto,
                         AliasConcepto: self.alias_concepto_adicion,
                         TipoConcepto: tipo_concepto
                        };


                        titanRequest.post('concepto_nomina', concepto_nuevo_temp).then(function(response) {

                          if(typeof(response.data)=="object"){

                            var concepto_nuevo = {
                                  Id: response.data.Id,
                                  NombreConcepto: "nombreregla" + response.data.Id.toString(),
                                  NaturalezaConcepto: response.data.NaturalezaConcepto,
                                  AliasConcepto: response.data.AliasConcepto,
                                  TipoConcepto: response.data.TipoConcepto
                            };

                            titanRequest.put('concepto_nomina', concepto_nuevo.Id,concepto_nuevo).then(function(response) {

                              if(response.data=="OK"){

                                swal({
                                   html:  $translate.instant('ADICION_CORRECTA'),
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
                                   html:  $translate.instant('ADICION_INCORRECTA'),
                                   type: "error",
                                   showCancelButton: false,
                                   confirmButtonColor: "#449D44",
                                   confirmButtonText: $translate.instant('VOLVER'),
                                   }).then(function() {

                                   $window.location.reload();
                                 })
                              }
                            });
                          }
                          if(typeof(response.data)=="string"){

                            swal({
                               html:  $translate.instant('ADICION_INCORRECTA'),
                               type: "error",
                               showCancelButton: false,
                               confirmButtonColor: "#449D44",
                               confirmButtonText: $translate.instant('VOLVER'),
                               }).then(function() {

                              $window.location.reload();
                             })
                          }
                        });

                 })
               }else{
                 swal({
                    html: $translate.instant('ALERTA_COMPLETAR_DATOS_EDICION'),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                    })
               }
           };
  }).filter('filtro_tipo_concepto', function($filter) {
return function(input,entity) {
  var output;
  if (undefined === input || null === input) {
    return "";
  }

  if(entity.TipoConcepto.Nombre === "porcentual" ){
      output = "Porcentaje"
  }

  if(entity.TipoConcepto.Nombre === "fijo" ){
      output = "Fijo";
  }

  if(entity.TipoConcepto.Nombre === "seguridad_social" ){
      output = "Seguridad Social";
  }

  return output;
};
}).filter('filtro_naturaleza_concepto', function($filter) {
return function(input,entity) {
  var output;
  if (undefined === input || null === input) {
    return "";
  }

  if(entity.NaturalezaConcepto.Nombre === "devengo" ){
    output = "Devengo";
  }

  if(entity.NaturalezaConcepto.Nombre === "descuento" ){
    output = "Descuento";
  }

  if(entity.NaturalezaConcepto.Nombre === "seguridad_social" ){
    output = "Seguridad Social";
  }

  return output;
};
});
