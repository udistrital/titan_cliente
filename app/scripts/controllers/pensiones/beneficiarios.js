'use strict';

/**
* @ngdoc function
* @name titanClienteV2App.controller:BeneficiariosCtrl
* @description
* # BeneficiariosCtrl
* Controller of the titanClienteV2App
*/
angular.module('titanClienteV2App')
.factory("personaNatural",function(){
  return{};
})
.controller('BeneficiariosCtrl', function (titanRequest,$window) {
  var self = this;

  self.gridOptions = {
    enableFiltering : false,
    enableSorting : true,
    treeRowHeaderAlwaysVisible : false,
    showTreeExpandNoChildren : false,

    columnDefs : [
      {field: 'Id', visible : false},
      {field: 'Tipo_Documento'},
      {field:'num_Documento' },
      {field:'digito_verificacion' },
      {field:'primer_apellido' },
      {field:'segundo_apellido' },
      {field:'primer_nombre' },
      {field:'cargo' },
      {field:'pais_nacimiento' },
      {field:'perfil' },
      {field:'num_Documento' },
      {fielc: 'fechaNac' }
    ]
  };

  self.limpiar = function(){
    $window.location.reload();
  };

  titanRequest.get('banco','limit=0').then(function(response){
    self.banco = response.data;
  });

  titanRequest.get('categoria_beneficiario','limit=0').then(function(response){
    self.categoria = response.data;
  });

  self.registrar_perNatural = function() {
    var banco = {
      Id : parseInt(self.selectBanco)
    }

    var categoria = {
      Id : parseInt(self.selectCategoria)
    }

    var personaNatural = {
      TipoDocumento: parseInt(self.tipoDocumento),
      Id: parseInt(self.numDocumento),
      DigitoVerificacion: 0,
      PrimerApellido: self.primerApellido,
      SegundoApellido: self.segundoApellido,
      PrimerNombre: self.primerNombre,
      SegundoNombre: self.segundoNombre,
      cargo: 'BE',
      IdPaisNacimiento: 112,
      perfil: 20,
      genero: self.genero,
      Estado: self.estado
    }

    titanRequest.post('informacion_persona_natural',personaNatural).then(function(response){
      console.log(response.data);
      if(typeof(response.data)=="object"){
        alert("Dato registrado" + response.data.Id);
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
        console.log("Entro a proveedor");
        if(typeof(response.data)=="object"){
          var idbeneficiario = parseInt(response.data.Id);
          console.log("idbeneficiario"+idbeneficiario);
          alert("Dato registrado" + response.data.Id);
          titanRequest.get('informacion_proveedor','limit=5000').then(function(response){
            self.proveedor = response.data;
            var prov = self.proveedor;
            titanRequest.get('informacion_pensionado','limit=750').then(function(response){
              self.pension = response.data;
              var pn = self.pension;
              //console.log(pn);
              var encontrado ;
              titanRequest.get('beneficiarios','limit=1&sortby=Id&order=desc').then(function(response){
                self.idbe = response.data;
                var idbenef = self.idbe;
                console.log(idbenef.length + "longitud beneficiarios")
                var lastIdB;
                for (var c = idbenef.length-1; c < idbenef.length; c++) {
                  console.log(idbenef[c] + "id con .length");
                  lastIdB = idbenef[c].Id;
                  alert(lastIdB + "idbeneficiario" + idbenef[c].Id);
                }

              for (var i = 0; i < prov.length; i++) {
                if(self.pensionado == prov[i].NumDocumento){
                  alert("entro a for")
                  for (var j = 0; j < pn.length; j++) {
                    if(prov[i].Id == pn[j].InformacionProveedor){
                      encontrado = 'S';
                    }
                  }

                  if(encontrado == 'S'){
                    console.log("Encontrado");
                    var idproveedorpens = parseInt(prov[i].Id);
                    console.log("last"+lastIdB);
                    console.log("last"+ (lastIdB+1));
                    var beneficiario = {
                      Id : lastIdB + 1,
                      InformacionPensionado : idproveedorpens,
                      InformacionProveedor : idbeneficiario,
                      FechaNacBeneficiario : self.fechaNac,
                      SubFamiliar : self.subsidioF,
                      CategoriaBeneficiario : categoria.Id,
                      SubEstudios : self.subsidioE,
                      Estado : self.estado
                    }
                    console.log("beneficiario")
                    console.log(beneficiario)
                    titanRequest.post('beneficiarios', beneficiario).then(function(response){
                      if(typeof(response.data)=="object"){
                        alert("beniciario registrado correctamente");
                      }
                      if(typeof(response.data)=="string"){
                        alert("error: "+response.data);
                      }

                    });
                  }
                   break;
                }         //var prov = self.proveedor;
              }////
              });
            });
          });
        }
        if(typeof(response.data)=="string"){
          alert("error: "+response.data);
        }
      });
    });
  };
});
