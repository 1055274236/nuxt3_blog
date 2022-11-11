/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-12 01:12:54
 */
import { createVNode, render, isVNode, createElementVNode } from 'vue';
import { NotificationOptions } from './type';
import Main from './main.vue';

const mountNodeQueue = [] as HTMLDivElement[];
let zIndex = 2000;

/**
 * @description: 添加消息弹窗
 * @param {string | VNode | HTMLElement} message
 * @param {'success' | 'info' | 'warning' | 'error'} type
 * @param {string} title
 * @param {number} duration
 * @param {number} top
 * @author: Ming
 */
export const Notification = (options: NotificationOptions) => {
  if (!process.client) return;

  let mountNode = document.createElement('div');
  const duration = options.duration | 2000;

  // 将 message 转为虚拟dom
  const message = isVNode(options.message)
    ? options.message
    : createElementVNode('div', {}, options.message);

  //将options参数传入，并将组件转换成虚拟DOM，并赋值给app
  const app = createVNode(
    Main,
    {
      ...options,
      duration,
      closeItem: () => {
        changeMountArrTop(options.top ?? 16);
        mountNodeQueue.shift();
        setTimeout(() => {
          document.body.removeChild(mountNode);
        }, 200);
      },
    },
    { default: () => message }
  );

  // 对div进行属性初始化
  let top = options.top ?? 16;
  if (mountNodeQueue.length > 0) {
    mountNodeQueue.forEach((item) => {
      top += item.offsetHeight + (options.top ?? 16);
    });
    // const lastMount = mountNodeQueue[mountNodeQueue.length - 1];
    // top += lastMount.offsetTop + lastMount.offsetHeight;
    zIndex += 1;
  } else {
    zIndex = 2000;
  }
  mountNode.style.transition = 'all 0.5s ease';
  mountNode.style.position = 'fixed';
  mountNode.style.zIndex = zIndex + '';
  mountNode.style.right = '0';
  mountNode.style.top = top + 'px';
  // render函数的作用就是将Notice组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
  // if(isVNode(options.message))
  render(app, mountNode);
  // 然后把转换成真实DOM的Notice组件插入到body里
  mountNodeQueue.push(mountNode);
  document.body.appendChild(mountNode);
};

function changeMountArrTop(top: number) {
  let topNow = top;
  mountNodeQueue.forEach((item, index) => {
    if (index === 0) return;
    item.style.top = topNow + 'px';
    topNow += item.offsetHeight + top;
  });
}
