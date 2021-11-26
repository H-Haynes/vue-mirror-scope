<template lang="">
    <div class="mirror">
        <div class="big-pic" @mouseleave="visibleRef= false">
            <div class="pic-container" ref="containerRef" @mouseenter="enter">
                <img  :src="imgList[indexRef]"/>
                <div class="pointer" v-show="visibleRef" @mousemove="move" ref="pointerRef"></div>
            </div>
            <!-- <div class="pointer" v-show="visibleRef" @mousemove="move" ref="pointerRef"></div> -->
            <div class="mirror-wrap" v-show="visibleRef">
                <div class="mirror-pic" ref="mirrorRef">
                    <img :src="imgList[indexRef]" />
                </div>
            </div>
        </div>
        <div class="mirror-list-wrap">
            <ul class="mirror-list" ref="listRef">
                <li v-for="(img,index) in imgList" 
                    :key="index"
                    @mouseenter="indexRef=index" 
                    :class="{active:indexRef===index}"
                    >
                    <img :src="img"/>
                </li>
            </ul>
            <span @click="prev"><i class="iconfont icon-houtui"></i></span>
            <span @click="next"><i class="iconfont icon-qianjin"></i></span>
        </div>
    </div>
</template>
<script lang="ts">
import "../assets/css/iconfont.css";
import { defineComponent, ref, computed } from "vue"
export default defineComponent({
    props: {
        imgList: {
            type: Array,
            default: () => [] as string[]
        },
        size: {
            type: String,
            default: '400px',
        },
        expandScope: { //倍数
            type: Number,
            default: 3
        }
    },
    setup(props, { emit }) {
        const loadingRef = ref(true);
        const indexRef = ref(0);
        const visibleRef = ref(false);
        const listRef = ref(null)
        const pointerRef = ref(null);
        const containerRef = ref(null);
        const mirrorRef = ref(null);

        const prev = () => {
            listRef.value.scrollLeft -= 210;


        }
        const next = () => {
            listRef.value.scrollLeft += 210;
        }
        const mirrorSize = computed(() => {

            const match = props.size.match(/(\d+)(\w+)/);
            return Number(match[1]) * props.expandScope + match[2]
        })

        const pointerSize = computed(() => {
            // return 1/props.expandScope * 100 + '%'

            return parseFloat(props.size) / props.expandScope + 'px'
        })

        /**
         * 蒙层移动
         */
        const move = e => {
            // 将指示器移至鼠标为中心的位置
            const container = containerRef.value.getBoundingClientRect();
            const pointer = pointerRef.value.getBoundingClientRect();
            let targetX = 0;
            let targetY = 0;

            // 边界判断
            if (e.offsetX + pointer.left - container.left - pointer.width / 2 < 0) {
                targetX = 0
            } else if (e.offsetX + pointer.left - container.left > container.width - pointer.width / 2) {
                targetX = container.width - pointer.width
            } else {
                targetX = e.offsetX + pointer.left - container.left - pointer.width / 2
            }

            if (e.offsetY + pointer.top - container.top - pointer.height / 2 < 0) {
                targetY = 0
            } else if (e.offsetY + pointer.top - container.top > container.height - pointer.height / 2) {
                targetY = container.height - pointer.height
            } else {
                targetY = e.offsetY + pointer.top - container.top - pointer.height / 2
            }


            pointerRef.value.style.left = targetX + 'px'
            pointerRef.value.style.top = targetY + 'px'
            // 计算位置比例
            let percentX = targetX / (container.width) * 100;
            let percentY = targetY / (container.width) * 100;
            // 设置镜像位置
            mirrorRef.value.style.left = -percentX * props.expandScope + '%';
            mirrorRef.value.style.top = -percentY * props.expandScope + '%';
        }

        /**
         * 鼠标进入图片区域
         */
        const enter = (e) => {
            visibleRef.value = true;
            // 鼠标进入, 将指示器移至鼠标为中心的位置
            const container = containerRef.value.getBoundingClientRect();
            // const pointer = pointerRef.value.getBoundingClientRect();
            // 此时pointer还未显示，无法获取,直接使用计算的值
            let pointer_size = container.width / props.expandScope;

            if (e.offsetX - pointer_size / 2 < 0) { //到达左边界
                pointerRef.value.style.left = 0
            } else if (e.offsetX + pointer_size / 2 >= container.width) { //到达右侧边界
                pointerRef.value.style.left = container.width - pointer_size + 'px'
            } else {
                pointerRef.value.style.left = e.offsetX - pointer_size / 2 + 'px'
            }
            // 330 25 325
            console.log(e.offsetY, pointer_size, container.height - pointer_size)
            if (e.offsetY - pointer_size / 2 < 0) { // 到达上边界
                pointerRef.value.style.top = 0;
            } else if (e.offsetY >= container.height - pointer_size) { //到达底部边界
                pointerRef.value.style.top = container.height - pointer_size + 'px'
            } else {
                pointerRef.value.style.top = e.offsetY - pointer_size / 2 + 'px'
            }
        }

        return {
            loadingRef,
            indexRef,
            listRef,
            prev,
            next,
            mirrorSize,
            pointerRef,
            move,
            containerRef,
            mirrorRef,
            pointerSize,
            enter,
            visibleRef
        }
    }

})



</script>
<style lang="less" scoped>
ul,
ol {
    list-style: none;
}
.mirror {
    border: 1px solid #f1f2f6;
    box-sizing: content-box;
    width: v-bind(size);
    // height:v-bind(size);
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .big-pic {
        position: relative;
        width: v-bind(size);
        height: v-bind(size);
        .pic-container {
            box-sizing: unset;
            width: 100%;
            height: 100%;
        }
        .pointer {
            width: v-bind(pointerSize);
            height: v-bind(pointerSize);
            position: absolute;
            left: 30px;
            top: 0;
            background: rgba(0, 0, 0, 0.4);
            cursor: grab;
        }
        .mirror-wrap {
            width: v-bind(size);
            height: v-bind(size);
            left: 105%;
            top: 0;
            position: absolute;
            overflow: hidden;
            .mirror-pic {
                width: v-bind(mirrorSize);
                height: v-bind(mirrorSize);
                position: absolute;
                left: 0;
                top: 0;
                img {
                    position: relative;
                    width: 100%;
                }
            }
        }
    }

    .mirror-list-wrap {
        width: 100%;
        overflow: hidden;
        position: relative;
        .mirror-list {
            display: flex;
            margin-top: 20px;
            overflow: hidden;
            overflow-x: scroll;
            padding: 0 30px;
            &::-webkit-scrollbar {
                display: none;
            }
            li {
                width: 60px;
                height: 60px;
                flex-shrink: 0;
                cursor: pointer;
                margin-right: 10px;
                cursor: pointer;
                border: 2px solid transparent;
                box-sizing: border-box;
                &.active {
                    border-color: #f40;
                }
                img {
                    width: 100%;
                }
            }
        }
        & > span {
            position: absolute;

            top: 20px;
            width: 30px;
            height: 60px;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
                background: rgba(0, 0, 0, 0.3);
            }
            .iconfont {
                font-size: 20px;
                color: #fff;
            }
            &:first-of-type {
                left: 0;
            }
            &:last-of-type {
                right: 0;
            }
        }
    }
}
</style>