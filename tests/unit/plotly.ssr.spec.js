/**
 * @jest-environment node
 */
import { createSSRApp } from 'vue'
const { renderToString } = require('@vue/server-renderer')
const Plotly = require('@/components/Plotly').default

const app = createSSRApp({
  name: 'TestApp',
  template: `<Plotly :data="[]" :layout="{}"></Plotly>`
})

app.component('Plotly', Plotly)

let html

describe('Plotly.vue in a ssr context', () => {
  beforeEach(async () => {
    html = await renderToString(app)
  })

  it('can be rendered', () => {
    const expected = '<div></div>'
    expect(html).toEqual(expected)
  })
})
