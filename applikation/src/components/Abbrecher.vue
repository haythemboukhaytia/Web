<template>
  <div>
    <h1>Anzahl von <strong>Abbrechern</strong> pro Semester.</h1>
    <chart v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import axios from "axios";
import chart from "./chart.vue";

export default {
  name: "abbrecher",
  components: { chart },
  data: () => {
    return {
     
      chartdata: null,
      loaded: false,
      options: null
    };
  },
  async mounted() {
    this.loaded = false;
    await axios
      .get("http://localhost:4000/api/abbrecher")
      .then(res => {
        let tempStudentPerSemester = [],
          tempSemesterId = [];
        for (let i = 0; i < res.data.response.length; i++) {
          tempSemesterId.push("Semester " + res.data.response[i]["semester"]);
          tempStudentPerSemester.push(res.data.response[i]["studenten"]);
        }

        this.loaded = true;
        (this.chartdata = {
          labels: tempSemesterId,
          datasets: [
            {
              label: "Abbrecher per Semester",
              data: tempStudentPerSemester,
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
};
</script>


<style scoped>
h1{
  font-size:35px;
}
strong{
  color:#00a5a5;
}
</style>
