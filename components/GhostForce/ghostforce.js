var templateghostforce = `
   <div id='ghostforceComponent'>
     <!-- <div id="adsIcons" style='display:inline'>
       <button  style="border-radius:50%" v-for=" (img,key) in ghost_images" :key="key"   @click='ghost($event)' type="button"><img :src="img.src" :title="img.name" width='35' ></button>
    </div> -->
     <div class='icon'>
       <div :class="['row_icon', { graybtn: ghostforce_active == false }]">
        <a v-for=" (img,key) in ghost_images" :key="key"   @click='ghost(img.name)' href="#" class="tool">
          <span class='tip'>{{img.name}}</span>
          <img class='quickbtn' :src='img.src'>
        </a>
       </div>
       <div class="row_icon" v-if="ghostforce_active">
         <a v-if="this.current_program == 'Scaled' "  href="#" class='tool'>
           <span class='tip'>Scaled</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-scaled.svg'>
         </a>
         <a v-if="this.current_program == 'High Touch' " href="#" class='tool'>
           <span class='tip'>High Touch</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-high-touch.svg'>
         </a>

          <a v-if="this.current_level == 'L1' "  href="#" class='tool'>
           <span class='tip'>Level 1</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-level-1.png'>
         </a>
         <a v-if="this.current_level == 'L2' " href="#" class='tool'>
           <span class='tip'>Level 2</span>
           <img class='quickbtn' src='../images/ghost_icons/icon-level-2.png'>
         </a>
       </div>

      </div>
      <div class='detail_info' v-if="ghostforce_active">
          <b>Advertiser:</b>  <span class='btcp' id='clientname'> test </span> | <span class='btcp' id='clientmail'> test1 </span> | <span class='btcp' id='clientphone'> test2 </span><br><br>
          <b>Webmaster:</b>  <span class='btcp' id='clientname'> test </span> | <span class='btcp' id='clientmail'> test1 </span> | <span class='btcp' id='clientphone'> test2 </span><br><br>
          <b>Sales Rep:</b>  <span class='btcp' id='gsalesrepname'> test </span> | <span class='btcp' id='gsalesrepmail'> test1 </span><br><br>
          <b>Account:</b>  <span class='btcp' id='account_title'> test </span> | <span class='btcp' id='awcid'> test1 </span><br><br>
          <b>Account:</b>  <span class='btcp' id='clientname'> test </span> | <span class='btcp' id='clientmail'> test1 </span> | <span class='btcp' id='clientphone'> test2 </span><br><br>
      </div>
   </div>
`;

var ghostforce = Vue.component("ghostforce", {
  template: templateghostforce,
  data() {
    return {
      bgpage: bgpage,
      ghostforce_active: ghostforce_active,
      ghost_images: [
        { name: "Adwors", src: "../images/ghost_icons/icon-google-ads.png" },
        { name: "Analytics", src: "../images/ghost_icons/icon-analytics.png" },
        { name: "Website", src: "../images/ghost_icons/icon-browser.svg" },
        { name: "Tag Manager", src: "../images/ghost_icons/icon-tagmanager.png" },
        { name: "Merchant Center", src: "../images/ghost_icons/icon-merchant.png" },
        { name: "Gerloose", src: "../images/ghost_icons/icon-gearloose.png" }
      ],
      program_images: [
        { name: "Scaled", src: "../images/ghost_icons/icon-scaled.svg" },
        { name: "High Touch", src: "../images/ghost_icons/icon-high-touch.svg" }
      ],
      level_images: [
        { name: "Level 1", src: "../images/ghost_icons/icon-level-1.png" },
        { name: "Level 2", src: "../images/ghost_icons/icon-level-2.png" }
      ],
      program_level: "",
      current_program: "",
      all_task: "",
      task_level: "",
      current_level: "",
      all_salesforce_fields: all_salesforce_fields
    };
  },
  activated: function () {
    console.log('Ghost Force activated')
  },
  deactivated: function () {
    console.log('Ghost Force  deactivated')
  },
  mounted: function () {
    if (this.ghostforce_active) {
      //fetch all program data
      fetch('http://35.228.175.186/process_data/general-data/raw/master/program_data_updated.json')
        .then(response => response.json())
        .then(data => {
          this.program_level = data;
          console.log(this.program_level)

          let current_obj = this.program_level.programList.find(obj => {
            //console.log(obj)
            return obj["programName"] === this.all_salesforce_fields["Team"]
          })
          if (current_obj) {
            this.current_program = current_obj.programLevel
          }


          console.log(this.current_program)
          console.log(this.program_level)
        })
        .catch(err => {
          //handle the error
          console.log(' Cant fetch the JSON file, Im inside the newemail.js')
        })
      //fetch all task
      fetch('http://35.228.175.186/process_data/general-data/raw/master/task_data.json')
        .then(response => response.json())
        .then(data => {
          this.task_level = data;
          //all_task is an array which contains all ticket tasks 
          this.all_task = this.all_salesforce_fields["Tags"]
          console.log(this.all_task)
          //task_type is an array which contains all ticket tasks type
          var task_type = []
          this.all_task.forEach(element => {
            console.log(element.Task_Type)
            task_type.push(element.Task_Type)
          });
          console.log(task_type)

          let current_obj = []
          task_type.forEach(element => {
            var temp = this.task_level.taskList.find(obj => {
              console.log(obj)
              console.log(element)
              return obj["task_Name"] === element
            })
            if (temp) {
              current_obj.push(temp.task_LVL)
              console.log(current_obj)
            }
          })
          console.log(current_obj)
          //current_level is the level of the ticket. If I found a level 2 task, the ticket will be level 2, otherwise level 1
          this.current_level = current_obj.find(obj => {
            return obj == "L2"
          })
          if (!this.current_level) {
            this.current_level = "L1"
          }
          console.log(this.current_level)
        })
        .catch(err => {
          //handle the error
          console.log(' Cant fetch the JSON file, Im inside ghostforce.js')
        })
    }
    setTimeout(function () {
      console.log(this.all_salesforce_fields)
      console.log(this.program_level)
      console.log(this.current_program)
    }, 2000)
    console.log('Ghost Force  mounted')
  },
  destroyed: function () {
    console.log('Ghost Force  destroyed')
  },
  props: {
  },
  methods: {
    ghost(event) {
      console.log(all_salesforce_fields)
      console.log(event)
      if (event == 'Adwors') {
        window.open("https://adwords.corp.google.com/aw/go?external_cid=" + all_salesforce_fields['Customer ID'])
      }
      else if (event == 'Analytics') {
        window.open("https://analytics-ics.corp.google.com/home?q=" + all_salesforce_fields['Customer ID'])
      }
      else if (event == 'Website') {
        window.open(all_salesforce_fields['URL'])
      }
      else if (event == 'Tag Manager') {
        window.open("https://tagmanager-ics.corp.google.com/?q=" + all_salesforce_fields['Customer ID'])
      }
      else if (event == 'Merchant Center') {
        window.open("https://mcn-ics.corp.google.com/mc?a=" + all_salesforce_fields['MC-ID'])
      }
      else if (event == 'Gerloose') {
        window.open("https://gearloose2.corp.google.com/#/search/merchants?q=awid:" + all_salesforce_fields['Customer ID'])
      }

    },
    test() {
      console.log(this.current_program)
    }
  }
});
