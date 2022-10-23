/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-24 00:37:53
 */
interface InformType {
  type?: ['success', 'info', 'error', 'warning'];
  title?: string;
  message?: string;
  time?: number;
}

let informBox: HTMLDivElement = null;
let informArr = [] as InformType[];

const initBox = () => {
  informBox = document.createElement('div');
  document.body.appendChild(informBox);
  informBox.setAttribute('id', 'inform-box');
};

/**
 * @description:
 * @param {} params
 * @param  type
 * @param  title
 * @param  message
 * @param  time
 * @return {*}
 * @author: Ming
 */
export const addInform = (params: InformType) => {
  if (!process.client) return;
  let time = params.time ?? 5000;
  time = time > 2000 ? time : 2000;
  let animationTime = Math.ceil(time / 100) / 10;
  animationTime = animationTime > 1 ? 1 : animationTime;
  informArr.length === 0 && !document.getElementById('inform-box') && initBox();
  informArr.push(params);

  // init
  const item = document.createElement('div');
  let header = document.createElement('div');
  let content = document.createElement('div');
  item.setAttribute('class', 'infom-item');
  header.setAttribute('class', 'inform-header');
  content.setAttribute('class', 'inform-content');

  header.innerText = params.title ?? '通知';
  content.innerHTML = params.message ?? '';

  // add
  item.style.animation = `informEnter ${animationTime}s`;
  item.append(header, content);
  informBox.appendChild(item);
  // remove
  setTimeout(() => {
    if (!item) return;
    item.style.animation = `informOut ${animationTime}s`;
    setTimeout(() => {
      informBox.removeChild(item);
      informArr.shift();
      informArr.length === 0 && document.body.removeChild(informBox);
    }, animationTime * 1000);
  }, time);
};

// export const inform = (params) => {};
