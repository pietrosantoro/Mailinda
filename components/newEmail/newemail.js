var templateNewEmail = `
<div id="newEmailComponent">
  <div class="container-fluid">
    <button @click='refresh()'  type="button" class="btn btn-danger btn-sm">Refresh</button>
  
          <div v-if="this.newEmailCounter && this.logInSalesforce">
              
            
              <div class="table-responsive">

                <table class="table table-hover table-dark">
                  <thead>
                      <tr>
                        <th class="th-sm" scope="col">Case Id</th>
                        <th class="th-sm" scope="col">Case Status</th>
                        <th class="th-sm" scope="col">Adv Contact Name</th>
                        <th class="th-sm" scope="col">New Email</th>
                      </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in this.collapsedCases">
                      <tr @click='collapseEmail(index)'v-if="item['Total Emails']"  role="button" class="clickable-row">
                        <td>
                          <button @click='clickCase( item["Case ID"],index )' type="button" class="btn btn-secondary btn-sm">{{ item["Case Number"] }}</button>
                        </td>
                        <td class='testColor'>
                            {{ item["Status"] }}
                        </td>
                        <td>
                          {{ item["Contact Name: Full Name"] }}
                      </td>
                        <td>
                          <span class="badge badge-danger badge-pill"> {{ item["Total Emails"] }} </span>
                        </td>
                        <tr v-for="(email,indexEmail) in item['Emails Indexes']" :class="['single-email-' + index]" v-if="this.allEmail[email]['Email Status']">
                          
                          
                            <td class="email-collapse"><div><button @click='clickCase( allEmail[email]["Email Message ID"],index)' type="button" class="btn btn-secondary btn-sm">Email</button></div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["Email Status"] }}</div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["From Address"] }}</div></td>
                            <td class="email-collapse"><div>{{ allEmail[email]["Message Date"] }}</div></td>
                          
                        </tr>
                      </tr>
                      
                    </template>
                  </tbody>
                </table>
                </div>
              
            
          </div>
            <div v-else-if="this.newEmailCounter == 0 && this.logInSalesforce" class="text-center align-middle">
              <p class="no-email top">No new emails</p>  
              <img class="horizontal-line" src="../../images/no-email-check.svg">
              <p class="no-email bottom">You're all caught up!</p> 
            </div>
            <div v-else class="text-center salesforce">
              <a class= "btn btn-outline-light" href="https://login.salesforce.com/?locale=eu" target="_blank">Log in salesforce</a>
            </div>
            </div>
</div>
`;

var newemail = Vue.component("newemail", {
  template: templateNewEmail,
  data() {
    return {
      count: 0,
      collapsedCases: collapsedCases,
      newEmailCounter: newEmailCounter,
      logInSalesforce: logInSalesforce,
      allEmail: allEmail,
      bgpage: bgpage
    };
  },
  props: {
    addNum: {
      type: Number,
      default: 3
    }
  },
  activated: function () {
    console.log('New Email activated')
  },
  deactivated: function () {
    console.log('New Email deactivated')
  },
  mounted: function () {
    console.log('New Email mounted')
  },
  destroyed: function () {
    console.log('New Email destroyed')
  },
  methods: {
    clickCase(caseUrl, index) {
      var completeUrl = baseURL + caseUrl;
      window.open(completeUrl, "_blank");
    },
    refresh() {
      bgpage.request(); //call request when click refresh button
      setTimeout(function () {
        location.reload(); //popup page reloaded after 0.5 sec to let request completed
      }, 500);
    },
    collapseEmail(index) {
      //collapse single email when table row is clicked
      var selector = ".single-email-" + index;
      $(selector).toggleClass("active");
    },
    test() {
      console.log(this.collapsedCases);
      console.log(this.newEmailCounter);
      console.log(this.logInSalesforce)
    }
  }
});
var date = new Date()
console.log(date)
