let templateknowledgebase = `
<div class="dropdown" style="margin-top:10px ">


  <div style="background-color:#252a2e; color:white"  aria-labelledby="dropdownMenuButton" >

    <div id="taskDiv" style="display:block;" >          
      <br>
      <!-- search input here, vue event onkeyUp targeting the function names searchTask-->
      <input type="text" id="myInput"  placeholder="Search for task here.." title="Type in a name"  v-on:keyup="searchTask">
      <p>What is the TASK ?</p>
      <!-- loop through the tasks on the json file and populate the button and call the function chooseTask on clicking on this button-->
      <div class='taskSearch' v-for="(data,key) in taskKeys" :key="key">
       <button style="margin-bottom: 5px;" type="button" name="task" class="btn btn-outline-light" v-on:click="chooseTask($event)">{{data}} </button>     
   
      </div>               
  </div>  

  <div id="cmsDiv" style="display:none;" >    
    <br>
    <!-- search input here, vue event onkeyUp targeting the function names searchCms-->
    <input type="text" id="myInput2"  placeholder="Search for task here.." title="Type in a name"  v-on:keyup="searchCms">
    <p>What is the CMS ?</p>
    <!-- loop through the cmss on the json file and populate the button and call the function chooseCms on clicking on this button-->
    <div class='taskSearch' v-for=" (data,key) in cmsKeys" :key="key">
    <button style="margin-bottom: 5px;" type="button" name="cms" class="btn btn-outline-light" v-on:click="chooseCms($event)">{{data}} </button>     
    </div> 

  </div>
</div>

<!-- <div id='table' style="display:none;">

    <table class="table table-dark" >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{href}}</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>{{instructions}}</td>
          <td>{{href}}</td>
          <td>{{code}}/td>
          <td>@mdo</td>
         
        </tr>
      
      </tbody>
    </table>

</div>-->
</div>
`;

let knowledgebase = Vue.component("knowledgebase", {
  template: templateknowledgebase,
  data() {
    return {
      task: "",
      cms: "",
      //result is the json file from gitlab
      result: {},
      taskKeys: ["Ads Conversion Tracking", "Analytics", "Analytics Event Tracking", "Standard Remarketing", "Enhanced Ecommerce", "Standard Remarketing", "Dynamic Remarketing"],
      cmsKeys: ["Wordpress", "Prestashop", "Shopify"],
      instructions:'',
      code:{},
      href:""
    };
  },
  methods: {
    //chooseTask: to select the task chosen 
    chooseTask: function (taskChosen) {

      //taskChosen is the event that is gotten from the click on the button task
      this.task = taskChosen.target.innerText.split(' ').join('-').toLowerCase()
      //get the keys of the second layer of the json object which are the cms names
      this.cmsKeys
      //this.cmsKeys = Object.keys(this.result[this.task])
      //hide the tasks
      document.getElementById('taskDiv').style.display = 'none';
     // display the cms
      document.getElementById('cmsDiv').style.display = 'block';
    },
    //chooseCms: to select the CMS chosen
    chooseCms: function (cmsChosen) {
      //cmsChosen is the event that is gotten from the click on the button CMS      
      this.cms = cmsChosen.target.innerText.toLowerCase()
      
      //hide the cms div
      document.getElementById('cmsDiv').style.display = 'none';

      //use the task and cms selected before and open new tab
      //this.code="<a href="+this.result[this.task][this.cms].code+ "target='_blank'>Click for code</a>"
      this.href="http://kb.stsandbox.vddigi.com/docs/cms/"+this.cms+"/"+this.task+"/"
      window.open("http://kb.stsandbox.vddigi.com/docs/cms/"+this.cms+"/"+this.task+"/")
      //document.getElementById('table').style.display = 'block';

        
    },
    searchTask: function () {
      let inputTask, filter, taskButton, tasks;
      //get the input from the user
      inputTask = document.getElementById("myInput");
      
      //make the text uppercase
      filter = inputTask.value.toUpperCase();
      
      //get all the buttons
      taskButton = document.getElementsByName('task');
      tasks = this.taskKeys;

      //cycle through all the buttons to display the match and hide the others
      for (i = 0; i < taskButton.length; i++) {
        //if there is a match 
        if (tasks[i].toUpperCase().indexOf(filter) > -1) {
          //display the match
          taskButton[i].style.display = "";
        } else {
          //hide the mismatch
          taskButton[i].style.display = "none";
        }
      }
    },
    //this function does the same as the above one but we need another way of doing only one
    searchCms: function () {
      let inputCms, filter, taskButton, cms;
      inputCms = document.getElementById("myInput2");
      filter = inputCms.value.toUpperCase();
      taskButton = document.getElementsByName('cms');
      cms = this.cmsKeys;

     
      for (i = 0; i < taskButton.length; i++) {
        if (cms[i].toUpperCase().indexOf(filter) > -1) {
          taskButton[i].style.display = "";
        } else {
          taskButton[i].style.display = "none";
        }
      }

    }
  },
  activated: function () {
    console.log('Knowledge Base activated')
  },
  deactivated: function () {
    console.log('Knowledge Base deactivated')
  },
  mounted: function () {
   
  },
  destroyed: function () {
    console.log('Knowledge Base destroyed')
  },
  props: {

  },
});




