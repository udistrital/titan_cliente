'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:ConceptoConceptosConsultaCtrl
 * @description
 * # NovedadesNovedadRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('ConceptoConceptosConsultaCtrl', function(titanRequest, $scope, $translate, $route, $window) {
        var self = this;
        self.id_edicion;
        self.alias_concepto_edicion;
        self.nombre_concepto_edicion;
        $scope.botones_activo = [
          { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
          { clase_color: "borrar", clase_css: "fa fa-times-circle fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.INACTIVAR'), operacion: 'inactive', estado: true }
        ];

        $scope.botones_inactivo = [
          { clase_color: "editar", clase_css: "fa fa-pencil fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.EDITAR'), operacion: 'edit', estado: true },
          { clase_color: "add", clase_css: "fa fa-plus fa-lg  faa-shake animated-hover", titulo: $translate.instant('BTN.ACTIVAR'), operacion: 'active', estado: true }
        ];
        //  self.tipo="porcentaje";
        self.gridOptions_conceptos = {

            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: false,
            enableRowHeaderSelection: false,

            columnDefs: [
                { field: 'Id', visible: false },
                { field: 'NombreConcepto', visible: false },
                { field: 'NaturalezaConcepto.Id', visible: false },
                { field: 'TipoConcepto.Id', visible: false },
                { field: 'EstadoConceptoNomina.Id', visible: false },
                {
                    field: 'AliasConcepto',
                    displayName: $translate.instant('CONCEPTO_NOMBRE'),
                    width: '40%',
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
                    width: '15%',
                    cellFilter: "filtro_tipo_concepto:row.entity"
                },
                {
                    field: 'EstadoConceptoNomina.Nombre',
                    displayName: $translate.instant('ESTADO_CONCEPTO'),
                    width: '15%',
                    cellFilter: "filtro_estado_concepto:row.entity"
                },
                {
                    field: 'Acciones',
                    displayName: $translate.instant('ACCIONES'),
                    width: '10%',
                    cellTemplate: '<center><a ng-if="row.entity.EstadoConceptoNomina.Nombre==\'activo\'"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_activo" fila="row"></btn-registro><center></a>'+
                    '<center><a ng-if="row.entity.EstadoConceptoNomina.Nombre==\'inactivo\'"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_inactivo" fila="row"></btn-registro><center></a>'
                }
            ]
        };



        self.gridOptions_conceptos.onRegisterApi = function(gridApi) {
            self.gridApi = gridApi;

        };

        self.gridOptions_conceptos.multiSelect = false;

        titanRequest.get('concepto_nomina', 'limit=-1').then(function(response) {
            self.gridOptions_conceptos.data = response.data;
        });

        titanRequest.get('naturaleza_concepto_nomina', 'limit=0&sortby=Id&order=desc').then(function(response) {
            self.NaturalezaConcepto = response.data;
        });

        titanRequest.get('tipo_concepto_nomina', 'limit=0&sortby=Id&order=desc').then(function(response) {
            self.TipoConcepto = response.data;
        });

        $scope.loadrow = function(row, operacion) {
            self.operacion = operacion;

              switch (operacion) {
                  case "edit":
                      $scope.llenar_modal(row);
                      $('#modal_edicion').modal('show');
                      break;
                  case "inactive":
                      $scope.inactivar(row);
                      break;
                  case "active":
                      $scope.activar(row);
                      break;
                  default:
              }


        };

        $scope.cargar_botones = function(row){

          $scope.botones = [];

          if(row.entity.EstadoConceptoNomina === "activo"){
            console.log("activo")

          }

          if(row.entity.EstadoConceptoNomina === "inactivo"){
            console.log("inactivo")
          }

          return $scope.botones
        }

        $scope.llenar_modal = function(row) {

            self.id_edicion = row.entity.Id
            self.alias_concepto_edicion = row.entity.AliasConcepto
            self.nombre_concepto_edicion = row.entity.NombreConcepto

        };

        self.actualizar = function(row) {

            if (self.alias_concepto_edicion && self.selectNaturalezaConcepto && self.selectTipoConcepto) {
                var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);

                swal({
                    html: $translate.instant('CONFIRMACION_EDICION') +
                        "<br><b>" + $translate.instant('CONCEPTO_NOMBRE') + ":</b> " + self.alias_concepto_edicion +
                        "<br><b>" + $translate.instant('NATURALEZA_NOMBRE') + ":</b> " + objeto_naturaleza_concepto.Descripcion +
                        "<br><b>" + $translate.instant('TIPO') + ":</b> " + objeto_tipo_concepto.Descripcion + "?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#449D44",
                    cancelButtonColor: "#C9302C",
                    confirmButtonText: $translate.instant('CONFIRMAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                }).then(function() {


                    var naturaleza_concepto = {
                        Id: objeto_naturaleza_concepto.Id
                    };

                    var tipo_concepto = {
                        Id: objeto_tipo_concepto.Id
                    };

                    var estado_concepto = {
                        Id: row.entity.EstadoConceptoNomina.Id
                    };


                    var concepto_editado = {
                        Id: self.id_edicion,
                        NombreConcepto: self.nombre_concepto_edicion,
                        NaturalezaConcepto: naturaleza_concepto,
                        AliasConcepto: self.alias_concepto_edicion,
                        TipoConcepto: tipo_concepto,
                        EstadoConceptoNomina: estado_concepto
                    };

                    titanRequest.put('concepto_nomina', concepto_editado.Id, concepto_editado).then(function(response) {

                        if (response.data == "OK") {
                            swal({
                                html: $translate.instant('ACTUALIZACION_CORRECTA'),
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#449D44",
                                confirmButtonText: $translate.instant('VOLVER'),
                            }).then(function() {
                                $('#modal_edicion').modal('hide');
                                $window.location.reload()
                            })
                        } else {
                            swal({
                                html: $translate.instant('ACTUALIZACION_INCORRECTA'),
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#449D44",
                                confirmButtonText: $translate.instant('VOLVER'),
                            }).then(function() {
                                $('#modal_edicion').modal('hide');
                                $window.location.reload()
                            })
                        }
                    });

                }, function(dismiss) {
                    if (dismiss === 'cancel') {

                        $('#modal_edicion').modal('hide');
                        // $window.location.reload()
                    }
                })
            } else {
                swal({
                    html: $translate.instant('ALERTA_COMPLETAR_DATOS_EDICION'),
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#449D44",
                    confirmButtonText: $translate.instant('VOLVER'),
                })
            }
        };

        $scope.inactivar = function(row) {
            swal({
                html: $translate.instant('CONFIRMACION_DESACTIVAR') + "<b>" + row.entity.AliasConcepto + "</b>?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('CONFIRMAR'),
                cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function() {

              var naturaleza_concepto = {
                  Id: row.entity.NaturalezaConcepto.Id
              };

              var tipo_concepto = {
                    Id: row.entity.TipoConcepto.Id
              };

              var estado_concepto = {
                    Id: 2
              };


              var concepto_editado = {
                  Id: row.entity.Id,
                  NombreConcepto: row.entity.NombreConcepto,
                  NaturalezaConcepto: naturaleza_concepto,
                  AliasConcepto: row.entity.AliasConcepto,
                  TipoConcepto: tipo_concepto,
                  EstadoConceptoNomina: estado_concepto
              };

              titanRequest.put('concepto_nomina', concepto_editado.Id, concepto_editado).then(function(response) {

                    if (response.data == "OK") {
                        swal({
                            html: $translate.instant('INACTIVACION_CONCEPTO_CORRECTA'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    } else {
                        swal({
                            html: $translate.instant('INACTIVACION_CONCEPTO_INCORRECTA'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    }
                });


            })
        };

        $scope.activar = function(row) {
            swal({
                html: $translate.instant('CONFIRMACION_ACTIVAR') + "<b>" + row.entity.AliasConcepto + "</b>?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#449D44",
                cancelButtonColor: "#C9302C",
                confirmButtonText: $translate.instant('CONFIRMAR'),
                cancelButtonText: $translate.instant('CANCELAR'),
            }).then(function() {

              var naturaleza_concepto = {
                  Id: row.entity.NaturalezaConcepto.Id
              };

              var tipo_concepto = {
                    Id: row.entity.TipoConcepto.Id
              };

              var estado_concepto = {
                    Id: 1
              };


              var concepto_editado = {
                  Id: row.entity.Id,
                  NombreConcepto: row.entity.NombreConcepto,
                  NaturalezaConcepto: naturaleza_concepto,
                  AliasConcepto: row.entity.AliasConcepto,
                  TipoConcepto: tipo_concepto,
                  EstadoConceptoNomina: estado_concepto
              };

              titanRequest.put('concepto_nomina', concepto_editado.Id, concepto_editado).then(function(response) {

                    if (response.data == "OK") {
                        swal({
                            html: $translate.instant('ACTIVACION_CONCEPTO_CORRECTA'),
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    } else {
                        swal({
                            html: $translate.instant('ACTIVACION_CONCEPTO_INCORRECTA'),
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#449D44",
                            confirmButtonText: $translate.instant('VOLVER'),
                        }).then(function() {
                            $window.location.reload()
                        })
                    }
                });


            })
        };



        self.anadir = function() {

            if (self.alias_concepto_adicion && self.selectNaturalezaConcepto && self.selectTipoConcepto) {
                var objeto_naturaleza_concepto = JSON.parse(self.selectNaturalezaConcepto);
                var objeto_tipo_concepto = JSON.parse(self.selectTipoConcepto);
                swal({
                    html: $translate.instant('CONFIRMACION_ADICION') +
                        "<br><b>" + $translate.instant('CONCEPTO_NOMBRE') + ":</b> " + self.alias_concepto_adicion +
                        "<br><b>" + $translate.instant('NATURALEZA_NOMBRE') + ":</b> " + objeto_naturaleza_concepto.Descripcion +
                        "<br><b>" + $translate.instant('TIPO') + ":</b> " + objeto_tipo_concepto.Descripcion + "?",
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
                        Id: objeto_naturaleza_concepto.Id
                    };

                    var tipo_concepto = {
                        Id: objeto_tipo_concepto.Id
                    };

                    var estado_concepto = {
                        Id: 1
                    };

                    var concepto_nuevo_temp = {

                        NombreConcepto: "nombrereglaxxx",
                        NaturalezaConcepto: naturaleza_concepto,
                        AliasConcepto: self.alias_concepto_adicion,
                        TipoConcepto: tipo_concepto,
                        EstadoConceptoNomina: estado_concepto
                    };


                    titanRequest.post('concepto_nomina', concepto_nuevo_temp).then(function(response) {

                        if (typeof(response.data) == "object") {

                            var concepto_nuevo = {
                                Id: response.data.Id,
                                NombreConcepto: "nombreregla" + response.data.Id.toString(),
                                NaturalezaConcepto: response.data.NaturalezaConcepto,
                                AliasConcepto: response.data.AliasConcepto,
                                TipoConcepto: response.data.TipoConcepto,
                                EstadoConceptoNomina: response.data.EstadoConceptoNomina
                            };

                            titanRequest.put('concepto_nomina', concepto_nuevo.Id, concepto_nuevo).then(function(response) {

                                if (response.data == "OK") {

                                    swal({
                                        html: $translate.instant('ADICION_CORRECTA'),
                                        type: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#449D44",
                                        confirmButtonText: $translate.instant('VOLVER'),
                                    }).then(function() {
                                        $window.location.reload()
                                    })
                                } else {

                                    swal({
                                        html: $translate.instant('ADICION_INCORRECTA'),
                                        type: "error",
                                        showCancelButton: false,
                                        confirmButtonColor: "#449D44",
                                        confirmButtonText: $translate.instant('VOLVER'),
                                    }).then(function() {

                                        $window.location.reload()
                                    })
                                }
                            });
                        }
                        if (typeof(response.data) == "string") {

                            swal({
                                html: $translate.instant('ADICION_INCORRECTA'),
                                type: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#449D44",
                                confirmButtonText: $translate.instant('VOLVER'),
                            }).then(function() {

                                $window.location.reload()
                            })
                        }
                    });

                })
            } else {
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
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.TipoConcepto.Nombre === "porcentual") {
                output = "Porcentaje"
            }

            if (entity.TipoConcepto.Nombre === "fijo") {
                output = "Fijo";
            }

            if (entity.TipoConcepto.Nombre === "seguridad_social") {
                output = "Seguridad Social";
            }

            return output;
        };
    }).filter('filtro_naturaleza_concepto', function($filter) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.NaturalezaConcepto.Nombre === "devengo") {
                output = "Devengo";
            }

            if (entity.NaturalezaConcepto.Nombre === "descuento") {
                output = "Descuento";
            }

            if (entity.NaturalezaConcepto.Nombre === "seguridad_social") {
                output = "Seguridad Social";
            }

            return output;
        };
    }).filter('filtro_estado_concepto', function($filter) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.EstadoConceptoNomina.Nombre === "activo") {
                output = "Activo";
            }

            if (entity.EstadoConceptoNomina.Nombre === "inactivo") {
                output = "Inactivo";
            }


            return output;
        };
    });
