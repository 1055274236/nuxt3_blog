<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-13 01:45:02
-->
<template>
  <div id="blog">
    <div class="header">
      <div class="options">
        <div class="add --blog-button" @click="editBlog()">增加</div>
        <div class="remove --blog-button" @click="deleteBlog()">删除</div>
      </div>
      <div class="filter">
        <input
          type="text"
          v-model="data.keyword"
          placeholder="关键字"
          @keyup.enter="getList()"
        />
        <div class="--blog-button" @click="getList()">搜索</div>
      </div>
    </div>
    <ClientOnly>
      <div class="content">
        <div class="table">
          <div class="table-header">
            <div class="table-line">
              <div class="choose">多选</div>
              <div class="title">标题</div>
              <div class="tag">标签</div>
              <div class="brief">简略介绍</div>
              <div class="options">操作</div>
            </div>
          </div>
          <div class="table-content">
            <div
              v-for="(item, index) in data.list"
              :key="index"
              class="table-line"
            >
              <div class="choose">
                <div
                  :class="[
                    'frame',
                    { isSelect: data.chooseIndexArr.has(item.id) },
                  ]"
                  @click="chooseClick(item.id)"
                ></div>
              </div>
              <div class="title ellipsis">{{ item.title }}</div>
              <div class="tag ellipsis">{{ item.tag }}</div>
              <div class="brief ellipsis">{{ item.brief }}</div>
              <div class="options">
                <div class="item-edit --blog-button" @click="editBlog(item.id)">
                  编辑
                </div>
                <div
                  class="item-remove --blog-button remove"
                  @click="deleteBlog(item.id)"
                >
                  删除
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <Pagenation
          v-model="data.pageNo"
          :page-size="data.pageSize"
          :total="data.count"
          @change="() => data.chooseIndexArr.clear()"
        />
      </div>
    </ClientOnly>
    <BaseShade v-model:show="data.editShow" clickBackClose>
      <EditBlog :id="data.id" @close="editClose" />
    </BaseShade>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus/dist/index.full';
import { DataType } from './types';
import { BlogRequest } from '@/api';
import EditBlog from './EditBlog.vue';

const blogRequest = new BlogRequest();

const data: DataType = reactive({
  keyword: '',
  list: [],
  pageSize: 20,
  pageNo: 1,
  count: 0,
  editShow: false,
  id: '',
  chooseIndexArr: new Set(),
});
onMounted(() => {
  // 不知道什么原因，反正会报错
  setTimeout(() => {
    getList();
  });
});

const getList = async () => {
  const result = await blogRequest.getList({
    key: new Date().getTime(),
    keyword: data.keyword,
    pageSize: data.pageSize,
    offeset: (data.pageNo - 1) * data.pageSize,
    isContent: true,
    isTag: true,
    isTitle: true,
  });

  data.list = result.data.rows;
  data.count = result.data.count;
};

const chooseClick = (id: string) => {
  if (data.chooseIndexArr.has(id)) {
    data.chooseIndexArr.delete(id);
  } else {
    data.chooseIndexArr.add(id);
  }
};

const editBlog = (id: string = '') => {
  data.id = id;
  data.editShow = true;
};

const editClose = () => {
  data.editShow = false;
  getList();
};

const deleteBlog = (id: string = '') => {
  if (!id && data.chooseIndexArr.size === 0) {
    addNotification({ message: '请先选择' });
    return;
  }
  ElMessageBox.confirm('确认删除吗?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    if (!id) {
      data.chooseIndexArr.forEach((item) => {
        id += id === '' ? item : `,${item}`;
      });
      data.chooseIndexArr.clear();
    }
    blogRequest.deleteBlog({ id }).then(() => {
      addNotification({ message: '删除成功', type: 'success' });
      getList();
    });
  });
};
</script>

<style lang="scss" scoped>
#blog {
  height: 100%;
  padding: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    .options {
      display: flex;
    }
    .filter {
      display: flex;
      input {
        padding: 0 5px;
        width: 300px;
        outline: none;
        border: 0;
        box-shadow: 1px 1px 5px 3px #00000030;
      }
    }
  }
  .remove {
    background-color: rgb(244, 112, 112);
    color: #fff;
  }

  .content {
    position: relative;
    .table {
      width: 100%;
      height: 70vh;
      overflow: auto;
      margin-top: 20px;
      .table-header {
        font-size: 20px;
        font-weight: 600;
      }
      .table-content {
        .table-line {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: transparent;
            transition: all 0.3s ease;
            pointer-events: none;
          }
          &:hover {
            &::after {
              opacity: 0.3;
              background-color: gray;
            }
          }
          .choose {
            .frame {
              position: relative;
              margin-left: 10px;
              width: 15px;
              height: 15px;
              border: 1px solid black;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              &::after {
                content: '';
                transition: all 0.3s ease;
                width: 0;
                height: 0;

                transform: rotate(45deg);
              }
              &.isSelect {
                background-color: var(--Blog-color-primary);
                border: 1px solid var(--Blog-color-primary);

                &::after {
                  width: 5px;
                  height: 10px;
                  border-right: 1px solid #000;
                  border-bottom: 1px solid #000;
                }
              }
            }
          }
        }
        .table-line:nth-child(odd) {
          background-color: #ffffff60;
        }
        .table-line:nth-child(even) {
          background-color: #00000030;
        }
      }
      .table-line {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        .ellipsis {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .choose {
          width: 100px;
        }
        .title {
          width: 300px;
        }
        .tag {
          width: 100px;
        }
        .brief {
          width: 400px;
        }
        .options {
          // width: 100px;
          display: flex;
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
