import { shallowMount } from '@vue/test-utils'
import Plotly from '@/components/Plotly.vue'
import plotlyjs from 'plotly.js/dist/plotly-gWAP.min.js'

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

let wrapper
let vm
let layout
let data
let attrs
const id = 'id'

const events = [
  'AfterExport',
  'AfterPlot',
  'Animated',
  'AnimatingFrame',
  'AnimationInterrupted',
  'AutoSize',
  'BeforeExport',
  'ButtonClicked',
  'Click',
  'ClickAnnotation',
  'Deselect',
  'DoubleClick',
  'Framework',
  'Hover',
  'LegendClick',
  'LegendDoubleClick',
  'Relayout',
  'Restyle',
  'Redraw',
  'Selected',
  'Selecting',
  'SliderChange',
  'SliderEnd',
  'SliderStart',
  'Transitioning',
  'TransitionInterrupted',
  'Unhover'
]

const methods = [
  'restyle',
  'relayout',
  'update',
  'addTraces',
  'deleteTraces',
  'moveTraces',
  'extendTraces',
  'prependTraces',
  'purge'
]

function shallowMountPlotly(attrs) {
  jest.clearAllMocks()
  const elem = document.createElement('div')
  return shallowMount(Plotly, {
    propsData: {
      layout,
      data,
      id
    },
    attrs,
    attachTo: elem
  })
}

describe('Plotly.vue', () => {
  beforeEach(() => {
    layout = {}
    data = []
    attrs = {
      'display-mode-bar': true
    }
    wrapper = shallowMountPlotly(attrs)
    vm = wrapper.vm
  })

  it('defines props', () => {
    const props = {
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
    }
    expect(Plotly.props).toEqual(props)
  })

  it('sets innerLayout', async () => {
    expect(wrapper.vm.innerLayout).toEqual({ ...vm.layout })
  })

  it('renders a div', () => {
    expect(wrapper.find('div'))
  })

  it('sets id on div', () => {
    expect(wrapper.find(`#${id}`).html()).toBe('<div id="id"></div>')
  })

  it('calls plotly newPlot', () => {
    expect(plotlyjs.newPlot).toHaveBeenCalledWith(vm.$el, data, layout, {
      displayModeBar: true,
      responsive: false
    })
    expect(plotlyjs.newPlot.mock.calls.length).toBe(1)
  })

  it('allows responsive to be overridden attribute', () => {
    attrs = {
      responsive: true
    }
    wrapper = shallowMountPlotly(attrs)

    expect(plotlyjs.newPlot).toHaveBeenCalledWith(vm.$el, data, layout, {
      responsive: true
    })
    expect(plotlyjs.newPlot.mock.calls.length).toBe(1)
  })

  test.each(events)(
    'listens to plotly event %s and transform it in a vue event',
    evt => {
      const evtName = evt.toLowerCase()
      const {
        on: {
          mock: { calls }
        }
      } = vm.$el
      const call = calls.find(c => c[0] === `plotly_${evtName}`)

      expect(call).not.toBeUndefined()
      expect(call.length).toBe(2)

      const callBack = call[1]
      const parameter = { value: 25 }
      callBack(parameter)

      expect(wrapper.emitted()).toEqual({
        [evtName]: [[parameter]]
      })
    }
  )

  it(`register all the ${events.length} plotly events`, () => {
    const {
      on: {
        mock: { calls }
      }
    } = vm.$el
    expect(calls.length).toBe(events.length)
  })

  test.each(methods)('defines plotly method %s', methodName => {
    expect(methodName in vm).toBe(true)
    const parameters = [1, 2, 3]
    vm[methodName](...parameters)

    expect(plotlyjs[methodName]).toHaveBeenCalledWith(vm.$el, 1, 2, 3)
  })

  describe.each([
    ['data', _wrapper => _wrapper.setProps({ data: [{ data: 'novo' }] })]
  ])('when %p changes', (_, changeData) => {
    describe.each([
      ['once', changeData],
      [
        'twice',
        _wrapper => {
          changeData(_wrapper)
          changeData(_wrapper)
        }
      ]
    ])('%s in the same tick', (__, update) => {
      beforeEach(() => {
        jest.clearAllMocks()
        update(wrapper)
      })

      it('calls plotly react once in the next tick', async () => {
        await vm.$nextTick()
        expect(plotlyjs.react).toHaveBeenCalledWith(
          vm.$el,
          vm.data,
          vm.layout,
          vm.options
        )
        expect(plotlyjs.react.mock.calls.length).toBe(1)
      })

      it('does not calls plotly relayout', async () => {
        await vm.$nextTick()
        expect(plotlyjs.relayout).not.toHaveBeenCalled()
      })
    })
  })

  describe('when props changes in the same tick', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      wrapper.setProps({ data: [{ data: 'novo' }] })
    })

    it('calls plotly react once in the next tick', async () => {
      await vm.$nextTick()
      expect(plotlyjs.react).toHaveBeenCalledWith(
        vm.$el,
        vm.data,
        vm.layout,
        vm.options
      )
      expect(plotlyjs.react.mock.calls.length).toBe(1)
    })

    it('does not calls plotly relayout', async () => {
      await vm.$nextTick()
      expect(plotlyjs.relayout).not.toHaveBeenCalled()
    })
  })

  describe('when options changes to same value', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      vm.$options.watch.options.handler.call(vm, vm.options, vm.options)
    })

    it('does not calls plotly react', async () => {
      await vm.$nextTick()
      expect(plotlyjs.react).not.toHaveBeenCalled()
    })

    it('does not calls plotly relayout', async () => {
      await vm.$nextTick()
      expect(plotlyjs.relayout).not.toHaveBeenCalled()
    })
  })

  describe('when options changes', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('computes options', async () => {
      expect(wrapper.vm.options).toEqual({
        displayModeBar: true,
        responsive: false
      })
    })

    it('does calls plotly react', async () => {
      vm.$options.watch.options.handler.call(vm, {
        displayModeBar: 'always'
      })

      await vm.$nextTick()
      expect(plotlyjs.react).toHaveBeenCalledWith(
        vm.$el,
        vm.data,
        vm.layout,
        vm.options
      )
      expect(plotlyjs.react.mock.calls.length).toBe(1)
    })
  })

  describe('when layout changes', () => {
    const updateLayout = () => wrapper.setProps({ layout: { novo: 'layout' } })
    describe.each([
      ['once', updateLayout],
      [
        'twice',
        () => {
          updateLayout()
          updateLayout()
        }
      ]
    ])('%s in the same tick', (_, update) => {
      beforeEach(() => {
        jest.clearAllMocks()
        update(wrapper)
      })

      it('calls plotly relayout once', async () => {
        await vm.$nextTick()
        expect(plotlyjs.relayout).toHaveBeenCalledWith(vm.$el, {
          novo: 'layout'
        })
        expect(plotlyjs.relayout.mock.calls.length).toBe(1)
      })

      it('does not calls plotly react', async () => {
        await vm.$nextTick()
        expect(plotlyjs.react).not.toHaveBeenCalled()
      })
    })
  })

  const changeData = async () =>
    await wrapper.setProps({ data: [{ novo: 'data' }] })
  const changeLayout = async () =>
    await wrapper.setProps({ layout: { novo: 'layout' } })

  describe.each([
    [
      () => {
        changeData()
        changeLayout()
      }
    ],
    [
      () => {
        changeLayout()
        changeData()
      }
    ]
  ])('when layout changes and data changes', changes => {
    beforeEach(() => {
      jest.clearAllMocks()
      changes()
    })

    it('calls plotly react once', async () => {
      await vm.$nextTick()
      expect(plotlyjs.react).toHaveBeenCalledWith(
        vm.$el,
        [{ novo: 'data' }],
        { novo: 'layout' },
        {
          displayModeBar: true,
          responsive: false
        }
      )
      expect(plotlyjs.react.mock.calls).toHaveLength(1)
    })

    it('calls plotly relayout once', async () => {
      await vm.$nextTick()
      expect(plotlyjs.relayout).toHaveBeenCalledWith(vm.$el, { novo: 'layout' })
      expect(plotlyjs.react.mock.calls).toHaveLength(1)
    })
  })

  describe('when calling toImage', () => {
    beforeEach(() => {
      vm.toImage({ option: 1 })
    })

    it('calls Plotly toImage', () => {
      const { clientWidth: width, clientHeight: height } = vm.$el
      expect(plotlyjs.toImage).toHaveBeenCalledWith(vm.$el, {
        width,
        height,
        option: 1,
        format: 'png'
      })
    })
  })

  describe('when calling downloadImage', () => {
    beforeEach(() => {
      vm.downloadImage({ option: 1 })
    })

    it('calls Plotly toImage', () => {
      const { clientWidth: width, clientHeight: height } = vm.$el
      const { downloadImage } = plotlyjs
      expect(downloadImage).toHaveBeenCalled()
      const {
        mock: {
          calls: [call]
        }
      } = downloadImage

      expect(call.length).toBe(2)
      expect(call[0]).toBe(vm.$el)
      expect(call[1]).toMatchObject({
        width,
        height,
        option: 1,
        format: 'png'
      })
      expect(call[1].filename).not.toBeUndefined()
    })
  })

  describe('when destroyed', () => {
    beforeEach(() => {
      wrapper.unmount()
    })

    it('calls plotly purge', () => {
      expect(plotlyjs.purge).toHaveBeenCalledWith(vm.$el)
    })

    test.each(events)('unlistens to plotly event %s', evtName => {
      const { removeAllListeners } = vm.$el
      expect(removeAllListeners).toHaveBeenCalledWith(
        `plotly_${evtName.toLowerCase()}`
      )
    })

    it(`unlistens to all the ${events.length} plotly events`, () => {
      const {
        removeAllListeners: {
          mock: { calls }
        }
      } = vm.$el
      expect(calls.length).toBe(events.length)
    })
  })
})
