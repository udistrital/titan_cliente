'use strict';
/**
 * @ngdoc function
 * @name titanClienteV2App.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
.controller('menuCtrl', function($location, $http, $scope, token_service, notificacion, $translate,$route) {
    var paths = [];
    $scope.language = {
        es:"btn btn-primary btn-circle btn-outline active",
        en:"btn btn-primary btn-circle btn-outline"
    };
    $scope.notificacion = notificacion;
    $scope.actual = "";
    $scope.token_service = token_service;
    $scope.breadcrumb = [];
    $scope.menu_service = [
    { //Pensionados
      "Id": 1,
      "Nombre": "Pensionados",
      "Url": "",
      "Opciones": [
        { //Ingresar beneficiarios
          "Id": 1,
          "Nombre": "Ingresar beneficiario",
          "Url": "pensiones/beneficiarios",
          "Opciones": null
        },
        { //Ingresar sustitutos
          "Id": 1,
          "Nombre": "Ingresar sustituto",
          "Url": "pensiones/sustituto",
          "Opciones": null
        }
      ]
    },
    { //Nómina
      "Id": 2,
      "Nombre": "Nóminas",
      "Url": "nomina/nomina_consulta",
      "Opciones": null
    },
    { //Nómina
      "Id": 3,
      "Nombre": "Conceptos",
      "Url": "conceptos/modulo_conceptos",
      "Opciones": null
    },
    { //Nómina
      "Id": 4,
      "Nombre": "Novedades",
      "Url": "conceptos/modulo_conceptos",
      "Opciones": [
        { //Ingresar beneficiarios
          "Id": 1,
          "Nombre": "Registrar novedades",
          "Url": "novedades/novedad_registro",
          "Opciones": null
        },
        { //Ingresar sustitutos
          "Id": 1,
          "Nombre": "Consultar novedades",
          "Url": "novedades/novedad_consulta",
          "Opciones": null
        }
      ]
    },

  ];

    var recorrerArbol = function(item, padre) {
      var padres = "";
      for (var i = 0; i < item.length; i++) {
        if (item[i].Opciones === null) {
          padres = padre + " , " + item[i].Nombre;
          paths.push({
            'path': item[i].Url,
            'padre': padres.split(",")
          });
        } else {
          recorrerArbol(item[i].Opciones, padre + "," + item[i].Nombre);
        }
      }
      return padres;
    };



    var update_url = function() {
      $scope.breadcrumb = [''];
      for (var i = 0; i < paths.length; i++) {
        if ($scope.actual === "/" + paths[i].path) {
          $scope.breadcrumb = paths[i].padre;
        } else if ('/' === $scope.actual) {
          $scope.breadcrumb = [''];
        }
      }
    };
    recorrerArbol($scope.menu_service, "");
    paths.push({padre:["","Notificaciones","Ver Notificaciones"],path:"notificaciones"});

    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.actual = $location.path();
      update_url();
      console.log(next + current);
    });

    $scope.changeLanguage = function (key){
        $translate.use(key);
        switch (key) {
            case 'es':
                $scope.language.es = "btn btn-primary btn-circle btn-outline active";
                $scope.language.en = "btn btn-primary btn-circle btn-outline";
                break;
            case 'en':
                $scope.language.en = "btn btn-primary btn-circle btn-outline active";
                $scope.language.es = "btn btn-primary btn-circle btn-outline";
                break;
            default:
        }
        $route.reload();
    };
    //Pendiente por definir json del menu
    (function($) {
      $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      });
    })(jQuery);
  });
