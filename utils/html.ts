/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-10 15:55:24
 */
export function deleteHtml(html: string) {
  return html.replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, '');
}

export function lockScrollTo() {
  let isScroll = false;
  return (top: number, delay: number = 50) => {
    if (!process.client || isScroll) return;
    const fun = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener('wheel', fun, { passive: false });
    window.addEventListener('touchmove', fun, { passive: false }); //passive 参数不能省略，用来兼容ios和android
    isScroll = true;
    const from = window.scrollY;
    const moveDistance = (top - from) / (delay / 10);
    let oldTop = from;
    let interval = setInterval(() => {
      oldTop += moveDistance;
      if ((top >= from && oldTop >= top) || (top <= from && oldTop <= top)) {
        clearInterval(interval);
        window.removeEventListener('wheel', fun);
        window.removeEventListener('touchmove', fun);
        isScroll = false;
      }
      window.scrollTo({
        top: oldTop,
      });
    }, 10);
  };
}
