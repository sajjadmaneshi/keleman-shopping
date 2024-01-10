import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToPersian',
  standalone: true,
})
export class NumberToPersianPipe implements PipeTransform {
  private splitter = ' و ';
  private zero = 'صفر';
  private Letters = [
    ['', 'یك', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    [
      'ده',
      'یازده',
      'دوازده',
      'سیزده',
      'چهارده',
      'پانزده',
      'شانزده',
      'هفده',
      'هجده',
      'نوزده',
      'بیست',
    ],
    ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    [
      '',
      'یكصد',
      'دویست',
      'سیصد',
      'چهارصد',
      'پانصد',
      'ششصد',
      'هفتصد',
      'هشتصد',
      'نهصد',
    ],
    ['', ' هزار ', ' میلیون ', ' میلیارد '],
  ];

  private ThreeNumbersToLetter(num: number): string {
    if (num === 0) {
      return '';
    }

    if (num < 10) {
      return this.Letters[0][num];
    }

    if (num <= 20) {
      return this.Letters[1][num - 10];
    }

    if (num < 100) {
      const one = num % 10;
      const ten = Math.floor(num / 10);

      return one > 0
        ? `${this.Letters[2][ten]}${this.splitter}${this.Letters[0][one]}`
        : this.Letters[2][ten];
    }

    const one = num % 10;
    const tens = Math.floor((num % 100) / 10);
    const hundreds = Math.floor(num / 100);

    const out = [this.Letters[3][hundreds]];
    const secondPart = num % 100;

    if (secondPart > 0) {
      if (secondPart < 10) {
        out.push(this.Letters[0][secondPart]);
      } else if (secondPart <= 20) {
        out.push(this.Letters[1][secondPart - 10]);
      } else {
        out.push(
          one > 0
            ? `${this.Letters[2][tens]}${this.splitter}${this.Letters[0][one]}`
            : this.Letters[2][tens]
        );
      }
    }
    return out.join(this.splitter);
  }

  private prepareNumber(num: number): string[] {
    const numString = num.toString();
    const numLength = numString.length;

    const paddingLength = numLength % 3 === 0 ? 0 : 3 - (numLength % 3);
    const paddedNum =
      paddingLength > 0 ? '0'.repeat(paddingLength) + numString : numString;

    const result = [];
    for (let i = 0; i < paddedNum.length; i += 3) {
      result.push(paddedNum.slice(i, i + 3));
    }
    return result;
  }

  transform(value: number, symbol: 'T' | 'R' = 'T'): string {
    if (value === 0) {
      return this.zero;
    }

    if (value.toString().length > 66) {
      return 'خارج از محدوده';
    }

    const splittedNumber = this.prepareNumber(value);

    const convertedResult = splittedNumber
      .map((num, index) => {
        const sectionTitle =
          this.Letters[4][splittedNumber.length - (index + 1)];
        const converted = this.ThreeNumbersToLetter(Number(num));
        return converted !== '' ? `${converted}${sectionTitle}` : '';
      })
      .filter((converted) => converted !== '');

    return `${convertedResult.join(this.splitter)} ${
      symbol === 'T' ? 'تومان' : 'ریال'
    }`;
  }
}
