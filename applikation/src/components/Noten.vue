<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
            <h1>Notenverteilung aller stattgefundenen Prüfungsversuche</h1>
      </div>
    </div>
    <div class="row mt-5">
      <div class="form-group col-sm-12 col-md-6 col-lg-6">
        <label>
          Wählen Sie bitte ein
          <strong>Semester</strong> aus.
        </label>
        <select class="form-control" @change="change()" v-model="number">
          <option selected="selected">1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>45</option>
        </select>
      </div>
      <div class="form-group col-sm-12 col-md-6 col-lg-6" v-if="matsLoaded">
        <label>
          Wählen Sie bitte ein
          <strong>Fach</strong> aus.
        </label>
        <select class="form-control" v-model="selectedMat" @change="formSubmit()">
          <option v-for="mat in mats" :key="mat">{{mat}}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 mt-5">
        <h3 v-if="loaded">Notenverteilung von <span style="color:#00a5a5;">{{selectedMat}}</span> im Semester<span style="color:#00a5a5;"> {{number}}</span></h3>
        <Chart type="pie" v-if="loaded" :data="chartData" :options="options" style="height:350px"/>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "primevue/chart";
import axios from "axios";

export default {
  components: { Chart },
  data: () => {
    return {
      selectedMat: null,
      chartdata: null,
      loaded: false,
      labelsc: [],
      datac: [],
      number: null,
      mats: [],
      matsLoaded: false,
      options:null
    };
  },
  methods: {
    formSubmit() {
      this.labelsc = [];
      this.datac = [];
      let selected = this.selectedMat;
      let num = this.number;
      let host = "http://localhost:4000/api/";

      axios
        .get(host + "getNotenProPlanSemesterAndMat/" + num + "/" + selected)

        .then(res => {
          for (let i = 0; i < res.data.response.length; i++) {
            this.labelsc.push(res.data.response[i].Note);
            this.datac.push(res.data.response[i].Studenten);
          }
          this.loaded = true;
          this.chartData = {
            labels: this.labelsc,
            datasets: [
              {
                data: this.datac,
                backgroundColor: [
                  "aqua",
                  "black",
                  "blue",
                  "fuchsia",
                  "gray",
                  "green",
                  "lime",
                  "maroon",
                  "navy",
                  "olive",
                  "orange",
                  "purple",
                  "red",
                  "silver",
                  "teal",
                  "white",
                  "yellow"
                ]
              }
            ]
          },
          this. options = {
          responsive: true,
          maintainAspectRatio: false,
  
}
        });
    },
    async change() {
      this.loaded = false;
      let nums = this.number;
      let host = "http://localhost:4000/api/";
      axios.get(host + "getMatsWithSemesterNumberr/" + nums).then(res => {
        this.mats = [];
        // console.log(res.data.response)
        for (let i = 0; i < res.data.response.length; i++) {
          this.mats.push(res.data.response[i].Titel);
        }
        this.matsLoaded = true;
      });
    }
  }
};
</script>
<style>
strong {
  color: #00a5a5;
}
h3 {
  font-size: 20px;
  font-weight: bold;
}

</style>