'use strict';
/**
 * @ngdoc function
 * @name titanClienteV2App.controller:menuCtrl
 * @description
 * # menuCtrl
 * Controller of the titanClienteV2App
 */
 angular.module('titanClienteV2App')
     .controller('menuCtrl', function ($location, $window, $q, requestRequest, $scope, token_service,  $translate, $route, $mdSidenav, configuracionRequest, $rootScope, $http) {
         var paths = [];
         $scope.token_service = token_service;
         $scope.$on('$routeChangeStart', function (scope, next, current) {

           /* Comentado porque no sirve para interfaces que pasan parámetroscon
             var waitForMenu = function () {
                 if ($rootScope.my_menu != undefined) {
                     if ($scope.token_service.live_token() && current != undefined ) {
                         if (!$scope.havePermission(next.originalPath, $rootScope.my_menu)) {
                             $location.path("/no_permission");
                         }
                     }  else if (current == undefined) {
                         if (!$scope.havePermission(next.originalPath, $rootScope.my_menu)) {
                             $location.path("/no_permission");
                         }
                     }
                 } else {
                     setTimeout(waitForMenu, 250);
                 }
             }
             waitForMenu();

             */

         });

         //$scope.menuserv=configuracionRequest;
         $scope.language = {
             es: "btn btn-primary btn-circle btn-outline active",
             en: "btn btn-primary btn-circle btn-outline"
         };
        // $scope.notificacion = notificacion;
         $scope.actual = "";

         $scope.breadcrumb = [];

        $scope.menu_app = [{
                id: "seguridadsocial",
                title: "SEGURIDAD SOCIAL",
                url: "https://seguridadsocial.portaloas.udistrital.edu.co"
            },
            {
                id: "titan",
                title: "TITAN",
                url: "https://titan.portaloas.udistrital.edu.co"
            },
            {
                id: "agora",
                title: "AGORA",
                url: "https://funcionarios.portaloas.udistrital.edu.co/agora"
            }, {
                id: "argo",
                title: "ARGO",
                url: "https://funcionarios.portaloas.udistrital.edu.co/argo"
            }, {
                id: "arka",
                title: "ARKA",
                url: "https://funcionarios.portaloas.udistrital.edu.co/arka"
            }, {
                id: "temis",
                title: "TEMIS",
                url: "https://pruebasfuncionarios.intranetoas.udistrital.edu.co/gefad"
            }, {
                id: "jano",
                title: "JANO",
                url: "https://funcionarios.portaloas.udistrital.edu.co/jano"
            }, {
                id: "kyron",
                title: "KYRON",
                url: "https://funcionarios.portaloas.udistrital.edu.co/kyron"
            }, {
                id: "sga",
                title: "SISTEMA DE GESTION ACADEMICA",
                url: "https://estudiantes.portaloas.udistrital.edu.co"
            }
        ];
         //$scope.menu_service = [];
         $scope.changeLanguage = function (key) {
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
         };

         $scope.redirect_url = function (path) {
             var path_sub = path.substring(0, 4);
             switch (path_sub.toUpperCase()) {
                 case "HTTP":
                     $window.open(path, "_blank");
                     break;
                 case "otro":
                     break;
                 default:
                     requestRequest.cancel_all();
                     $location.path(path);
                     break;
             }
         };

         $scope.havePermission = function (viewPath, menu) {

             if (viewPath !== undefined && viewPath !== null) {
                 var currentPath = viewPath.substr(1);
                 var head = menu;
                 var permission = 0;
                 if (currentPath !== "main") {

                     permission = $scope.menuWalkThrough(head, currentPath);

                 } else {
                     permission = 1;
                 }
                 return permission;
             }
             return 1;

         };

         $scope.menuWalkThrough = function (head, url) {
             var acum = 0;
             if (!angular.isUndefined(head)) {
                 angular.forEach(head, function (node) {
                     if (node.Opciones === null && node.Url === url) {
                         acum = acum + 1;
                     } else if (node.Opciones !== null) {
                         acum = acum + $scope.menuWalkThrough(node.Opciones, url);
                     } else {
                         acum = acum + 0;
                     }
                 });
                 return acum;
             } else {
                 return acum;
             }

         };
/*
         if (self.perfil !== undefined) {
             $scope.notificacion.get_crud('notify', $.param({
                 query: "NotificacionConfiguracion.NotificacionConfiguracionPerfil.Perfil.Nombre__in:" + self.perfil.join('|') + "&sortby=id&order=asc&limit=-1"
             }))
                 .then(function (response) {
                     if (response.data !== null) {
                         console.log("not ", response.data)

                     }
                 });
         }
*/
if (token_service.live_token()) {
    token_service.getLoginData()
        .then(function() {
            $scope.token = token_service.getAppPayload();
            if (!angular.isUndefined($scope.token.appUserRole)) {
                var roles = "";
                if (typeof $scope.token.appUserRole === "object") {
                    var rl = [];
                    
                    
                    for (var index = 0; index < $scope.token.appUserRole.length; index++) {
                        if ($scope.token.appUserRole[index].indexOf(",") < 0) {
                            rl.push($scope.token.appUserRole[index]);
                        }
                    }
                    roles = rl.toString();
                    console.log(roles);
                } else {
                    roles = $scope.token.appUserRole;
                }
                roles = roles.replace('Internal/everyone,', '','g');
                configuracionRequest.get('menu_opcion_padre/ArbolMenus/' + roles + '/Titan', '').then(function(response) {
                        $rootScope.my_menu = response.data;

                    })
                    .catch(
                        function(response) {
                            $rootScope.my_menu = response.data;

                        });
            }
        });
}

         //$scope.menuserv.actualizar_menu("Admin");
         //$scope.menu_service =$scope.menuserv.get_menu();

         function buildToggler(componentId) {
             return function () {
                 $mdSidenav(componentId).toggle();
             };
         }

         $scope.toggleLeft = buildToggler('left');
         $scope.toggleRight = buildToggler('right');

         //Pendiente por definir json del menu
         (function ($) {
             $(document).ready(function () {
                 $('[data-toggle="tooltip"]').tooltip();
                 $('ul.dropdown-menu [data-toggle=dropdown-submenu]').on('click', function (event) {
                     event.preventDefault();
                     event.stopPropagation();
                     $(this).parent().siblings().removeClass('open');
                     $(this).parent().toggleClass('open');
                 });
             });
         })(jQuery);
     });
