<template>
    <div id="app">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="menuItem in menu">
                <el-menu-item v-if="!menuItem.children" :index="menuItem.key">{{menuItem.name}}</el-menu-item>
                <el-submenu v-else :index="menuItem.key">
                    <template slot="title">{{menuItem.name}}</template>
                    <template v-for="subMenuItem in menuItem">
                        <el-menu-item v-if="!subMenuItem.children" :index="subMenuItem.key"></el-menu-item>
                        <el-submenu v-else :index="subMenuItem.key">
                            <template slot="title">{{subMenuItem.name}}</template>
                            <el-menu-item v-for="subsubMenuItem in subMenuItem" :index="subsubMenuItem.key">{{subsubMenuItem.name}}</el-menu-item>
                        </el-submenu>  
                    </template>
                    
                </el-submenu>
            </template>
        </el-menu>
    
        <router-view/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
