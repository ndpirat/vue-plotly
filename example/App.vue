<template>
  <div id="app">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="row justify-content-md-center">
            <div
              v-for="(data, idx) in features"
              :key="idx"
              class="col-3 features"
            >
              <div>
                <h4 class="big-icon">
                  <span class="sr-only">{{ data.text }}</span>
                </h4>
                <p class="card-text">{{ data.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card main-card">
        <Picker />
      </div>
    </div>
  </div>
</template>

<script>
import Picker from './components/Picker.vue'

export default {
  name: 'App',
  components: {
    Picker
  },
  data() {
    return {
      features: [
        { text: 'plotly.js methods and events' },
        { text: 'Data reactivity' },
        { text: 'Redraw on resizing' }
      ]
    }
  }
}
</script>

<style lang="less">
#app {
  @media (min-width: 1200px) {
    .container {
      max-width: 1800px;
    }
  }

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .logo {
    text-align: center;
    img {
      width: 80px;
    }
  }

  .card {
    .card-header {
      a {
        margin-right: 5px;
      }
    }
  }

  .footer {
    text-align: center;
    img {
      height: 40px;
    }
  }
}

.features {
  font-size: 18px;
  text-align: center;
}

.graph-label {
  text-align: center;
  width: 100%;
  height: 100%;
}

.label {
  background: rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.selector {
  background-color: lightblue;
}

#badges {
  text-align: center;
}

.main-card {
  padding: 0;
}

footer.footer {
  background: darkgray;
}

.big-icon {
  margin-bottom: 0;
}

.title {
  font-size: 30px;
  color: black;
}

a.title-link:hover {
  text-decoration: none;
}
</style>
