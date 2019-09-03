'use strict';

/**
 * @ngdoc function
 * @name titanClienteV2App.controller:PreliquidacionPreliquidacionRegistroCtrl
 * @description
 * # PreliquidacionPreliquidacionRegistroCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .factory("preliquidacion", function() {
        return {};
    })
    .controller('PreliquidacionPreliquidacionRegistroCtrl', function(titanRequest,titanMidRequest, preliquidacion, $window, $translate, $localStorage, $routeParams, $scope, $route, $location) {
        var self = this;
        self.formVisibility = false;
        self.loading = false;
        self.tipo = $routeParams.tipo;


        self.CurrentDate = new Date();
        self.ShowForm = function() {
            self.formVisibility = true;
        };

        $scope.botones_cerrada = [
            { clase_color: "ver", clase_css: "fa fa-eye fa-lg  faa-shake animated-hover", titulo: $translate.instant('DETALLE'), operacion: 'ver', estado: true }
        ];

        $scope.botones_op_pendientes = [
            { clase_color: "ver", clase_css: "fa fa-exclamation fa-lg  faa-shake animated-hover", titulo: $translate.instant('VER_PENDIENTES'), operacion: 'generar', estado: true },
            { clase_color: "ver", clase_css: "fa fa-eye fa-lg  faa-shake animated-hover", titulo: $translate.instant('DETALLE'), operacion: 'ver', estado: true },
            { clase_color: "ver", clase_css: "fa fa-file fa-lg  faa-shake animated-hover", titulo: $translate.instant('GENERAR_OP'), operacion: 'op', estado: true }
        ];

        $scope.botones_abierta = [
          { clase_color: "ver", clase_css: "fa fa-money fa-lg  faa-shake animated-hover", titulo: $translate.instant('PRELIQUIDAR'), operacion: 'generar', estado: true },
          { clase_color: "ver", clase_css: "fa fa-eye fa-lg  faa-shake animated-hover", titulo: $translate.instant('DETALLE'), operacion: 'ver', estado: true },
          { clase_color: "ver", clase_css: "fa fa-file fa-lg  faa-shake animated-hover", titulo: $translate.instant('GENERAR_OP'), operacion: 'op', estado: true }
        ];

        self.anioPeriodo = new Date().getFullYear();
        self.mesPeriodo = new Date().getMonth();
        self.anios = [];


        self.meses = {
            1: $translate.instant('ENERO'),
            2: $translate.instant('FEBRERO'),
            3: $translate.instant('MARZO'),
            4: $translate.instant('ABRIL'),
            5: $translate.instant('MAYO'),
            6: $translate.instant('JUNIO'),
            7: $translate.instant('JULIO'),
            8: $translate.instant('AGOSTO'),
            9: $translate.instant('SEPTIEMBRE'),
            10: $translate.instant('OCTUBRE'),
            11: $translate.instant('NOVIEMBRE'),
            12: $translate.instant('DICIEMBRE')
        };

        //Crea un arreglo de objetos para tener los años desde el 1900 hasta el año actual con el metodo getFullYear()
        function calcularAnios() {
            for (var i = new Date().getFullYear(); i >= 2015; i--) {
                self.anios.push({ anio: i });
            }
        }
        calcularAnios();

        self.gridOptions = {

            enableFiltering: false,
            enableSorting: true,
            treeRowHeaderAlwaysVisible: false,
            showTreeExpandNoChildren: false,
            paginationPageSizes: [40,50],
            paginationPageSize: 40,
            enableRowSelection: false,
            enableRowHeaderSelection: false,

            columnDefs: [
                { field: 'Id', visible: false },
                { field: 'Descripcion', displayName: $translate.instant('DESC_PRELIQ'), width: '30%',cellClass: 'text-center', headerCellClass: 'encabezado' },
                { field: 'Mes', displayName: $translate.instant('MES_PRELIQ'), cellFilter: 'filtro_nombres_meses:row.entity', width: '15%',cellClass: 'text-center',headerCellClass: 'encabezado' },
                { field: 'Ano', displayName: $translate.instant('ANO_PRELIQ'), width: '10%',cellClass: 'text-center',headerCellClass: 'encabezado' },
                { field: 'FechaRegistro', displayName: $translate.instant('FECHA_PRELIQ'), cellTemplate: '<span>{{row.entity.FechaRegistro | date:"yyyy-MM-dd" :"+0900"}}</span>', width: '15%',cellClass: 'text-center',headerCellClass: 'encabezado' },
                { field: 'EstadoPreliquidacion.Nombre', displayName: $translate.instant('ESTADO_PRELIQ'), cellFilter: 'filtro_estados_preliq:row.entity', width: '20%',cellClass: 'text-center',headerCellClass: 'encabezado' },
                {
                    field: 'Acciones',
                    displayName: $translate.instant('ACCIONES'),
                    width: '10%',
                    cellClass: 'text-center',
                    headerCellClass: 'encabezado',
                    cellTemplate: '<a ng-if="row.entity.EstadoPreliquidacion.Nombre==\'Abierta\'"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_abierta" fila="row"></btn-registro></a>'+
                    '<a ng-if="row.entity.EstadoPreliquidacion.Nombre==\'Cerrada\'"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_cerrada" fila="row"></btn-registro></a>'+
                    '<a ng-if="row.entity.EstadoPreliquidacion.Nombre==\'OrdenPagoPendientes\'"> <btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones_op_pendientes" fila="row"></btn-registro></a>'
                }

            ]
        };



        titanRequest.get('preliquidacion', 'limit=-1&query=Nomina.TipoNomina.Nombre:' + self.tipo + '&sortby=Id&order=desc').then(function(response) {
            self.gridOptions.data = response.data;


        });

        titanRequest.get('nomina', 'limit=-1&query=TipoNomina.Nombre:' + self.tipo).then(function(response) {
            self.nomina = response.data[0];

        });

        titanRequest.get('estado_preliquidacion', 'limit=0&query=Nombre:Abierta').then(function(response) {
            self.EstadoPreliquidacion = response.data;

        });



        self.limpiar = function() {
            self.formVisibility = false;
        };

        $scope.loadrow = function(row, operacion) {
            self.operacion = operacion;
            switch (operacion) {
                case "generar":
                    self.generar_preliquidacion(row);
                    break;
                case "ver":
                    self.detalle_preliquidacion(row);
                    break;
                case "op":
                    self.generar_op(row);
                    break;
                default:
            }
        };

        self.registrar_preliqu = function() {
            var nomina = {
                Id: parseInt(self.nomina.Id)
            };

            var estado_preliquidacion = {
                Id: parseInt(self.EstadoPreliquidacion[0].Id)
            };

            var pliquidacion = {

                Nomina: nomina,
                Descripcion: self.nomina.Descripcion + "-" + self.anioPeriodo + self.mesPeriodo,
                Mes: parseInt(self.mesPeriodo),
                Ano: parseInt(self.anioPeriodo),
                FechaRegistro: self.CurrentDate,
                EstadoPreliquidacion: estado_preliquidacion,

            };

            titanRequest.post('preliquidacion', pliquidacion).then(function(response) {

                swal({
                        html: $translate.instant('PRELIQ_REG_CORRECTA'),
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {
                        $('#myModal').modal('hide');
                    })
                    titanRequest.get('preliquidacion', 'limit=-1&query=Nomina.TipoNomina.Nombre:' + self.tipo + '&sortby=Id&order=desc').then(function(response) {
                        self.gridOptions.data = response.data;
                    });


            }).catch(function(response) {
              swal({
                  html: $translate.instant('PRELIQ_REG_INCORRECTA'),
                  type: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#449D44",
                  confirmButtonText: $translate.instant('VOLVER'),
              }).then(function() {
                  $('#myModal').modal('hide');
              })
          });

            self.formVisibility = false;
        };

        self.generar_preliquidacion = function(row) {

            if (row.entity.EstadoPreliquidacion.Nombre == 'Cerrada') {
                swal({
                    html: $translate.instant('ALERTA_PRELIQUIDACION_CERRADA'),
                    type: "error",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#C9302C",
                    cancelButtonText: $translate.instant('SALIR'),
                })
            } else {
                if (row.entity.EstadoPreliquidacion.Nombre == 'EnOrdenPago') {
                    swal({
                        html: $translate.instant('ALERTA_PRELIQUIDACION_OP'),
                        type: "error",
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonColor: "#C9302C",
                        cancelButtonText: $translate.instant('SALIR'),
                    })
                } else {
                    self.preliquidacion = preliquidacion;
                    self.preliquidacion.Id = row.entity.Id;
                    self.preliquidacion.Descripcion = row.entity.Descripcion;
                    self.preliquidacion.Mes = row.entity.Mes;
                    self.preliquidacion.Ano = row.entity.Ano;
                    self.preliquidacion.EstadoPreliquidacion = row.entity.EstadoPreliquidacion;
                    self.preliquidacion.FechaRegistro = row.entity.FechaRegistro;
                    self.preliquidacion.Nomina = self.nomina
                    $localStorage.preliquidacion = self.preliquidacion;
                    $location.path('/preliquidacion/preliquidacion_personas');
                    $route.reload()
                }
            }
        };

        self.detalle_preliquidacion = function(row) {

          self.preliquidacion = preliquidacion;
          self.preliquidacion.Id = row.entity.Id;
          self.preliquidacion.Descripcion = row.entity.Descripcion;
          self.preliquidacion.Mes = row.entity.Mes;
          self.preliquidacion.Ano = row.entity.Ano;
          self.preliquidacion.EstadoPreliquidacion = row.entity.EstadoPreliquidacion;
          self.preliquidacion.FechaRegistro = row.entity.FechaRegistro;
          self.preliquidacion.Nomina = self.nomina
          $localStorage.preliquidacion = self.preliquidacion;

          titanMidRequest.post('preliquidacion/personas_x_preliquidacion', self.preliquidacion).then(function(response) {
            console.log("response no data", response)
              if(response.data === null){
                swal({
                    html: $translate.instant('NO_PRELIQ'),
                    type: "error",
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: "#C9302C",
                    cancelButtonText: $translate.instant('SALIR'),
                })
              }else{
                $location.path('/preliquidacion/preliquidacion_detalle');
                $route.reload()
              }
          });



        };

        self.generar_op = function(row) {

          self.preliquidacion = preliquidacion;
          self.preliquidacion.Id = row.entity.Id;
          self.preliquidacion.Descripcion = row.entity.Descripcion;
          self.preliquidacion.Mes = row.entity.Mes;
          self.preliquidacion.Ano = row.entity.Ano;
          self.preliquidacion.EstadoPreliquidacion = row.entity.EstadoPreliquidacion;
          self.preliquidacion.FechaRegistro = row.entity.FechaRegistro;
          self.preliquidacion.Nomina = self.nomina


          var nueva_preliquidacion = {
            Nomina: {
              Id: self.nomina.Id
            },
            Id: parseInt(row.entity.Id),
            Descripcion : row.entity.Descripcion,
            Mes: row.entity.Mes,
            Ano :  row.entity.Ano,
            FechaRegistro: row.entity.FechaRegistro,
            EstadoPreliquidacion : {
              Id: 4
            }
        }

        titanMidRequest.post('preliquidacion/personas_x_preliquidacion', self.preliquidacion).then(function(response) {
          console.log("response no data", response)
            if(response.data === null){
              swal({
                  html: $translate.instant('NO_PRELIQ'),
                  type: "error",
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonColor: "#C9302C",
                  cancelButtonText: $translate.instant('SALIR'),
              })
            }else{
              titanMidRequest.post('gestion_ops/generar_op', self.preliquidacion).then(function(response) {
                console.log("console",response.data)
                  if (response.data.Type  == "error") {
                    swal({
                        html: $translate.instant('CAMBIOS_ESTADO_OP_INCORRECTO'),
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    })
                  } else {
                    swal({
                        html: $translate.instant('CAMBIO_ESTADO_OP_CORRECTO'),
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#449D44",
                        confirmButtonText: $translate.instant('VOLVER'),
                    }).then(function() {

                        $window.location.reload()
                    })
                  }
              });
            }
        });




          //Cambiar estado de preliquidacion a 4

        };

    }).filter('filtro_nombres_meses', function($filter, $translate) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.Mes === 1) {
                output = $translate.instant('ENERO');
            }
            if (entity.Mes === 2) {
                output = $translate.instant('FEBRERO');
            }
            if (entity.Mes === 3) {
                output = $translate.instant('MARZO');
            }
            if (entity.Mes === 4) {
                output = $translate.instant('ABRIL');
            }
            if (entity.Mes === 5) {
                output = $translate.instant('MAYO');
            }
            if (entity.Mes === 6) {
                output = $translate.instant('JUNIO');
            }
            if (entity.Mes === 7) {
                output = $translate.instant('JULIO');
            }
            if (entity.Mes === 8) {
                output = $translate.instant('AGOSTO');
            }
            if (entity.Mes === 9) {
                output = $translate.instant('SEPTIEMBRE');
            }
            if (entity.Mes === 10) {
                output = $translate.instant('OCTUBRE');
            }
            if (entity.Mes === 11) {
                output = $translate.instant('NOVIEMBRE');
            }
            if (entity.Mes === 12) {
                output = $translate.instant('DICIEMBRE');
            }
            return output;
        };
    }).filter('filtro_estados_preliq', function($filter, $translate) {
        return function(input, entity) {
            var output;
            if (undefined === input || null === input) {
                return "";
            }

            if (entity.EstadoPreliquidacion.Nombre === "Cerrada") {
                output = $translate.instant('CERRADA');
            }
            if (entity.EstadoPreliquidacion.Nombre === "Abierta") {
                output = $translate.instant('ABIERTA');
            }
            if (entity.EstadoPreliquidacion.Nombre === "SolicitudNecesidad") {
                output = $translate.instant('NEC_SOLICITADA');
            }
           if (entity.EstadoPreliquidacion.Nombre === "OrdenPagoPendientes") {
                output = $translate.instant('OP_PENDIENTES');
            }

            return output;
        };
    });
