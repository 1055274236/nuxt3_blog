/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-06 23:21:33
 */
export interface DataType {
  keyword: string;
  list: any[];
  pageSize: number;
  pageNo: number;
  count: number;
  editShow: boolean;
  id: string;
  chooseIndexArr: Set<string>;
}
