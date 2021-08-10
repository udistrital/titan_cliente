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
          host: 'inteligenciainstitucional.portaloas.udistrital.edu.co', 
          port: '443', 
          contextPath: 'knowage', 
          controllerPath: 'servlet/AdapterHTTP'
        });

        $scope.$watch('reporte', function (newValue, oldValue) {
            
          if ($scope.reporte && $scope.reporte.length !== 0) {
           
            url="https://inteligenciainstitucional.portaloas.udistrital.edu.co/knowage/servlet/AdapterHTTP?ACTION_NAME=EXECUTE_DOCUMENT_ACTION&TOOLBAR_VISIBLE=true&ORGANIZATION=DEFAULT_TENANT&NEW_SESSION=true&OBJECT_LABEL="+RteTitan
              $('#frame').html('');
              $('#frame').append(url);
            
          }
        });
      },
      controllerAs:'d_reportesSpagobi'
    };
  });