'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
	.directive('preliquidacionAbierta', function (titanMidRequest, titanRequest, $window) {
		return {
			restrict: 'E',
			scope: {
				preliquidacion: '=?',
			},
			templateUrl: 'views/directives/preliquidacion/preliquidacion_abierta.html',

			controller: function ($scope, $translate, $location, $route) {
				var self = this;

				//* --- Definición de grid para HCH y HCS --- *//
				if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCS" || $scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCH") {

					$scope.botones = [
						{ clase_color: "ver", clase_css: "fa fa-eye fa-lg  faa-shake animated-hover", titulo: $translate.instant('DETALLE'), operacion: 'ver', estado: true }
					];

					self.gridOptions = {
						paginationPageSizes: [20, 40, 60],
						paginationPageSize: 40,
						enableFiltering: true,
						enableSorting: true,
						enableRowSelection: true,
						enableRowHeaderSelection: true,
						columnDefs: [
							{
								field: 'Documento',
								displayName: $translate.instant('DOCUMENTO'),
								width: '20%',
								headerCellClass: 'encabezado',
								cellClass: 'text-center',
								cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionAbierta.ver_detalle_personaDVE(row)" >{{row.entity.Documento}}</button>',
							},
							{
								field: 'NombreCompleto',
								displayName: $translate.instant('NOMBRE_PERSONA'),
								width: '50%',
								headerCellClass: 'encabezado',
								cellClass: 'text-center',
							},
							{
								field: 'Preliquidado',
								visible: true,
								displayName: "Preliquidado",
								cellFilter: 'filtro_preliquidado:row.entity',
								width: '15%',
								headerCellClass: 'encabezado',
								cellClass: "text-center",
								sort: {
									direction: 'desc',
									priority: 0
								},
							},
							{
								field: 'Cumplido',
								visible: true,
								displayName: "Cumplido",
								cellFilter: 'filtro_cumplido:row.entity',
								width: '15%',
								headerCellClass: 'encabezado',
								cellClass: "text-center",
								sort: {
									direction: 'desc',
									priority: 0
								},
							}
						],
						onRegisterApi: function (gridApi) {
							$scope.myGridApi = gridApi;

							$scope.myGridApi.selection.on.rowSelectionChanged($scope, function (row) {

								if (row.entity.Cumplido == false) {
									swal({
										html: 'La persona seleccionada no tiene cumplido aprobado para pago, ¿está seguro de incluirla en la nómina?',
										type: "warning",
										showCancelButton: true,
										confirmButtonText: 'No',
										cancelButtonText: 'Si',
										confirmButtonColor: "#FF0000",
									}).then(function (response) {
										row.setSelected(false);
									}, function (res) {
										if (res == 'cancel') {
											row.setSelected(false);
										}
									})
								}
							});
						}
					};


					self.informacion_contratos = {

						enableFiltering: true,
						enableSorting: true,
						enableRowSelection: false,
						enableSelectAll: false,
						columnDefs: [
							{ field: 'NumeroContrato', displayName: $translate.instant('NUM_CONTRATO'), width: '50%', headerCellClass: 'encabezado', cellClass: 'text-center' },
							{ field: 'VigenciaContrato', displayName: $translate.instant('VIGENCIA'), width: '25%', headerCellClass: 'encabezado', cellClass: 'text-center' },
							{ field: 'NivelAcademico', displayName: $translate.instant('NIVEL'), width: '28%', headerCellClass: 'encabezado', cellClass: 'text-center' },
						],
						onRegisterApi: function (gridApi) {
							self.gridApi = gridApi;
						}
					};
				}

				//* --- Definición de grid para CT --- *//
				if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "CT") {
					self.gridOptions = {
						paginationPageSizes: [20, 40, 60],
						paginationPageSize: 40,
						enableFiltering: true,
						enableSorting: true,
						enableRowSelection: true,
						enableSelectAll: true,
						columnDefs: [
							{
								field: 'ContratoId.NumeroContrato',
								cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionAbierta.ver_detalle_persona(row)" >{{row.entity.ContratoId.NumeroContrato}}</button>',
								displayName: $translate.instant('NUM_CONTRATO'),
								width: '10%',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.Vigencia',
								displayName: $translate.instant('VIGENCIA'),
								width: '10%',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.NombreCompleto',
								displayName: $translate.instant('NOMBRE_PERSONA'),
								width: '20%',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.Documento',
								displayName: $translate.instant('DOCUMENTO'),
								width: '15%',
								cellClass: 'text-center',
								headerCellClass: "encabezado",
							},
							{
								field: 'Cumplido',
								cellFilter: 'filtro_cumplido:row.entity',
								visible: true,
								width: '8%',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'Preliquidado',
								cellFilter: 'filtro_preliquidado:row.entity',
								visible: true,
								width: '8%',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'tipo_registro',
								visible: false,
							},
							{
								field: 'ContratoId.FechaInicio',
								displayName: $translate.instant('FECHA_INICIO'),
								visible: true,
								width: '12%',
								cellClass: 'text-center',
								cellTemplate: '<span>{{row.entity.ContratoId.FechaInicio | date:"yyyy-MM-dd"}}</span>',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.FechaFin',
								displayName: $translate.instant('FECHA_FIN'),
								visible: true,
								width: '12%',
								cellClass: 'text-center',
								cellTemplate: '<span>{{row.entity.ContratoId.FechaFin | date:"yyyy-MM-dd"}}</span>',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.ValorContrato',
								displayName: $translate.instant('VALOR_CONTRATO'),
								visible: true,
								width: '11%',
								cellFilter: 'currency',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.Cdp',
								displayName: "CDP",
								visible: true,
								width: '11%',
								cellFilter: 'currency',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							},
							{
								field: 'ContratoId.Rp',
								displayName: "RP",
								visible: true,
								width: '11%',
								cellFilter: 'currency',
								cellClass: 'text-center',
								headerCellClass: "encabezado"
							}
						],
						onRegisterApi: function (gridApi) {
							$scope.myGridApi = gridApi;
							$scope.myGridApi.selection.on.rowSelectionChanged($scope, function (row) {
								if (row.entity.Cumplido == false) {
									swal({
										html: 'La persona seleccionada no tiene cumplido aprobado para pago y no se puede preliquidar',
										type: "warning",
										confirmButtonText: 'Ok',
										confirmButtonColor: "#FF0000",
									}).then(function (response) {
										row.setSelected(false);
									})
								}
							});
						}
					};

				}

				//*--- Listar personas a preliquidar para esa nómina --* //
				if ($scope.preliquidacion.NominaId.Id == 414) {
					titanRequest.get('contrato_preliquidacion', 'query=PreliquidacionId.Ano:' + $scope.preliquidacion.Ano + ',PreliquidacionId.Mes:' + $scope.preliquidacion.Mes + ',PreliquidacionId.NominaId:' + $scope.preliquidacion.NominaId.Id + '&limit=-1').then(function (response) {
						self.gridOptions.data = response.data.Data;
						self.total_contratos_liquidados = response.data.length;
					});
				} else if ($scope.preliquidacion.NominaId.Id == 415 || $scope.preliquidacion.NominaId.Id == 416) {
					titanMidRequest.get('contratos', '/docentesDVE/' + $scope.preliquidacion.NominaId.Id + "/" + $scope.preliquidacion.Mes + "/" + $scope.preliquidacion.Ano).then(function (response) {
						self.gridOptions.data = response.data.Data;
						self.total_contratos_liquidados = response.data.length;
					});
				}

				//*--- Actualizar preliquidado --* //
				self.actualizar_preliquidado = function () {
					var i
					var personas = $scope.myGridApi.selection.getSelectedRows();
					for (i = 0; i < personas.length; i++) {
						titanMidRequest.get('contrato_preliquidacion', '/preliquidado/' + $scope.preliquidacion.Ano + '/' + $scope.preliquidacion.Mes + '/' + personas[i].ContratoId.NumeroContrato + '/' + personas[i].ContratoId.Vigencia).then(function (response) {
							if (response.data.Data === null) {
								swal({
									html: $translate.instant('PRELIQ_REG_INCORRECTA'),
									type: "error",
									showCancelButton: false,
									confirmButtonColor: "#449D44",
									confirmButtonText: $translate.instant('VOLVER'),
								})
							} else {
								swal({
									html: $translate.instant('PRELIQ_REG_CORRECTA'),
									type: "success",
									showCancelButton: false,
									confirmButtonColor: "#449D44",
									confirmButtonText: $translate.instant('VOLVER'),
								}).then(function () {
									$window.location.reload()
								})
							}
						})
					}
				}

				//*--- Funciones de botones de Acción --* //
				$scope.loadrow = function (row, operacion) {
					self.operacion = operacion;
					switch (operacion) {
						case "otro":
							break;
						case "ver":
							self.listar_contratos_por_persona(row);
							self.persona_seleccionada = row.entity.nom_proveedor;
							break;
						default:
					}
				};


				//*--- Previsualización de preliquidacion de persona --* //
				self.ver_detalle_persona = function (row) {
					$scope.contrato = row.entity.ContratoId;
					$('#modal_detalle').modal('show');
				};

				self.ver_detalle_personaDVE = function (row) {
					var auxContrato = {
						Documento: row.entity.Documento,
						NombreCompleto: row.entity.NombreCompleto
					};
					$scope.contrato = auxContrato
					$('#modal_detalle').modal('show');
				};

				$('#modal_detalle').on('hidden.bs.modal', function (e) {
					$scope.contrato = undefined
				})
			},
			controllerAs: 'd_preliquidacionAbierta'
		};
	}).filter('filtro_cumplido', function ($filter, $translate) {
		return function (input, entity) {
			var output;
			if (undefined === input || null === input) {
				return "";
			}

			if (entity.Cumplido === false) {
				output = "NO"
			}
			if (entity.Cumplido === true) {
				output = "SI"
			}
			return output;
		};
	}).filter('filtro_preliquidado', function ($filter, $translate) {
		return function (input, entity) {
			var output;
			if (undefined === input || null === input) {
				return "";
			}

			if (entity.Preliquidado === false) {
				output = "NO"
			}
			if (entity.Preliquidado === true) {
				output = "SI"
			}
			return output;
		};
	});
