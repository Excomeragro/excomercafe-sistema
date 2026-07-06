// Saldo inicial de inventario por agromercado, cargado desde Inventario al 29-06-2026.xlsx.
(function(){
  var FECHA_SALDO = '2026-06-29';
  var REFERENCIA_SALDO = 'Saldo inicial agromercados 29/06/2026';
  var VERSION_SALDO = '20260629-v1';
  var STORAGE_MARKER = 'inventario-saldo-inicial-agromercados-20260629';
  var STORAGE_DISABLED = 'inventario-saldo-inicial-agromercados-20260629-bloqueado';
  var SOURCE_FILE = 'Inventario al 29-06-2026.xlsx';
  var ROWS = [
  {
    "id": "saldo-inicial-agromercados-20260629-001",
    "excelRow": 4,
    "distrito": "AHUACHAPAN SUR",
    "agromercado": "San Francisco Menendez (Colonia La Palma)",
    "arroz": 323,
    "precocido": 122,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 29,
    "harina": 25,
    "total": 499
  },
  {
    "id": "saldo-inicial-agromercados-20260629-002",
    "excelRow": 5,
    "distrito": "SANTA ANA NORTE",
    "agromercado": "Metapan (Mercado municipal exrastro)",
    "arroz": 215,
    "precocido": 126,
    "frijol1": 501,
    "frijol4": 0,
    "aceite": 0,
    "harina": 10,
    "total": 852
  },
  {
    "id": "saldo-inicial-agromercados-20260629-003",
    "excelRow": 6,
    "distrito": "SANTA ANA CENTRO",
    "agromercado": "Colonia El Palmar",
    "arroz": 0,
    "precocido": 65,
    "frijol1": 312,
    "frijol4": 0,
    "aceite": 110,
    "harina": 0,
    "total": 487
  },
  {
    "id": "saldo-inicial-agromercados-20260629-004",
    "excelRow": 7,
    "distrito": "SANTA ANA CENTRO",
    "agromercado": "Skate Park colonia IVU",
    "arroz": 218,
    "precocido": 53,
    "frijol1": 654,
    "frijol4": 84,
    "aceite": 12,
    "harina": 0,
    "total": 1021
  },
  {
    "id": "saldo-inicial-agromercados-20260629-005",
    "excelRow": 8,
    "distrito": "SANTA ANA OESTE",
    "agromercado": "Chalchuapa parque central",
    "arroz": 0,
    "precocido": 104,
    "frijol1": 160,
    "frijol4": 80,
    "aceite": 33,
    "harina": 0,
    "total": 377
  },
  {
    "id": "saldo-inicial-agromercados-20260629-006",
    "excelRow": 9,
    "distrito": "CHALATENANGO CENTRO",
    "agromercado": "Nueva Concepcion parque municipal",
    "arroz": 28,
    "precocido": 80,
    "frijol1": 198,
    "frijol4": 0,
    "aceite": 33,
    "harina": 0,
    "total": 339
  },
  {
    "id": "saldo-inicial-agromercados-20260629-007",
    "excelRow": 10,
    "distrito": "CHALATENANGO CENTRO",
    "agromercado": "El Paraiso, cancha techada de parque municipal",
    "arroz": 54,
    "precocido": 128,
    "frijol1": 220,
    "frijol4": 0,
    "aceite": 28,
    "harina": 45,
    "total": 475
  },
  {
    "id": "saldo-inicial-agromercados-20260629-008",
    "excelRow": 11,
    "distrito": "SONSONATE OESTE",
    "agromercado": "Acajutla, mercado de Acajutla",
    "arroz": 0,
    "precocido": 116,
    "frijol1": 248,
    "frijol4": 0,
    "aceite": 0,
    "harina": 28,
    "total": 392
  },
  {
    "id": "saldo-inicial-agromercados-20260629-009",
    "excelRow": 12,
    "distrito": "SONSONATE ESTE",
    "agromercado": "Armenia, parque de Armenia",
    "arroz": 0,
    "precocido": 120,
    "frijol1": 160,
    "frijol4": 88,
    "aceite": 42,
    "harina": 0,
    "total": 410
  },
  {
    "id": "saldo-inicial-agromercados-20260629-010",
    "excelRow": 13,
    "distrito": "SONSONATE ESTE",
    "agromercado": "Izalco, Casa Barrientos",
    "arroz": 0,
    "precocido": 100,
    "frijol1": 28,
    "frijol4": 0,
    "aceite": 30,
    "harina": 45,
    "total": 203
  },
  {
    "id": "saldo-inicial-agromercados-20260629-011",
    "excelRow": 14,
    "distrito": "LA LIBERTAD SUR",
    "agromercado": "Santa Tecla, Parque Daniel Hernandez ( frente a mezon goya)",
    "arroz": 160,
    "precocido": 240,
    "frijol1": 787,
    "frijol4": 80,
    "aceite": 87,
    "harina": 0,
    "total": 1354
  },
  {
    "id": "saldo-inicial-agromercados-20260629-012",
    "excelRow": 15,
    "distrito": "LA LIBERTAD CENTRO",
    "agromercado": "San Juan Opico, Parque Central",
    "arroz": 160,
    "precocido": 0,
    "frijol1": 320,
    "frijol4": 0,
    "aceite": 6,
    "harina": 38,
    "total": 524
  },
  {
    "id": "saldo-inicial-agromercados-20260629-013",
    "excelRow": 16,
    "distrito": "LA LIBERTAD CENTRO",
    "agromercado": "Ciudad Arce, Parque Central",
    "arroz": 106,
    "precocido": 132,
    "frijol1": 192,
    "frijol4": 0,
    "aceite": 39,
    "harina": 30,
    "total": 499
  },
  {
    "id": "saldo-inicial-agromercados-20260629-014",
    "excelRow": 17,
    "distrito": "LA LIBERTAD NORTE",
    "agromercado": "Quezaltepeque, Plaza Centenario",
    "arroz": 0,
    "precocido": 80,
    "frijol1": 160,
    "frijol4": 160,
    "aceite": 20,
    "harina": 0,
    "total": 420
  },
  {
    "id": "saldo-inicial-agromercados-20260629-015",
    "excelRow": 18,
    "distrito": "LA LIBERTAD COSTA",
    "agromercado": "Parque Municipal Mario Molina",
    "arroz": 160,
    "precocido": 80,
    "frijol1": 400,
    "frijol4": 0,
    "aceite": 40,
    "harina": 0,
    "total": 680
  },
  {
    "id": "saldo-inicial-agromercados-20260629-016",
    "excelRow": 19,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Alcaldia de Mejicanos",
    "arroz": 0,
    "precocido": 119,
    "frijol1": 640,
    "frijol4": 0,
    "aceite": 13,
    "harina": 9,
    "total": 781
  },
  {
    "id": "saldo-inicial-agromercados-20260629-017",
    "excelRow": 20,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Ciudad Delgado, Plaza Monseñor Romero",
    "arroz": 355,
    "precocido": 108,
    "frijol1": 1201,
    "frijol4": 0,
    "aceite": 79,
    "harina": 29,
    "total": 1772
  },
  {
    "id": "saldo-inicial-agromercados-20260629-018",
    "excelRow": 21,
    "distrito": "SAN SALVADOR OESTE",
    "agromercado": "Apopa, Parque Central Noe Canjura",
    "arroz": 80,
    "precocido": 92,
    "frijol1": 480,
    "frijol4": 0,
    "aceite": 29,
    "harina": 0,
    "total": 681
  },
  {
    "id": "saldo-inicial-agromercados-20260629-019",
    "excelRow": 22,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Ilopango, TICSA",
    "arroz": 383,
    "precocido": 146,
    "frijol1": 1440,
    "frijol4": 0,
    "aceite": 120,
    "harina": 55,
    "total": 2144
  },
  {
    "id": "saldo-inicial-agromercados-20260629-020",
    "excelRow": 23,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Soyapango, Redondel de Unicentro",
    "arroz": 163,
    "precocido": 89,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 37,
    "harina": 22,
    "total": 311
  },
  {
    "id": "saldo-inicial-agromercados-20260629-021",
    "excelRow": 24,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "San Martin, Alcaldia de San Martin",
    "arroz": 81,
    "precocido": 84,
    "frijol1": 436,
    "frijol4": 0,
    "aceite": 27,
    "harina": 0,
    "total": 628
  },
  {
    "id": "saldo-inicial-agromercados-20260629-022",
    "excelRow": 25,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Ilopango, Esquina Polideportivo Altavista",
    "arroz": 195,
    "precocido": 65,
    "frijol1": 640,
    "frijol4": 0,
    "aceite": 0,
    "harina": 39,
    "total": 939
  },
  {
    "id": "saldo-inicial-agromercados-20260629-023",
    "excelRow": 26,
    "distrito": "SAN SALVADOR SUR",
    "agromercado": "San Marcos, Parque Joyas de Esperanza y Paz",
    "arroz": 160,
    "precocido": 58,
    "frijol1": 839,
    "frijol4": 0,
    "aceite": 9,
    "harina": 10,
    "total": 1076
  },
  {
    "id": "saldo-inicial-agromercados-20260629-024",
    "excelRow": 27,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Ayutuxtepeque, Plaza Municipal ( Parque Bonanza Agromercado)",
    "arroz": 0,
    "precocido": 0,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 36,
    "harina": 0,
    "total": 36
  },
  {
    "id": "saldo-inicial-agromercados-20260629-025",
    "excelRow": 28,
    "distrito": "CUSCATLAN SUR",
    "agromercado": "Cojutepeque, parque Alamedas",
    "arroz": 506,
    "precocido": 79,
    "frijol1": 682,
    "frijol4": 0,
    "aceite": 31,
    "harina": 12,
    "total": 1310
  },
  {
    "id": "saldo-inicial-agromercados-20260629-026",
    "excelRow": 29,
    "distrito": "CABAÑAS ESTE",
    "agromercado": "Sensuntepeque, Parque Central",
    "arroz": 20,
    "precocido": 90,
    "frijol1": 400,
    "frijol4": 0,
    "aceite": 52,
    "harina": 13,
    "total": 575
  },
  {
    "id": "saldo-inicial-agromercados-20260629-027",
    "excelRow": 30,
    "distrito": "CABAÑAS OESTE",
    "agromercado": "Ilobasco, Parque Central",
    "arroz": 160,
    "precocido": 111,
    "frijol1": 1200,
    "frijol4": 0,
    "aceite": 37,
    "harina": 38,
    "total": 1546
  },
  {
    "id": "saldo-inicial-agromercados-20260629-028",
    "excelRow": 31,
    "distrito": "SAN VICENTE SUR",
    "agromercado": "Esquina Cancha Tacon",
    "arroz": 620,
    "precocido": 68,
    "frijol1": 1305,
    "frijol4": 0,
    "aceite": 46,
    "harina": 24,
    "total": 2063
  },
  {
    "id": "saldo-inicial-agromercados-20260629-029",
    "excelRow": 32,
    "distrito": "LA PAZ ESTE",
    "agromercado": "Zacatecoluca, Plaza Civica",
    "arroz": 633,
    "precocido": 272,
    "frijol1": 880,
    "frijol4": 0,
    "aceite": 0,
    "harina": 4,
    "total": 1789
  },
  {
    "id": "saldo-inicial-agromercados-20260629-030",
    "excelRow": 33,
    "distrito": "SAN MIGUEL OESTE",
    "agromercado": "Chinameca, Parque Central",
    "arroz": 344,
    "precocido": 157,
    "frijol1": 839,
    "frijol4": 68,
    "aceite": 0,
    "harina": 15,
    "total": 1423
  },
  {
    "id": "saldo-inicial-agromercados-20260629-031",
    "excelRow": 34,
    "distrito": "SAN MIGUEL CENTRO",
    "agromercado": "Centro de Gobierno Municipal",
    "arroz": 43,
    "precocido": 184,
    "frijol1": 429,
    "frijol4": 0,
    "aceite": 48,
    "harina": 3,
    "total": 707
  },
  {
    "id": "saldo-inicial-agromercados-20260629-032",
    "excelRow": 35,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Jocoaltique, supermercado los quebrachos",
    "arroz": 309,
    "precocido": 0,
    "frijol1": 326,
    "frijol4": 0,
    "aceite": 34,
    "harina": 16,
    "total": 685
  },
  {
    "id": "saldo-inicial-agromercados-20260629-033",
    "excelRow": 36,
    "distrito": "USULUTAN OESTE",
    "agromercado": "Jiquilisco, esquina opuesta a la Alcaldia Municipal",
    "arroz": 150,
    "precocido": 80,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 90,
    "harina": 42,
    "total": 362
  },
  {
    "id": "saldo-inicial-agromercados-20260629-034",
    "excelRow": 37,
    "distrito": "LA UNION SUR",
    "agromercado": "Frente a la parroquia Carlos Borromeo",
    "arroz": 480,
    "precocido": 240,
    "frijol1": 1040,
    "frijol4": 0,
    "aceite": 80,
    "harina": 0,
    "total": 1840
  },
  {
    "id": "saldo-inicial-agromercados-20260629-035",
    "excelRow": 38,
    "distrito": "AHUACHAPAN CENTRO",
    "agromercado": "Parque Concordia",
    "arroz": 0,
    "precocido": 139,
    "frijol1": 355,
    "frijol4": 0,
    "aceite": 12,
    "harina": 0,
    "total": 506
  },
  {
    "id": "saldo-inicial-agromercados-20260629-036",
    "excelRow": 39,
    "distrito": "SONSONATE CENTRO",
    "agromercado": "Parque Rafael Campos, 7a. Calle Poniente, 7a. Calle Oriente",
    "arroz": 726,
    "precocido": 284,
    "frijol1": 962,
    "frijol4": 0,
    "aceite": 100,
    "harina": 0,
    "total": 2072
  },
  {
    "id": "saldo-inicial-agromercados-20260629-037",
    "excelRow": 40,
    "distrito": "USULUTAN CENTRO",
    "agromercado": "Mercado Municipal #5, Final 18 Ave Norte Mercado Municipal #5",
    "arroz": 0,
    "precocido": 80,
    "frijol1": 160,
    "frijol4": 0,
    "aceite": 104,
    "harina": 10,
    "total": 354
  },
  {
    "id": "saldo-inicial-agromercados-20260629-038",
    "excelRow": 41,
    "distrito": "SANTA ROSA DE LIMA",
    "agromercado": "Santa Rosa de Lima, Terminal de Buses Santa Rosa de Lima",
    "arroz": 80,
    "precocido": 46,
    "frijol1": 708,
    "frijol4": 0,
    "aceite": 80,
    "harina": 0,
    "total": 914
  },
  {
    "id": "saldo-inicial-agromercados-20260629-039",
    "excelRow": 42,
    "distrito": "CHALATENANGO SUR",
    "agromercado": "Placita El Calvario",
    "arroz": 310,
    "precocido": 104,
    "frijol1": 790,
    "frijol4": 0,
    "aceite": 48,
    "harina": 30,
    "total": 1282
  },
  {
    "id": "saldo-inicial-agromercados-20260629-040",
    "excelRow": 43,
    "distrito": "LA LIBERTAD ESTE",
    "agromercado": "Distrito 2 Nuevo Lourdes (centro lourdes, banco agricola)",
    "arroz": 320,
    "precocido": 240,
    "frijol1": 160,
    "frijol4": 80,
    "aceite": 66,
    "harina": 0,
    "total": 866
  },
  {
    "id": "saldo-inicial-agromercados-20260629-041",
    "excelRow": 44,
    "distrito": "SAN SALVADOR NORTE",
    "agromercado": "Parque Central Aguilares",
    "arroz": 423,
    "precocido": 60,
    "frijol1": 1840,
    "frijol4": 0,
    "aceite": 0,
    "harina": 0,
    "total": 2323
  },
  {
    "id": "saldo-inicial-agromercados-20260629-042",
    "excelRow": 45,
    "distrito": "CUSCATLAN NORTE",
    "agromercado": "Frente a la Alcaldia de Suchitoto",
    "arroz": 68,
    "precocido": 53,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 57,
    "harina": 25,
    "total": 203
  },
  {
    "id": "saldo-inicial-agromercados-20260629-043",
    "excelRow": 46,
    "distrito": "LA PAZ ESTE",
    "agromercado": "Parque Ecologico Olocuilta",
    "arroz": 127,
    "precocido": 113,
    "frijol1": 594,
    "frijol4": 0,
    "aceite": 0,
    "harina": 21,
    "total": 855
  },
  {
    "id": "saldo-inicial-agromercados-20260629-044",
    "excelRow": 47,
    "distrito": "MORAZAN SUR",
    "agromercado": "Campo de La Feria San Francisco Gotera",
    "arroz": 485,
    "precocido": 138,
    "frijol1": 352,
    "frijol4": 500,
    "aceite": 0,
    "harina": 21,
    "total": 1496
  },
  {
    "id": "saldo-inicial-agromercados-20260629-045",
    "excelRow": 48,
    "distrito": "EL CONGO",
    "agromercado": "Polideportivo El Congo",
    "arroz": 400,
    "precocido": 44,
    "frijol1": 320,
    "frijol4": 160,
    "aceite": 0,
    "harina": 4,
    "total": 928
  },
  {
    "id": "saldo-inicial-agromercados-20260629-046",
    "excelRow": 49,
    "distrito": "LA LIBERTAD",
    "agromercado": "Zaragoza",
    "arroz": 160,
    "precocido": 65,
    "frijol1": 1020,
    "frijol4": 0,
    "aceite": 38,
    "harina": 23,
    "total": 1306
  },
  {
    "id": "saldo-inicial-agromercados-20260629-047",
    "excelRow": 50,
    "distrito": "LA UNION NORTE",
    "agromercado": "Apastepeque",
    "arroz": 105,
    "precocido": 147,
    "frijol1": 42,
    "frijol4": 0,
    "aceite": 44,
    "harina": 58,
    "total": 396
  },
  {
    "id": "saldo-inicial-agromercados-20260629-048",
    "excelRow": 51,
    "distrito": "LA UNION NORTE",
    "agromercado": "Anamoros calle cirilo bonilla umanzor",
    "arroz": 0,
    "precocido": 80,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 0,
    "harina": 11,
    "total": 91
  },
  {
    "id": "saldo-inicial-agromercados-20260629-049",
    "excelRow": 52,
    "distrito": "SAN MIGUEL NORTE",
    "agromercado": "Ciudad barrios tiangue municipal",
    "arroz": 0,
    "precocido": 111,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 44,
    "harina": 0,
    "total": 155
  },
  {
    "id": "saldo-inicial-agromercados-20260629-050",
    "excelRow": 53,
    "distrito": "USULUTAN NORTE",
    "agromercado": "Parque de Alcaldia Municipal del Triunfo",
    "arroz": 320,
    "precocido": 80,
    "frijol1": 160,
    "frijol4": 0,
    "aceite": 55,
    "harina": 3,
    "total": 618
  },
  {
    "id": "saldo-inicial-agromercados-20260629-051",
    "excelRow": 54,
    "distrito": "USULUTAN NORTE",
    "agromercado": "Parque Berlin de Ex injuve de Berlin",
    "arroz": 0,
    "precocido": 49,
    "frijol1": 108,
    "frijol4": 104,
    "aceite": 44,
    "harina": 0,
    "total": 305
  },
  {
    "id": "saldo-inicial-agromercados-20260629-052",
    "excelRow": 55,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Jocoro Polideportivo Tierra de Fuego",
    "arroz": 78,
    "precocido": 71,
    "frijol1": 320,
    "frijol4": 240,
    "aceite": 3,
    "harina": 39,
    "total": 751
  },
  {
    "id": "saldo-inicial-agromercados-20260629-053",
    "excelRow": 56,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Corinto barrio las delicias",
    "arroz": 42,
    "precocido": 27,
    "frijol1": 274,
    "frijol4": 312,
    "aceite": 10,
    "harina": 24,
    "total": 689
  },
  {
    "id": "saldo-inicial-agromercados-20260629-054",
    "excelRow": 57,
    "distrito": "CUSCATLAN SUR",
    "agromercado": "San Rafael Cedro",
    "arroz": 400,
    "precocido": 126,
    "frijol1": 495,
    "frijol4": 240,
    "aceite": 11,
    "harina": 29,
    "total": 1301
  },
  {
    "id": "saldo-inicial-agromercados-20260629-055",
    "excelRow": 58,
    "distrito": "LA LIBERTAD",
    "agromercado": "Santa Tecla 2",
    "arroz": 400,
    "precocido": 77,
    "frijol1": 587,
    "frijol4": 0,
    "aceite": 82,
    "harina": 50,
    "total": 1196
  },
  {
    "id": "saldo-inicial-agromercados-20260629-056",
    "excelRow": 59,
    "distrito": "SAN MIGUEL CENTRO",
    "agromercado": "San Miguel Centro (Barraza)",
    "arroz": 188,
    "precocido": 0,
    "frijol1": 81,
    "frijol4": 0,
    "aceite": 145,
    "harina": 0,
    "total": 414
  },
  {
    "id": "saldo-inicial-agromercados-20260629-057",
    "excelRow": 60,
    "distrito": "Atiquizaya",
    "agromercado": "Av 5 de noviembre, contiguo a casa de la cultura de Atiquizaya",
    "arroz": 560,
    "precocido": 122,
    "frijol1": 800,
    "frijol4": 0,
    "aceite": 20,
    "harina": 33,
    "total": 1535
  },
  {
    "id": "saldo-inicial-agromercados-20260629-058",
    "excelRow": 61,
    "distrito": "Sonsonate",
    "agromercado": "Bo el centro, 6a calle poniente, Juayua",
    "arroz": 80,
    "precocido": 94,
    "frijol1": 240,
    "frijol4": 80,
    "aceite": 20,
    "harina": 35,
    "total": 549
  },
  {
    "id": "saldo-inicial-agromercados-20260629-059",
    "excelRow": 62,
    "distrito": "SAN SALVADOR",
    "agromercado": "Km 12 Calle Alberto Masferrer , Santo Tomas",
    "arroz": 378,
    "precocido": 117,
    "frijol1": 1567,
    "frijol4": 0,
    "aceite": 15,
    "harina": 37,
    "total": 2114
  },
  {
    "id": "saldo-inicial-agromercados-20260629-060",
    "excelRow": 63,
    "distrito": "Usulutan",
    "agromercado": "Zona verde, colonia Las Mercedes 1ra salida hacia el Triunfo( SANTIAGO DE MARIA)",
    "arroz": 400,
    "precocido": 120,
    "frijol1": 960,
    "frijol4": 540,
    "aceite": 53,
    "harina": 0,
    "total": 2073
  },
  {
    "id": "saldo-inicial-agromercados-20260629-061",
    "excelRow": 64,
    "distrito": "San Miguel",
    "agromercado": "Barrio la cruz, km. 121 El Tránsito",
    "arroz": 880,
    "precocido": 0,
    "frijol1": 560,
    "frijol4": 0,
    "aceite": 120,
    "harina": 18,
    "total": 1578
  }
];

  function readJson(key, fallback){
    try {
      var data = JSON.parse(localStorage.getItem(key) || 'null');
      return data == null ? fallback : data;
    } catch(e) {
      return fallback;
    }
  }

  function normalizeText(value){
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  function buscarDistritoSistema(nombre, fallback){
    var target = normalizeText(nombre);
    var meta = fallback || '';
    try {
      if (target && typeof AGROMERCADOS_DATA !== 'undefined') {
        Object.keys(AGROMERCADOS_DATA).some(function(distrito){
          return (AGROMERCADOS_DATA[distrito] || []).some(function(item){
            var agro = item && (item.a || item.nombre || item.agromercado);
            if (normalizeText(agro) === target) {
              meta = distrito;
              return true;
            }
            return false;
          });
        });
      }
      if (!meta && target) {
        (readJson('agromercados-data', []) || []).some(function(item){
          var agro = item && (item.agromercado || item.nombre || item.a);
          if (normalizeText(agro) === target) {
            meta = item.distrito || item.departamento || '';
            return true;
          }
          return false;
        });
      }
    } catch(e) {}
    return meta || fallback || '';
  }

  function movimiento(row){
    var distrito = buscarDistritoSistema(row.agromercado, row.distrito);
    return {
      id: row.id,
      local_id: row.id,
      fecha: FECHA_SALDO,
      ubicacion: 'agromercados',
      destino: row.agromercado,
      lugar: row.agromercado,
      lugarEspecifico: row.agromercado,
      agromercado: row.agromercado,
      distrito: distrito,
      tipo: 'saldo-inicial',
      referencia: REFERENCIA_SALDO,
      arroz: Number(row.arroz || 0),
      precocido: Number(row.precocido || 0),
      frijol1: Number(row.frijol1 || 0),
      frijol4: Number(row.frijol4 || 0),
      aceite: Number(row.aceite || 0),
      harina: Number(row.harina || 0),
      total: Number(row.total || 0),
      observaciones: REFERENCIA_SALDO + ' - ' + SOURCE_FILE,
      origen: SOURCE_FILE,
      excelRow: row.excelRow,
      timestamp: '2026-06-29T12:00:00.000-06:00',
      supabase_synced: false
    };
  }

  function esSaldoInicialAgromercado(item){
    if (!item) return false;
    var id = String(item.id || item.local_id || '');
    var referencia = String(item.referencia || '');
    var origen = String(item.origen || '');
    return id.indexOf('saldo-inicial-agromercados-') === 0
      || referencia.indexOf('Saldo inicial agromercados') === 0
      || origen === 'Inventario agromercados 24-06-2026.xlsx'
      || origen === SOURCE_FILE;
  }

  function importarSaldoInicial(opciones){
    opciones = opciones || {};
    if (!window.localStorage || !ROWS.length) return { ok:false, registros:0 };
    if (localStorage.getItem('excomercafe_reset_applied') === 'reset-20260706-inventario-limpio') {
      localStorage.setItem(STORAGE_DISABLED, 'true');
      return { ok:false, skipped:true, reset:true, registros:0 };
    }
    if (!opciones.force && localStorage.getItem(STORAGE_DISABLED) === 'true') {
      return { ok:false, skipped:true, disabled:true, registros:0 };
    }

    var inventario = readJson('inventario-data', []);
    if (!Array.isArray(inventario)) inventario = [];

    var marker = readJson(STORAGE_MARKER, null);
    var completos = ROWS.every(function(row){
      return inventario.some(function(item){ return item && (item.id === row.id || item.local_id === row.id); });
    });
    if (!opciones.force && marker && marker.version === VERSION_SALDO && completos) {
      return { ok:true, skipped:true, registros:ROWS.length };
    }

    var limpio = inventario.filter(function(item){ return !esSaldoInicialAgromercado(item); });
    var nuevos = ROWS.map(movimiento);
    localStorage.setItem('inventario-data', JSON.stringify(nuevos.concat(limpio)));
    localStorage.removeItem(STORAGE_DISABLED);
    localStorage.setItem(STORAGE_MARKER, JSON.stringify({
      version: VERSION_SALDO,
      fecha: FECHA_SALDO,
      registros: nuevos.length,
      totales: {"aceite": 2448, "arroz": 13036, "frijol1": 30572, "frijol4": 2816, "harina": 1023, "precocido": 6175},
      fuente: SOURCE_FILE,
      aplicado_en: new Date().toISOString()
    }));

    try {
      if (typeof inventarioData !== 'undefined') inventarioData = readJson('inventario-data', []);
      window.dispatchEvent(new CustomEvent('inventario-saldo-inicial-aplicado', {
        detail: { registros: nuevos.length, fecha: FECHA_SALDO, fuente: SOURCE_FILE }
      }));
    } catch(e) {}

    if (opciones.refrescar !== false && typeof refrescarInventarioEnTiempoReal === 'function') {
      refrescarInventarioEnTiempoReal();
    }

    if (opciones.sync === true && typeof window.sincronizarPendientesSupabase === 'function') {
      window.sincronizarPendientesSupabase({ noInterrupt:true, silent:true }).catch(function(error){
        console.warn('No se pudo sincronizar saldo inicial de inventario:', error);
      });
    }

    return { ok:true, registros:nuevos.length, fecha:FECHA_SALDO, totales:{"aceite": 2448, "arroz": 13036, "frijol1": 30572, "frijol4": 2816, "harina": 1023, "precocido": 6175} };
  }

  window.INVENTARIO_INICIAL_AGROMERCADOS_20260629 = ROWS;
  window.aplicarSaldoInicialAgromercados20260629 = importarSaldoInicial;
  window.aplicarSaldoInicialAgromercados20260624 = importarSaldoInicial;
  importarSaldoInicial();
})();
