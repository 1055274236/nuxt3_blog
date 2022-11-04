/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-04 20:22:02
 */
import { defineStore } from 'pinia';

export default defineStore('options', {
  state: () => {
    return {
      records: '',
      tinyKey: '',
    };
  },
  actions: {
    init(params: any) {
      this.setRecords(params?.records);
      this.setTinykey(params?.tinyKey);
    },
    setRecords(params: string) {
      this.records = params;
    },
    setTinykey(params: string) {
      this.tinyKey = params;
    },
  },
});
