import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomPersianNumberService implements PersianService {
  static persianNumberPattern = '\u06F0-\u06F9';
  private static persianNumbersTable = [
    '\u06F0',
    '\u06F1',
    '\u06F2',
    '\u06F3',
    '\u06F4',
    '\u06F5',
    '\u06F6',
    '\u06F7',
    '\u06F8',
    '\u06F9',
  ];
  private static englishNumbersTable = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  private static _getMatchedPatternLength(value: string): number {
    const matchResult = value.match(
      new RegExp(`[${CustomPersianNumberService.persianNumberPattern}]`, 'g')
    );
    return matchResult ? matchResult.length : 0;
  }

  containsPersian(value: string): boolean {
    if (!value) {
      return false;
    }
    // Language=JSRegexp
    const persianRegex = new RegExp(
      `[${CustomPersianNumberService.persianNumberPattern}]`
    );
    return persianRegex.test(value);
  }

  isPersian(value: string): boolean {
    if (!value) {
      return false;
    }
    return (
      value.length ===
      CustomPersianNumberService._getMatchedPatternLength(value)
    );
  }

  arabicToPersian(value: string): string {
    return value
      .replace(/٤/g, CustomPersianNumberService.persianNumbersTable[4])
      .replace(/٥/g, CustomPersianNumberService.persianNumbersTable[5])
      .replace(/٦/g, CustomPersianNumberService.persianNumbersTable[6]);
  }

  toPersian(value: string | number): string {
    if (value === undefined || value === null) {
      throw new InvalidServiceInputError();
    }
    let persianValue: string = value.toString();
    persianValue = this.arabicToPersian(persianValue);
    let regex: RegExp;
    for (
      let i = 0;
      i < CustomPersianNumberService.persianNumbersTable.length;
      i++
    ) {
      // Language=JSRegexp
      regex = new RegExp(
        `[${CustomPersianNumberService.englishNumbersTable[i]}]`,
        'g'
      );
      persianValue = persianValue.replace(
        regex,
        CustomPersianNumberService.persianNumbersTable[i]
      );
    }
    return persianValue;
  }

  toEnglish(value: string): string {
    let englishValue: string = value;
    let regex: RegExp;
    for (
      let i = 0;
      i < CustomPersianNumberService.englishNumbersTable.length;
      i++
    ) {
      // Language=JSRegexp
      regex = new RegExp(
        `[${CustomPersianNumberService.persianNumbersTable[i]}]`,
        'g'
      );
      englishValue = englishValue.replace(
        regex,
        CustomPersianNumberService.englishNumbersTable[i]
      );
    }
    return englishValue;
  }
}
export interface PersianService {
  isPersian(value: string): boolean;

  toPersian(value: string | number): string;

  containsPersian(value: string): boolean;
}
export class InvalidServiceInputError extends Error {
  constructor() {
    super('Invalid value has been passed to the service.');
  }
}
