/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 00:41:26
 */
import Process from '../process';
import Path from 'path';
import fs from 'fs';
import { readFile } from './readFile';
import config from '~~/main_config';

export class DownloadProcess extends Process {
  constructor() {
    super();
  }

  download = async (ctx) => {
    const { folder, fileName } = ctx.context.params;

    //获取资源文件的绝对路径
    let filePath = Path.join(config.file.uploadDir, folder, fileName);
    let resHred = readFile(filePath, ctx.headers.range);
    ctx.status = resHred.statusCode;
    ctx.set(resHred.headers);

    let stream = fs.createReadStream(
      filePath,
      resHred.statusCode == 200
        ? {}
        : { start: resHred?.start, end: resHred?.end }
    );
    stream.pipe(ctx.res);
    stream.on('error', () => {
      stream.close();
    });
    ctx.respond = false;

    // //也可使用这种方式。
    // stream.on('data', e => ctx.res.write(e));
    // // 接收完毕
    // stream.on('end', e => ctx.res.end());
  };
}
