# Vue-mirror-scope

## 介绍

[English](README.md)

`Vue-mirror-scope` 是一款商品图片放大进行细节查看的组件，功能和淘宝的放大镜一致

## 安装

`npm install --save vue-mirror-scope`

## 使用

```javascript
    <template>
        <vue-mirror-scope :imgList="imgList"></vue-mirror-scope>
    <template>

    <script>
        import {defineComponent} from Vue
        import VueMirrorScope from "vue-mirror-scope"
        export default defineComponent({
            components:{
                VueMirrorScope
            },
            setup(){
                const imgList = ['./img1.png','img2.png',...]; // and more
            }
        })

    </script>

```

## 属性文档

| 属性名 |  属性值类型  |  作用 |
| :-----:|:------:|:------:|
| imgList | Array[string] | 图片地址 |
| size | String | 放大镜主图片区域/放大区域的大小，为正方形`size * size`,(仅支持px) |
| expandScope| Number |  图片的放大倍数|
