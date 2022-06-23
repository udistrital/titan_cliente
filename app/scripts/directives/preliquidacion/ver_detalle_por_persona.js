'use strict';

/**
 * @ngdoc directive
 * @name TitanClienteApp.directive:verRp
 * @description
 * # verRp
 */
angular.module('titanClienteV2App')
	.directive('verDetallePorPersona', function (titanMidRequest, titanRequest) {
		return {
			restrict: 'E',
			scope: {
				contrato: '=?',
				preliquidacion: '=?',
				open: '=?',
				mostrarleyenda: '=?'
			},
			templateUrl: 'views/directives/preliquidacion/ver_detalle_por_persona.html',

			controller: function ($scope) {
				var self = this;
				$scope.inputpestanaContrato = $scope.open;
				$scope.inputpestanaResolucion = $scope.open;
				$scope.mostrarleyenda = "false"
				self.ver_detalle_persona = function () {
					if ($scope.contrato != undefined && $scope.preliquidacion != undefined) {

						self.nombre_seleccionado = $scope.contrato.NombreCompleto
						self.cedula_seleccionado = $scope.contrato.Documento

						if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "CT") {

							var contrato = {
								Ano: $scope.preliquidacion.Ano,
								Mes: $scope.preliquidacion.Mes,
								NumeroContrato: $scope.contrato.NumeroContrato,
								Vigencia: $scope.contrato.Vigencia,
								Documento: $scope.contrato.Documento,
								Rp: $scope.contrato.Rp,
								Cdp: $scope.contrato.Cdp
							};
							titanMidRequest.get('detalle_preliquidacion', '/obtener_detalle_CT/' + $scope.preliquidacion.Ano + '/' + $scope.preliquidacion.Mes + '/' + $scope.contrato.NumeroContrato + '/' + $scope.contrato.Vigencia + '/' + $scope.contrato.Documento + '?limit=-1').then(function (response) {
								console.log(response.data.Data)
								console.log(response.data.Data.length)
								for (var i = 0; i < response.data.Data.length; i++) {
									if (response.data.Data[i].Detalle[0].ContratoPreliquidacionId.ContratoId.Id == $scope.contrato.Id){
										self.detalle = [response.data.Data[i]];
										break;
									}
								}
								$scope.mostrarleyenda = "true";
								self.detalle_CT = true
								self.detalle_HCH = false
							});
						} else if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCH") {
							titanMidRequest.get('detalle_preliquidacion', '/obtener_detalle_DVE/' + $scope.preliquidacion.Ano + '/' + $scope.preliquidacion.Mes + '/' + $scope.contrato.Documento + '/415').then(function (response) {
								self.detalle = response.data.Data;
								console.log(self.detalle)
								$scope.mostrarleyenda = "true";
								self.detalle_CT = false
								self.detalle_HCH = true
							});
						} else if ($scope.preliquidacion.NominaId.ParametroPadreId.Nombre === "HCS") {
							titanMidRequest.get('detalle_preliquidacion', '/obtener_detalle_DVE/' + $scope.preliquidacion.Ano + '/' + $scope.preliquidacion.Mes + '/' + $scope.contrato.Documento + '/416').then(function (response) {
								self.detalle = response.data.Data;
								console.log(self.detalle)
								$scope.mostrarleyenda = "true";
								self.detalle_CT = false
								self.detalle_HCH = true
							});
						}
					}
				}
				$scope.$watch("contrato", function () {
					self.ver_detalle_persona();
					$scope.mostrarleyenda = "false";
				});
			},
			controllerAs: 'd_verDetallePorPersona'
		};
	});
