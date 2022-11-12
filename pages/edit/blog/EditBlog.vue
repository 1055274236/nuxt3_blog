<!--
 * @Description: 
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-11-12 01:34:47
-->
<template>
  <div class="form">
    <div class="form-list">
      <div class="list-item">
        <div class="item-label">标题</div>
        <div class="item-content">
          <input type="text" v-model="data.form.title" />
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">大图</div>
        <div class="item-content">
          <!-- <img :src="data.form.cover" alt="" height="100" width="100" />
          <input type="file" /> -->
          <div class="upload">
            <el-upload
              class="avatar-uploader"
              :action="data.uploadUrl"
              :show-file-list="false"
              :on-success="handleCoverSuccess"
            >
              <img
                v-if="data.form.cover"
                :src="data.form.cover"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">简略介绍</div>
        <div class="item-content">
          <input type="text" v-model="data.form.brief" />
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">标签</div>
        <div class="item-content">
          <input type="text" v-model="data.form.tag" />
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">参考文件</div>
        <div class="item-content">
          <el-upload
            v-model:file-list="data.badFileList"
            class="upload-demo"
            :action="data.uploadUrl"
            :on-success="handleBadFilesSuccess"
            :multiple="true"
            list-type="picture"
          >
            <div>点击上传</div>
          </el-upload>
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">内容</div>
        <div class="item-content">
          <ClientOnly>
            <RichTextEdit v-model="data.form.content" />
          </ClientOnly>
        </div>
      </div>
      <div class="list-item">
        <div class="item-label">附件</div>
        <div class="item-content">
          <el-upload
            v-model:file-list="data.fileList"
            class="upload-demo"
            :action="data.uploadUrl"
            :on-success="handleFilesSuccess"
            :on-remove="handleFilesRemove"
            :multiple="true"
          >
            <div>点击上传</div>
            <template #tip>
              <div class="el-upload__tip">附属文件</div>
            </template>
          </el-upload>
        </div>
      </div>
      <div class="form-footer">
        <div class="--blog-button success" @click="submit()">提交</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElUpload, ElIcon } from 'element-plus/dist/index.full.js';
import { reactive, onMounted, watch } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { BlogRequest } from '@/api';
import optionsStore from '@/stores/options';

const props = defineProps(['id']);
const emits = defineEmits(['close']);
const blogRequest = new BlogRequest();
const useOptions = optionsStore();

interface DataType {
  form: any;
  uploadUrl: string;
  fileList: UploadUserFile[];
  badFileList: UploadUserFile[];
}

const data: DataType = reactive({
  form: {},
  uploadUrl: useOptions.uploadUrl,
  fileList: [],
  badFileList: [],
});

onMounted(() => {
  getDetails();
});

// 获取详情
const getDetails = async () => {
  if (!props.id) return;
  const result = await blogRequest.getDetails({ id: props.id });

  data.form = result.data.details;

  data.fileList = data.form?.file?.split('|，|')?.map((item) => {
    console.log(item);
    item = JSON.parse(item);

    return { name: item.name, url: item.filepath || item.url };
  });
};

// 大图上传成功
const handleCoverSuccess: UploadProps['onSuccess'] = (response) => {
  data.form.cover = response.data[0].filepath;
  if (!/^http.*/.test(data.form.cover)) {
    data.form.cover = 'http://' + data.form.cover;
  }
};

// 文件分享上传成功
const handleFilesSuccess: UploadProps['onSuccess'] = () => {
  changeFormFile();
};
// 图片上传，获取图片链接
const handleBadFilesSuccess: UploadProps['onSuccess'] = () => {
  data.badFileList = data.badFileList.map((item) => {
    const response: any = item.response;
    if (!/^http.*/.test(response?.data[0].filepath)) {
      response.data[0].filepath = 'http://' + response?.data[0].filepath;
    }
    return {
      name: (response?.data[0].filepath ?? item.url) || '',
      url: (response?.data[0].filepath ?? item.url) || '',
    };
  });
};
const handleFilesRemove: UploadProps['onRemove'] = (uploadFile) => {
  changeFormFile();
};
// 将所有文件信息转为字符串
const changeFormFile = () => {
  let file = '';
  for (let i = 0; i < data.fileList.length; i++) {
    const response: any = data.fileList[i].response;
    let val = {
      name: data.fileList[i].name || response?.data[0].name || '',
      url: data.fileList[i].url || response?.data[0].filepath || '',
    };
    file += i === 0 ? JSON.stringify(val) : `|，|${JSON.stringify(val)}`;
  }
  data.form.file = file;
};

// 提交
const submit = async () => {
  let result = null;
  if (props.id) {
    result = await blogRequest.updateBlog({ ...data.form, id: props.id });
  } else {
    result = await blogRequest.updateBlog(data.form);
  }
  if (result.errcode === 200) {
    addNotification({
      message: '操作成功',
      type: 'success',
      title: 'Success',
    });
    emits('close');
  } else {
    addNotification({
      message: '操作失败',
      type: 'error',
      title: 'Error',
    });
  }
};

watch(
  () => props.id,
  (newValue) => {
    if (newValue) getDetails();
    else {
      data.form.content = '';
      data.fileList = [];
      setTimeout(() => {
        data.form = {};
      });
    }
  }
);
</script>

<style lang="scss" scoped>
.form {
  margin: 16px;
  padding: 16px;
  border-radius: 10px;
  background-color: #f4f4f4;
  max-height: 80vh;
  width: 80vw;
  overflow-y: auto;
  box-shadow: var(--Blog-shadow);
  .form-list {
    .list-item {
      display: flex;
      align-items: flex-start;
      margin: 10px 0;
      .item-label {
        width: 180px;
      }
      .item-content {
        flex: 1;
        .upload {
          width: 178px;
          height: 178px;
          border: 1px dashed var(--Blog-color-primary);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);

          .avatar-uploader .el-upload:hover {
            border-color: var(--el-color-primary);
          }

          .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
          }
          .avatar-uploader .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        input {
          width: calc(100% - 32px);
          padding: 5px 16px;
        }
      }
    }
  }
  .form-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .success {
      background-color: #60c658;
    }
  }
}
</style>
