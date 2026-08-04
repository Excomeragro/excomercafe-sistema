// ══ NAVEGACIÓN PRINCIPAL DE LA APLICACIÓN ══

// ── NAVEGACIÓN DE PESTAÑAS PRINCIPALES ──
window.switchTab = function(tabId, btn){
  document.querySelectorAll('.tab-content').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
  var tab = document.getElementById(tabId);
  if(tab) tab.classList.add('active');
  if(btn) btn.classList.add('active');
  else{
    document.querySelectorAll('.tab-btn').forEach(function(b){
      if((b.getAttribute('onclick')||'').includes("'"+tabId+"'")) b.classList.add('active');
    });
  }
  // Actualizar resumen si estamos en la pestaña Ingresar Datos
  if(tabId === 'tab-ingresar' && window.actualizarResumenIngresar) window.actualizarResumenIngresar();
  // Actualizar totales generales (safe call)
  if(window.calcularTotalesGenerales) window.calcularTotalesGenerales();
};

// ── NAVEGACIÓN INTERNA DE DATOS Y UBICACIÓN ──
window.mostrarSeccionDatos = function(seccion){
  // Ocultar todas las secciones
  document.querySelectorAll('.seccion-datos').forEach(function(el){
    el.style.display = 'none';
  });
  
  // Mostrar la sección seleccionada
  var seccionEl = document.getElementById('seccion-' + seccion);
  if(seccionEl){
    seccionEl.style.display = 'block';
    
    // Cargar datos específicos de la sección
    switch(seccion){
      case 'distritos':
        if(window.cargarDistritos) window.cargarDistritos();
        break;
      case 'agromercados':
        if(window.cargarAgromercados) window.cargarAgromercados();
        break;
      case 'cda':
        if(window.cargarCDA) window.cargarCDA();
        break;
      case 'personas':
        if(window.cargarPersonas) window.cargarPersonas();
        break;
      case 'claves':
        if(window.renderClavesAgromercado) window.renderClavesAgromercado();
        break;
      case 'transporte':
        if(window.cargarTransporte) window.cargarTransporte();
        break;
      case 'bancos':
        if(window.cargarBancos) window.cargarBancos();
        break;
      case 'productos':
        if(window.renderProductosDatos) window.renderProductosDatos();
        break;
      case 'departamentos':
        if(window.cargarDistritos) window.cargarDistritos();
        break;
    }
    
    // Actualizar botones internos de Datos sin afectar el menu principal
    document.querySelectorAll('.data-tabs .data-tab-btn').forEach(function(b){
      b.classList.remove('active');
    });
    document.querySelectorAll('.data-tabs .data-tab-btn').forEach(function(b){
      if((b.getAttribute('onclick')||'').includes("'"+seccion+"'")) b.classList.add('active');
    });
  }
};
