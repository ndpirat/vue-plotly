<template>
  <div :id="id" :ref="'plotly-' + id"></div>
</template>
<script>
import lodashDebounce from 'lodash.debounce'
import Plotly from 'plotly.js/dist/plotly-gWAP.min.js'
import events from './events.js'
import methods from './methods.js'
import { camelize } from '@/utils/helper.js'

const { debounce = lodashDebounce } = lodashDebounce
const defaultDelay = 100

const debounceResize = debounce(el => {
  return Plotly.Plots.resize(el)
}, defaultDelay)

export default {
  name: 'Plotly',
  inheritAttrs: false,
  props: {
    data: {
      type: Array,
      required: true
    },
    layout: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      innerLayout: { ...this.layout }
    }
  },
  computed: {
    options() {
      const optionsFromAttrs = Object.keys(this.$attrs).reduce((acc, key) => {
        acc[camelize(key)] = this.$attrs[key]
        return acc
      }, {})
      return {
        responsive: false,
        ...optionsFromAttrs
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.schedule('replot')
      },
      deep: true
    },
    options: {
      handler(value, old) {
        if (JSON.stringify(value) === JSON.stringify(old)) {
          return
        }
        this.schedule('replot')
      },
      deep: true
    },
    layout(layout) {
      this.innerLayout = { ...layout }
      this.schedule('relayout')
    }
  },
  mounted() {
    Plotly.newPlot(this.$el, this.data, this.innerLayout, this.options)
    events.forEach(evt => {
      this.$el.on(evt.completeName, evt.handler(this))
    })

    this.resizeObserver = new ResizeObserver(() => {
      debounceResize(this.$el)
    })
    this.resizeObserver.observe(this.$el)
  },
  beforeUnmount() {
    events.forEach(event => this.$el.removeAllListeners(event.completeName))
    this.resizeObserver.disconnect()
    debounceResize.cancel()
    Plotly.purge(this.$el)
  },
  methods: {
    ...methods,
    schedule(plotMethod) {
      this.$nextTick(() => {
        if (plotMethod === 'replot') this.react()
        if (plotMethod === 'relayout') this.relayout(this.innerLayout)
      })
    },
    toImage(options) {
      const allOptions = Object.assign(this.getPrintOptions(), options)
      return Plotly.toImage(this.$el, allOptions)
    },
    downloadImage(options) {
      const filename = `plot--${new Date().toISOString()}`
      const allOptions = Object.assign(
        this.getPrintOptions(),
        { filename },
        options
      )
      return Plotly.downloadImage(this.$el, allOptions)
    },
    getPrintOptions() {
      const { $el } = this
      return {
        format: 'png',
        width: $el.clientWidth,
        height: $el.clientHeight
      }
    },
    react() {
      Plotly.react(this.$el, this.data, this.innerLayout, this.options)
    }
  }
}
</script>
