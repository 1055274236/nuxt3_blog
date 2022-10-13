<!--
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-10-13 23:42:07
-->

# 使用

```
 pnpm i
 pnpm run dev
```

<br />

# 功能

1. 博客
2. 评论
3. 资源分享

<br />

# 数据库结构

## blog

| name        | type     | length |
| ----------- | -------- | ------ |
| `id`        | varchar  | 255    |
| `cover`     | varchar  | 255    |
| `title`     | varchar  | 255    |
| `content`   | text     | 0      |
| `tag`       | varchar  | 255    |
| `brief`     | text     | 0      |
| `file`      | text     | 0      |
| `pageview`  | int      | 0      |
| `like`      | int      | 0      |
| `createdAt` | datetime | 0      |
| `updatedAt` | datetime | 0      |

## comment

| name             | type     | length |
| ---------------- | -------- | ------ |
| `id`             | varchar  | 255    |
| `content`        | text     | 0      |
| `blog_id`        | varchar  | 255    |
| `parent_id`      | text     | 255    |
| `root_parent_id` | varchar  | 255    |
| `device`         | varchar  | 255    |
| `browser`        | varchar  | 255    |
| `ip`             | varchar  | 255    |
| `createdAt`      | datetime | 0      |
| `updatedAt`      | datetime | 0      |

## options

| name        | type     | length |
| ----------- | -------- | ------ |
| `id`        | int      | 0      |
| `key`       | varchar  | 255    |
| `value`     | text     | 0      |
| `remark`    | text     | 0      |
| `createdAt` | datetime | 0      |
| `updatedAt` | datetime | 0      |

<br />
<br />

SET FOREIGN_KEY_CHECKS = 1;

正在尝试使用 nuxt3 创建个人博客

<br />

~~应届生暂无工作，接触新东西中....~~
