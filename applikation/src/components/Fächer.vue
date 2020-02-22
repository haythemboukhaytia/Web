<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 mb-5">
        <h3>Untersuchung schwere Fächer</h3>
      </div> 
    </div>
    <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-6">
        <label>
          Wählen Sie bitte eine
          <strong>Note</strong> aus.
        </label>
        <select id="selectstart" class="form-control mb-5" v-model="number">
          <option value="3.3">3.3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
         </div>
         <div class="col-sm-12 col-md-12 col-lg-6">
        <button
          type="button"
          class="btn btn-info mt-3"
          data-toggle="tooltip"
          data-placement="top"
          @click="change1(number)"
        >Fächer Vergleichen</button>
        </div>
        </div>
        <div class="row">
       <div class="col-sm-12 col-md-12 col-lg-6">
        <bar v-if="loaded1" :chartdata="chartdata" :options="options" />
       </div>
       <div class="col-sm-12 col-md-12 col-lg-6">
        <bar v-if="loaded2" :chartdata="chartdata" :options="options" />
       </div>
        
      </div>

      <!-- <div class="col-sm-12 col-md-12 col-lg-6 mt-5">
        <button
          type="button"
          class="btn btn-info mb-3"
          data-toggle="tooltip"
          data-placement="top"
        >Fächer für Absolventen</button>
        <br />
        <label>
          Wählen Sie bitte eine
          <strong>Note</strong> aus.
        </label>
        <select id="drop2" class="form-control mb-5" @change="change2()" v-model="number2">
          <option>3.3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <bar v-if="loaded2" :chartdata="chartdata" :options="options" />
      </div> -->
    
  </div>
</template>

<script>
import axios from "axios";
import bar from "./bar.vue";

export default {
  components: { bar },
  data: () => {
    return {
      chartdata: null,
      loaded1: false,
      loaded2: false,
      options: null,
      number: null,
      number2:null
    };
  },
  methods: {
    async change1(nub) {
     this.change2(nub);
    
      this.loaded1 = false;

      //let num = this.number;
      let sumStudent = [],
        sumTitel = [];

      let host = "http://localhost:4000/api/";
      axios
        .get(host + "getFachAbbrecher/" + nub)
        .then(res => {
          for (let i = 0; i < res.data.response.length; i++) {
            sumStudent.push(res.data.response[i]["Studenten"]);
            sumTitel.push(res.data.response[i]["Titel"]);
          }
          console.log(res.data.response);
          console.log(sumStudent);

          this.loaded1= true;
          (this.chartdata = {
            labels: sumTitel,
            datasets: [
              {
                label: "Anzahl Abbrecher mit " + nub + " als Note",
                data: sumStudent,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                borderCapStyle: "round"
              }
            ]
          }),
            (this.options = {
              responsive: true,
              maintainAspectRatio: false
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    async change2(nub) {
      this.loaded2 = false;
      let num = this.number2;
      //console.log(num);
      let sumStudent = [],
        sumTitel = [];

      let host = "http://localhost:4000/api/";
      axios
        .get(host + "getFachAbsolventen/" + nub)
        .then(res => {
          for (let i = 0; i < res.data.response.length; i++) {
            sumStudent.push(res.data.response[i]["Studenten"]);
            sumTitel.push(res.data.response[i]["Titel"]);
          }
          console.log(res.data.response);
          console.log(sumStudent);

          this.loaded2 = true;
          (this.chartdata = {
            labels: sumTitel,
            datasets: [
              {
                label: "Anzahl Absolventen mit " + nub + " als Note",
                data: sumStudent,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                borderCapStyle: "round"
              }
            ]
          }),
            (this.options = {
              responsive: true,
              maintainAspectRatio: false
            });
        })
        .catch(err => {
          console.log(err);
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
  color: #00a5a5;
  font-size: 20px;
  font-weight: bold;
}
</style>