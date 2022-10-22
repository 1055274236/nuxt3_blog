/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-22 23:48:43
 */
import { CommentDatabasesOperate } from '~~/server/databases';
import { Response } from '~~/server/utils';
import UaParse from 'ua-parser-js';
import ipnet from 'xz-ipnet';
const ipParse = ipnet();
const uaParse = new UaParse();

export default defineEventHandler(async (event) => {
  const params = await useBody(event);
  if (params.blog_id) {
    // 根据请求头修改参数
    const headers = getHeaders(event);
    let ip = (headers['x-forwarded-for'] as string).replace('::ffff:', ''),
      ua = headers['user-agent'];
    let userAgent = uaParse.setUA(ua),
      ipNet = ipParse.find(ip) as string[];
    // 添加属性
    let p = {
      browser: userAgent.getBrowser(),
      device: userAgent.getDevice(),
      engine: userAgent.getEngine(),
      os: userAgent.getOS(),
      cpu: userAgent.getCPU(),
      ip,
      address: ipNet.slice(0, 2).join(''),
    };

    return Response.success(
      await CommentDatabasesOperate.addCommentById({ ...params, ...p })
    );
  } else {
    return Response.error(new Error('ID数据错误！'));
  }
});
