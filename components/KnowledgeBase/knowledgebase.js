var templateknowledgebase = `

<div>
  
  <div id="red">Knowledge Base template</div>
  
</div>

`;

var knowledgebase = Vue.component("knowledgebase", {
  template: templateknowledgebase,
  data() {
    return {
      count: 0
    };
  },
  activated: function () {
    console.log('Knowledge Base activated')
  },
  deactivated: function () {
    console.log('Knowledge Base deactivated')
  },
  mounted: function () {
    console.log('Knowledge Base mounted')
  },
  destroyed: function () {
    console.log('Knowledge Base destroyed')
  },
  props: {

  },
});