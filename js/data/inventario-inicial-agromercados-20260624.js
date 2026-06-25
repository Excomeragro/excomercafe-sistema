// Saldo inicial de inventario por agromercado, cargado desde Inventario agromercados 24-06-2026.xlsx.
(function(){
  var FECHA_SALDO = '2026-06-24';
  var REFERENCIA_SALDO = 'Saldo inicial agromercados 24/06/2026';
  var VERSION_SALDO = '20260624-v1';
  var STORAGE_MARKER = 'inventario-saldo-inicial-agromercados-20260624';
  var SOURCE_FILE = 'Inventario agromercados 24-06-2026.xlsx';
  var ROWS = [
  {
    "id": "saldo-inicial-agromercados-20260624-001",
    "excelRow": 2,
    "distrito": "AHUACHAPAN SUR",
    "agromercado": "San Francisco Menendez (Colonia La Palma)",
    "arroz": 320,
    "precocido": 119,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 31,
    "harina": 42,
    "total": 512
  },
  {
    "id": "saldo-inicial-agromercados-20260624-002",
    "excelRow": 3,
    "distrito": "SANTA ANA NORTE",
    "agromercado": "Metapan (Mercado municipal exrastro)",
    "arroz": 303,
    "precocido": 140,
    "frijol1": 505,
    "frijol4": 80,
    "aceite": 89,
    "harina": 35,
    "total": 1152
  },
  {
    "id": "saldo-inicial-agromercados-20260624-003",
    "excelRow": 4,
    "distrito": "SANTA ANA CENTRO",
    "agromercado": "Colonia El Palmar",
    "arroz": 80,
    "precocido": 164,
    "frijol1": 140,
    "frijol4": 80,
    "aceite": 84,
    "harina": 0,
    "total": 548
  },
  {
    "id": "saldo-inicial-agromercados-20260624-004",
    "excelRow": 5,
    "distrito": "SANTA ANA CENTRO",
    "agromercado": "Skate Park colonia IVU",
    "arroz": 241,
    "precocido": 105,
    "frijol1": 160,
    "frijol4": 132,
    "aceite": 67,
    "harina": 44,
    "total": 749
  },
  {
    "id": "saldo-inicial-agromercados-20260624-005",
    "excelRow": 6,
    "distrito": "SANTA ANA OESTE",
    "agromercado": "Chalchuapa parque central",
    "arroz": 400,
    "precocido": 168,
    "frijol1": 160,
    "frijol4": 80,
    "aceite": 18,
    "harina": 37,
    "total": 863
  },
  {
    "id": "saldo-inicial-agromercados-20260624-006",
    "excelRow": 7,
    "distrito": "CHALATENANGO CENTRO",
    "agromercado": "Nueva Concepcion parque municipal",
    "arroz": 166,
    "precocido": 143,
    "frijol1": 305,
    "frijol4": 0,
    "aceite": 18,
    "harina": 7,
    "total": 639
  },
  {
    "id": "saldo-inicial-agromercados-20260624-007",
    "excelRow": 8,
    "distrito": "CHALATENANGO CENTRO",
    "agromercado": "El Paraiso, cancha techada de parque municipal",
    "arroz": 481,
    "precocido": 143,
    "frijol1": 316,
    "frijol4": 0,
    "aceite": 60,
    "harina": 77,
    "total": 1077
  },
  {
    "id": "saldo-inicial-agromercados-20260624-008",
    "excelRow": 9,
    "distrito": "SONSONATE OESTE",
    "agromercado": "Acajutla, mercado de Acajutla",
    "arroz": 116,
    "precocido": 136,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 70,
    "harina": 27,
    "total": 349
  },
  {
    "id": "saldo-inicial-agromercados-20260624-009",
    "excelRow": 10,
    "distrito": "SONSONATE ESTE",
    "agromercado": "Armenia, parque de Armenia",
    "arroz": 423,
    "precocido": 138,
    "frijol1": 240,
    "frijol4": 128,
    "aceite": 41,
    "harina": 23,
    "total": 993
  },
  {
    "id": "saldo-inicial-agromercados-20260624-010",
    "excelRow": 11,
    "distrito": "SONSONATE ESTE",
    "agromercado": "Izalco, Casa Barrientos",
    "arroz": 160,
    "precocido": 166,
    "frijol1": 320,
    "frijol4": 0,
    "aceite": 61,
    "harina": 59,
    "total": 766
  },
  {
    "id": "saldo-inicial-agromercados-20260624-011",
    "excelRow": 12,
    "distrito": "LA LIBERTAD SUR",
    "agromercado": "Santa Tecla, Parque Daniel Hernandez ( frente a mezon goya)",
    "arroz": 33,
    "precocido": 160,
    "frijol1": 270,
    "frijol4": 0,
    "aceite": 53,
    "harina": 37,
    "total": 553
  },
  {
    "id": "saldo-inicial-agromercados-20260624-012",
    "excelRow": 13,
    "distrito": "LA LIBERTAD CENTRO",
    "agromercado": "San Juan Opico, Parque Central",
    "arroz": 160,
    "precocido": 128,
    "frijol1": 880,
    "frijol4": 80,
    "aceite": 48,
    "harina": 52,
    "total": 1348
  },
  {
    "id": "saldo-inicial-agromercados-20260624-013",
    "excelRow": 14,
    "distrito": "LA LIBERTAD CENTRO",
    "agromercado": "Ciudad Arce, Parque Central",
    "arroz": 0,
    "precocido": 120,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 56,
    "harina": 89,
    "total": 265
  },
  {
    "id": "saldo-inicial-agromercados-20260624-014",
    "excelRow": 15,
    "distrito": "LA LIBERTAD NORTE",
    "agromercado": "Quezaltepeque, Plaza Centenario",
    "arroz": 400,
    "precocido": 85,
    "frijol1": 240,
    "frijol4": 0,
    "aceite": 167,
    "harina": 27,
    "total": 919
  },
  {
    "id": "saldo-inicial-agromercados-20260624-015",
    "excelRow": 16,
    "distrito": "LA LIBERTAD COSTA",
    "agromercado": "Parque Municipal Mario Molina",
    "arroz": 727,
    "precocido": 217,
    "frijol1": 720,
    "frijol4": 0,
    "aceite": 167,
    "harina": 36,
    "total": 1867
  },
  {
    "id": "saldo-inicial-agromercados-20260624-016",
    "excelRow": 17,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Alcaldia de Mejicanos",
    "arroz": 240,
    "precocido": 155,
    "frijol1": 652,
    "frijol4": 0,
    "aceite": 80,
    "harina": 57,
    "total": 1184
  },
  {
    "id": "saldo-inicial-agromercados-20260624-017",
    "excelRow": 18,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Ciudad Delgado, Plaza Monseñor Romero",
    "arroz": 493,
    "precocido": 165,
    "frijol1": 328,
    "frijol4": 0,
    "aceite": 75,
    "harina": 34,
    "total": 1095
  },
  {
    "id": "saldo-inicial-agromercados-20260624-018",
    "excelRow": 19,
    "distrito": "SAN SALVADOR OESTE",
    "agromercado": "Apopa, Parque Central Noe Canjura",
    "arroz": 480,
    "precocido": 106,
    "frijol1": 640,
    "frijol4": 0,
    "aceite": 20,
    "harina": 71,
    "total": 1317
  },
  {
    "id": "saldo-inicial-agromercados-20260624-019",
    "excelRow": 20,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Ilopango, TICSA",
    "arroz": 147,
    "precocido": 160,
    "frijol1": 732,
    "frijol4": 240,
    "aceite": 48,
    "harina": 71,
    "total": 1398
  },
  {
    "id": "saldo-inicial-agromercados-20260624-020",
    "excelRow": 21,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Soyapango, Redondel de Unicentro",
    "arroz": 0,
    "precocido": 185,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 19,
    "harina": 56,
    "total": 260
  },
  {
    "id": "saldo-inicial-agromercados-20260624-021",
    "excelRow": 22,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "San Martin, Alcaldia de San Martin",
    "arroz": 193,
    "precocido": 204,
    "frijol1": 400,
    "frijol4": 124,
    "aceite": 62,
    "harina": 23,
    "total": 1006
  },
  {
    "id": "saldo-inicial-agromercados-20260624-022",
    "excelRow": 23,
    "distrito": "SAN SALVADOR ESTE",
    "agromercado": "Ilopango, Esquina Polideportivo Altavista",
    "arroz": 195,
    "precocido": 192,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 31,
    "harina": 66,
    "total": 484
  },
  {
    "id": "saldo-inicial-agromercados-20260624-023",
    "excelRow": 24,
    "distrito": "SAN SALVADOR SUR",
    "agromercado": "San Marcos, Parque Joyas de Esperanza y Paz",
    "arroz": 260,
    "precocido": 136,
    "frijol1": 585,
    "frijol4": 0,
    "aceite": 6,
    "harina": 42,
    "total": 1029
  },
  {
    "id": "saldo-inicial-agromercados-20260624-024",
    "excelRow": 25,
    "distrito": "SAN SALVADOR CENTRO",
    "agromercado": "Ayutuxtepeque, Plaza Municipal ( Parque Bonanza Agromercado)",
    "arroz": 80,
    "precocido": 177,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 32,
    "harina": 21,
    "total": 310
  },
  {
    "id": "saldo-inicial-agromercados-20260624-025",
    "excelRow": 26,
    "distrito": "CUSCATLAN SUR",
    "agromercado": "Cojutepeque, parque Alamedas",
    "arroz": 460,
    "precocido": 98,
    "frijol1": 920,
    "frijol4": 0,
    "aceite": 63,
    "harina": 71,
    "total": 1612
  },
  {
    "id": "saldo-inicial-agromercados-20260624-026",
    "excelRow": 27,
    "distrito": "CABAÑAS ESTE",
    "agromercado": "Sensuntepeque, Parque Central",
    "arroz": 240,
    "precocido": 160,
    "frijol1": 480,
    "frijol4": 80,
    "aceite": 26,
    "harina": 1,
    "total": 987
  },
  {
    "id": "saldo-inicial-agromercados-20260624-027",
    "excelRow": 28,
    "distrito": "CABAÑAS OESTE",
    "agromercado": "Ilobasco, Parque Central",
    "arroz": 0,
    "precocido": 188,
    "frijol1": 320,
    "frijol4": 320,
    "aceite": 40,
    "harina": 63,
    "total": 931
  },
  {
    "id": "saldo-inicial-agromercados-20260624-028",
    "excelRow": 29,
    "distrito": "SAN VICENTE SUR",
    "agromercado": "Esquina Cancha Tacon",
    "arroz": 235,
    "precocido": 191,
    "frijol1": 314,
    "frijol4": 0,
    "aceite": 37,
    "harina": 38,
    "total": 815
  },
  {
    "id": "saldo-inicial-agromercados-20260624-029",
    "excelRow": 30,
    "distrito": "LA PAZ ESTE",
    "agromercado": "Zacatecoluca, Plaza Civica",
    "arroz": 240,
    "precocido": 0,
    "frijol1": 800,
    "frijol4": 0,
    "aceite": 0,
    "harina": 70,
    "total": 1110
  },
  {
    "id": "saldo-inicial-agromercados-20260624-030",
    "excelRow": 31,
    "distrito": "SAN MIGUEL OESTE",
    "agromercado": "Chinameca, Parque Central",
    "arroz": 331,
    "precocido": 128,
    "frijol1": 181,
    "frijol4": 140,
    "aceite": 18,
    "harina": 52,
    "total": 850
  },
  {
    "id": "saldo-inicial-agromercados-20260624-031",
    "excelRow": 32,
    "distrito": "SAN MIGUEL CENTRO",
    "agromercado": "Centro de Gobierno Municipal",
    "arroz": 338,
    "precocido": 169,
    "frijol1": 1044,
    "frijol4": 80,
    "aceite": 138,
    "harina": 38,
    "total": 1807
  },
  {
    "id": "saldo-inicial-agromercados-20260624-032",
    "excelRow": 33,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Jocoaltique, supermercado los quebrachos",
    "arroz": 0,
    "precocido": 114,
    "frijol1": 425,
    "frijol4": 100,
    "aceite": 105,
    "harina": 34,
    "total": 778
  },
  {
    "id": "saldo-inicial-agromercados-20260624-033",
    "excelRow": 34,
    "distrito": "USULUTAN OESTE",
    "agromercado": "Jiquilisco, esquina opuesta a la Alcaldia Municipal",
    "arroz": 0,
    "precocido": 158,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 56,
    "harina": 53,
    "total": 267
  },
  {
    "id": "saldo-inicial-agromercados-20260624-034",
    "excelRow": 35,
    "distrito": "LA UNION SUR",
    "agromercado": "Frente a la parroquia Carlos Borromeo",
    "arroz": 400,
    "precocido": 160,
    "frijol1": 982,
    "frijol4": 0,
    "aceite": 145,
    "harina": 8,
    "total": 1695
  },
  {
    "id": "saldo-inicial-agromercados-20260624-035",
    "excelRow": 36,
    "distrito": "AHUACHAPAN CENTRO",
    "agromercado": "Parque Concordia",
    "arroz": 0,
    "precocido": 240,
    "frijol1": 195,
    "frijol4": 0,
    "aceite": 160,
    "harina": 5,
    "total": 600
  },
  {
    "id": "saldo-inicial-agromercados-20260624-036",
    "excelRow": 37,
    "distrito": "SONSONATE CENTRO",
    "agromercado": "Parque Rafael Campos, 7a. Calle Poniente, 7a. Calle Oriente",
    "arroz": 80,
    "precocido": 80,
    "frijol1": 0,
    "frijol4": 0,
    "aceite": 112,
    "harina": 0,
    "total": 272
  },
  {
    "id": "saldo-inicial-agromercados-20260624-037",
    "excelRow": 38,
    "distrito": "USULUTAN CENTRO",
    "agromercado": "Mercado Municipal #5, Final 18 Ave Norte Mercado Municipal #5",
    "arroz": 0,
    "precocido": 104,
    "frijol1": 480,
    "frijol4": 0,
    "aceite": 5,
    "harina": 0,
    "total": 589
  },
  {
    "id": "saldo-inicial-agromercados-20260624-038",
    "excelRow": 39,
    "distrito": "SANTA ROSA DE LIMA",
    "agromercado": "Santa Rosa de Lima, Terminal de Buses Santa Rosa de Lima",
    "arroz": 400,
    "precocido": 167,
    "frijol1": 1041,
    "frijol4": 172,
    "aceite": 21,
    "harina": 22,
    "total": 1823
  },
  {
    "id": "saldo-inicial-agromercados-20260624-039",
    "excelRow": 40,
    "distrito": "CHALATENANGO SUR",
    "agromercado": "Placita El Calvario",
    "arroz": 207,
    "precocido": 138,
    "frijol1": 109,
    "frijol4": 80,
    "aceite": 42,
    "harina": 64,
    "total": 640
  },
  {
    "id": "saldo-inicial-agromercados-20260624-040",
    "excelRow": 41,
    "distrito": "LA LIBERTAD ESTE",
    "agromercado": "Distrito 2 Nuevo Lourdes (centro lourdes, banco agricola)",
    "arroz": 240,
    "precocido": 160,
    "frijol1": 240,
    "frijol4": 0,
    "aceite": 0,
    "harina": 17,
    "total": 657
  },
  {
    "id": "saldo-inicial-agromercados-20260624-041",
    "excelRow": 42,
    "distrito": "SAN SALVADOR NORTE",
    "agromercado": "Parque Central Aguilares",
    "arroz": 293,
    "precocido": 118,
    "frijol1": 97,
    "frijol4": 0,
    "aceite": 25,
    "harina": 35,
    "total": 568
  },
  {
    "id": "saldo-inicial-agromercados-20260624-042",
    "excelRow": 43,
    "distrito": "CUSCATLAN NORTE",
    "agromercado": "Frente a la Alcaldia de Suchitoto",
    "arroz": 416,
    "precocido": 56,
    "frijol1": 286,
    "frijol4": 400,
    "aceite": 63,
    "harina": 43,
    "total": 1264
  },
  {
    "id": "saldo-inicial-agromercados-20260624-043",
    "excelRow": 44,
    "distrito": "LA PAZ ESTE",
    "agromercado": "Parque Ecologico Olocuilta",
    "arroz": 282,
    "precocido": 72,
    "frijol1": 54,
    "frijol4": 0,
    "aceite": 82,
    "harina": 38,
    "total": 528
  },
  {
    "id": "saldo-inicial-agromercados-20260624-044",
    "excelRow": 45,
    "distrito": "MORAZAN SUR",
    "agromercado": "Campo de La Feria San Francisco Gotera",
    "arroz": 829,
    "precocido": 352,
    "frijol1": 1248,
    "frijol4": 608,
    "aceite": 125,
    "harina": 57,
    "total": 3219
  },
  {
    "id": "saldo-inicial-agromercados-20260624-045",
    "excelRow": 46,
    "distrito": "EL CONGO",
    "agromercado": "Polideportivo El Congo",
    "arroz": 147,
    "precocido": 162,
    "frijol1": 818,
    "frijol4": 80,
    "aceite": 107,
    "harina": 71,
    "total": 1385
  },
  {
    "id": "saldo-inicial-agromercados-20260624-046",
    "excelRow": 47,
    "distrito": "LA LIBERTAD",
    "agromercado": "Zaragoza",
    "arroz": 68,
    "precocido": 170,
    "frijol1": 521,
    "frijol4": 56,
    "aceite": 58,
    "harina": 63,
    "total": 936
  },
  {
    "id": "saldo-inicial-agromercados-20260624-047",
    "excelRow": 48,
    "distrito": "LA UNION NORTE",
    "agromercado": "Apastepeque",
    "arroz": 198,
    "precocido": 182,
    "frijol1": 659,
    "frijol4": 80,
    "aceite": 17,
    "harina": 73,
    "total": 1209
  },
  {
    "id": "saldo-inicial-agromercados-20260624-048",
    "excelRow": 49,
    "distrito": "LA UNION NORTE",
    "agromercado": "Anamoros calle cirilo bonilla umanzor",
    "arroz": 271,
    "precocido": 177,
    "frijol1": 501,
    "frijol4": 84,
    "aceite": 0,
    "harina": 44,
    "total": 1077
  },
  {
    "id": "saldo-inicial-agromercados-20260624-049",
    "excelRow": 50,
    "distrito": "SAN MIGUEL NORTE",
    "agromercado": "Ciudad barrios tiangue municipal",
    "arroz": 111,
    "precocido": 153,
    "frijol1": 240,
    "frijol4": 204,
    "aceite": 19,
    "harina": 16,
    "total": 743
  },
  {
    "id": "saldo-inicial-agromercados-20260624-050",
    "excelRow": 51,
    "distrito": "USULUTAN NORTE",
    "agromercado": "Parque de Alcaldia Municipal del Triunfo",
    "arroz": 352,
    "precocido": 201,
    "frijol1": 454,
    "frijol4": 160,
    "aceite": 154,
    "harina": 66,
    "total": 1387
  },
  {
    "id": "saldo-inicial-agromercados-20260624-051",
    "excelRow": 52,
    "distrito": "USULUTAN NORTE",
    "agromercado": "Parque Berlin de Ex injuve de Berlin",
    "arroz": 455,
    "precocido": 169,
    "frijol1": 383,
    "frijol4": 80,
    "aceite": 72,
    "harina": 57,
    "total": 1216
  },
  {
    "id": "saldo-inicial-agromercados-20260624-052",
    "excelRow": 53,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Jocoro Polideportivo Tierra de Fuego",
    "arroz": 320,
    "precocido": 151,
    "frijol1": 481,
    "frijol4": 0,
    "aceite": 71,
    "harina": 45,
    "total": 1068
  },
  {
    "id": "saldo-inicial-agromercados-20260624-053",
    "excelRow": 54,
    "distrito": "MORAZAN NORTE",
    "agromercado": "Corinto barrio las delicias",
    "arroz": 141,
    "precocido": 190,
    "frijol1": 31,
    "frijol4": 0,
    "aceite": 91,
    "harina": 40,
    "total": 493
  },
  {
    "id": "saldo-inicial-agromercados-20260624-054",
    "excelRow": 55,
    "distrito": "CUSCATLAN SUR",
    "agromercado": "San Rafael Cedro",
    "arroz": 560,
    "precocido": 197,
    "frijol1": 49,
    "frijol4": 0,
    "aceite": 61,
    "harina": 64,
    "total": 931
  },
  {
    "id": "saldo-inicial-agromercados-20260624-055",
    "excelRow": 56,
    "distrito": "LA LIBERTAD",
    "agromercado": "Santa Tecla 2",
    "arroz": 193,
    "precocido": 113,
    "frijol1": 383,
    "frijol4": 0,
    "aceite": 0,
    "harina": 73,
    "total": 762
  },
  {
    "id": "saldo-inicial-agromercados-20260624-056",
    "excelRow": 57,
    "distrito": "SAN MIGUEL CENTRO",
    "agromercado": "San Miguel Centro (Barraza)",
    "arroz": 118,
    "precocido": 49,
    "frijol1": 522,
    "frijol4": 80,
    "aceite": 40,
    "harina": 44,
    "total": 853
  },
  {
    "id": "saldo-inicial-agromercados-20260624-057",
    "excelRow": 58,
    "distrito": "Atiquizaya",
    "agromercado": "Av 5 de noviembre, contiguo a casa de la cultura de Atiquizaya",
    "arroz": 320,
    "precocido": 122,
    "frijol1": 160,
    "frijol4": 0,
    "aceite": 40,
    "harina": 43,
    "total": 685
  },
  {
    "id": "saldo-inicial-agromercados-20260624-058",
    "excelRow": 59,
    "distrito": "Sonsonate",
    "agromercado": "Bo el centro, 6a calle poniente, Juayua",
    "arroz": 111,
    "precocido": 277,
    "frijol1": 0,
    "frijol4": 8,
    "aceite": 40,
    "harina": 48,
    "total": 484
  },
  {
    "id": "saldo-inicial-agromercados-20260624-059",
    "excelRow": 60,
    "distrito": "SAN SALVADOR",
    "agromercado": "Km 12 Calle Alberto Masferrer , Santo Tomas",
    "arroz": 492,
    "precocido": 153,
    "frijol1": 1702,
    "frijol4": 456,
    "aceite": 30,
    "harina": 55,
    "total": 2888
  },
  {
    "id": "saldo-inicial-agromercados-20260624-060",
    "excelRow": 61,
    "distrito": "Usulutan",
    "agromercado": "Zona verde, colonia Las Mercedes 1ra salida hacia el Triunfo( SANTIAGO DE MARIA)",
    "arroz": 97,
    "precocido": 141,
    "frijol1": 693,
    "frijol4": 240,
    "aceite": 31,
    "harina": 46,
    "total": 1248
  },
  {
    "id": "saldo-inicial-agromercados-20260624-061",
    "excelRow": 62,
    "distrito": "San Miguel",
    "agromercado": "Barrio la cruz, km. 121 El Tránsito",
    "arroz": 240,
    "precocido": 160,
    "frijol1": 0,
    "frijol4": 400,
    "aceite": 0,
    "harina": 15,
    "total": 815
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

  function movimiento(row){
    return {
      id: row.id,
      local_id: row.id,
      fecha: FECHA_SALDO,
      ubicacion: 'agromercados',
      destino: row.agromercado,
      lugar: row.agromercado,
      agromercado: row.agromercado,
      distrito: row.distrito,
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
      timestamp: '2026-06-24T12:00:00.000-06:00',
      supabase_synced: false
    };
  }

  function importarSaldoInicial(){
    if (!window.localStorage || !ROWS.length) return;
    var inventario = readJson('inventario-data', []);
    if (!Array.isArray(inventario)) inventario = [];

    var ids = {};
    ROWS.forEach(function(row){ ids[row.id] = true; });

    var marker = readJson(STORAGE_MARKER, null);
    var completos = ROWS.every(function(row){
      return inventario.some(function(item){ return item && (item.id === row.id || item.local_id === row.id); });
    });
    if (marker && marker.version === VERSION_SALDO && completos) return;

    var limpio = inventario.filter(function(item){
      if (!item) return false;
      var id = item.id || item.local_id || '';
      return !ids[id] && String(item.referencia || '') !== REFERENCIA_SALDO;
    });

    var nuevos = ROWS.map(movimiento);
    localStorage.setItem('inventario-data', JSON.stringify(nuevos.concat(limpio)));
    localStorage.setItem(STORAGE_MARKER, JSON.stringify({
      version: VERSION_SALDO,
      fecha: FECHA_SALDO,
      registros: nuevos.length,
      totales: {"aceite": 3497, "arroz": 15283, "frijol1": 24406, "frijol4": 4852, "harina": 2605, "precocido": 9232},
      fuente: SOURCE_FILE,
      aplicado_en: new Date().toISOString()
    }));

    try {
      window.dispatchEvent(new CustomEvent('inventario-saldo-inicial-aplicado', {
        detail: { registros: nuevos.length, fecha: FECHA_SALDO }
      }));
    } catch(e) {}
  }

  window.INVENTARIO_INICIAL_AGROMERCADOS_20260624 = ROWS;
  window.aplicarSaldoInicialAgromercados20260624 = importarSaldoInicial;
  importarSaldoInicial();
})();
