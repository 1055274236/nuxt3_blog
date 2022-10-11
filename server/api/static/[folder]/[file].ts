/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-12 00:37:44
 */
import { DownloadProcess } from '~~/server/process';

const downloadProcess = new DownloadProcess();

export default defineEventHandler(async (event) => {
  return downloadProcess.download(event);
});
