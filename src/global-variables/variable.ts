export var global = {

    //id_boutique: 'VIDE!',
    premierLancement: true,
    langue: 'fr',
    estConnecte: false,
    info_user: null,
    info_connexion: null,
    info_db:{
        ip: '@ip:5984',
        nom_db: 'nom_db'// 'fuma_frn_app',
    }, 
    pays: {
        "_id": "pays",
        "data": [
            {
                "id": "NG",
                "nom": "Niger"
            }
        ]
    },
    region: {
        "_id": "region",
        "data": [
            {
                "id": "MDI",
                "nom": "Maradi",
                "id_pays": "NG"
            }
        ]
    },
    commune: {
        "_id": "commune",
        "data": [
            {
                "id": "GB",
                "nom": "GABI",
                "id_departement": "MD"
            },
            {
                "id": "SF",
                "nom": "Safo",
                "id_departement": "MD"
            },
            {
                "id": "MD",
                "nom": "Madarounfa",
                "id_departement": "MD"
            },
            {
                "id": "DJ",
                "nom": "Djirataoua",
                "id_departement": "MD"
            },
            {
                "id": "SH",
                "nom": "Serkin_Haoussa",
                "id_departement": "MY"
            },
            {
                "id": "MY",
                "nom": "Mayahi",
                "id_departement": "MY"
            },
            {
                "id": "AT",
                "nom": "Atantane",
                "id_departement": "MY"
            },
            {
                "id": "TK",
                "nom": "Tchake",
                "id_departement": "MY"
            },
            {
                "id": "SS",
                "nom": "Sae_Saboua",
                "id_departement": "GR"
            },
            {
                "id": "GR",
                "nom": "Guidan_roumdji",
                "id_departement": "GR"
            },
            {
                "id": "CD",
                "nom": "Chadakori",
                "id_departement": "GR"
            },
            {
                "id": "TD",
                "nom": "Tachdoua",
                "id_departement": "AG"
            },
            {
                "id": "TS",
                "nom": "Tessaoua",
                "id_departement": "TS"
            },
            {
                "id": "TB",
                "nom": "Tibiri",
                "id_departement": "GR"
            },
            {
                "id": "GS",
                "nom": "Guidan_Sori",
                "id_departement": "GR"
            },
            {
                "id": "SM",
                "nom": "Sabon_Machi",
                "id_departement": "DK"
            }
        ]
    },
    departement: {
        "_id": "departement",
        "data": [
            {
                "id": "MD",
                "nom": "Madarounfa",
                "id_region": "MDI"
            },
            {
                "id": "MY",
                "nom": "Mayahi",
                "id_region": "MDI"
            },
            {
                "id": "GR",
                "nom": "Guidan_Roumji",
                "id_region": "MDI"
            },
            {
                "id": "AG",
                "nom": "Aguie",
                "id_region": "MDI"
            },
            {
                "id": "TS",
                "nom": "Tessaoua",
                "id_region": "MDI"
            },
            {
                "id": "DK",
                "nom": "Dakoro",
                "id_region": "MDI"
            }
        ]
    },
    village: {
        "_id": "village",
        "data": [
            {
                "id": "GD",
                "nom": "Garin_dadi",
                "id_commune": "GB"
            },
            {
                "id": "GJ",
                "nom": "Garin_jido",
                "id_commune": "GB"
            },
            {
                "id": "SB",
                "nom": "Serkin_Bindiga",
                "id_commune": "GB"
            },
            {
                "id": "GB",
                "nom": "Gabi",
                "id_commune": "GB"
            },
            {
                "id": "GT",
                "nom": "Gabi_tajaye",
                "id_commune": "GB"
            },
            {
                "id": "MR",
                "nom": "Maraka",
                "id_commune": "GB"
            },
            {
                "id": "DK",
                "nom": "Dan_takobo",
                "id_commune": "GB"
            },
            {
                "id": "GN",
                "nom": "Garatchin_Narai",
                "id_commune": "GB"
            },
            {
                "id": "MD",
                "nom": "Madeini",
                "id_commune": "GB"
            },
            {
                "id": "BN",
                "nom": "Boka_Najiko",
                "id_commune": "GB"
            },
            {
                "id": "BG",
                "nom": "Baguegua",
                "id_commune": "GB"
            },
            {
                "id": "KD",
                "nom": "Kabobi_doroyi",
                "id_commune": "GB"
            },
            {
                "id": "MT",
                "nom": "Madeini_toullouwa",
                "id_commune": "GB"
            },
            {
                "id": "BG",
                "nom": "Baguegua",
                "id_commune": "SF"
            },
            {
                "id": "TR",
                "nom": "Tokaraoua",
                "id_commune": "GB"
            },
            {
                "id": "GJ",
                "nom": "Garin_jido",
                "id_commune": "SF"
            },
            {
                "id": "BR",
                "nom": "Bargaja",
                "id_commune": "GB"
            },
            {
                "id": "TK",
                "nom": "Takude",
                "id_commune": "GB"
            },
            {
                "id": "TS",
                "nom": "Taka_saba_saboua",
                "id_commune": "GB"
            },
            {
                "id": "IK",
                "nom": "Inkouregaoua",
                "id_commune": "GB"
            },
            {
                "id": "DT",
                "nom": "Dan_taro",
                "id_commune": "GB"
            },
            {
                "id": "BD",
                "nom": "Badaria",
                "id_commune": "GB"
            },
            {
                "id": "DA",
                "nom": "Dan_aro",
                "id_commune": "GB"
            },
            {
                "id": "DG",
                "nom": "Douman_gada",
                "id_commune": "GB"
            },
            {
                "id": "MG",
                "nom": "Maigero",
                "id_commune": "GB"
            },
            {
                "id": "RR",
                "nom": "Rourouka",
                "id_commune": "GB"
            },
            {
                "id": "HR",
                "nom": "Harounawa",
                "id_commune": "GB"
            },
            {
                "id": "GL",
                "nom": "Galadi",
                "id_commune": "GB"
            },
            {
                "id": "MK",
                "nom": "MAIDOKOKI",
                "id_commune": "GB"
            },
            {
                "id": "GM",
                "nom": "Garin_mai_gari",
                "id_commune": "SF"
            },
            {
                "id": "GI",
                "nom": "Gade_d_iyya",
                "id_commune": "SF"
            },
            {
                "id": "SF",
                "nom": "Safo",
                "id_commune": "SF"
            },
            {
                "id": "GL",
                "nom": "Garin_labo",
                "id_commune": "SF"
            },
            {
                "id": "GD",
                "nom": "Gadi",
                "id_commune": "SF"
            },
            {
                "id": "DH",
                "nom": "Dan_Hadjara",
                "id_commune": "SF"
            },
            {
                "id": "DT",
                "nom": "Dan_tambara",
                "id_commune": "MD"
            },
            {
                "id": "RK",
                "nom": "Raka",
                "id_commune": "MD"
            },
            {
                "id": "SM",
                "nom": "Sammai",
                "id_commune": "MD"
            },
            {
                "id": "HD",
                "nom": "hadamna",
                "id_commune": "MD"
            },
            {
                "id": "ED",
                "nom": "Eldagi",
                "id_commune": "MD"
            },
            {
                "id": "GG",
                "nom": "Garin_gonao",
                "id_commune": "MD"
            },
            {
                "id": "AR",
                "nom": "AngouwalRoumdji",
                "id_commune": "MD"
            },
            {
                "id": "KT",
                "nom": "kontagora",
                "id_commune": "DJ"
            },
            {
                "id": "DK",
                "nom": "Dan_kashi_bako",
                "id_commune": "DJ"
            },
            {
                "id": "HT",
                "nom": "Hilanin_Tajaye",
                "id_commune": "DJ"
            },
            {
                "id": "HJ",
                "nom": "Hilanin_Janare",
                "id_commune": "DJ"
            },
            {
                "id": "WD",
                "nom": "wadatou",
                "id_commune": "DJ"
            },
            {
                "id": "AM",
                "nom": "Angouwal_Mata",
                "id_commune": "MD"
            },
            {
                "id": "MU",
                "nom": "Maya_Uku",
                "id_commune": "MD"
            },
            {
                "id": "DB",
                "nom": "Dan_banga",
                "id_commune": "SH"
            },
            {
                "id": "RR",
                "nom": "Roura",
                "id_commune": "SH"
            },
            {
                "id": "AZ",
                "nom": "Azazala",
                "id_commune": "SH"
            },
            {
                "id": "GS",
                "nom": "Guidan_sadaou",
                "id_commune": "SH"
            },
            {
                "id": "GB",
                "nom": "Guidan_Bako_Maiganga",
                "id_commune": "SH"
            },
            {
                "id": "WR",
                "nom": "Warzou",
                "id_commune": "SH"
            },
            {
                "id": "GL",
                "nom": "Guidan_lali",
                "id_commune": "SH"
            },
            {
                "id": "SH",
                "nom": "Serkin_haoussa",
                "id_commune": "SH"
            },
            {
                "id": "ID",
                "nom": "In_doubba",
                "id_commune": "SH"
            },
            {
                "id": "KD",
                "nom": "koudatawa",
                "id_commune": "SH"
            },
            {
                "id": "FG",
                "nom": "Fagamniya",
                "id_commune": "SH"
            },
            {
                "id": "DJ",
                "nom": "Dajin_bawa",
                "id_commune": "SH"
            },
            {
                "id": "SK",
                "nom": "Sakope",
                "id_commune": "SH"
            },
            {
                "id": "KT",
                "nom": "Kotare",
                "id_commune": "MY"
            },
            {
                "id": "DK",
                "nom": "Dan_Kibiya",
                "id_commune": "AT"
            },
            {
                "id": "JT",
                "nom": "Jantoudou",
                "id_commune": "SH"
            },
            {
                "id": "GA",
                "nom": "Guidan_Ango",
                "id_commune": "SH"
            },
            {
                "id": "MR",
                "nom": "Makeraoua",
                "id_commune": "SH"
            },
            {
                "id": "SB",
                "nom": "Serkin_Bougaje",
                "id_commune": "MY"
            },
            {
                "id": "OL",
                "nom": "Ola",
                "id_commune": "MY"
            },
            {
                "id": "MK",
                "nom": "Malamaoua_Kaka",
                "id_commune": "SH"
            },
            {
                "id": "KG",
                "nom": "Kagadama",
                "id_commune": "SH"
            },
            {
                "id": "DS",
                "nom": "Dan_Sara",
                "id_commune": "SH"
            },
            {
                "id": "DT",
                "nom": "Dan_Tsuntsu",
                "id_commune": "SH"
            },
            {
                "id": "AW",
                "nom": "Arawraye",
                "id_commune": "SH"
            },
            {
                "id": "JG",
                "nom": "jigo",
                "id_commune": "TK"
            },
            {
                "id": "DT",
                "nom": "Dan_toudou",
                "id_commune": "TK"
            },
            {
                "id": "GT",
                "nom": "Guidan_tanko",
                "id_commune": "TK"
            },
            {
                "id": "BT",
                "nom": "Batchiri",
                "id_commune": "TK"
            },
            {
                "id": "TK",
                "nom": "Tchake",
                "id_commune": "TK"
            },
            {
                "id": "KD",
                "nom": "kandili",
                "id_commune": "TK"
            },
            {
                "id": "ZD",
                "nom": "zodi",
                "id_commune": "TK"
            },
            {
                "id": "BS",
                "nom": "Buzu_sugune",
                "id_commune": "TK"
            },
            {
                "id": "SS",
                "nom": "Sae_Saboua",
                "id_commune": "SS"
            },
            {
                "id": "ST",
                "nom": "Sae_saouni",
                "id_commune": "SS"
            },
            {
                "id": "BT",
                "nom": "Batata",
                "id_commune": "SS"
            },
            {
                "id": "KN",
                "nom": "Kounkouraye",
                "id_commune": "SS"
            },
            {
                "id": "KK",
                "nom": "Kakourou",
                "id_commune": "SS"
            },
            {
                "id": "AK",
                "nom": "Alkali",
                "id_commune": "SS"
            },
            {
                "id": "KD",
                "nom": "Kouka_Dan_Wada",
                "id_commune": "SS"
            },
            {
                "id": "KT",
                "nom": "Katchinawa",
                "id_commune": "SS"
            },
            {
                "id": "GS",
                "nom": "Guidan_salao",
                "id_commune": "SS"
            },
            {
                "id": "WD",
                "nom": "Wandarma",
                "id_commune": "SS"
            },
            {
                "id": "KM",
                "nom": "Kakouma",
                "id_commune": "SS"
            },
            {
                "id": "DD",
                "nom": "Dan_Dabo",
                "id_commune": "SS"
            },
            {
                "id": "DB",
                "nom": "Dan_Bako",
                "id_commune": "SS"
            },
            {
                "id": "MS",
                "nom": "Malamaye_salihou",
                "id_commune": "SS"
            },
            {
                "id": "SG",
                "nom": "Sae_Gawni",
                "id_commune": "SS"
            },
            {
                "id": "DG",
                "nom": "Dan_Gado",
                "id_commune": "SS"
            },
            {
                "id": "DT",
                "nom": "Dan_Bako_Tsarakawa",
                "id_commune": "SS"
            },
            {
                "id": "KY",
                "nom": "Kounyago",
                "id_commune": "SS"
            },
            {
                "id": "TT",
                "nom": "Tagaza_taji_wuka",
                "id_commune": "SS"
            },
            {
                "id": "MB",
                "nom": "Malamaye_sabouwa",
                "id_commune": "SS"
            },
            {
                "id": "TK",
                "nom": "Tchakire",
                "id_commune": "SS"
            },
            {
                "id": "EK",
                "nom": "Elkolta",
                "id_commune": "GR"
            },
            {
                "id": "KY",
                "nom": "Keylounbawa",
                "id_commune": "CD"
            },
            {
                "id": "DR",
                "nom": "Dargue",
                "id_commune": "CD"
            },
            {
                "id": "KW",
                "nom": "Kawaye_2",
                "id_commune": "CD"
            },
            {
                "id": "SB",
                "nom": "Sabonguero",
                "id_commune": "CD"
            },
            {
                "id": "BR",
                "nom": "Baradesaboua",
                "id_commune": "CD"
            },
            {
                "id": "K1",
                "nom": "Kata_kata_1",
                "id_commune": "CD"
            },
            {
                "id": "BS",
                "nom": "Boussaragui",
                "id_commune": "CD"
            },
            {
                "id": "KL",
                "nom": "Kollorouga",
                "id_commune": "CD"
            },
            {
                "id": "K2",
                "nom": "Kata_kata_2",
                "id_commune": "CD"
            },
            {
                "id": "GA",
                "nom": "Garin_Agada",
                "id_commune": "CD"
            },
            {
                "id": "YW",
                "nom": "Yan_gawana",
                "id_commune": "CD"
            },
            {
                "id": "DD",
                "nom": "Dan_Daniya",
                "id_commune": "CD"
            },
            {
                "id": "RY",
                "nom": "RugarYakaou",
                "id_commune": "CD"
            },
            {
                "id": "GB",
                "nom": "Garin_Bilo",
                "id_commune": "CD"
            },
            {
                "id": "GR",
                "nom": "Garin_Kasso",
                "id_commune": "CD"
            },
            {
                "id": "TT",
                "nom": "Totsa",
                "id_commune": "CD"
            },
            {
                "id": "KT",
                "nom": "Katomma",
                "id_commune": "CD"
            },
            {
                "id": "GK",
                "nom": "GuidanKalla",
                "id_commune": "CD"
            },
            {
                "id": "TD",
                "nom": "Tachdoua",
                "id_commune": "TD"
            },
            {
                "id": "TS",
                "nom": "Tessaoua",
                "id_commune": "TS"
            },
            {
                "id": "GR",
                "nom": "Gorga",
                "id_commune": "TS"
            },
            {
                "id": "TK",
                "nom": "Tssamiyal_koura",
                "id_commune": "TS"
            },
            {
                "id": "ZK",
                "nom": "Zangounan_Kolta",
                "id_commune": "TS"
            },
            {
                "id": "MK",
                "nom": "Maiki",
                "id_commune": "CD"
            },
            {
                "id": "ID",
                "nom": "laduwa",
                "id_commune": "CD"
            },
            {
                "id": "KM",
                "nom": "Kalgon_Mahamadou",
                "id_commune": "CD"
            },
            {
                "id": "GT",
                "nom": "Guidan_Tawaye",
                "id_commune": "CD"
            },
            {
                "id": "KB",
                "nom": "kutumbi",
                "id_commune": "CD"
            },
            {
                "id": "DS",
                "nom": "Dan_Farou_Sofoua",
                "id_commune": "CD"
            },
            {
                "id": "DM",
                "nom": "Dan_Malam_Inbougage",
                "id_commune": "CD"
            },
            {
                "id": "E2",
                "nom": "Eloum_II",
                "id_commune": "CD"
            },
            {
                "id": "AB",
                "nom": "Achabissa",
                "id_commune": "CD"
            },
            {
                "id": "MM",
                "nom": "Makeraoua_majidadi",
                "id_commune": "CD"
            },
            {
                "id": "EL",
                "nom": "Eloum_Lake",
                "id_commune": "CD"
            },
            {
                "id": "GD",
                "nom": "Guidan_dambou",
                "id_commune": "CD"
            },
            {
                "id": "AL",
                "nom": "Alalaba",
                "id_commune": "CD"
            },
            {
                "id": "SO",
                "nom": "Sabo_Garin_Oumaru",
                "id_commune": "CD"
            },
            {
                "id": "YG",
                "nom": "Yan_Gobirawa",
                "id_commune": "CD"
            },
            {
                "id": "DF",
                "nom": "Dan_Farou",
                "id_commune": "CD"
            },
            {
                "id": "SG",
                "nom": "Sarkin_Gardi",
                "id_commune": "CD"
            },
            {
                "id": "BK",
                "nom": "Baka_shanta",
                "id_commune": "CD"
            },
            {
                "id": "GZ",
                "nom": "Garin_Zagui",
                "id_commune": "CD"
            },
            {
                "id": "GN",
                "nom": "Gangara",
                "id_commune": "CD"
            },
            {
                "id": "BZ",
                "nom": "Bazai",
                "id_commune": "CD"
            },
            {
                "id": "SD",
                "nom": "Sirdawa",
                "id_commune": "CD"
            },
            {
                "id": "MN",
                "nom": "Mallamawa_Nari",
                "id_commune": "CD"
            },
            {
                "id": "TD",
                "nom": "Tchiadi",
                "id_commune": "TB"
            },
            {
                "id": "ZN",
                "nom": "Zanfarawa",
                "id_commune": "TB"
            },
            {
                "id": "DD",
                "nom": "Dan_dague",
                "id_commune": "TB"
            },
            {
                "id": "GG",
                "nom": "Garin_Gado",
                "id_commune": "TB"
            },
            {
                "id": "SL",
                "nom": "Souloulou",
                "id_commune": "GR"
            },
            {
                "id": "ND",
                "nom": "Nwalla_Dan_Sofoua",
                "id_commune": "GS"
            },
            {
                "id": "DA",
                "nom": "Dara_Amadou",
                "id_commune": "SM"
            }
        ]
    }
}