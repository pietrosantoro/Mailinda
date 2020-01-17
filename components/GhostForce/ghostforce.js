var templateghostforce = `
   <div id='ghostforceComponent'>
     



     <div class='icon'>

       <h1><img src="images/ghost_icons/ghost.png">Ghosting</h1>
       <div :class="['row_icon', { graybtn: ghostforce_active == false }]">
        <a v-for=" (img,key) in ghost_images" :key="key"   @click='ghost(img.name)' href="#" class="tool">
          <span class='tip'>{{img.name}}</span>
          <img class='quickbtn' :src='img.src'>
        </a>
       </div>
       <div class="row_icon" v-if="ghostforce_active">

        <a v-if="this.current_subject == 'Tag Implementation' "  href="#" class='tool'>
           <span class='tip'>Tag Implementation</span>
           <img class='quickbtn' src='../images/ghost_icons/price-tag.png'>
         </a>
         <a v-if="this.current_subject == 'Shopping Campaign' " href="#" class='tool'>
           <span class='tip'>Shopping Campaign</span>
           <img class='quickbtn' src='../images/ghost_icons/business.png'>
         </a>
       
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


          <h1><img src="images/ghost_icons/phonebook2.png">Contact info</h1>
          <div class="line_info">
          <img src="images/ghost_icons/dot7.png">
          <b>Advertiser:</b>  <span class='btcp' id='clientname'> {{ all_salesforce_fields['Advertiser Name'] }} </span> | <span class='btcp' id='clientmail'> {{ all_salesforce_fields['Advertiser Email'] }} </span> | <span class='btcp' id='clientphone'> {{ all_salesforce_fields['Account Phonenumber'] }} </span>
          </div>
          <!-- <br><br> -->
          <div  class="line_info">
          <img src="images/ghost_icons/dot7.png">
          <b>Sales Rep:</b>  <span class='btcp' id='gsalesrepname'> {{ all_salesforce_fields['Googler Name'] }} </span> | <span class='btcp' id='gsalesrepmail'> {{ all_salesforce_fields['Googler Email'] }} </span>
          <!-- <br><br> -->
          </div>
    
         </div>



      <div class='appointment_info' v-if="ghostforce_active">
        <h1><img src="images/ghost_icons/calendar2.png">Appointment info</h1>    
        <div class="line_info">
        <img src="images/ghost_icons/dot1.png">
        <b>Initial Appointment:</b>  <span class='btcp' id='clientname'> {{ all_salesforce_fields['Appointment Date/Time'] }} </span>
        </div>
        <!-- <br><br> -->
        <div class="line_info">
        <img src="images/ghost_icons/dot1.png">
        <b>Rescheduled Appointment:</b>  <span class='btcp' id='clientname'> {{ all_salesforce_fields['Rescheduled Appointment Date/Time'] }} </span> 
    
        </div>
     </div>



      <div class='task_info' v-if="ghostforce_active">
        <h1><img src="images/ghost_icons/completed-task.png">Task info</h1>
        <div class="line_info">
        
        <div v-for=" task in this.all_task">
            <b>{{ task["Task_Type"] }}</b>
            <!-- <br><br> -->
          </div>
        </div>
        
        
      </div>


      <div class='case_info' v-if="ghostforce_active">
        <h1><img src="images/ghost_icons/comment2.png">Case comment</h1>
        <div class="line_info">
    
          {{ all_salesforce_fields["Comments"]}}
        </div>
       

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
      current_subject: "",
      program_level: "",
      current_program: "",
      all_task: [],
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
      this.current_subject = all_salesforce_fields.Subject;     // Tag implementation or Shopping Campaign
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
          var task_type = []
          var current_obj = []
          if (this.current_subject == "Shopping Campaign") {
            this.all_task.push({
              Task_Type: this.all_salesforce_fields["Shopping Code Type"]
            })

            console.log(this.all_task)
            task_type.push(this.all_task)
            console.log(task_type)
          }
          else if (this.current_subject == "Tag Implementation") {
            //all_task is an array which contains all ticket tasks 
            this.all_task = this.all_salesforce_fields["Tags"]
            console.log(this.all_task)
            //task_type is an array which contains all ticket tasks type

            this.all_task.forEach(element => {
              //console.log(element.Task_Type)
              task_type.push(element.Task_Type)
            });
            console.log(task_type)
          }
          task_type.forEach(element => {
            var temp = this.task_level.taskList.find(obj => {
              console.log(obj)
              console.log(element)
              return obj["task_Name"] === element
            })
            if (temp) {
              current_obj.push(temp.task_LVL)
              //console.log(current_obj)
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
