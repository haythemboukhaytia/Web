<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-5 mt-5">
        <p class="msg">{{msg}}</p>
        <div>
          <router-link :to="{name: 'Abbrecher'}">
             <button
            type="button"
            class="btn btn-info"
            data-toggle="tooltip"
            data-placement="top"
            title="Studenten die nach zwei oder drei semestern nichts belegt haben."
          >Abbrecher</button>
            </router-link>

         <router-link :to="{name: 'Absolventen'}">
          <button
            type="button"
            class="btn btn-info"
            data-toggle="tooltip"
            data-placement="top"
            title="Studenten die Ihr Studium erfolgreich absolviert haben."
          >Absolventen</button>
          </router-link>
         
          <button
            type="button"
            class="btn btn-info"
            data-toggle="tooltip"
            data-placement="top"
            title="Studenten die Urlaubssemester während Studium gemacht haben."
            @click="scrollMeTo('pause')"
          >Pausenden</button>
           
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-7 mt-3">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="0"
          img-width="1024"
          img-height="480"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Slides with image only -->
          <b-carousel-slide :img-src="require('../assets/abbrecher.jpg')"></b-carousel-slide>
          <!-- Slides with image only -->
          <b-carousel-slide :img-src="require('../assets/absolventen.jpg')"></b-carousel-slide>
          <!-- Slides with image only -->
          <b-carousel-slide :img-src="require('../assets/pausenden.jpg')"></b-carousel-slide>
          <!-- Slides with image only -->
        </b-carousel>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div ref="pause"  class="row mt-5">
      <div class="col mt-5">
        <h3>Überblick über die Anzahl der Pausenden</h3>
      </div>
    </div>
    <div class="row mt-5">
      <div class="form-group col-sm-12 col-md-6 col-lg-6 mt-3">
        <label>
          Wählen Sie bitte eines
          <strong>Urlaubssemester</strong> aus.
        </label>
        <select class="form-control" @change="change()" v-model="number">
          <option selected="selected">1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 mt-5">
        <ul>
          <li v-for="item in std" :key="item"><strong>&check;</strong>  Anzahl der Pausenden ist: {{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      std: [],
      number: null,
      slide: 0,
      sliding: null,
      msg: "Willkommen auf Homepage!",
      number: null,
      chartdata: null,
      loaded: false,
      options: null
    };
  },
  methods: {
    scrollMeTo(refName) {
    var element = this.$refs[refName];
    var top = element.offsetTop;

    window.scrollTo(0, top);
  },
    async change() {
      let num = this.number;
      this.std = [];
      let host = "http://localhost:4000/api/";
      axios.get(host + "getPausenden/" + num).then(res => {
        console.log(res.data.response);
        for (let i = 0; i < res.data.response.length; i++) {
          this.std.push(res.data.response[i].studenten);
        }
      });
    },
    onSlideStart(slide) {
      this.sliding = false;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>
<style scoped>
.msg {
  color: #00a5a5;
  font-size: 30px;
  font-weight: 900;
}
strong {
  color: #00a5a5;
}
ul {
  list-style-type: none;
 }
 h3{
   font-weight: bold;
   font-size: 25px;
   color:black;
 }
</style>