var templatejuniorsme = `
<div class="table-responsive">
  <div>Junior SME template</div>
  <table class="table table-hover table-dark">
    <thead>
      <tr>
        <th class="th-sm" scope="col">Hour</th>
        <th class="th-sm" scope="col">Agent Available</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(agent,index) in this.junior_sme_daily" v-bind:class="['clickable-row',{ available: index == current_hours }]" @click="hangout_link()" role="button">
        <td>{{ index }}:00</td>
        <td>{{agent}}</td>
      </tr>
    </tbody>
  </table>
</div>
`;

var juniorsme = Vue.component("juniorsme", {
  template: templatejuniorsme,
  data() {
    return {
      count: 0,
      junior_sme_daily: "",
      current_day: "",
      current_hours: ""
    };
  },
  activated: function () {
    console.log('Junior SME activated')
  },
  deactivated: function () {
    console.log('Junior SME deactivated')
  },
  mounted: function () {
    var current_date = new Date();
    this.current_day = current_date.getDay()
    this.current_hours = current_date.getHours()
    console.log(current_date)
    console.log(this.current_day)
    console.log(this.current_hours)
    fetch('http://35.228.175.186/process_data/general-data/raw/master/junior-sme.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(data.juniorsme[this.current_day])
        console.log(this.all_hours)
        this.junior_sme_daily = data.juniorsme[this.current_day]
      })
      .catch(error => console.error(error))
    console.log('Junior SME mounted')
  },
  destroyed: function () {
    console.log('Junior SME destroyed')
  },
  methods: {
    hangout_link() {
      console.log("hangout")
      $.get("https://hangouts.google.com/?action=chat&pi=105293196973033874840")
      // window.open("https://hangouts.google.com/?action=chat&pi=105293196973033874840");
    }
  },
});
