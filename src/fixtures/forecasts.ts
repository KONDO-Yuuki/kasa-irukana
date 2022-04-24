import {Forecast, UmbrellaNecessary} from '../features/forecasts';

export const forecastRowData = {
  publicTime: '2022-04-24T17:00:00+09:00',
  publicTimeFormatted: '2022/04/24 17:00:00',
  publishingOffice: '気象庁',
  title: '東京都 東京 の天気',
  link: 'https://www.jma.go.jp/bosai/forecast/#area_type=offices&area_code=130000',
  description: {
    publicTime: '2022-04-24T16:38:00+09:00',
    publicTimeFormatted: '2022/04/24 16:38:00',
    headlineText: '',
    bodyText:
      '　前線が東シナ海から日本の東へのびており、前線上の東海道沖には低気圧があって東へ進んでいます。\n\n　東京地方は、雨となっています。\n\n　２４日は、前線を伴った低気圧が伊豆諸島付近を通過するため、雨で夜遅く曇りとなるでしょう。伊豆諸島では、雷を伴って激しく降る所がある見込みです。\n\n　２５日は、高気圧に覆われますが、湿った空気の影響を受けるため、晴れ時々曇りとなる見込みです。伊豆諸島では、明け方まで雨や雷雨となる所がある見込みです。\n\n【関東甲信地方】\n　関東甲信地方は、雨や曇りとなっています。\n\n　２４日は、前線を伴った低気圧が伊豆諸島付近を通過する見込みです。このため雨や曇りで、雷を伴って激しく降る所があるでしょう。\n\n　２５日は、高気圧に覆われますが、湿った空気の影響を受ける見込みです。このため、晴れや曇りとなるでしょう。伊豆諸島では、前線の影響ではじめ雨や雷雨となる所がある見込みです。\n\n　関東地方と伊豆諸島の海上では、２４日から２５日にかけて、波が高いでしょう。また、所々で霧が発生する見込みです。船舶は視程障害に注意してください。',
    text: '　前線が東シナ海から日本の東へのびており、前線上の東海道沖には低気圧があって東へ進んでいます。\n\n　東京地方は、雨となっています。\n\n　２４日は、前線を伴った低気圧が伊豆諸島付近を通過するため、雨で夜遅く曇りとなるでしょう。伊豆諸島では、雷を伴って激しく降る所がある見込みです。\n\n　２５日は、高気圧に覆われますが、湿った空気の影響を受けるため、晴れ時々曇りとなる見込みです。伊豆諸島では、明け方まで雨や雷雨となる所がある見込みです。\n\n【関東甲信地方】\n　関東甲信地方は、雨や曇りとなっています。\n\n　２４日は、前線を伴った低気圧が伊豆諸島付近を通過する見込みです。このため雨や曇りで、雷を伴って激しく降る所があるでしょう。\n\n　２５日は、高気圧に覆われますが、湿った空気の影響を受ける見込みです。このため、晴れや曇りとなるでしょう。伊豆諸島では、前線の影響ではじめ雨や雷雨となる所がある見込みです。\n\n　関東地方と伊豆諸島の海上では、２４日から２５日にかけて、波が高いでしょう。また、所々で霧が発生する見込みです。船舶は視程障害に注意してください。',
  },
  forecasts: [
    {
      date: '2022-04-24',
      dateLabel: '今日',
      telop: '雨のち曇',
      detail: {
        weather: '雨　夜遅く　くもり',
        wind: '北の風',
        wave: '０．５メートル',
      },
      temperature: {
        min: {
          celsius: null, // 当日特定時刻からnullになる
          fahrenheit: null,
        },
        max: {
          celsius: null, // 当日特定時刻からnullになる
          fahrenheit: null,
        },
      },
      chanceOfRain: {
        T00_06: '--%', // 当日特定時刻から表示されない
        T06_12: '--%',
        T12_18: '--%',
        T18_24: '60%',
      },
      image: {
        title: '雨のち曇',
        url: 'https://www.jma.go.jp/bosai/forecast/img/313.svg',
        width: 80,
        height: 60,
      },
    },
    {
      date: '2022-04-25',
      dateLabel: '明日',
      telop: '晴時々曇',
      detail: {
        weather: '晴れ　時々　くもり',
        wind: '北の風　後　南の風',
        wave: '０．５メートル',
      },
      temperature: {
        min: {
          celsius: '14',
          fahrenheit: '57.2',
        },
        max: {
          celsius: '27',
          fahrenheit: '80.6',
        },
      },
      chanceOfRain: {
        T00_06: '0%',
        T06_12: '0%',
        T12_18: '0%',
        T18_24: '0%',
      },
      image: {
        title: '晴時々曇',
        url: 'https://www.jma.go.jp/bosai/forecast/img/101.svg',
        width: 80,
        height: 60,
      },
    },
    {
      date: '2022-04-26',
      dateLabel: '明後日',
      telop: '曇り',
      detail: {
        weather: 'くもり',
        wind: '南の風　後　強く',
        wave: '０．５メートル　後　１．５メートル',
      },
      temperature: {
        min: {
          celsius: '15',
          fahrenheit: '59',
        },
        max: {
          celsius: '25',
          fahrenheit: '77',
        },
      },
      chanceOfRain: {
        T00_06: '20%',
        T06_12: '20%',
        T12_18: '20%',
        T18_24: '20%',
      },
      image: {
        title: '曇り',
        url: 'https://www.jma.go.jp/bosai/forecast/img/200.svg',
        width: 80,
        height: 60,
      },
    },
  ],
  location: {
    area: '関東',
    prefecture: '東京都',
    district: '東京地方',
    city: '東京',
  },
  copyright: {
    title: '(C) 天気予報 API（livedoor 天気互換）',
    link: 'https://weather.tsukumijima.net/',
    image: {
      title: '天気予報 API（livedoor 天気互換）',
      link: 'https://weather.tsukumijima.net/',
      url: 'https://weather.tsukumijima.net/logo.png',
      width: 120,
      height: 120,
    },
    provider: [
      {
        link: 'https://www.jma.go.jp/jma/',
        name: '気象庁 Japan Meteorological Agency',
        note: '気象庁 HP にて配信されている天気予報を JSON データへ編集しています。',
      },
    ],
  },
};

export const forecastsSample: Forecast[] = [
  {
    date: '2022-04-24',
    dateLabel: '今日',
    telop: '雨のち曇',
    position: '東京',
    title: '東京都 東京 の天気',
    detail: {
      weather: '雨　夜遅く　くもり',
      wind: '北の風',
    },
    temperature: {
      min: null,
      max: null,
    },
    chanceOfRainBy6Hours: [null, null, null, 60],
    imageUrl: 'https://www.jma.go.jp/bosai/forecast/img/313.svg',
  },
  {
    date: '2022-04-25',
    dateLabel: '明日',
    telop: '晴時々曇',
    position: '東京',
    title: '東京都 東京 の天気',
    detail: {
      weather: '晴れ　時々　くもり',
      wind: '北の風　後　南の風',
    },
    temperature: {
      min: '14',
      max: '27',
    },
    chanceOfRainBy6Hours: [0, 0, 0, 0],
    imageUrl: 'https://www.jma.go.jp/bosai/forecast/img/101.svg',
  },
  {
    date: '2022-04-26',
    dateLabel: '明後日',
    position: '東京',
    title: '東京都 東京 の天気',
    telop: '曇り',
    detail: {
      weather: 'くもり',
      wind: '南の風　後　強く',
    },
    temperature: {
      min: '15',
      max: '25',
    },
    chanceOfRainBy6Hours: [20, 20, 20, 20],
    imageUrl: 'https://www.jma.go.jp/bosai/forecast/img/200.svg',
  },
];

export const umbrelleNecessarySample: UmbrellaNecessary[] = [
  {
    date: '2022-04-24',
    label: 'NECESSARY',
  },
  {
    date: '2022-04-25',
    label: 'UNNECESSARY',
  },
  {
    date: '2022-04-26',
    label: 'MAYBE',
  },
];
