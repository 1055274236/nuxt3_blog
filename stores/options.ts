/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-10 00:53:14
 */
import { defineStore } from 'pinia';

export default defineStore('options', {
  state: () => {
    return {
      records: '',
      uploadUrl: '',
    };
  },
  actions: {
    init(params: any) {
      this.setRecords(params?.records);
      this.setUploadUrl(params?.uploadUrl);
    },
    setRecords(params: string) {
      this.records = params;
    },
    setUploadUrl(params: string) {
      this.uploadUrl = params;
    },
  },
});
