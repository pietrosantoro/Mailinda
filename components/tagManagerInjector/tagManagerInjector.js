var templateInjector = `
<div id="injector">

	<div class="row title" style="padding: 12px">
		<h3>Tag Manager Injector</h3>
	</div>
	
	<div class="row form-group">
		<label for="GTM_ID">
			<strong>GTM Container ID</strong>
    </label>
    <input type="text" id="GTM_ID" placeholder="GTM-XXXXXX" autofocus>
    <div class="invalid-feedback">
          <p>Please choose a valid GTM ID.</p>
    </div>
    <div class="injectionSuccess">
          <p>Your are injecting the GTM</p>
          <p>(possibly you need to refresh the page)</p>
    </div>
    <div class="injectionFailed">
          <p>Your are not injecting the GTM</p>
    </div>
	</div>
  
<div class="row button-group">
		<div class="col-6 col-sm-6 col-md-6" >
			<button @click='clickStart()' class="btn btn-secondary btn-block">Start</button><br/>
		</div>
		<div class="col-6 col-sm-6 col-md-6">
			<button @click='clickStop()' class="btn btn-secondary btn-block">Stop</button>
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
  methods: {
    
    clickStart(gtmId) {
      var gtmField = document.querySelector('#GTM_ID');
      var errorMessage = document.querySelector('.invalid-feedback');
      var injectionSuccess = document.querySelector('.injectionSuccess');
      var injectionFailed = document.querySelector('.injectionFailed');
      var gtmId = gtmField.value.replace(/ /g, '');
     //controllo che gtmId 
      if(gtmId.includes('GTM')){
        errorMessage.classList.remove('visible');
        injectionFailed.classList.remove('visible');
        injectionSuccess.classList.add('visible');
        gtmField.classList.add('success');
        gtmField.classList.remove('error');
        gtmField.classList.remove('medium');
        chrome.storage.sync.set({gtm: gtmId}, function() {
          console.log('Value is set to ' + gtmId);
        });
        chrome.storage.sync.set({injectionController: true}, function() {
          console.log('injectionController is true');
        });

      } else {
        gtmField.classList.remove('success');
        gtmField.classList.remove('medium');
        gtmField.classList.add('error');
        injectionFailed.classList.remove('visible');
        injectionSuccess.classList.remove('visible');
        errorMessage.classList.add('visible');
        chrome.storage.sync.set({injectionController: false}, function() {
          console.log('injectionController is true');
        });
      }
     },
    clickStop() {
      var gtmField = document.querySelector('#GTM_ID');
      var errorMessage = document.querySelector('.invalid-feedback');
      var injectionSuccess = document.querySelector('.injectionSuccess');
      var injectionFailed = document.querySelector('.injectionFailed');
      errorMessage.classList.remove('visible');
      injectionSuccess.classList.remove('visible');
      injectionFailed.classList.add('visible');
      gtmField.classList.remove('success');
      gtmField.classList.remove('error');
      gtmField.classList.add('medium');
      chrome.storage.sync.set({injectionController: false}, function(result) {
        console.log('injectionController is false');
      });
    }
  },
  activated: function () {

    console.log('injector  activated')

  },
  deactivated: function () {
    console.log('injector  deactivated')
  },
  mounted: function () {
    console.log('injector  mounted')
    var gtmField = document.querySelector('#GTM_ID');
    var errorMessage = document.querySelector('.invalid-feedback');
    var injectionSuccess = document.querySelector('.injectionSuccess');
    var injectionFailed = document.querySelector('.injectionFailed');
    chrome.storage.sync.get(['gtm'], function(result) {
      gtmField.value = result.gtm;
    });
    chrome.storage.sync.get(['injectionController'], function(result) {
      if(result.injectionController){
        errorMessage.classList.remove('visible');
        injectionFailed.classList.remove('visible');
        injectionSuccess.classList.add('visible');
        gtmField.classList.add('success');
        gtmField.classList.remove('error');
        gtmField.classList.remove('medium');
      } else {
        errorMessage.classList.remove('visible');
        injectionFailed.classList.add('visible');
        injectionSuccess.classList.remove('visible');
        gtmField.classList.remove('success');
        gtmField.classList.remove('error');
        gtmField.classList.add('medium');
      }
    });

  },
  destroyed: function () {
    console.log('injector  destroyed')
  },
  props: {

  },
});