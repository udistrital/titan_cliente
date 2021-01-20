'use strict';

/**
* @ngdoc directive
* @name titanClienteV2App.directive:reportesSpagobi
* @description
* # reportesSpagobi
*/
angular.module('titanClienteV2App')
  .directive('spagobi', function () {
    return {
      restrict: "E",
      scope:{ 
          reporte: "@",
          resolucion: "@",
          dependencia: "=",
          vigencia: "=",
          mes: "=",
          boton: "="
      },
      template: '<div id="frame" ></div>',
      controller:function($scope){
        var sbi = Sbi.sdk;

        sbi.services.setBaseUrl({
          protocol: 'https', 
          host: 'intelligentia.udistrital.edu.co', 
          port: '8443', 
          contextPath: 'SpagoBI', 
          controllerPath: 'servlet/AdapterHTTP'
        });

        $scope.$watch('reporte', function (newValue, oldValue) {
            
          if ($scope.reporte && $scope.reporte.length !== 0) {
            var parametros = '';
                                
            function execTest() {
              var url = sbi.api.getDocumentHtml({
                documentLabel: $scope.reporte, 
                executionRole: '/spagobi/admin', 
               
                displayToolbar: true, 
                displaySliders: true, 
                iframe: {
                    style: 'border: 0px;',
                    height: '500px;',
                    width: '100%.'
                }
              });
              $('#frame').html('');
              $('#frame').append(url);
            };

            sbi.api.authenticate({
              params: {
                user: 'sergio_orjuela',
                password: 'sergio_orjuela'
              },
              callback: {
                fn: execTest,
                scope: this
              }
            });
          }
        });
      },
      controllerAs:'d_reportesSpagobi'
    };
  });