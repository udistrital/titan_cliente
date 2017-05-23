"use strict";

/**
 * @ngdoc function
 * @name titanClienteV2App.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the titanClienteV2App
 */
var text_es = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Ahora puede comenzar con el desarrollo ...",
};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ..."
};

angular.module('titanClienteV2App')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
