
<p align="center"><img width="140"src="https://raw.githubusercontent.com/David-Desmaisons/vue-plotly/master/example/assets/logo.png"></p>

<h2>Thin vue wrapper for <a
              href="https://plot.ly/javascript/"
              target="_blank"
            >plotly.js</a></h2>
<span>It provides:</span>
<ul>
  <li>all plotly.js methods and events</li>
  <li>data reactivity</li>
  <li>Redraw on resizing</li>
</ul>

![example](./example/assets/demo.gif)

## Usage

```HTML
<Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
```

```javascript
import { Plotly } from 'vue-plotly'

export default {
  components: {
    Plotly
  },
  data:{
    data:[{
      x: [1,2,3,4],
      y: [10,15,13,17],
      type:"scatter"
    }],
    layout:{
      title: "My graph"
    }
  }
}
```

## API

- `data` ***Array*** (*optional*)

  [Data](https://plot.ly/javascript/reference/) to be displayed

- `layout` ***Object*** (*optional*)

  Graphic [layout](https://plot.ly/javascript/reference/#layout)

- `id` ***String*** (*optional*)

  Id of the root HTML element of the component.

- Others:

  Plotly component implements the [transparent wrapper pattern](https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html):<br>All other props will be passed as plotly graphic [option](https://plot.ly/javascript/configuration-options/).

## Installation

```bash
npm install vue-plotly
```

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Run your unit tests

```bash
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Customize plotly bundles for gWAP

see : <https://github.com/plotly/plotly.js/blob/master/CUSTOM_BUNDLE.md>
cuurently shipped with custom bundle named : plotly.js/dist/plotly-gWAP.min.js
all traces / transform are listed at :
<https://github.com/plotly/plotly.js/blob/master/lib/index.js>

Instructions for building a custom plotly bundle

Go to local plotly

```bash
cd node_modules/plotly.js  
```

install plotly deps

```bash
npm i
```  

build custom bundles

```bash
npm run custom-bundle -- --out gWAP --traces scatter,scatterternary,bar,contour,histogram,heatmap,pie,indicator --transforms none  
```

rebuild vue-plotly

```bash
npm run:prepublishOnly  
```
