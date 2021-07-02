$(document).ready(function () {
  $("#dialog1").dialog({
    autoOpen: false,
    show: "blind",
    hide: "explode",
    modal: true,
    resizable: false,
    position: { my: "center", at: "center", of: "#cuerpo" },
  });
  $("#dialog2").dialog({
    autoOpen: false,
    show: "blind",
    hide: "explode",
    modal: true,
    resizable: false,
    position: { my: "center", at: "center", of: "#cuerpo" },
  });
  $(".divform").addClass("ancho");
  $(".divform label").addClass("ancho1");
  $(".divres").addClass("anchores");
  $(".divres label").addClass("anchores1");
  $("#mandos").draggable({
    snap: ".pegar",
    cursor: "move",
    snapTolerance: 10,
    handle: "#egd",
    stack: ".pestana",
  });
  if ($("#contenedor1").length > 0) {
    $("#contenedor1").hide();
    $("#contenedor").addClass("bordebajo");
    $("#aviso").addClass("active");
    $("div.aviso").css("display", "block");
    $("div.formula").css("display", "none");
    $(".menu > li").click(function (e) {
      switch (e.target.id) {
        case "aviso":
          $("#aviso").addClass("active");
          $("#formula").removeClass("active");
          $("div.aviso").css("display", "block");
          $("div.formula").css("display", "none");
          break;
        case "formula":
          $("#formula").addClass("active");
          $("#aviso").removeClass("active");
          $("div.formula").css("display", "block");
          $("div.aviso").css("display", "none");
          break;
      }
      return false;
    });
  } else {
    $("#contenedor").addClass("bordebajo");
  }
});
function masInfo() {
  if ($("#contenedor1").length > 0) {
    $("#contenedor1").toggle(100, function () {
      if ($("#contenedor1").is(":hidden")) {
        $("#contenedor").addClass("bordebajo");
      } else {
        $("#contenedor").removeClass("bordebajo");
      }
    });
  }
}
function milog(num, base) {
  return Math.log(num) / Math.log(base);
}
function calcular() {
  varcms = CambioComa(document.forms[0].cms.value);
  varkilos = CambioComa(document.forms[0].kilos.value);
  varuni1 = document.forms[0].uni1.value;
  varuni2 = document.forms[0].uni2.value;
  varuni3 = document.forms[0].uni3.value;
  if (varcms == "" || varkilos == "") {
    $("#dialog1").dialog("open");
    document.forms[0].cms.focus();
  } else {
    if (
      comprobar(varcms) ||
      comprobar(varkilos) ||
      varcms == "." ||
      varkilos == "."
    ) {
      $("#dialog2").dialog("open");
      borrar();
      document.forms[0].cms.focus();
    } else {
      varcms = parseFloat(varcms);
      varkilos = parseFloat(varkilos);
      switch (varuni1) {
        case "cms":
          varcms = varcms;
          break;
        case "pul":
          varcms = varcms * 2.54;
          break;
        case "met":
          varcms = varcms * 100;
          break;
      }
      switch (varuni2) {
        case "kil":
          varkilos = varkilos;
          break;
        case "lib":
          varkilos = varkilos / 2.2046;
          break;
      }
      switch (varuni3) {
        case "dub":
          parcial = Math.pow(varcms, 0.725);
          otro = Math.pow(varkilos, 0.425);
          document.forms[0].resultado.value =
            Math.round(parcial * otro * 0.7184) / 100;
          break;
      }
    }
  }
}

function comprobar(cifras) {
  var k = 0;
  var todo = cifras;
  var numeros = "0123456789.";
  for (i = 0; i < todo.length; i++) {
    if (todo.charAt(i) == ".") {
      k++;
    }
  }
  if (k > 1) {
    return true;
  }
  for (i = 0; i < todo.length; i++) {
    for (j = 0; j < numeros.length; j++) {
      if (todo.charAt(i) == numeros.charAt(j)) {
        break;
      }
    }
    if (j == numeros.length) {
      return true;
    }
  }
  return false;
}

function CambioComa(num) {
  num2 = "";
  for (i = 0; i < num.length; i++) {
    if (num.charAt(i) == ",") {
      num2 = num2 + ".";
    } else {
      if (num.charAt(i) == " ") {
        num2 = num2;
      } else {
        num2 = num2 + num.charAt(i);
      }
    }
  }
  return num2;
}
function borrar() {
  document.forms[0].cms.value = "";
  document.forms[0].kilos.value = "";
  document.forms[0].resultado.value = "";
  document.forms[0].uni1.value = "cms";
  document.forms[0].uni2.value = "kil";
  document.forms[0].uni3.value = "dub";
}
