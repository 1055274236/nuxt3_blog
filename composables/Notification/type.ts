/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-24 23:55:31
 */
import { VNode } from 'vue';
import { Error, Success, Prompt, Reduce } from '@/components/icon';

export interface NotificationOptions {
  message: string | VNode | HTMLElement;
  type?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  duration?: number;
  top?: number;
}

export interface DataType {
  isShow: Boolean;
}

export const propsParams = {
  type: {
    type: String,
    default: 'info',
  },
  title: {
    type: String,
    default: '提示',
  },
  duration: {
    type: Number,
    default: 2000,
  },
  message: String,
  closeItem: Function,
};

export const IconComponent = {
  success: Success,
  error: Error,
  info: Prompt,
  warnning: Reduce,
};
