'use strict';
/**
 * @ngdoc function
 * @name titanClienteV2App.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the titanClienteV2App
 */
angular.module('titanClienteV2App')
    .controller('menuCtrl', function($location, $rootScope, $mdSidenav, configuracionRequest, $http, $scope, token_service, notificacion, $translate, $route, $window) {
        var paths = [];
        $scope.language = {
            es: "btn btn-primary btn-circle btn-outline active",
            en: "btn btn-primary btn-circle btn-outline"
        };
        $scope.perfil = "Administrador";
        $scope.app = "Titan";
        $scope.notificacion = notificacion;
        $scope.actual = "";
        $scope.token_service = token_service;
        $scope.breadcrumb = [];

        configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + $scope.perfil + '/' + $scope.app).then(function(response) {
            $rootScope.my_menu = response.data;
            recorrerArbol($rootScope.my_menu, "");
        });

        $scope.menu_app = [{
                id: "kronos",
                title: "KRONOS",
                url: "http://10.20.0.254/kronos"
            },
            {
                id: "agora",
                title: "AGORA",
                url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/agora"
            }, {
                id: "argo",
                title: "ARGO",
                url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/argo"
            }, {
                id: "arka",
                title: "ARKA",
                url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/arka"
            }, {
                id: "temis",
                title: "TEMIS",
                url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
            }, {
                id: "polux",
                title: "POLUX",
                url: "http://10.20.0.254/polux"
            }, {
                id: "jano",
                title: "JANO",
                url: "http://10.20.0.254/kronos"
            }, {
                id: "kyron",
                title: "KYRON",
                url: "http://10.20.0.254/kronos"
            }, {
                id: "sga",
                title: "SGA",
                url: "http://10.20.0.254/kronos"
            }
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

        $scope.redirect_url = function(path) {
            var path_sub = path.substring(0, 4);
            switch (path_sub.toUpperCase()) {
                case "HTTP":
                    $window.open(path, "_blank");
                    break;
                default:
                    $location.path(path);
                    break;
            }
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

        paths.push({ padre: ["", "Notificaciones", "Ver Notificaciones"], path: "notificaciones" });

        $scope.$on('$routeChangeStart', function(next, current) {
            $scope.actual = $location.path();
            update_url();
            console.log(next + current);
        });

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        $scope.changeLanguage = function(key) {
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
