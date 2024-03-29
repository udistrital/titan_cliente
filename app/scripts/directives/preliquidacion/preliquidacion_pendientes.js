'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
	.directive('preliquidacionPendientes', function (titanMidRequest, titanRequest) {
		return {
			restrict: 'E',
			scope: {
				preliquidacion: '=?',
			},
			templateUrl: 'views/directives/preliquidacion/preliquidacion_pendientes.html',

			controller: function ($scope, $translate, $location, $route) {
				var self = this;
				//* --- Definición de grid para HCH y HCS --- *//
				if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCH" || $scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCS") {

					$scope.gridOptions = {
						paginationPageSizes: [20, 40, 60],
						paginationPageSize: 40,
						enableFiltering: true,
						enableSorting: true,
						enableRowSelection: false,
						enableRowHeaderSelection: true,
						columnDefs: [
							{
								field: 'id_proveedor',
								visible: false
							},
							{
								field: 'num_documento',
								displayName: $translate.instant('DOCUMENTO'),
								width: '25%',
								headerCellClass: 'encabezado',
								cellClass: 'text-center',
								cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionPendientes.preliquidar_persona(row)" >{{row.entity.num_documento}}</button>',
							},
							{
								field: 'nom_proveedor',
								displayName: $translate.instant('NOMBRE_PERSONA'),
								width: '52%',
								headerCellClass: 'encabezado',
								cellClass: 'text-center',
							},
							{
								field: 'Preliquidado',
								visible: true,
								displayName: "Preliquidado",
								width: '10%',
								headerCellClass: 'encabezado',
								cellClass: "text-center",
								sort: {
									direction: 'desc',
									priority: 0
								},
							},
							{
								field: 'IdEPS',
								visible: false
							},
							{
								field: 'IdARL',
								visible: false
							},
							{
								field: 'IdFondoPension',
								visible: false
							},
							{
								field: 'IdCajaCompensacion',
								visible: false
							},
							{
								field: 'Acciones',
								displayName: $translate.instant('ACCIONES'),
								width: '10%',
								headerCellClass: 'encabezado',
								cellClass: 'text-center',
								cellTemplate: '<btn-registro funcion="grid.appScope.loadrow(fila,operacion)" grupobotones="grid.appScope.botones" fila="row"></btn-registro>'
							}
						],
						onRegisterApi: function (gridApi) {
							$scope.myGridApi = gridApi;
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
								cellTemplate: '<button class="btn btn-link btn-block" ng-click="grid.appScope.d_preliquidacionPendientes.ver_detalle_persona(row)" >{{row.entity.ContratoId.NumeroContrato}}</button>',
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

				//*--- Listar personas a preliquidar pendientes --* //
				titanRequest.get('contrato_preliquidacion', 'limit=-1&query=PreliquidacionId.Ano:' + $scope.preliquidacion.Ano + ',PreliquidacionId.Mes:' + $scope.preliquidacion.Mes + ',PreliquidacionId.NominaId:' + $scope.preliquidacion.NominaId.Id + ',Cumplido:false').then(function (response) {
					self.gridOptions.data = response.data.Data;
				});

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

				self.listar_contratos_por_persona = function (row) {

					var personas_a_listar = [];
					var persona = {
						NumDocumento: parseInt(row.entity.num_documento),
					};

					personas_a_listar.push(persona)

					var datos_preliquidacion = {
						Preliquidacion: $scope.preliquidacion,
						PersonasPreLiquidacion: personas_a_listar
					}

					titanMidRequest.post('gestion_contratos/listar_contratos_agrupados_por_persona', datos_preliquidacion).then(function (response) {

						self.informacion_contratos.data = [];

						angular.forEach(response.data.Contratos, function (value, key) {
							self.informacion_contratos.data.push(value)
						});

					});

				};

				self.ver_detalle_persona = function (row) {
					$scope.contrato = row.entity.ContratoId;
					$('#modal_detalle').modal('show');
				};
				// self.preliquidar_persona = function (row) {
				//   $scope.persona = row.entity;
				//   //$('#modal_detalle').modal('show');
				// };
				/*
				$('#modal_detalle').on('hidden.bs.modal', function (e) {
				  $scope.persona = undefined
				})*/

				//*--- Generación de preliquidacion  --* //
				self.generar_preliquidacion = function () {
					var i;
					var personas = $scope.myGridApi.selection.getSelectedRows();
					$scope.preliquidacion.Definitiva = true;



					if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCH" || $scope.preliquidacion.Nomina.TipoNomina.Nombre === "HCS") {


						for (i = 0; i < personas.length; i++) {
							var personas_a_liquidar = [];
							var persona = {
								IdPersona: parseInt(personas[i].id_proveedor),
								NumDocumento: parseInt(personas[i].num_documento),
								NumeroContrato: personas[i].numero_contrato,
								VigenciaContrato: parseInt(personas[i].vigencia),
								FechaInicio: personas[i].fecha_inicio,
								FechaFin: personas[i].fecha_fin,
								ValorContrato: personas[i].valor_contrato,
								Pendiente: "false",
							};

							personas_a_liquidar.push(persona);
							personas_a_liquidar.push({});

							var datos_preliquidacion = {
								Preliquidacion: $scope.preliquidacion,
								PersonasPreliquidacion: personas_a_liquidar

							};


							titanMidRequest.post_cola('preliquidar', datos_preliquidacion).then(function (response) {
							})
								.catch(function (error) {

								});
						}

					}

					if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "CT") {



						for (i = 0; i < personas.length; i++) {

							var personas_a_liquidar = [];

							if (personas[i].Cumplido != "NO") {

								var persona = {
									IdPersona: parseInt(personas[i].id_proveedor),
									NumDocumento: parseInt(personas[i].num_documento),
									NumeroContrato: "c" + personas[i].numero_contrato,
									VigenciaContrato: parseInt(personas[i].vigencia),
									FechaInicio: personas[i].fecha_inicio,
									FechaFin: personas[i].fecha_fin,
									ValorContrato: "v" + personas[i].valor_contrato,
									Pendiente: "false",
								};

								personas_a_liquidar.push(persona);
								personas_a_liquidar.push({});

								var datos_preliquidacion = {
									Preliquidacion: $scope.preliquidacion,
									PersonasPreliquidacion: personas_a_liquidar

								};


								titanMidRequest.post_cola('preliquidar', datos_preliquidacion).then(function (response) {
								})
									.catch(function (error) {

									});

							}
						}
					}

					if ($scope.preliquidacion.Nomina.TipoNomina.Nombre === "FP") {
						for (i = 0; i < personas.length; i++) {
							var persona = {
								IdPersona: parseInt(personas[i].Id),
								NumDocumento: String(personas[i].NumDocumento),
								NumeroContrato: personas[i].NumeroContrato,
								VigenciaContrato: parseInt(personas[i].VigenciaContrato),
								Pendiente: "false",
							};
						}

					}
				};


			},
			controllerAs: 'd_preliquidacionPendientes'
		};
	}).filter('filtro_estado_disp', function ($filter) {
		return function (input, entity) {
			var output;
			if (undefined === input || null === input) {
				return "";
			}

			if (entity.EstadoDisponibilidad === 1) {
				output = "Pendiente de pago";
			}

			if (entity.EstadoDisponibilidad === 2) {
				output = "Listo para pago";
			}

			if (entity.EstadoDisponibilidad === 3) {
				output = "Pagado";
			}
			return output;
		};
	});
