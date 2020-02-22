<template>
  <b-container fluid id="app">
    <b-row>
      <b-col>
        <Navigation/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navigation from './components/Navigation';
export default {
  name: "App",
  components:{
    'Navigation': Navigation
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 180px;
}
</style>
