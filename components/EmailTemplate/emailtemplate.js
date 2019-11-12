var templateEmailTemplate = `
<div>
  <div>Email template</div>
</div>
`;

var emailtemplate = Vue.component("emailtemplate", {
  template: templateEmailTemplate,
  data() {
    return {
      count: 0
    };
  },
  activated: function () {
    console.log('Email Template activated')
  },
  deactivated: function () {
    console.log('Email Template deactivated')
  },
  mounted: function () {
    console.log('Email Template  mounted')
  },
  destroyed: function () {
    console.log('Email Template  destroyed')
  },
  props: {

  },
});
