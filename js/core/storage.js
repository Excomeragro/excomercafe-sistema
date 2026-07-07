// ══ SISTEMA DE ALMACENAMIENTO ══

// ── SISTEMA CENTRALIZADO DE GESTIÓN DE BANCOS ──
window.productosSistema = {
  storageKey: 'productos_sistema',
  productosIniciales: (typeof PRODUCTOS_CATALOGO_INICIAL !== 'undefined' ? PRODUCTOS_CATALOGO_INICIAL : []).map(function(producto){
    return Object.assign({}, producto);
  }),

  clonarProducto: function(producto) {
    return Object.assign({}, producto);
  },

  obtenerProductosConDatos: function() {
    try {
      var guardados = localStorage.getItem(this.storageKey);
      if (guardados) {
        var productos = JSON.parse(guardados);
        if (Array.isArray(productos) && productos.length) {
          return productos.map(this.clonarProducto);
        }
      }
    } catch (e) {
      console.error('Error leyendo productos del sistema:', e);
    }
    return this.productosIniciales.map(this.clonarProducto);
  },

  obtenerProductosActivosConDatos: function() {
    return this.obtenerProductosConDatos().filter(function(producto){
      return producto.activo !== false;
    });
  },

  obtenerProducto: function(key) {
    return this.obtenerProductosConDatos().find(function(producto){
      return producto.key === key;
    }) || null;
  },

  fusionarConIniciales: function(productos) {
    var mapa = {};
    (productos || []).forEach(function(producto){
      if (producto && producto.key) mapa[producto.key] = Object.assign({}, producto);
    });

    return this.productosIniciales.map(function(base){
      var guardado = mapa[base.key] || {};
      return {
        key: base.key,
        local_id: guardado.local_id || ('producto-' + base.key),
        inv: guardado.inv || base.inv,
        nombre: guardado.nombre || base.nombre,
        corto: guardado.corto || base.corto,
        precio: guardado.precio != null ? Number(guardado.precio) || 0 : base.precio,
        activo: guardado.activo !== false,
        supabase_synced: guardado.supabase_synced === true,
        supabase_synced_at: guardado.supabase_synced_at || '',
        actualizado_en: guardado.actualizado_en || ''
      };
    });
  },

  aplicarEnMemoria: function(productos) {
    var lista = this.fusionarConIniciales(productos);
    if (typeof PRECIOS === 'undefined') window.PRECIOS = {};
    if (typeof window.PRODUCTOS_INFO === 'undefined') window.PRODUCTOS_INFO = {};

    lista.forEach(function(producto){
      PRECIOS[producto.key] = Number(producto.precio || 0) || 0;
      window.PRODUCTOS_INFO[producto.key] = Object.assign({}, producto);
    });

    window.PRODUCTOS_ACTIVOS_SISTEMA = lista.filter(function(producto){
      return producto.activo !== false;
    }).map(function(producto){
      return Object.assign({}, producto);
    });

    return lista;
  },

  guardarProductos: function(productos, silent) {
    var copia = (productos || []).map(this.clonarProducto);
    localStorage.setItem(this.storageKey, JSON.stringify(copia));
    this.aplicarEnMemoria(copia);
    if (!silent) {
      window.dispatchEvent(new CustomEvent('productos-sistema-actualizados', {
        detail: {
          productos: copia.map(this.clonarProducto)
        }
      }));
    }
  },

  inicializar: function() {
    var productos = this.obtenerProductosConDatos();
    var fusionados = this.fusionarConIniciales(productos);
    var guardados = localStorage.getItem(this.storageKey);
    var necesitaGuardar = !guardados || JSON.stringify(productos) !== JSON.stringify(fusionados);
    if (necesitaGuardar) {
      this.guardarProductos(fusionados, true);
    } else {
      this.aplicarEnMemoria(fusionados);
    }
  },

  actualizarProducto: function(key, cambios) {
    try {
      var productos = this.obtenerProductosConDatos();
      var indice = productos.findIndex(function(producto){ return producto.key === key; });
      if (indice < 0) {
        return { success:false, mensaje:'Producto no encontrado' };
      }

      productos[indice] = Object.assign({}, productos[indice], cambios || {});
      if (productos[indice].precio != null) {
        productos[indice].precio = Number(productos[indice].precio) || 0;
      }
      productos[indice].local_id = productos[indice].local_id || ('producto-' + productos[indice].key);
      productos[indice].supabase_synced = false;
      productos[indice].actualizado_en = new Date().toISOString();

      this.guardarProductos(productos);
      return { success:true, mensaje:'Producto actualizado correctamente' };
    } catch (e) {
      return { success:false, mensaje:'Error al actualizar producto: ' + e.message };
    }
  }
};

window.productosSistema.inicializar();

window.bancosSistema = {
  // Lista inicial de bancos con números de cuenta
  bancosIniciales: BANCOS_INICIALES,
  
  // Obtener todos los bancos (solo nombres para selectores)
  obtenerBancos: function() {
    var bancosGuardados = localStorage.getItem('bancos_sistema');
    if (bancosGuardados) {
      var bancos = JSON.parse(bancosGuardados);
      return bancos.map(function(b) { return b.nombre; });
    }
    return this.bancosIniciales.map(function(b) { return b.nombre; });
  },
  
  // Obtener todos los bancos con datos completos
  obtenerBancosConDatos: function() {
    var bancosGuardados = localStorage.getItem('bancos_sistema');
    if (bancosGuardados) {
      return JSON.parse(bancosGuardados);
    }
    return this.bancosIniciales.slice();
  },
  
  // Obtener número de cuenta por nombre de banco
  obtenerCuenta: function(nombreBanco) {
    var bancos = this.obtenerBancosConDatos();
    var banco = bancos.find(function(b) { return b.nombre === nombreBanco; });
    return banco ? banco.cuenta : '';
  },
  
  // Guardar bancos en localStorage
  guardarBancos: function(bancos) {
    localStorage.setItem('bancos_sistema', JSON.stringify(bancos));
  },
  
  // Inicializar sistema (cargar bancos guardados o usar iniciales)
  inicializar: function() {
    var bancosGuardados = localStorage.getItem('bancos_sistema');
    if (!bancosGuardados) {
      // Primera vez que se carga, establecer bancos iniciales
      this.guardarBancos(this.bancosIniciales.slice());
    }
  },
  
  // Agregar nuevo banco
  agregarBanco: function(nombre, cuenta) {
    try {
      var bancos = this.obtenerBancosConDatos();
      
      // Verificar que no exista
      if (bancos.find(function(b) { return b.nombre === nombre; })) {
        return { success: false, mensaje: 'El banco ya existe' };
      }
      
      bancos.push({ nombre: nombre, cuenta: cuenta });
      this.guardarBancos(bancos);
      this.actualizarTodosLosSelectores();
      
      return { success: true, mensaje: 'Banco agregado correctamente' };
    } catch (e) {
      return { success: false, mensaje: 'Error al agregar banco: ' + e.message };
    }
  },
  
  // Editar banco existente
  editarBanco: function(indice, nuevoNombre, nuevaCuenta) {
    try {
      var bancos = this.obtenerBancosConDatos();
      
      if (indice < 0 || indice >= bancos.length) {
        return { success: false, mensaje: 'Índice de banco inválido' };
      }
      
      var bancoAnterior = bancos[indice];
      
      // Verificar que el nuevo nombre no exista (excepto si es el mismo banco)
      if (bancos.find(function(b, i) { return b.nombre === nuevoNombre && i !== indice; })) {
        return { success: false, mensaje: 'Ya existe otro banco con ese nombre' };
      }
      
      var nombreAnterior = bancoAnterior.nombre;
      bancos[indice] = { nombre: nuevoNombre, cuenta: nuevaCuenta };
      
      this.guardarBancos(bancos);
      this.actualizarTodosLosSelectores();
      this.actualizarRegistrosConBancoCambiado(nombreAnterior, nuevoNombre);
      
      return { success: true, mensaje: 'Banco actualizado correctamente' };
    } catch (e) {
      return { success: false, mensaje: 'Error al actualizar banco: ' + e.message };
    }
  },
  
  // Eliminar banco
  eliminarBanco: function(indice) {
    try {
      var bancos = this.obtenerBancosConDatos();
      
      if (indice < 0 || indice >= bancos.length) {
        return { success: false, mensaje: 'Índice de banco inválido' };
      }
      
      var bancoEliminado = bancos[indice];
      bancos.splice(indice, 1);
      this.guardarBancos(bancos);
      this.actualizarTodosLosSelectores();
      this.limpiarRegistrosConBancoEliminado(bancoEliminado.nombre);
      
      return { success: true, mensaje: 'Banco eliminado correctamente' };
    } catch (e) {
      return { success: false, mensaje: 'Error al eliminar banco: ' + e.message };
    }
  },
  
  // Actualizar todos los selectores de bancos en la página
  actualizarTodosLosSelectores: function() {
    var selectores = document.querySelectorAll('select[id*="banco"]');
    var bancos = this.obtenerBancosConDatos();
    
    selectores.forEach(function(selector) {
      var valorActual = selector.value;
      selector.innerHTML = '<option value="">-- Seleccionar Banco --</option>';
      
      bancos.forEach(function(banco) {
        var nombre = typeof banco === 'string' ? banco : banco.nombre;
        var cuenta = typeof banco === 'string' ? '' : (banco.cuenta || '');
        var option = document.createElement('option');
        option.value = nombre;
        option.textContent = cuenta ? (nombre + ' - ' + cuenta) : (nombre + ' - Sin cuenta');
        option.title = option.textContent;
        if (nombre === valorActual) {
          option.selected = true;
        }
        selector.appendChild(option);
      });
    });
  },
  
  // Actualizar registros cuando cambia el nombre de un banco
  actualizarRegistrosConBancoCambiado: function(nombreAnterior, nuevoNombre) {
    try {
      // Actualizar registros de agromercado
      var agroHist = JSON.parse(localStorage.getItem('exc_agro_hist') || '[]');
      agroHist.forEach(function(registro) {
        if (registro.banco === nombreAnterior) {
          registro.banco = nuevoNombre;
        }
      });
      localStorage.setItem('exc_agro_hist', JSON.stringify(agroHist));
      
      // Actualizar registros de bancos
      var bancosHist = JSON.parse(localStorage.getItem('exc_bancos_hist') || '[]');
      bancosHist.forEach(function(registro) {
        if (registro.banco === nombreAnterior) {
          registro.banco = nuevoNombre;
        }
      });
      localStorage.setItem('exc_bancos_hist', JSON.stringify(bancosHist));
      
      // Actualizar otros registros que puedan contener bancos
      // (aquí se pueden agregar más tipos de registros según sea necesario)
      
    } catch (e) {
      console.error('Error actualizando registros con banco cambiado:', e);
    }
  },
  
  // Limpiar registros cuando se elimina un banco
  limpiarRegistrosConBancoEliminado: function(nombreEliminado) {
    try {
      // Actualizar registros de agromercado (dejar en blanco el campo banco)
      var agroHist = JSON.parse(localStorage.getItem('exc_agro_hist') || '[]');
      agroHist.forEach(function(registro) {
        if (registro.banco === nombreEliminado) {
          registro.banco = '';
        }
      });
      localStorage.setItem('exc_agro_hist', JSON.stringify(agroHist));
      
      // Actualizar registros de bancos
      var bancosHist = JSON.parse(localStorage.getItem('exc_bancos_hist') || '[]');
      bancosHist.forEach(function(registro) {
        if (registro.banco === nombreEliminado) {
          registro.banco = '';
        }
      });
      localStorage.setItem('exc_bancos_hist', JSON.stringify(bancosHist));
      
    } catch (e) {
      console.error('Error limpiando registros con banco eliminado:', e);
    }
  }
};

// ── FUNCIONES DE ALMACENAMIENTO DE HISTORIAL ──

// Guardar registro en historial
window.guardarRegistro = function(){
  const banco = document.getElementById('campo-banco')?.value?.trim() || '';
  const ventas = parseFloat(
    (document.getElementById('campo-total-esperado')?.value || '0')
      .replace('$','')
  ) || 0;
  const gastos = parseFloat(
    document.getElementById('campo-gastos')?.value || 0
  ) || 0;
  const remesa = parseFloat(
    document.getElementById('campo-dinero-remesado')?.value || 0
  ) || 0;
  const dineroRemesado = parseFloat(
    document.getElementById('campo-dinero-remesado')?.value || 0
  ) || 0;

  var registro = {
    local_id: 'app-' + Date.now() + '-' + Math.random().toString(16).slice(2),
    nombre: (document.getElementById('agro-nombre')||{}).value||'',
    fecha: document.getElementById('agro-fecha').value,
    dia: document.getElementById('agro-dia').value,
    distrito: (document.getElementById('agro-distrito')||{}).value||'',
    municipio: (document.getElementById('agro-municipio')||{}).value||'',
    banco: banco,
    ventas: ventas,
    gastos: gastos,
    remesa: remesa,
    dineroRemesado: dineroRemesado,
    ventas_unidades: {}
  };
  
  PRODUCTOS.forEach(function(p){ registro.ventas_unidades[p] = n(p+'-ven'); });

  var hist = JSON.parse(localStorage.getItem('exc_agro_hist')||'[]');
  hist.unshift(registro);
  localStorage.setItem('exc_agro_hist', JSON.stringify(hist));
  console.log('GUARDADO OK', JSON.parse(localStorage.getItem('exc_agro_hist') || '[]')[0]);
  console.log('VOY A RENDER HISTORIAL');

  requestAnimationFrame(function(){
    renderHistorial?.();
    renderBancos?.();
    actualizarResumenRemesasDia?.();
  });

  renderHistorial?.();
  renderBancos?.();
  actualizarResumenRemesasDia?.();
  calcularTotalesGenerales?.();

  const cont = document.getElementById('historial-registros-content');
  if (cont) cont.style.display = 'block';

  const btn = document.getElementById('btn-toggle-historial-registros');
  if (btn) btn.textContent = '-';

  showAlert('alert-agro', '✅ Registro guardado correctamente.', 'ok');
};

// Renderizar historial
window.renderHistorial = function(){
  console.log('RENDER HISTORIAL EJECUTADO');
  console.log('tbody existe?', !!document.getElementById('tbody-historial'));
  var hist = JSON.parse(localStorage.getItem('exc_agro_hist')||'[]');
  var tbody = document.getElementById('tbody-historial');
  if(!hist.length){
    tbody.innerHTML='<tr><td colspan="16" style="text-align:center;color:var(--muted);padding:20px;font-style:italic;">Sin registros guardados aún.</td></tr>';
    console.log('HTML NUEVO:', tbody.innerHTML.slice(0,200));
    return;
  }
  
  var html = '';
  hist.forEach(function(registro, i){
    html += '<tr>'+
      '<td>'+registro.fecha+'</td>'+
      '<td>'+registro.dia+'</td>'+
      '<td>'+registro.distrito+'</td>'+
      '<td>'+registro.municipio+'</td>'+
      '<td>'+registro.nombre+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.ab1||0)+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.ap1||0)+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.fr1||0)+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.fr4||0)+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.ac||0)+'</td>'+
      '<td>'+(registro.ventas_unidades&&registro.ventas_unidades.ha||0)+'</td>'+
      '<td>'+formatMoney(registro.ventas)+'</td>'+
      '<td>'+formatMoney(registro.gastos)+'</td>'+
      '<td>'+formatMoney(registro.remesa)+'</td>'+
      '<td>'+registro.banco+'</td>'+
      '<td>'+
        '<button class="btn btn-sm btn-primary" onclick="editarRegistro('+i+')">✏️</button> '+
        '<button class="btn btn-sm btn-danger" onclick="eliminarRegistro('+i+')">🗑️</button>'+
      '</td>'+
    '</tr>';
  });
  tbody.innerHTML = html;
  console.log('HTML NUEVO:', tbody.innerHTML.slice(0,200));
};

// Eliminar registro del historial
window.eliminarRegistro = function(index){
  if(!confirm('¿Seguro que deseas eliminar este registro?')) return;
  
  var hist = JSON.parse(localStorage.getItem('exc_agro_hist')||'[]');
  if(index < 0 || index >= hist.length) return;
  
  var registroEliminado = hist[index];
  var localId = registroEliminado.local_id;
  
  // Sincronizar eliminación con Supabase
  if(localId && typeof supabaseDelete === 'function'){
    supabaseDelete(localId).then(function(){
      console.log('Registro eliminado de Supabase:', localId);
    }).catch(function(e){
      console.error('Error eliminando de Supabase:', e);
      showToast('⚠️ Advertencia: No se sincronizó con Supabase. Registro eliminado localmente.');
    });
  }
  
  hist.splice(index, 1);
  localStorage.setItem('exc_agro_hist', JSON.stringify(hist));
  
  // Actualizar inventario (devolver productos)
  if(registroEliminado.ventas_unidades){
    try{
      var inventario = JSON.parse(localStorage.getItem('inventario-data')||'[]');
      Object.keys(registroEliminado.ventas_unidades).forEach(function(producto){
        var item = inventario.find(function(i){ return i.producto === producto; });
        if(item){
          item.cantidad += registroEliminado.ventas_unidades[producto];
        }
      });
      localStorage.setItem('inventario-data', JSON.stringify(inventario));
    } catch(e){
      console.error('Error actualizando inventario:', e);
    }
  }
  
  renderHistorial();
  renderBancos();
  showToast('🗑️ Registro eliminado');
};

// Limpiar todo el historial
window.limpiarHistorial = function(){
  if(!confirm('¿Eliminar todo el historial? Esta acción no se puede deshacer.')) return;
  localStorage.removeItem('exc_agro_hist');
  renderHistorial();
  renderBancos();
  showToast('🗑️ Historial eliminado');
};

// ── SINCRONIZACIÓN CON SUPABASE ──

// Variable global para controlar polling
window.syncPollTimer = null;
window.lastSyncHash = null;

// Cargar historial desde Supabase
window.sincronizarDesdeSupabase = async function(){
  try {
    if(typeof fetchSupabase === 'undefined') return; // No disponible en este contexto
    
    var hist = await fetchSupabase('/rest/v1/ventas_agromercado_pendientes?select=*&order=creado_en.desc&limit=100');
    if(!hist || !Array.isArray(hist)) return;
    
    // Convertir registros de Supabase al formato local
    var registrosFormato = hist.map(function(row){
      var payload = row.payload || {};
      return {
        local_id: row.local_id,
        fecha: row.fecha,
        nombre: row.agromercado,
        banco: row.banco || '',
        ventas: row.ventas || payload.ventas || 0,
        gastos: row.gastos || payload.gastos || 0,
        remesa: row.remesa || payload.remesa || 0,
        ventas_unidades: payload.ventas_unidades || {},
        dinero_productos: payload.dinero_productos || {},
        inventario_inicio: payload.inventario_inicio || {},
        mercaderia_nueva: payload.mercaderia_nueva || {},
        inventario_final: payload.inventario_final || {},
        faltante: payload.faltante || {},
        danado: payload.danado || {},
        dia: payload.dia || '',
        distrito: payload.distrito || '',
        municipio: payload.municipio || '',
        encargado: row.encargado || payload.encargado || ''
      };
    });
    
    // Calcular hash para detectar cambios
    var currentHash = JSON.stringify(registrosFormato);
    if(currentHash === window.lastSyncHash) return; // Sin cambios
    
    window.lastSyncHash = currentHash;
    localStorage.setItem('exc_agro_hist', JSON.stringify(registrosFormato));
    
    if(window.renderHistorial) window.renderHistorial();
    if(window.renderBancos) window.renderBancos();
    
    console.log('📡 Sincronización completada desde Supabase:', registrosFormato.length, 'registros');
  } catch(e){
    console.error('Error sincronizando desde Supabase:', e);
  }
};

// Iniciar polling automático
window.iniciarSincronizacionAutomatica = function(){
  if(window.syncPollTimer) clearInterval(window.syncPollTimer);
  
  // Sincronizar inmediatamente al cargar
  window.sincronizarDesdeSupabase();
  
  // Luego cada 15 segundos
  window.syncPollTimer = setInterval(function(){
    window.sincronizarDesdeSupabase();
  }, 15000);
};

// Detener polling
window.detenerSincronizacionAutomatica = function(){
  if(window.syncPollTimer){
    clearInterval(window.syncPollTimer);
    window.syncPollTimer = null;
  }
};

// Reiniciar sync cuando cambia de pestaña
document.addEventListener('visibilitychange', function(){
  if(document.hidden){
    window.detenerSincronizacionAutomatica();
  } else {
    window.iniciarSincronizacionAutomatica();
  }
});

// Guardar edición inline
window.guardarEdicionInline = function(index){
  var hist = JSON.parse(localStorage.getItem('exc_agro_hist')||'[]');
  if(index < 0 || index >= hist.length) return;
  
  // Obtener valores editados
  var registro = hist[index];
  registro.fecha = document.getElementById('edit-fecha-' + index).value;
  registro.distrito = document.getElementById('edit-distrito-' + index).value;
  registro.municipio = document.getElementById('edit-municipio-' + index).value;
  registro.nombre = document.getElementById('edit-agromercado-' + index).value;
  registro.banco = document.getElementById('edit-banco-' + index).value;
  registro.ventas = parseFloat(document.getElementById('edit-ventas-' + index).value) || 0;
  registro.gastos = parseFloat(document.getElementById('edit-gastos-' + index).value) || 0;
  
  // Actualizar ventas_unidades
  registro.ventas_unidades = {};
  var productosKeys = PRODUCTOS_KEYS;
  productosKeys.forEach(function(key){
    var valor = parseInt(document.getElementById('edit-' + key + '-' + index).value) || 0;
    if(valor > 0) registro.ventas_unidades[key] = valor;
  });
  
  // Guardar cambios
  hist[index] = registro;
  localStorage.setItem('exc_agro_hist', JSON.stringify(hist));
  
  // Actualizar inventario
  actualizarInventarioDesdeRegistro(registro, true); // true = edición
  
  renderHistorial();
  renderBancos();
  showToast('✅ Registro actualizado');
};

// ── FUNCIONES DE ALMACENAMIENTO DE INVENTARIO ──

// Actualizar inventario desde un registro
window.actualizarInventarioDesdeRegistro = function(registro, esEdicion){
  try{
    var inventario = JSON.parse(localStorage.getItem('inventario-data')||'[]');
    
    // Si es edición, primero revertir los cambios anteriores
    if(esEdicion && registro.ventas_unidades_anterior){
      Object.keys(registro.ventas_unidades_anterior).forEach(function(producto){
        var item = inventario.find(function(i){ return i.producto === producto; });
        if(item){
          item.cantidad += registro.ventas_unidades_anterior[producto];
        }
      });
    }
    
    // Descontar las ventas actuales del inventario
    if(registro.ventas_unidades){
      Object.keys(registro.ventas_unidades).forEach(function(producto){
        var item = inventario.find(function(i){ return i.producto === producto; });
        if(item){
          item.cantidad -= registro.ventas_unidades[producto];
          if(item.cantidad < 0) item.cantidad = 0;
        }
      });
    }
    
    localStorage.setItem('inventario-data', JSON.stringify(inventario));
  } catch(e){
    console.error('Error actualizando inventario:', e);
  }
};

// ── FUNCIONES DE ALMACENAMIENTO DE FORMULARIOS ──

// Guardar datos del formulario actual
window.guardarLocal = function(){
  var data = { nombre: (document.getElementById('agro-nombre')||{}).value||'',
               fecha: document.getElementById('agro-fecha').value,
               gastos: document.getElementById('campo-gastos').value,
               distrito: (document.getElementById('agro-distrito')||{}).value||'',
               municipio: (document.getElementById('agro-municipio')||{}).value||'',
               banco: (document.getElementById('agro-banco')||{}).value||''
             };
  PRODUCTOS.forEach(function(p){
    ['ini','ven','fal','dan'].forEach(function(f){
      data[p+'_'+f] = (document.getElementById(p+'-'+f)||{}).value||0;
    });
  });
  localStorage.setItem('exc_agro_form', JSON.stringify(data));
};

// Cargar datos guardados del formulario
window.cargarLocal = function(){
  var raw = localStorage.getItem('exc_agro_form');
  if(!raw) return;
  try{
    var data = JSON.parse(raw);
    Object.keys(data).forEach(function(k){
      var el = document.getElementById(k);
      if(el) el.value = data[k];
    });
  } catch(e){ console.error('Error cargando datos locales:', e); }
};

// ── SISTEMA DE INVENTARIO CENTRALIZADO ──

window.MAPA_PRODUCTOS_INVENTARIO = {
  ab1: 'arroz',
  ap1: 'precocido',
  fr1: 'frijol1',
  fr4: 'frijol4',
  ac: 'aceite',
  ha: 'harina',

  arroz: 'arroz',
  precocido: 'precocido',
  frijol1: 'frijol1',
  frijol4: 'frijol4',
  aceite: 'aceite',
  harina: 'harina'
};

window.normalizarProductoInventario = function(producto){
  return window.MAPA_PRODUCTOS_INVENTARIO[producto] || producto;
};

// Obtener inventario actual completo
window.obtenerInventarioActual = function() {
  try {
    return JSON.parse(localStorage.getItem('inventario-data') || '[]');
  } catch (e) {
    console.error('Error al obtener inventario actual:', e);
    return [];
  }
};

window.inventarioEsMovimientoAutomaticoDistribucion = window.inventarioEsMovimientoAutomaticoDistribucion || function(item) {
  var tipo = String(item && item.tipo || '').toLowerCase();
  return tipo === 'salida-distribucion' || tipo === 'entrada-distribucion';
};

window.inventarioVisibleUsuario = window.inventarioVisibleUsuario || function(item) {
  return !!item && !window.inventarioEsMovimientoAutomaticoDistribucion(item);
};

// Obtener stock por ubicación específica
window.obtenerStockPorUbicacion = function(ubicacion) {
  try {
    var inventario = JSON.parse(localStorage.getItem('inventario-data') || '[]');
    var inventarioUbicacion = inventario.filter(function(item) {
      return window.inventarioVisibleUsuario(item) && item.ubicacion === ubicacion;
    });
    
    // Agrupar por lugar si hay múltiples registros
    var stockPorLugar = {};
    inventarioUbicacion.forEach(function(item) {
      var lugar = item.lugar || 'Sin especificar';
      if (!stockPorLugar[lugar]) {
        stockPorLugar[lugar] = {
          arroz: 0,
          precocido: 0,
          frijol1: 0,
          frijol4: 0,
          aceite: 0,
          harina: 0
        };
      }
      
      stockPorLugar[lugar].arroz += (item.arroz || 0);
      stockPorLugar[lugar].precocido += (item.precocido || 0);
      stockPorLugar[lugar].frijol1 += (item.frijol1 || 0);
      stockPorLugar[lugar].frijol4 += (item.frijol4 || 0);
      stockPorLugar[lugar].aceite += (item.aceite || 0);
      stockPorLugar[lugar].harina += (item.harina || 0);
    });
    
    return stockPorLugar;
  } catch (e) {
    console.error('Error al obtener stock por ubicación:', e);
    return {};
  }
};

// Obtener stock de un producto específico en una ubicación
window.obtenerStockProducto = function(ubicacion, producto) {
  try {
    producto = normalizarProductoInventario(producto);
    var stockPorLugar = window.obtenerStockPorUbicacion(ubicacion);
    var totalStock = 0;
    
    // Sumar stock de todos los lugares en la ubicación
    Object.keys(stockPorLugar).forEach(function(lugar) {
      totalStock += (stockPorLugar[lugar][producto] || 0);
    });
    
    return totalStock;
  } catch (e) {
    console.error('Error al obtener stock de producto:', e);
    return 0;
  }
};

// Validar si hay stock disponible
window.validarStockDisponible = function(ubicacion, producto, cantidad) {
  try {
    producto = normalizarProductoInventario(producto);
    var stockActual = window.obtenerStockProducto(ubicacion, producto);
    return stockActual >= cantidad;
  } catch (e) {
    console.error('Error al validar stock disponible:', e);
    return false;
  }
};

// Generar resumen visual de inventario por ubicación
window.actualizarResumenVisual = function() {
  try {
    var container = document.getElementById('resumen-inventario-visual');
    if (!container) return;
    
    var ubicaciones = ['bodega-local', 'agromercados', 'cda', 'otros'];
    var productos = ['arroz', 'precocido', 'frijol1', 'frijol4', 'aceite', 'harina'];
    var nombresProductos = ['Arroz', 'Arroz Precocido', 'Frijol 1 Lb', 'Frijol 4 Lb', 'Aceite 750 ML', 'Harina 820 GRS'];
    
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;">';
    
    ubicaciones.forEach(function(ubicacion) {
      var stockPorLugar = window.obtenerStockPorUbicacion(ubicacion);
      var tieneStock = Object.keys(stockPorLugar).length > 0;
      
      if (!tieneStock) {
        html += '<div style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:6px;padding:12px;"><div style="font-weight:600;color:#6c757d;margin-bottom:8px;">' + getNombreUbicacion(ubicacion) + '</div><div style="color:#adb5bd;font-size:0.9rem;">Sin stock registrado</div></div>';
        return;
      }
      
      html += '<div style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:6px;padding:12px;">';
      html += '<div style="font-weight:600;color:#495057;margin-bottom:8px;">' + getNombreUbicacion(ubicacion) + '</div>';
      
      productos.forEach(function(producto, index) {
        var total = 0;
        Object.keys(stockPorLugar).forEach(function(lugar) {
          total += (stockPorLugar[lugar][producto] || 0);
        });
        
        if (total > 0) {
          html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #e9ecef;font-size:0.85rem;">';
          html += '<span style="color:#6c757d;">' + nombresProductos[index] + '</span>';
          html += '<span style="font-weight:500;color:#495057;">' + total + '</span>';
          html += '</div>';
        }
      });
      
      html += '</div>';
    });
    
    html += '</div>';
    container.innerHTML = html;
    
  } catch (e) {
    console.error('Error al actualizar resumen visual:', e);
  }
};

// Obtener nombre descriptivo de ubicación
function getNombreUbicacion(ubicacion) {
  var nombres = {
    'bodega-local': '🏠 Bodega Local',
    'agromercados': '🌾 Agromercados',
    'cda': '🏢 CDA',
    'otros': '📍 Otros'
  };
  return nombres[ubicacion] || ubicacion;
}

// Registrar movimiento de inventario
window.registrarMovimientoInventario = function(movimiento) {
  try {
    movimiento.arroz = movimiento.arroz || movimiento.ab1 || 0;
    movimiento.precocido = movimiento.precocido || movimiento.ap1 || 0;
    movimiento.frijol1 = movimiento.frijol1 || movimiento.fr1 || 0;
    movimiento.frijol4 = movimiento.frijol4 || movimiento.fr4 || 0;
    movimiento.aceite = movimiento.aceite || movimiento.ac || 0;
    movimiento.harina = movimiento.harina || movimiento.ha || 0;

    // Validar estructura del movimiento
    var camposRequeridos = ['id', 'fecha', 'ubicacion', 'lugar', 'tipo', 'referencia'];
    var camposFaltantes = [];
    
    camposRequeridos.forEach(function(campo) {
      if (!movimiento[campo]) {
        camposFaltantes.push(campo);
      }
    });
    
    if (camposFaltantes.length > 0) {
      console.error('Movimiento inválido - campos faltantes:', camposFaltantes);
      return { success: false, mensaje: 'Campos requeridos faltantes: ' + camposFaltantes.join(', ') };
    }
    
    // Validar que tenga al menos un producto
    var productos = ['arroz', 'precocido', 'frijol1', 'frijol4', 'aceite', 'harina'];
    var tieneProductos = productos.some(function(producto) {
      return movimiento[producto] !== undefined && movimiento[producto] !== 0;
    });
    
    if (!tieneProductos) {
      console.error('Movimiento inválido - no tiene productos');
      return { success: false, mensaje: 'El movimiento debe incluir al menos un producto' };
    }
    
    // Leer inventario actual
    var inventario = JSON.parse(localStorage.getItem('inventario-data') || '[]');
    
    var totalFirmado = (movimiento.arroz || 0)
      + (movimiento.precocido || 0)
      + (movimiento.frijol1 || 0)
      + (movimiento.frijol4 || 0)
      + (movimiento.aceite || 0)
      + (movimiento.harina || 0);

    // Agregar el nuevo movimiento. Los movimientos automaticos se guardan para
    // calcular stock, aunque el historial visible los oculte.
    inventario.push({
      id: movimiento.id,
      origenId: movimiento.origenId || movimiento.distribucionId || movimiento.registroId || '',
      fecha: movimiento.fecha,
      ubicacion: movimiento.ubicacion,
      destino: movimiento.destino || movimiento.lugar || '',
      lugar: movimiento.lugar || 'Sin especificar',
      agromercado: movimiento.agromercado || movimiento.destino || movimiento.lugar || '',
      tipo: movimiento.tipo || '',
      referencia: movimiento.referencia || '',
      arroz: movimiento.arroz || 0,
      precocido: movimiento.precocido || 0,
      frijol1: movimiento.frijol1 || 0,
      frijol4: movimiento.frijol4 || 0,
      aceite: movimiento.aceite || 0,
      harina: movimiento.harina || 0,
      total: totalFirmado,
      observaciones: movimiento.tipo + ' - ' + movimiento.referencia,
      timestamp: new Date().toISOString()
    });
    
    // Guardar inventario actualizado
    localStorage.setItem('inventario-data', JSON.stringify(inventario));
    
    return { success: true, mensaje: 'Movimiento registrado correctamente' };
    
  } catch (e) {
    console.error('Error al registrar movimiento de inventario:', e);
    return { success: false, mensaje: 'Error al registrar movimiento: ' + e.message };
  }
};

// ── FUNCIONES DE MIGRACIÓN ──

// Migrar registros antiguos
window.migrateOldRecords = function(){
  try{
    var hist = JSON.parse(localStorage.getItem('exc_agro_hist')||'[]');
    var inventario = JSON.parse(localStorage.getItem('inventario-data')||'[]');
    var needsUpdate = false;
    
    // Migrar historial
    hist.forEach(function(registro){
      if(registro.ventas_unidades && registro.ventas_unidades.fr20){
        registro.ventas_unidades.fr4 = registro.ventas_unidades.fr20;
        delete registro.ventas_unidades.fr20;
        needsUpdate = true;
      }
    });
    
    // Migrar inventario
    inventario.forEach(function(item){
      if(item.producto === 'fr20'){
        item.producto = 'fr4';
        needsUpdate = true;
      }
    });
    
    if(needsUpdate){
      localStorage.setItem('exc_agro_hist', JSON.stringify(hist));
      localStorage.setItem('inventario-data', JSON.stringify(inventario));
      // console.log('Registros migrados de fr20 a fr4');
    }
  } catch(e){
    console.error('Error en migración:', e);
  }
};

// ── WRAPPER PARA REFRESCO DE HISTORIAL ──

(function(){
  const guardarOriginal = window.guardarRegistro;

  window.guardarRegistro = function(){
    if (typeof guardarOriginal === 'function') {
      guardarOriginal.apply(this, arguments);
    }

    setTimeout(function(){
      if (typeof renderHistorial === 'function') renderHistorial();
      if (typeof renderBancos === 'function') renderBancos();
      if (typeof actualizarResumenRemesasDia === 'function') actualizarResumenRemesasDia();
      if (typeof calcularTotalesGenerales === 'function') calcularTotalesGenerales();

      const cont = document.getElementById('historial-registros-content');
      if (cont) cont.style.display = 'block';

      const btn = document.getElementById('btn-toggle-historial-registros');
      if (btn) btn.textContent = '-';

      const icon = document.getElementById('historial-toggle-icon');
      if (icon) icon.textContent = '-';
    }, 80);
  };
})();
