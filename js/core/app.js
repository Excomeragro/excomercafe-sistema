// Navegacion principal de la aplicacion
window.switchTab = function(tabId, btn){
  document.querySelectorAll('.tab-content').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });

  var tab = document.getElementById(tabId);
  if(tab) tab.classList.add('active');

  if(btn) btn.classList.add('active');
  else{
    document.querySelectorAll('.tab-btn').forEach(function(b){
      if((b.getAttribute('onclick') || '').includes("'" + tabId + "'")) b.classList.add('active');
    });
  }

  if(tabId === 'tab-ingresar' && window.actualizarResumenIngresar) window.actualizarResumenIngresar();
  if(tabId === 'tab-devoluciones' && typeof window.renderDevolucionesReporte === 'function') window.renderDevolucionesReporte();
  if(window.calcularTotalesGenerales) window.calcularTotalesGenerales();
};

// Navegacion interna de Datos y Ubicacion
window.mostrarSeccionDatos = function(seccion){
  document.querySelectorAll('.seccion-datos').forEach(function(el){
    el.style.display = 'none';
  });

  var seccionClave = seccion === 'distritos' ? 'departamentos' : seccion;
  var seccionEl = document.getElementById('seccion-' + seccionClave);
  if(!seccionEl && seccionClave === 'departamentos'){
    seccionEl = document.getElementById('seccion-departamentos');
  }

  if(seccionEl){
    seccionEl.style.display = 'block';

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

    document.querySelectorAll('.data-tabs .data-tab-btn').forEach(function(b){
      b.classList.remove('active');
    });
    document.querySelectorAll('.data-tabs .data-tab-btn').forEach(function(b){
      if((b.getAttribute('onclick') || '').includes("'" + seccion + "'")) b.classList.add('active');
    });
  }
};

(function(){
  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function num(value){
    var n = Number(value);
    return isFinite(n) ? n : 0;
  }

  function money(value){
    return '$' + num(value).toFixed(2);
  }

  function asDate(value){
    if(!value) return '';
    if(/^\d{4}-\d{2}-\d{2}/.test(String(value))) return String(value).slice(0, 10);
    return String(value).slice(0, 10);
  }

  function excelSerialToIso(serial){
    var n = Number(serial);
    if(!isFinite(n) || !n) return '';
    var whole = Math.floor(n);
    var date = new Date(Date.UTC(1899, 11, 30));
    date.setUTCDate(date.getUTCDate() + whole);
    return date.toISOString().slice(0, 10);
  }

  function readDevolucionesData(){
    try{
      var raw = localStorage.getItem('devoluciones-data');
      if(!raw) return [];
      var data = JSON.parse(raw);
      if(Array.isArray(data)) return data;
      if(data && Array.isArray(data.reportes)) return data.reportes;
      return [];
    }catch(error){
      return [];
    }
  }

  function writeDevolucionesData(reportes){
    localStorage.setItem('devoluciones-data', JSON.stringify(reportes));
    return reportes;
  }

  function buildDefaultDevoluciones(){
    return [{
      id: 'reporte-2026-08-04',
      fecha: '2026-08-04',
      titulo: 'Reporte actualizado devoluciones y pesos',
      fuente: 'Reporte_actualizado_devoluciones_y_pesos_04-08-2026.xlsx',
      resumen: {
        unidades: 354,
        pesoLb: 23.7,
        cajas: 239,
        pendiente: 1113
      },
      resumenProductos: [
        { producto: 'Harina', retirado16: 8, retirado20: 1, total: 9, observaciones: 'Las 252 unidades del 16-07 son las mismas que ya figuran como retiradas en la conciliacion del 15-07. El retiro adicional del 20-07 suma 102 unidades.' },
        { producto: 'Frijol 1 lb', retirado16: 28, retirado20: 14, total: 42, observaciones: '' },
        { producto: 'Frijol 4 lb', retirado16: 0, retirado20: 1, total: 1, observaciones: '' },
        { producto: 'Arroz blanco', retirado16: 193, retirado20: 54, total: 247, observaciones: 'Las 23.70 lb y las 239 cajas del 20-07 fueron registradas como totales del dia; no existe distribucion del peso por agromercado en el PDF.' },
        { producto: 'Arroz precocido', retirado16: 19, retirado20: 31, total: 50, observaciones: '' },
        { producto: 'Aceite', retirado16: 4, retirado20: 1, total: 5, observaciones: '' },
        { producto: 'TOTAL', retirado16: 252, retirado20: 102, total: 354, observaciones: '' }
      ],
      retiros: [
        { fecha: '2026-07-16', agromercado: 'SAN VICENTE', harina: 4, frijol1: 4, frijol4: 0, arroz: 15, precocido: 1, aceite: 0, total: 24 },
        { fecha: '2026-07-16', agromercado: 'ZACATECOLUCA', harina: 0, frijol1: 0, frijol4: 0, arroz: 4, precocido: 0, aceite: 0, total: 4 },
        { fecha: '2026-07-16', agromercado: 'OLOCUILTA', harina: 0, frijol1: 18, frijol4: 0, arroz: 37, precocido: 5, aceite: 1, total: 61 },
        { fecha: '2026-07-16', agromercado: 'SANTO TOMAS', harina: 1, frijol1: 3, frijol4: 0, arroz: 5, precocido: 2, aceite: 2, total: 13 },
        { fecha: '2026-07-16', agromercado: 'SAN MARCOS', harina: 3, frijol1: 1, frijol4: 0, arroz: 3, precocido: 0, aceite: 0, total: 7 },
        { fecha: '2026-07-16', agromercado: 'MEJICANOS', harina: 0, frijol1: 2, frijol4: 0, arroz: 128, precocido: 9, aceite: 1, total: 140 },
        { fecha: '2026-07-16', agromercado: 'AHUACHAPAN', harina: 0, frijol1: 0, frijol4: 0, arroz: 0, precocido: 1, aceite: 0, total: 1 },
        { fecha: '2026-07-16', agromercado: 'CHALCHUAPA', harina: 0, frijol1: 0, frijol4: 0, arroz: 1, precocido: 0, aceite: 0, total: 1 },
        { fecha: '2026-07-16', agromercado: 'EL PALMAR', harina: 0, frijol1: 0, frijol4: 0, arroz: 0, precocido: 1, aceite: 0, total: 1 },
        { fecha: '2026-07-20', agromercado: 'COJUTEPEQUE', harina: 0, frijol1: 2, frijol4: 1, arroz: 8, precocido: 8, aceite: 0, total: 19 },
        { fecha: '2026-07-20', agromercado: 'SAN MARTIN', harina: 0, frijol1: 0, frijol4: 0, arroz: 7, precocido: 7, aceite: 0, total: 14 },
        { fecha: '2026-07-20', agromercado: 'SOYAPANGO', harina: 0, frijol1: 0, frijol4: 0, arroz: 33, precocido: 10, aceite: 0, total: 43 },
        { fecha: '2026-07-20', agromercado: 'AYUTUXTEPEQUE', harina: 0, frijol1: 0, frijol4: 0, arroz: 2, precocido: 3, aceite: 0, total: 5 },
        { fecha: '2026-07-20', agromercado: 'QUEZALTEPEQUE', harina: 1, frijol1: 12, frijol4: 0, arroz: 4, precocido: 3, aceite: 0, total: 20 },
        { fecha: '2026-07-20', agromercado: 'ALTA VISTA', harina: 0, frijol1: 0, frijol4: 0, arroz: 0, precocido: 0, aceite: 1, total: 1 }
      ],
      pesos: [
        { producto: 'Harina', peso16: 0, peso20: 1.9, total: 1.9 },
        { producto: 'Frijol (peso conjunto)', peso16: 0, peso20: 16.7, total: 16.7 },
        { producto: 'Arroz blanco', peso16: 0, peso20: 5.1, total: 5.1 },
        { producto: 'Arroz precocido', peso16: 0, peso20: 0, total: 0 },
        { producto: 'TOTAL PESO', peso16: 0, peso20: 23.7, total: 23.7 }
      ],
      pendiente: [
        { agromercado: 'San Francisco Menendez (Colonia La Palma)', arroz: 0, precocido: 1, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 1, estado: 'PENDIENTE' },
        { agromercado: 'Metapan (Mercado municipal exrastro)', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 0, estado: 'SIN SALDO' },
        { agromercado: 'Colonia El Palmar', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 1, total: 1, estado: 'PENDIENTE' },
        { agromercado: 'Skate Park colonia IVU', arroz: 0, precocido: 12, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 12, estado: 'PENDIENTE' },
        { agromercado: 'Chalchuapa parque central', arroz: 13, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 1, harina: 1, total: 15, estado: 'PENDIENTE' },
        { agromercado: 'Nueva Concepcion parque municipal', arroz: 53, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 53, estado: 'PENDIENTE' },
        { agromercado: 'El Paraiso, cancha techada de parque municipal', arroz: 0, precocido: 0, frijol1: 0, frijol4: 4, frijol20: 0, aceite: 0, harina: 0, total: 4, estado: 'PENDIENTE' },
        { agromercado: 'Acajutla, mercado de Acajutla', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 5, total: 5, estado: 'PENDIENTE' },
        { agromercado: 'Armenia, parque de Armenia', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 0, estado: 'SIN SALDO' },
        { agromercado: 'Izalco, Casa Barrientos', arroz: 8, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 8, estado: 'PENDIENTE' },
        { agromercado: 'Santa Tecla, Parque Daniel Hernandez ( frente a mezon goya)', arroz: 7, precocido: 5, frijol1: 0, frijol4: 4, frijol20: 0, aceite: 0, harina: 0, total: 16, estado: 'PENDIENTE' },
        { agromercado: 'San Juan Opico, Parque Central', arroz: 6, precocido: 75, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 4, total: 85, estado: 'PENDIENTE' },
        { agromercado: 'Ciudad Arce, Parque Central', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 0, estado: 'SIN SALDO' },
        { agromercado: 'Quezaltepeque, Plaza Centenario', arroz: 4, precocido: 8, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 12, estado: 'PENDIENTE' },
        { agromercado: 'Parque Municipal Mario Molina', arroz: 0, precocido: 0, frijol1: 0, frijol4: 0, frijol20: 0, aceite: 0, harina: 0, total: 0, estado: 'SIN SALDO' }
      ],
      conciliacion: [
        { producto: 'Arroz', danado: 915, faltante: 0, retirado: 177, saldo: 910, porConciliar: 172 },
        { producto: 'Frijol 1 lb', danado: 770, faltante: 6, retirado: 51, saldo: 752, porConciliar: 27 },
        { producto: 'Arroz precocido', danado: 464, faltante: 0, retirado: 16, saldo: 461, porConciliar: 13 },
        { producto: 'Frijol 4 lb', danado: 92, faltante: 0, retirado: 0, saldo: 92, porConciliar: 0 },
        { producto: 'Aceite 750 ml', danado: 88, faltante: 0, retirado: 4, saldo: 88, porConciliar: 4 },
        { producto: 'Harina de maiz', danado: 85, faltante: 0, retirado: 4, saldo: 82, porConciliar: 1 },
        { producto: 'Frijol 20 lb', danado: 1, faltante: 0, retirado: 0, saldo: 1, porConciliar: 0 },
        { producto: 'TOTAL', danado: 2415, faltante: 6, retirado: 252, saldo: 2386, porConciliar: 217 }
      ],
      notas: 'Fuente: Reporte_actualizado_devoluciones_y_pesos_04-08-2026.xlsx'
    }];
  }

  function ensureDevolucionesData(){
    var reportes = readDevolucionesData();
    if(reportes.length) return reportes;
    reportes = buildDefaultDevoluciones();
    writeDevolucionesData(reportes);
    return reportes;
  }

  function devolucionesMarkup(){
    return [
      '<div class="card">',
        '<div class="card-header">',
          '<span>Devoluciones</span>',
          '<div class="flex gap-8 items-center flex-wrap">',
            '<button type="button" class="btn btn-sm btn-primary" onclick="renderDevolucionesReporte()">Actualizar</button>',
          '</div>',
        '</div>',
        '<div class="card-body">',
          '<div id="devoluciones-encabezado" style="margin-bottom:12px;"></div>',
          '<div class="report-summary-kpis" id="devoluciones-kpis"></div>',
          '<div class="report-summary-card" style="margin-top:10px;">',
            '<div class="report-summary-title">Resumen consolidado</div>',
            '<table class="report-summary-table" id="tbl-devoluciones">',
              '<thead><tr><th>Producto</th><th>Retirado 16-07</th><th>Retirado 20-07</th><th>Total retirado</th><th>Observaciones</th></tr></thead>',
              '<tbody></tbody>',
            '</table>',
          '</div>',
          '<div class="report-summary-card" style="margin-top:10px;">',
            '<div class="report-summary-title">Retiros realizados por agromercado</div>',
            '<div style="overflow:auto;">',
              '<table class="report-summary-table" id="tbl-devoluciones-retiros">',
                '<thead><tr><th>Fecha</th><th>Agromercado</th><th>Harina</th><th>Frijol 1 lb</th><th>Frijol 4 lb</th><th>Arroz blanco</th><th>Arroz precocido</th><th>Aceite</th><th>Total</th></tr></thead>',
                '<tbody></tbody>',
              '</table>',
            '</div>',
          '</div>',
          '<div class="report-summary-card" style="margin-top:10px;">',
            '<div class="report-summary-title">Pesos registrados</div>',
            '<table class="report-summary-table" id="tbl-devoluciones-pesos">',
              '<thead><tr><th>Producto</th><th>16-07 (LB)</th><th>20-07 (LB)</th><th>Total (LB)</th></tr></thead>',
              '<tbody></tbody>',
            '</table>',
          '</div>',
          '<div class="report-summary-card" style="margin-top:10px;">',
            '<div class="report-summary-title">Saldo pendiente por agromercado</div>',
            '<div style="overflow:auto;">',
              '<table class="report-summary-table" id="tbl-devoluciones-pendiente">',
                '<thead><tr><th>Agromercado</th><th>Arroz</th><th>Arroz precocido</th><th>Frijol 1 lb</th><th>Frijol 4 lb</th><th>Frijol 20 lb</th><th>Aceite 750 ml</th><th>Harina de maiz</th><th>Total</th><th>Estado</th></tr></thead>',
                '<tbody></tbody>',
              '</table>',
            '</div>',
          '</div>',
          '<div class="report-summary-card" style="margin-top:10px;">',
            '<div class="report-summary-title">Conciliacion 15-07</div>',
            '<table class="report-summary-table" id="tbl-devoluciones-conciliacion">',
              '<thead><tr><th>Producto</th><th>Dañado</th><th>Faltante</th><th>Retirado</th><th>Saldo pendiente</th><th>Por conciliar</th></tr></thead>',
              '<tbody></tbody>',
            '</table>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
  }

  function ensureDevolucionesTab(){
    var section = document.getElementById('tab-devoluciones');
    if(!section){
      var main = document.querySelector('main');
      if(!main) return;
      section = document.createElement('div');
      section.className = 'tab-content';
      section.id = 'tab-devoluciones';
      main.appendChild(section);
    }

    if(!section.querySelector('#devoluciones-kpis')){
      section.innerHTML = devolucionesMarkup();
    }
  }

  function fillTbody(tbody, rows, renderer){
    if(!tbody) return;
    tbody.innerHTML = rows.map(renderer).join('');
  }

  window.renderDevolucionesReporte = function(){
    ensureDevolucionesTab();
    var reportes = ensureDevolucionesData();
    var reporte = reportes[0];
    if(!reporte) return;

    var encabezado = document.getElementById('devoluciones-encabezado');
    if(encabezado){
      encabezado.innerHTML = '<div style="font-weight:900;font-size:1.08rem;">' + esc(reporte.titulo || 'Reporte de devoluciones') + '</div>' +
        '<div style="color:var(--muted,#64748b);font-size:.84rem;margin-top:2px;">' + esc(reporte.fuente || '') + ' | ' + esc(reporte.fecha || '') + '</div>';
    }

    var kpis = document.getElementById('devoluciones-kpis');
    if(kpis){
      kpis.innerHTML = [
        '<div class="report-summary-kpi"><span>Unidades retiradas</span><strong>' + esc(num(reporte.resumen && reporte.resumen.unidades)) + '</strong></div>',
        '<div class="report-summary-kpi"><span>Peso registrado</span><strong>' + esc(num(reporte.resumen && reporte.resumen.pesoLb).toFixed(1)) + ' lb</strong></div>',
        '<div class="report-summary-kpi"><span>Cajas registradas</span><strong>' + esc(num(reporte.resumen && reporte.resumen.cajas)) + '</strong></div>',
        '<div class="report-summary-kpi"><span>Pendiente</span><strong>' + esc(num(reporte.resumen && reporte.resumen.pendiente)) + '</strong></div>'
      ].join('');
    }

    fillTbody(document.querySelector('#tbl-devoluciones tbody'), reporte.resumenProductos || [], function(row){
      return '<tr>' +
        '<td style="text-align:left;font-weight:800;">' + esc(row.producto) + '</td>' +
        '<td>' + esc(row.retirado16) + '</td>' +
        '<td>' + esc(row.retirado20) + '</td>' +
        '<td><strong>' + esc(row.total) + '</strong></td>' +
        '<td style="text-align:left;">' + esc(row.observaciones || '') + '</td>' +
      '</tr>';
    });

    fillTbody(document.querySelector('#tbl-devoluciones-retiros tbody'), reporte.retiros || [], function(row){
      return '<tr>' +
        '<td>' + esc(asDate(row.fecha)) + '</td>' +
        '<td style="text-align:left;font-weight:800;">' + esc(row.agromercado) + '</td>' +
        '<td>' + esc(row.harina) + '</td>' +
        '<td>' + esc(row.frijol1) + '</td>' +
        '<td>' + esc(row.frijol4) + '</td>' +
        '<td>' + esc(row.arroz) + '</td>' +
        '<td>' + esc(row.precocido) + '</td>' +
        '<td>' + esc(row.aceite) + '</td>' +
        '<td><strong>' + esc(row.total) + '</strong></td>' +
      '</tr>';
    });

    fillTbody(document.querySelector('#tbl-devoluciones-pesos tbody'), reporte.pesos || [], function(row){
      return '<tr>' +
        '<td style="text-align:left;font-weight:800;">' + esc(row.producto) + '</td>' +
        '<td>' + esc(num(row.peso16).toFixed(1)) + '</td>' +
        '<td>' + esc(num(row.peso20).toFixed(1)) + '</td>' +
        '<td><strong>' + esc(num(row.total).toFixed(1)) + '</strong></td>' +
      '</tr>';
    });

    fillTbody(document.querySelector('#tbl-devoluciones-pendiente tbody'), reporte.pendiente || [], function(row){
      return '<tr>' +
        '<td style="text-align:left;font-weight:800;">' + esc(row.agromercado) + '</td>' +
        '<td>' + esc(row.arroz) + '</td>' +
        '<td>' + esc(row.precocido) + '</td>' +
        '<td>' + esc(row.frijol1) + '</td>' +
        '<td>' + esc(row.frijol4) + '</td>' +
        '<td>' + esc(row.frijol20) + '</td>' +
        '<td>' + esc(row.aceite) + '</td>' +
        '<td>' + esc(row.harina) + '</td>' +
        '<td><strong>' + esc(row.total) + '</strong></td>' +
        '<td>' + esc(row.estado) + '</td>' +
      '</tr>';
    });

    fillTbody(document.querySelector('#tbl-devoluciones-conciliacion tbody'), reporte.conciliacion || [], function(row){
      return '<tr>' +
        '<td style="text-align:left;font-weight:800;">' + esc(row.producto) + '</td>' +
        '<td>' + esc(row.danado) + '</td>' +
        '<td>' + esc(row.faltante) + '</td>' +
        '<td>' + esc(row.retirado) + '</td>' +
        '<td>' + esc(row.saldo) + '</td>' +
        '<td><strong>' + esc(row.porConciliar) + '</strong></td>' +
      '</tr>';
    });
  };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      ensureDevolucionesTab();
      renderDevolucionesReporte();
    }, 120);
  });
})();
