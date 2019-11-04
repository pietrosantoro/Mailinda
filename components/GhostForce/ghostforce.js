var templateghostforce = `
<div>
  <div>Ghost Force template</div>
</div>
`;

var ghostforce = Vue.component("ghostforce", {
  template: templateghostforce,
  data() {
    return {
      count: 0
    };
  },
  activated: function () {
    console.log('Ghost Force activated')
  },
  deactivated: function () {
    console.log('Ghost Force  deactivated')
  },
  mounted: function () {
    console.log('Ghost Force  mounted')
  },
  destroyed: function () {
    console.log('Ghost Force  destroyed')
  },
  props: {

  },
});