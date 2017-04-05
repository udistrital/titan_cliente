'use strict';

/**
* @ngdoc function
* @name titanClienteV2App.controller:NovedadesNovedadRegistroCtrl
* @description
* # NovedadesNovedadRegistroCtrl
* Controller of the titanClienteV2App
*/
angular.module('titanClienteV2App')
.controller('SustitutoCtrl', function (titanRequest,$window) {
  var self = this;

  self.gridOptions = {
    enableFiltering : false,
    enableSorting : true,
    treeRowHeaderAlwaysVisible : false,
    showTreeExpandNoChildren : false,

    columnDefs : [
      {field: 'Id', visible : false},
      {field: 'beneficiario'},
      {field: 'porcentaje' },
      {field: 'estado' }
    ]
  };

  titanRequest.get('banco','limit=0').then(function(response){
    self.banco = response.data;
  });

  self.limpiar = function(){
    $window.location.reload();
  };

  self.habilitar_sustituto = function() {
    var idtutor;
    if(self.numDocumento != null){
      var banco = {
        Id : parseInt(self.selectBanco)
      }
      var personaNatural = {
        TipoDocumento: parseInt(self.tipoDocumento),
        Id: parseInt(self.numDocumento),
        DigitoVerificacion: 0,
        PrimerApellido: self.primerApellidoTutor,
        SegundoApellido: self.segundoApellidoTutor,
        PrimerNombre: self.primerNombreTutor,
        SegundoNombre: self.segundoNombreTutor,
        cargo: 'TUTORBE',
        IdPaisNacimiento: 112,
        perfil: 20,
        genero: self.genero,

      }

      titanRequest.post('informacion_persona_natural',personaNatural).then(function(response){
        console.log(response.data);
        if(typeof(response.data)=="object"){
          alert("Dato registrado tutor" + response.data.Id);
        }
        if(typeof(response.data)=="string"){
          alert("error: "+response.data);
        }
      });

      titanRequest.get('informacion_proveedor','limit=1&sortby=Id&order=desc').then(function(response){
        self.idproveedor = response.data;
        var idprov = self.idproveedor;
        var lastId;
        for (var i = idprov.length-1; i <= idprov.length-1; i++) {
          lastId = idprov[i].Id;
          alert(lastId);
        }

        var info_proveedor = {
          Id : lastId +1,
          Tipopersona: 'NATURAL',
          NumDocumento :parseFloat(self.numDocumento),
          IdCiudadContacto: 96,
          Direccion: 'SIN INFORMACION',
          Correo: self.correo,
          TelAsesor: self.telefono,
          Anexorut: 'PRUEBA',
          Estado: 1,
          TipoCuentaBancaria: self.tipoCuenta,
          NumCuentaBancaria: self.numeroCuenta,
          IdEntidadBancaria: banco.Id,
          FechaRegistro: '0/0/0',
          FechaUltimaModificacion:'0/0/0',
          NomProveedor: self.primerNombre + ' ' + self.segundoNombre + ' ' + self.primerApellido + ' ' + self.segundoApellido
        }
        console.log(info_proveedor);
        titanRequest.post('informacion_proveedor',info_proveedor).then(function(response){

          console.log("Entro a proveedor tutor");
          if(typeof(response.data)=="object"){
            console.log("Entro a proveedor tutor1");
            idtutor = parseInt(response.data.Id);
            alert(idtutor + "idtutor")
            console.log(idtutor + "idtutor")
          }
          if(typeof(response.data)=="string"){
            alert("error: "+response.data);
          }
        });
      });
    }else{
        alert("No hay datos para ingresar informacion de tutor");
    }

    if(self.selectPensionado != null && self.selectBeneficiario != null){
    var pensionado;
    titanRequest.get('informacion_proveedor','limit=5000').then(function(response){
      self.proveedor = response.data;
      var prov = self.proveedor;

      titanRequest.get('informacion_pensionado','limit=750').then(function(response){
        self.pension = response.data;
        var pn = self.pension;
        var encontradoPensionado;
        var encontradoBeneficiario;
        for (var i = 0; i < prov.length; i++) {
          if(self.selectPensionado == prov[i].NumDocumento){
            console.log("pensionado id " + prov[i].Id + prov[i].NumDocumento)
            for (var j = 0; j < pn.length; j++) {
              if(prov[i].Id == pn[j].InformacionProveedor){
                encontradoPensionado = 'S';
                pensionado = pn[j].InformacionProveedor
                alert("pensionados" +encontradoPensionado);
                break;
              }
            }
          }

          if (self.selectBeneficiario == prov[i].NumDocumento) {
            alert("Encuentra beneficiarios1")
            console.log("ben id " + prov[i].Id + prov[i].NumDocumento)
            var idbeneficiario = prov[i].Id;
            titanRequest.get('beneficiarios','limit=5000').then(function(response){
              self.beneficiario = response.data;
              var ben = self.beneficiario;
              var idsustituto;
              alert("Entra a benefifciarios")
              for (var k = 0; k < ben.length; k++) {
                console.log("idbeneficiario" + idbeneficiario + " " + ben[k].InformacionProveedor )
                if(idbeneficiario == ben[k].InformacionProveedor ){
                  alert("Encuentra beneficiarios2")
                  encontradoBeneficiario = 'S';
                  idsustituto = parseInt(ben[k].Id);
                  alert("encontrado Ben" + encontradoBeneficiario)
                  break;
                }
              }
              if(encontradoPensionado == 'S' && encontradoBeneficiario == 'S'){
                titanRequest.get('sustituto','limit=1&sortby=Id&order=desc').then(function(response){
                  self.idsust = response.data;
                  var idsus = self.idsust;
                  var lastIdS;
                  for (var d = idsus.length-1; d < idsus.length; d++) {
                    lastIdS = idsus[d].Id;
                    alert(lastIdS + "idsust" + idsus[d].Id);
                  }
                  alert("idsustituto" + idsustituto)
                  alert("idtutor" + idtutor)
                  console.log("idtutor" + idtutor + "es sustit")

                  var sustituto = {
                    Id : lastIdS + 1,
                    Beneficiario: idsustituto,
                    Porcentaje: parseFloat(self.selectPorcentaje),
                    Estado: self.estado,
                    Tutor : idtutor
                  }

                  titanRequest.post('sustituto', sustituto).then(function(response){
                    if(typeof(response.data)=="object"){
                      alert("sustituto registrado correctamente" + sustituto.Beneficiario);
                    }
                    if(typeof(response.data)=="string"){
                      alert("error: "+response.data);
                    }
                  });
                });
              }else{
                alert("Una de las personas no se encuentra en la Base de Datos");
              }
              console.log(encontradoPensionado +" "+ encontradoBeneficiario );
            });
          }
        }
      });
    });
  }else{
    alert("No hay suficientes datos de sustituto para validar");
    }
  }
});

/*
var pensionado;
titanRequest.get('informacion_proveedor','limit=5000').then(function(response){
self.proveedor = response.data;
var prov = self.proveedor;

titanRequest.get('informacion_pensionado','limit=750').then(function(response){
self.pension = response.data;
var pn = self.pension;
var encontradoPensionado;
var encontradoBeneficiario;
for (var i = 0; i < prov.length; i++) {
if(self.selectPensionado == prov[i].NumDocumento){
console.log("pensionado id " + prov[i].Id + prov[i].NumDocumento)
for (var j = 0; j < pn.length; j++) {
if(prov[i].Id == pn[j].InformacionProveedor){
encontradoPensionado = 'S';
pensionado = pn[j].InformacionProveedor
alert("pensionados" +encontradoPensionado);
break;
}
}
}

if (self.selectBeneficiario == prov[i].NumDocumento) {
alert("Encuentra beneficiarios1")
console.log("ben id " + prov[i].Id + prov[i].NumDocumento)
var idbeneficiario = prov[i].Id;
titanRequest.get('beneficiarios','limit=5000').then(function(response){
self.beneficiario = response.data;
var ben = self.beneficiario;
var idsustituto;
alert("Entra a benefifciarios")
for (var k = 0; k < ben.length; k++) {
console.log("idbeneficiario"+idbeneficiario+ " " + ben[k].InformacionProveedor )
if(idbeneficiario == ben[k].InformacionProveedor ){
alert("Encuentra beneficiarios2")
encontradoBeneficiario = 'S';
idsustituto = parseInt(ben[k].Id);
alert("encontrado Ben" + encontradoBeneficiario)
break;
}
}
if(encontradoPensionado == 'S' && encontradoBeneficiario == 'S'){




/*
titanRequest.get('sustituto','limit=1&sortby=Id&order=desc').then(function(response){
self.idsust = response.data;
var idsus = self.idsust;
var lastIdS;
for (var d = idsus.length-1; d < idsus.length; d++) {
lastIdS = idsus[d].Id;
alert(lastIdS + "idsust" + idsus[d].Id);
}
alert("idsustituto" + idsustituto)
alert("idtutor" + idtutor)
console.log("idtutor" + idtutor + "es sustit")

var sustituto = {
Id : lastIdS + 1,
Beneficiario: idsustituto,
Porcentaje: parseFloat(self.selectPorcentaje),
Estado: self.estado,
Tutor : idtutor
}

titanRequest.post('sustituto', sustituto).then(function(response){
if(typeof(response.data)=="object"){
alert("sustituto registrado correctamente" + sustituto.Beneficiario);
}
if(typeof(response.data)=="string"){
alert("error: "+response.data);
}
});
});
}
console.log(encontradoPensionado +" "+ encontradoBeneficiario );
});
}
}
});
});
}
});*/
