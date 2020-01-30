var templateghostforce = `
   <div id='ghostforceComponent'>
     


<!-- Ghost icon   -->
     <div class='icon'>

       <h1><img src="images/ghost_icons/ghost.png">Ghosting</h1>
       <div :class="['row_icon', { graybtn: ghostforce_active == false}]">
        <a v-for=" (img,key) in ghost_images" :key="key"   @click='ghost(img.name)' href="#" :class="['tool', {graybtn: ghostforce_active == true && img.name == 'Merchant Center' && !all_salesforce_fields['MC-ID']} ]">
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

<!-- End Ghost icon   -->

<!-- Task info   -->

      <div class='task_info' v-if="ghostforce_active">
        <h1><img src="images/ghost_icons/completed-task.png">Task info</h1>
        <div class="line_info">
        
        <div v-for="task in this.all_task" class="task" :class="task['Status']">
            <b>{{ task["Task_Type"] }}</b>
           <div id="task-comment"v-if="task['Special_instructions']">{{ task['Special_instructions'] }}</div>
          </div>
        </div>
        
        
      </div>

<!-- End Task info   -->

<!-- Contact info   -->


      <div class='detail_info' v-if="ghostforce_active">


          <h1><img src="images/ghost_icons/phonebook2.png">Contact info</h1>

          <div v-for="contact in all_salesforce_fields['Case_Contacts']" class="line_info">
            <img src="images/ghost_icons/dot7.png">
            <b>{{contact['Contact_Type']}}: </b>
            
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientname' @click="copy_text(contact['Contact'])"> {{ contact['Contact'] }} </div>
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientmail' @click="copy_text(contact['Contact_Email'])"> {{ contact['Contact_Email'] }} </div>
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='clientphone' @click="copy_text(contact['Contact_Phone'])"> {{ contact['Contact_Phone'] }} </div>
            </div>


          </div>
          
          <div  class="line_info">
            <img src="images/ghost_icons/dot7.png">
            <b>Sales Rep:</b>
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepname' @click="copy_text(all_salesforce_fields['Googler Name'])"> {{ all_salesforce_fields['Googler Name'] }} </div> 
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepmail' @click="copy_text(all_salesforce_fields['Googler Email'])"> {{ all_salesforce_fields['Googler Email'] }} </div> 
            </div>
            | 
            <div class='btcp'>
              <span class='tip'>Click to copy</span>
              <div id='gsalesrepteam' @click="copy_text(all_salesforce_fields['Team'])"> {{ all_salesforce_fields['Team'] }} </div>
            </div>
        
          </div>
    
          <div v-for="contact in all_salesforce_fields['Case_Contacts']" class="call_button" @click="on_call(contact['Contact_Phone'])">
            Call {{contact['Contact_Type']}}
          </div>



         </div>
<!-- End Contact info   -->


<!-- Appointment info   -->

      <div class='appointment_info' v-if="ghostforce_active">

        <h1><img src="images/ghost_icons/calendar2.png">Appointment info</h1>    
        <div class="line_info">
          <img src="images/ghost_icons/dot1.png">
          <b>Initial Appointment:</b>
          <div class='btcp'>
            <span class='tip'>Click to copy</span>
            <div id='clientname' @click="copy_text(all_salesforce_fields['Appointment Date/Time'])"> {{ all_salesforce_fields['Appointment Date/Time'] }} </div>
          </div>
        </div>
       
        <div v-if="all_salesforce_fields['Rescheduled Appointment Date/Time']" class="line_info">
          <img src="images/ghost_icons/dot1.png">
          <b>Rescheduled Appointment:</b>
          <div class='btcp'>
            <span class='tip'>Click to copy</span>
            <div id='clientname' @click="copy_text(all_salesforce_fields['Rescheduled Appointment Date/Time'])"> {{ all_salesforce_fields['Rescheduled Appointment Date/Time'] }} </div> 
          </div>
    
        </div>

     </div>

<!-- End Appointment info   -->



<!-- Case comment info   -->

      <div class='case_info' v-if="ghostforce_active">
        <h1><img src="images/ghost_icons/comment2.png">Case comment</h1>
        <div class="line_info">
    
          {{ all_salesforce_fields["Comments"]}}
        </div>
       

      </div>

<!-- End Case comment info   -->



   </div>
`;

var ghostforce = Vue.component("ghostforce", {
  template: templateghostforce,
  data() {
    return {
      bgpage: bgpage,
      ghostforce_active: ghostforce_active,
      ghost_images: [
        { name: "Website  Adwors  Analytics", src: "../images/ghost_icons/icon-open-three.png" },
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
console.log(chrome.tabs.index)
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
              Task_Type: this.all_salesforce_fields["Shopping Code Type"],
              Special_instructions: this.all_salesforce_fields['Special Instructions/Troubleshooting']
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
            //console.log(task_type)
          }
          task_type.forEach(element => {
            var temp = this.task_level.taskList.find(obj => {
              // console.log(obj)
              // console.log(element)
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
      if (this.ghostforce_active) {
        console.log(event)
        if(event == 'Website  Adwors  Analytics') {
          
          chrome.tabs.create({
            url: "https://adwords.corp.google.com/aw/go?external_cid=" + all_salesforce_fields['Customer ID']
          })
          chrome.tabs.create({
            url: "https://analytics-ics.corp.google.com/home?q=" + all_salesforce_fields['Customer ID']
          })
          chrome.tabs.create({
            url: all_salesforce_fields['URL']
          })
        
        }
        else if (event == 'Adwors') {
          if(all_salesforce_fields['Customer ID'])
            window.open("https://adwords.corp.google.com/aw/go?external_cid=" + all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Analytics') {
          if(all_salesforce_fields['Customer ID'])
            window.open("https://analytics-ics.corp.google.com/home?q=" + all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Website') {
          if(all_salesforce_fields['URL'])
            window.open(all_salesforce_fields['URL'])
        }
        else if (event == 'Tag Manager') {
          if( all_salesforce_fields['Customer ID'])
          window.open("https://tagmanager-ics.corp.google.com/?q=" + all_salesforce_fields['Customer ID'])
        }
        else if (event == 'Merchant Center') {
          if(all_salesforce_fields['MC-ID'])
            window.open("https://mcn-ics.corp.google.com/mc?a=" + all_salesforce_fields['MC-ID'])
        }
        else if (event == 'Gerloose') {
          if(all_salesforce_fields['Customer ID'])
           window.open("https://gearloose2.corp.google.com/#/search/merchants?q=awid:" + all_salesforce_fields['Customer ID'])
        }
      }
    },
    on_call(number){
      console.log(number)
      chrome.storage.sync.set({
        number: number,

      }, function() {
          console.log('Value is set to ' + number);
      });
      chrome.windows.create({
            url: "https://smbsalesimplementation--c.na81.visual.force.com/apex/Click2Dial",
            left: 300,
            top: 300,
            width: 400,
            height: 400,
            focused: true
          })
    },
    copy_text(text){
    if (!navigator.clipboard) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position="fixed";  //avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);

      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });


      
    },
    test() {
      console.log(this.current_program)
    }
  }
});