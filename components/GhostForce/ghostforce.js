var templateghostforce = `
   <div id='ghostforceComponent'>
     
     <div class='icon'>
       <div class="row_icon">
        <a target='_blank' href="" class='tool'><span class='tip'>Ads ICS</span>
          <img class='quickbtn graybtn' src='images/ghost_icons/icon-google-ads.png'>
        </a>
        <a target='_blank' href="" class='tool'><span class='tip'>Analytics ICS</span>
          <img class='quickbtn' src='images/ghost_icons/icon-analytics.png'>
        </a>
        <a target='_blank' href="" class='tool'><span class='tip'>Tag Manager ICS</span>
          <img class='quickbtn' src='images/ghost_icons/icon-tagmanager.png'>
        </a>
        <a target='_blank' href="" class='tool'><span class='tip'>Merchant Center ICS</span>
          <img class='quickbtn' src='images/ghost_icons/icon-merchant.png'>
        </a>
        <a target='_blank' href="" class='tool'><span class='tip'>Gearloose 2.0</span>
          <img class='quickbtn' src='images/ghost_icons/icon-gearloose.png'>
        </a>
        <a target='_blank' href="" class='tool'><span class='tip'>Open URL</span>
          <img class='quickbtn' src='images/ghost_icons/icon-browser.svg'>
        </a>
       </div>

       <div class="row_icon">
         <a target='_blank' href="" class='tool'><span class='tip'>Ads ICS</span>
           <img class='quickbtn graybtn' src='images/ghost_icons/icon-google-ads.png'>
         </a>
         <a target='_blank' href="" class='tool'><span class='tip'>Analytics ICS</span>
          <img class='quickbtn' src='images/ghost_icons/icon-analytics.png'>
        </a>
       </div>

      </div>
      <div class='detail_info'>

      </div>
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