/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-25 00:21:58
 */
export const throttleFn = (fn: Function, reply: number = 1000) => {
  let time = 0;

  return () => {
    let newTime = new Date().getTime();
    if (newTime - time > reply) {
      time = newTime;
      fn();
    } else {
      addNotification({
        message: '您的操作过于频繁，请稍后再试！',
        type: 'info',
        title: '提示',
      });
    }
  };
};
