import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import { Plotly } from '@/index.js'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('plotly', Plotly)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
