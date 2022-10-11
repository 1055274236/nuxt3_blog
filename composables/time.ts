/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-11 19:31:32
 */

/**
 * 对日期进行格式化， 和C#大致一致 默认YYYY-MM-dd HH:mm:ss
 * 可不带参数 一个日期参数 或一个格式化参数
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     Y:年,
 *     M:年中的月份(1-12),
 *     D:月份中的天(1-31),
 *     H:小时(0-23),
 *     h:小时(0-11),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     f:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author adswads@gmail.com
 */
export const dateFormat = (
  date?: string | number | Date,
  format?: string
): string => {
  date = date === undefined ? new Date() : new Date(date);

  format = format === undefined ? 'YYYY-MM-DD HH:mm:ss' : format;
  /**
   * 返回字符串 为n个char构成
   * @param char 重复的字符
   * @param count 次数
   * @return String
   * @author adswads@gmail.com
   */
  const charString = (char: string, count: number): string => {
    var str: string = '';
    while (count--) {
      str += char;
    }
    return str;
  };

  var map: { [keY: string]: any } = {
    Y: date.getFullYear() + '', //年份
    M: date.getMonth() + 1 + '', //月份
    D: date.getDate() + '', //日
    H: date.getHours(), //小时 24
    m: date.getMinutes() + '', //分
    s: date.getSeconds() + '', //秒
    q: Math.floor((date.getMonth() + 3) / 3) + '', //季度
    f: date.getMilliseconds() + '', //毫秒
  };
  //小时 12
  if (map['H'] > 12) {
    map['h'] = map['H'] - 12 + '';
  } else {
    map['h'] = map['H'] + '';
  }
  map['H'] += '';

  var reg = 'YMDHhmsqf';
  var all = '',
    str = '';
  for (var i = 0, n = 0; i < reg.length; i++) {
    n = format.indexOf(reg[i]);
    if (n < 0) {
      continue;
    }
    all = '';
    for (; n < format.length; n++) {
      if (format[n] != reg[i]) {
        break;
      }
      all += reg[i];
    }
    if (all.length > 0) {
      if (all.length == map[reg[i]].length) {
        str = map[reg[i]];
      } else if (all.length > map[reg[i]].length) {
        if (reg[i] == 'f') {
          str = map[reg[i]] + charString('0', all.length - map[reg[i]].length);
        } else {
          str = charString('0', all.length - map[reg[i]].length) + map[reg[i]];
        }
      } else {
        switch (reg[i]) {
          case 'Y':
            str = map[reg[i]].substr(map[reg[i]].length - all.length);
            break;
          case 'f':
            str = map[reg[i]].substr(0, all.length);
            break;
          default:
            str = map[reg[i]];
            break;
        }
      }
      format = format.replace(all, str);
    }
  }
  return format;
};
