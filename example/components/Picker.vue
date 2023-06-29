<template>
  <div>
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <div class="col">
            <form class="form-group">
              <select id="selector" v-model="selected" class="form-control col">
                <option
                  v-for="(example, idx) in generics"
                  :key="idx"
                  :value="example"
                >
                  {{ example.display }}
                </option>
              </select>
            </form>
          </div>

          <div class="col descriptor">
            <span>Layout:</span>
            <editor
              class="layout"
              mode="tree"
              :main-menu-bar="false"
              :navigation-bar="false"
              :model-value="selected.data.layout"
              @update:model-value="updateLayout"
            />
          </div>

          <div class="col descriptor">
            <span>Data:</span>
            <editor
              class="data"
              mode="tree"
              :main-menu-bar="false"
              :navigation-bar="false"
              :model-value="selected.data.data"
              @update:model-value="updateData"
            />
          </div>
        </div>

        <div class="col-9">
          <div class="row">
            <div class="col">
              <div class="code">{{ code }}</div>
            </div>
          </div>
          <Plotly
            class="graph"
            v-bind="selected.data.attr"
            :data="selected.data.data"
            :layout="selected.data.layout"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import JsonEditorVue from 'json-editor-vue'
import { Plotly } from '@/index.js'
import simple from './simple.js'
import contour from './contour.js'
import histogram from './histogram.js'
import histogram2D from './2D-histogram.js'
import pie from './pie.js'

const editor = JsonEditorVue

const generics = reactive([simple, contour, histogram, pie, histogram2D])
const selected = ref(simple)

const code = computed(() => {
  const attr = selected.value.data.attr
  const fromAttr = Object.keys(attr)
    .map(key => `:${key}="${attr[key]}"`)
    .join(' ')
  return `<plotly :data="data" :layout="layout" ${fromAttr}/>`
})

const updateLayout = newLayout => {
  selected.value.data.layout = newLayout
}
const updateData = newData => {
  selected.value.data.data = newData
}
</script>
<style>
.layout .jsoneditor-vue {
  height: 150px;
}

.data .jsoneditor-vue {
  height: 300px;
}

.jsoneditor-vue div.jsoneditor-tree {
  min-height: 100px;
}

.mark-up {
  margin-top: 8px;
}

.graph {
  height: 500px;
}

div.jsoneditor-menu {
  background-color: #007bff;
  border-bottom: 1px solid #007bff;
}

.descriptor > span {
  margin-left: 5px;
  margin-top: 5px;
}

.code {
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-left: 3px solid #f36d33;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 0.6;
  margin-bottom: 0.8em;
  max-width: 50%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
}
</style>
