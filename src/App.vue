<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Layout />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Layout from '@/components/Layout/Layout.vue';

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
*,
*::after,
*::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

blockquote,
body,
dd,
dl,
figcaption,
figure,
h1,
h2,
h3,
h4,
li,
ol,
p,
ul {
  margin: 0;
}

body,
html {
  height: 100%;
}

ol,
ul {
  padding: 0;
  list-style: none;
}

a {
  font-family: inherit;
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
  border: none;
}

button,
input,
select,
textarea {
  font-family: inherit;
}
#app {
  font-family: "Yanone Kaffeesatz", sans-serif;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.modal.modalshow {
  display: block;
  animation: fade 0.5s forwards ease-in-out;
}
@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
