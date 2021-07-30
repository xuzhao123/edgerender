const domainMap = {
  'glo': {
    domain: '',
    locale: 'en_US',
  },
  'rus': {
    domain: 'ru',
    locale: 'ru_RU',
  },
  'bar': {
    domain: 'pt',
    locale: 'pt_BR',
  },
  'esp': {
    domain: 'es',
    locale: 'es_ES',
  },
  'fra': {
    domain: 'fr',
    locale: 'fr_FR',
  },
  'idn': {
    domain: 'id',
    locale: 'in_ID',
  },
  'ita': {
    domain: 'it',
    locale: 'it_IT',
  },
  'jpn': {
    domain: 'ja',
    locale: 'ja_JP',
  },
  'kor': {
    domain: 'ko',
    locale: 'in_ID',
  },
  'deu': {
    domain: 'de',
    locale: 'de_DE',
  },
  'ara': {
    domain: 'ar',
    locale: 'ar_MA',
  },
  'nld': {
    domain: 'nl',
    locale: 'nl_NL',
  },
  'tha': {
    domain: 'th',
    locale: 'th_TH',
  },
  'tur': {
    domain: 'tr',
    locale: 'tr_TR',
  },
  'vnm': {
    domain: 'vi',
    locale: 'vi_VN',
  },
  'isr': {
    domain: 'he',
    locale: 'iw_IL',
  },
  'pol': {
    domain: 'pl',
    locale: 'pl_PL',
  }
}

Object.keys(domainMap).map(site => {
  domainMap[domainMap[site].domain] = {
    site, locale: domainMap[site].locale,
  };
});

export function getInfoByDomain(domain) {
  return domainMap[domain];
}