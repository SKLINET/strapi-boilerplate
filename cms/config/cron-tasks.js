"use strict";
const fs = require("fs");
const pth = require("path");
const _ = require("lodash");
const { Duplex } = require('stream');
const FormData = require('form-data');

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */
const axios = require('axios');
const {prop} = require("lodash/fp");

function bufferToStream(myBuffer) {
  const tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}

const hasVersionedOption = (modelOrAttribute) => {
  return prop("pluginOptions.versions.versioned", modelOrAttribute) === true;
};

const isVersionedContentType = (model) => {
  return hasVersionedOption(model);
};

module.exports = {
  // cleanVersions: {
  //   task: async ({ strapi }) => {
  //     const contentTypes = Object.values(strapi.contentTypes);
  //     for (const ct of contentTypes) {
  //       if (isVersionedContentType(ct)) {
  //         const idsToDelete = [];
  //         const allVersions = await strapi.db.query(ct.uid).findMany({
  //           where: { publishedAt: { $null: true }},
  //           orderBy: { id: "desc" },
  //           limit: 20_000,
  //         });
  //         const vObject = {};
  //
  //         if (Array.isArray(allVersions) && allVersions.length > 0) {
  //           for (const v of allVersions) {
  //             if (!vObject[v.vuid]) {
  //               vObject[v.vuid] = 1;
  //             } else {
  //               vObject[v.vuid] += 1;
  //             }
  //             if (vObject[v.vuid] > 5) {
  //               idsToDelete.push(v.id);
  //             }
  //           }
  //           if (idsToDelete.length > 0) {
  //             await strapi.db.query(ct.uid).deleteMany({
  //               where: {
  //                 id: {
  //                   $in: idsToDelete,
  //                 },
  //               },
  //             });
  //           }
  //         }
  //       }
  //     }
  //   },
  //   options: {
  //     rule: "0 0 * * *",
  //   },
  // }
  // insertCountries: {
  //   task: async ({ strapi }) => {
  //     const items = {
  //       "AF": "Afghánistán",
  //       "AX": "Ålandy",
  //       "AL": "Albánie",
  //       "DZ": "Alžírsko",
  //       "AS": "Americká Samoa",
  //       "VI": "Americké Panenské ostrovy",
  //       "AD": "Andorra",
  //       "AO": "Angola",
  //       "AI": "Anguilla",
  //       "AQ": "Antarktida",
  //       "AG": "Antigua a Barbuda",
  //       "AR": "Argentina",
  //       "AM": "Arménie",
  //       "AW": "Aruba",
  //       "AU": "Austrálie",
  //       "AZ": "Ázerbájdžán",
  //       "BS": "Bahamy",
  //       "BH": "Bahrajn",
  //       "BD": "Bangladéš",
  //       "BB": "Barbados",
  //       "BE": "Belgie",
  //       "BZ": "Belize",
  //       "BY": "Bělorusko",
  //       "BJ": "Benin",
  //       "BM": "Bermudy",
  //       "BT": "Bhútán",
  //       "BO": "Bolívie",
  //       "BQ": "Bonaire, Svatý Eustach a Saba",
  //       "BA": "Bosna a Hercegovina",
  //       "BW": "Botswana",
  //       "BV": "Bouvetův ostrov",
  //       "BR": "Brazílie",
  //       "IO": "Britské indickooceánské území",
  //       "VG": "Britské Panenské ostrovy",
  //       "BN": "Brunej",
  //       "BG": "Bulharsko",
  //       "BF": "Burkina Faso",
  //       "BI": "Burundi",
  //       "CK": "Cookovy ostrovy",
  //       "CW": "Curaçao",
  //       "TD": "Čad",
  //       "ME": "Černá Hora",
  //       "CZ": "Česká republika",
  //       "CN": "Čína",
  //       "DK": "Dánsko",
  //       "CD": "Demokratická republika Kongo",
  //       "DM": "Dominika",
  //       "DO": "Dominikánská republika",
  //       "DJ": "Džibutsko",
  //       "EG": "Egypt",
  //       "EC": "Ekvádor",
  //       "ER": "Eritrea",
  //       "EE": "Estonsko",
  //       "ET": "Etiopie",
  //       "FO": "Faerské ostrovy",
  //       "FK": "Falklandy (Malvíny)",
  //       "FJ": "Fidži",
  //       "PH": "Filipíny",
  //       "FI": "Finsko",
  //       "FR": "Francie",
  //       "GF": "Francouzská Guyana",
  //       "TF": "Francouzská jižní a antarktická území",
  //       "PF": "Francouzská Polynésie",
  //       "GA": "Gabon",
  //       "GM": "Gambie",
  //       "GH": "Ghana",
  //       "GI": "Gibraltar",
  //       "GD": "Grenada",
  //       "GL": "Grónsko",
  //       "GE": "Gruzie",
  //       "GP": "Guadeloupe",
  //       "GU": "Guam",
  //       "GT": "Guatemala",
  //       "GN": "Guinea",
  //       "GW": "Guinea-Bissau",
  //       "GG": "Guernsey",
  //       "GY": "Guyana",
  //       "HT": "Haiti",
  //       "HM": "Heardův ostrov a McDonaldovy ostrovy",
  //       "HN": "Honduras",
  //       "HK": "Hongkong",
  //       "CL": "Chile",
  //       "HR": "Chorvatsko",
  //       "IN": "Indie",
  //       "ID": "Indonésie",
  //       "IQ": "Irák",
  //       "IR": "Írán",
  //       "IE": "Irsko",
  //       "IS": "Island",
  //       "IT": "Itálie",
  //       "IL": "Izrael",
  //       "JM": "Jamajka",
  //       "JP": "Japonsko",
  //       "YE": "Jemen",
  //       "JE": "Jersey",
  //       "ZA": "Jihoafrická republika",
  //       "GS": "Jižní Georgie a Jižní Sandwichovy ostrovy",
  //       "KR": "Jižní Korea",
  //       "SS": "Jižní Súdán",
  //       "JO": "Jordánsko",
  //       "KY": "Kajmanské ostrovy",
  //       "KH": "Kambodža",
  //       "CM": "Kamerun",
  //       "CA": "Kanada",
  //       "CV": "Kapverdy",
  //       "QA": "Katar",
  //       "KZ": "Kazachstán",
  //       "KE": "Keňa",
  //       "KI": "Kiribati",
  //       "CC": "Kokosové ostrovy",
  //       "CO": "Kolumbie",
  //       "KM": "Komory",
  //       "CG": "Kongo",
  //       "CR": "Kostarika",
  //       "CU": "Kuba",
  //       "KW": "Kuvajt",
  //       "CY": "Kypr",
  //       "KG": "Kyrgyzstán",
  //       "LA": "Laos",
  //       "LS": "Lesotho",
  //       "LB": "Libanon",
  //       "LR": "Libérie",
  //       "LY": "Libye",
  //       "LI": "Lichtenštejnsko",
  //       "LT": "Litva",
  //       "LV": "Lotyšsko",
  //       "LU": "Lucembursko",
  //       "MO": "Macao",
  //       "MG": "Madagaskar",
  //       "HU": "Maďarsko",
  //       "MY": "Malajsie",
  //       "MW": "Malawi",
  //       "MV": "Maledivy",
  //       "ML": "Mali",
  //       "MT": "Malta",
  //       "IM": "Ostrov Man",
  //       "MA": "Maroko",
  //       "MH": "Marshallovy ostrovy",
  //       "MQ": "Martinik",
  //       "MU": "Mauricius",
  //       "MR": "Mauritánie",
  //       "YT": "Mayotte",
  //       "UM": "Menší odlehlé ostrovy USA",
  //       "MX": "Mexiko",
  //       "FM": "Mikronésie",
  //       "MD": "Moldavsko",
  //       "MC": "Monako",
  //       "MN": "Mongolsko",
  //       "MS": "Montserrat",
  //       "MZ": "Mosambik",
  //       "MM": "Myanmar",
  //       "NA": "Namibie",
  //       "NR": "Nauru",
  //       "DE": "Německo",
  //       "NP": "Nepál",
  //       "NE": "Niger",
  //       "NG": "Nigérie",
  //       "NI": "Nikaragua",
  //       "NU": "Niue",
  //       "NL": "Nizozemsko",
  //       "NF": "Norfolk",
  //       "NO": "Norsko",
  //       "NC": "Nová Kaledonie",
  //       "NZ": "Nový Zéland",
  //       "OM": "Omán",
  //       "PK": "Pákistán",
  //       "PW": "Palau",
  //       "PS": "Palestinská autonomie",
  //       "PA": "Panama",
  //       "PG": "Papua-Nová Guinea",
  //       "PY": "Paraguay",
  //       "PE": "Peru",
  //       "PN": "Pitcairnovy ostrovy",
  //       "CI": "Pobřeží slonoviny",
  //       "PL": "Polsko",
  //       "PR": "Portoriko",
  //       "PT": "Portugalsko",
  //       "AT": "Rakousko",
  //       "RE": "Réunion",
  //       "GQ": "Rovníková Guinea",
  //       "RO": "Rumunsko",
  //       "RU": "Rusko",
  //       "RW": "Rwanda",
  //       "GR": "Řecko",
  //       "PM": "Saint-Pierre a Miquelon",
  //       "SV": "Salvador",
  //       "WS": "Samoa",
  //       "SM": "San Marino",
  //       "SA": "Saúdská Arábie",
  //       "SN": "Senegal",
  //       "KP": "Severní Korea",
  //       "MK": "Severní Makedonie",
  //       "MP": "Severní Mariany",
  //       "SC": "Seychely",
  //       "SL": "Sierra Leone",
  //       "SG": "Singapur",
  //       "SK": "Slovensko",
  //       "SI": "Slovinsko",
  //       "SO": "Somálsko",
  //       "AE": "Spojené arabské emiráty",
  //       "GB": "Spojené království",
  //       "US": "Spojené státy americké",
  //       "RS": "Srbsko",
  //       "CF": "Středoafrická republika",
  //       "SD": "Súdán",
  //       "SR": "Surinam",
  //       "SH": "Svatá Helena, Ascension a Tristan da Cunha",
  //       "LC": "Svatá Lucie",
  //       "BL": "Svatý Bartoloměj",
  //       "KN": "Svatý Kryštof a Nevis",
  //       "MF": "Svatý Martin (francouzská část)",
  //       "SX": "Svatý Martin (nizozemská část)",
  //       "ST": "Svatý Tomáš a Princův ostrov",
  //       "VC": "Svatý Vincenc a Grenadiny",
  //       "SZ": "Svazijsko",
  //       "SY": "Sýrie",
  //       "SB": "Šalamounovy ostrovy",
  //       "ES": "Španělsko",
  //       "SJ": "Špicberky a Jan Mayen",
  //       "LK": "Šrí Lanka",
  //       "SE": "Švédsko",
  //       "CH": "Švýcarsko",
  //       "TJ": "Tádžikistán",
  //       "TZ": "Tanzanie",
  //       "TH": "Thajsko",
  //       "TW": "Tchaj-wan",
  //       "TG": "Togo",
  //       "TK": "Tokelau",
  //       "TO": "Tonga",
  //       "TT": "Trinidad a Tobago",
  //       "TN": "Tunisko",
  //       "TR": "Turecko",
  //       "TM": "Turkmenistán",
  //       "TC": "Turks a Caicos",
  //       "TV": "Tuvalu",
  //       "UG": "Uganda",
  //       "UA": "Ukrajina",
  //       "UY": "Uruguay",
  //       "UZ": "Uzbekistán",
  //       "CX": "Vánoční ostrov",
  //       "VU": "Vanuatu",
  //       "VA": "Vatikán",
  //       "VE": "Venezuela",
  //       "VN": "Vietnam",
  //       "TL": "Východní Timor",
  //       "WF": "Wallis a Futuna",
  //       "ZM": "Zambie",
  //       "EH": "Západní Sahara",
  //       "ZW": "Zimbabwe",
  //       "XK": "Kosovo"
  //     };
  //     const service = strapi.service('api::country.country');
  //     const entries = await strapi.entityService.findMany('api::country.country', {});
  //     const codes = entries.map(e => e.isoCode);
  //     for (const [key, value] of Object.entries(items)) {
  //       if (codes.indexOf(key) === -1) {
  //         await service.create({
  //           data: {
  //             isoCode: key,
  //             name: value,
  //           }
  //         });
  //       }
  //     }
  //   },
  //   options: {
  //     rule: "*/5 * * * *",
  //   },
  // }
  // migrateAssets: {
  //   task: async ({ strapi }) => {
  //     console.log('CRON: migrate assets');
  //     const assets = await strapi.db.query('plugin::upload.file').findMany({});
  //     for (let i = 0; i < assets.length; i++) {
  //       if (assets[i].url.startsWith('http')) {
  //         continue;
  //       }
  //       const path = pth.join(__dirname + '/../public', assets[i].url);
  //       const file = fs.createReadStream(path) /** Read file */
  //       // const stats = fs.statSync(path) /** Get file size in bytes (for content-length) */
  //       // const fileSizeInBytes = stats.size;
  //
  //       // const fileData = Buffer.concat(chunks);
  //       const form = new FormData();
  //       form.append('files', file, assets[i].name);
  //
  //       /** Add appropriate headers */
  //       const headers = {
  //         Accept: 'application/json',
  //         // 'Content-Length': fileSizeInBytes, /** Recommended to add it */
  //         ...form.getHeaders(),
  //       }
  //       let url = "https://admin-wired.symbio.agency/api/upload?id=" + assets[i].id;
  //
  //       try {
  //         axios(url, {
  //           method: 'POST',
  //           data: form,
  //           headers: headers,
  //           maxContentLength: Infinity, /** To avoid max content length error */
  //           maxBodyLength: Infinity /** To avoid max body length error */
  //         }).then((response) => {
  //           return response.data;
  //         }).catch((error) => {
  //           console.log('ERROR:', assets[i].id, assets[i].name, error);
  //           return error;
  //         })
  //       } catch (e) {
  //         console.log('ERROR:', assets[i].id, assets[i].name)
  //       }
  //     }
  //   },
  //   options: {
  //     rule: "*/5 * * * *",
  //   },
  // },
};
