// 重置css

// 完整引入引入element-ui
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)


// 按需引入引入element-ui
// import { Button, Select } from 'element-ui';
// console.log(Button)
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);

import * as elementComponent from './element-ui.js'
import 'SASS'

// 设置语言
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale 	from 'element-ui/lib/locale'
switch (require('projectRoot/env.js').app_lang) {
	case 'zh-CN':
	    locale.use(zhLocale)
	    break
	case 'en':
	    locale.use(enLocale)
	    break
	default:
	    locale.use(zhLocale)
}

// 在引入 Element 时，可以传入一个全局配置对象。该对象目前仅支持 size 字段，用于改变组件的默认尺寸。
Vue.prototype.$ELEMENT = { size: 'small' }

// 注册组件
Object.keys(elementComponent).forEach(function (component) {
    switch (component) {
    	case "Loading":
    		Vue.use(elementComponent[component].directive)
			Vue.prototype.$loading 	= 	elementComponent[component].service
			break
		case "MessageBox":
    		Vue.prototype.$msgbox  	= 	elementComponent[component]
			Vue.prototype.$alert  	= 	elementComponent[component].alert
			Vue.prototype.$confirm 	= 	elementComponent[component].confirm
			Vue.prototype.$prompt 	= 	elementComponent[component].prompt
			break
		case "Notification":
    		Vue.prototype.$notify 	= 	elementComponent[component]
			break
		case "Message":
    		Vue.prototype.$message 	= 	elementComponent[component]
			break
		default:
			Vue.use(elementComponent[component])
			break
    }
})

