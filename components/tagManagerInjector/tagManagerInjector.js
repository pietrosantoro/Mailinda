//sul bottone start 
//verifico che ci sia un gtm id valido
//verifico se ci sono dei domini nel quale voglio applicarlo
//in base hai domii storati e al gtm id 
//creo un oggetto con gtm id 
//dominii nel quale installarlo
//salvo tutto nel local storage
//quando sono su un nuovo dominio tagmager.js viene eseguito
//se trova le info nel local storag e il domio e` corretto esegue l installazione
//quando premo sto pulisco il local storage




var templateInjector = `
<div id="injector">

	<div class="row title" style="padding: 12px">
		<h3>Tag Manager Injector</h3>
	</div>
	
	<div class="row form-group">
		<div class="col-6 col-sm-6 col-md-6 align-middle">
			<label for="GTM_ID">
				<strong>GTM Container ID *</strong>
      </label>
      <div class="col-6 col-sm-6 col-md-6">
		  	<input type="text" id="GTM_ID" placeholder="GTM-XXXXXX" autofocus>
		</div>
		</div>
</div>
	
	<div class="row">
		<div class="col-6 col-sm-6 col-md-6" >
			<label for="TMI_DOMAIN">
				<strong>Include Domain(s):</strong>
			</label>
      <span title="Leaving the domain blank will enable TMI across all domains">(i)</span>
      <div class="col-6 col-sm-6 col-md-6">
		  	<input type="text" id="GTM_ID" placeholder="GTM-XXXXXX" autofocus>
		</div>
		</div>
  </div>

  <div class="row">
		<div class="col-6 col-sm-6 col-md-6" >
			<button class="btn btn-secondary btn-block" id="gobtn">Start</button><br/>
		</div>
		<div class="col-6 col-sm-6 col-md-6">
			<button class="btn btn-secondary btn-block" id="deactivate">Stop</button>
		</div>
  </div>
 
</div>
`;

var injector = Vue.component("injector", {
  template: templateInjector,
  data() {
    return {
      count: 0
    };
  },
  activated: function () {
    console.log('injector activated')
  },
  deactivated: function () {
    console.log('injector  deactivated')
  },
  mounted: function () {
    console.log('injector  mounted')
  },
  destroyed: function () {
    console.log('injector  destroyed')
  },
  props: {

  },
});