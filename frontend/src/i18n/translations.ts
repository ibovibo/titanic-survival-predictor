import type { Language } from '../types'

export const translations = {
  tr: {
    appTitle: 'Titanic Yolcusu Olsan %Kaç Hayatta Kalırdın?',

    classLabel: 'Hangi sınıfta yolculuk ediyorsunuz?',
    class1: '1. Sınıf – Üst Güverte',
    class2: '2. Sınıf – Orta Güverte',
    class3: '3. Sınıf – Alt Güverte',

    sexLabel: 'Cinsiyet',
    sexFemale: 'Kadın',
    sexMale: 'Erkek',

    ageLabel: 'Yaş',

    spouseLabel: 'Eşiniz yanınızda mı?',
    spouseYes: 'Evet',
    spouseNo: 'Hayır',
    siblingsLabel: 'Kaç kardeşiniz yanınızda?',
    parentsLabel: 'Kaç ebeveyniniz yanınızda?',
    childrenLabel: 'Kaç çocuğunuz yanınızda?',

    fareLabel: 'Bilet ücreti',

    embarkedLabel: 'Biniş limanı',
    embarkedS: 'Southampton',
    embarkedC: 'Cherbourg',
    embarkedQ: 'Queenstown',

    resultSentence: (pct: string) => `Bu profildeki yolcuların yaklaşık %${pct}'i hayatta kaldı.`,
    waking: 'Model uyanıyor, ilk istek 30-50 saniye sürebilir.',
    errorTitle: 'Sunucuya bağlanılamadı.',
    errorBody: 'Bağlantınızı kontrol edip tekrar deneyin.',
    retry: 'Tekrar dene',

    footerAccuracy: 'Model, %82.3 doğrulukla çalışıyor.',
    footerAlgorithm: 'Random Forest sınıflandırıcı kullanılıyor.',
    footerDataset: 'Veriler 1912 Kaggle Titanic veri setinden alınmıştır.',
    footerRepo: "GitHub'da görüntüle",

    decrease: 'Azalt',
    increase: 'Artır',
  },
  en: {
    appTitle: 'What % Would You Have Survived the Titanic?',

    classLabel: 'Which class are you traveling in?',
    class1: '1st Class – Upper Deck',
    class2: '2nd Class – Middle Deck',
    class3: '3rd Class – Lower Deck',

    sexLabel: 'Sex',
    sexFemale: 'Female',
    sexMale: 'Male',

    ageLabel: 'Age',

    spouseLabel: 'Is your spouse with you?',
    spouseYes: 'Yes',
    spouseNo: 'No',
    siblingsLabel: 'How many siblings are with you?',
    parentsLabel: 'How many parents are with you?',
    childrenLabel: 'How many children are with you?',

    fareLabel: 'Ticket fare',

    embarkedLabel: 'Port of embarkation',
    embarkedS: 'Southampton',
    embarkedC: 'Cherbourg',
    embarkedQ: 'Queenstown',

    resultSentence: (pct: string) => `About ${pct}% of passengers with this profile survived.`,
    waking: 'The model is waking up, the first request can take 30-50 seconds.',
    errorTitle: "Couldn't reach the server.",
    errorBody: 'Check your connection and try again.',
    retry: 'Retry',

    footerAccuracy: 'The model runs at 82.3% accuracy.',
    footerAlgorithm: 'Uses a Random Forest classifier.',
    footerDataset: 'Data is from the 1912 Kaggle Titanic dataset.',
    footerRepo: 'View on GitHub',

    decrease: 'Decrease',
    increase: 'Increase',
  },
} satisfies Record<Language, Record<string, unknown>>

export type TranslationKey = keyof (typeof translations)['tr']
