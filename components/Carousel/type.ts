/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-31 14:47:48
 */
import { PropType } from 'vue';

type dataItem = { title?: string; cover: string; to?: string; label?: string };

export const propsParams = {
  data: {
    type: Array as PropType<dataItem[]>,
    default: () => [],
  },
};

export interface DataType {
  width: string;
  height: string;
  chooseIndex: number;
}
