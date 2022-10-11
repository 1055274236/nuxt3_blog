/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 00:40:33
 */
import Path from 'path';

export default {
  dataBases: {
    name: 'blog',
    user: 'blog',
    password: 'password',
    port: 3306,
    timezone: '+08:00',
  },
  file: {
    uploadDir: Path.join(process.cwd(), '..', 'uploads'),
    maxFieldsSize: 10 * 1024 * 1024, // 10M
  },
};
