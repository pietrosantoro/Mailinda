var templatejuniorsme = `
<div>
  <div>Junior SME template</div>
</div>
`;

var juniorsme = Vue.component("juniorsme", {
  template: templatejuniorsme,
  data() {
    return {
      count: 0
    };
  },
  activated: function () {
    console.log('Junior SME activated')
  },
  deactivated: function () {
    console.log('Junior SME deactivated')
  },
  mounted: function () {
    console.log('Junior SME mounted')
  },
  destroyed: function () {
    console.log('Junior SME destroyed')
  },
  props: {

  },
});