<template>
    <div id="app">
        <div class="header">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <template v-for="(menuItem, key) in menu">
                    <el-menu-item v-if="!menuItem.children" :index="menuItem.key">{{menuItem.name}}</el-menu-item>
                    <el-submenu v-else :index="menuItem.key">
                        <template slot="title">{{menuItem.name}}</template>
                        <template v-for="subMenuItem in menuItem.children">
                            <el-menu-item v-if="!subMenuItem.children" :index="subMenuItem.key"></el-menu-item>
                            <el-submenu v-else :index="subMenuItem.key">
                                <template slot="title">{{subMenuItem.name}}</template>
                                <el-menu-item v-for="subsubMenuItem in subMenuItem.children" :index="subsubMenuItem.key">{{subsubMenuItem.name}}</el-menu-item>
                            </el-submenu>  
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
            <ul class="user">
                <li>登录</li>
                <li>注册</li>
            </ul>
        </div>
    </div>
</template>

<script>
import menu from 'PAGE/index/menu'
export default {
    name: 'app',
    data() {
        return {
            menu: menu,
            activeIndex2: 'home'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="sass">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .header{
        position: relative;
        .user{
            position: absolute;
            right: 0;
            top:0;
            color: red;
        }
    }
}
</style>
