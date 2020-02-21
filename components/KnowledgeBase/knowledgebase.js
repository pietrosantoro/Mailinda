let templateknowledgebase = `
<div class="container" style="margin-top:10px ">

  <div style="background-color:#252a2e; color:white"  aria-labelledby="dropdownMenuButton" >
    <div id="taskDiv" style="display:block;">
      <div class=inputSearch>
        <p>What's the task you're looking for ?</p>
        <!-- search input here, vue event onkeyUp targeting the function names searchTask-->
        <input type="text" id="myInput" ref="search" placeholder=" search for task here..." title="Type in a name" v-on:keyup="searchTask">
      </div><br>
      <div class="row row-centered">
        <!-- loop through the tasks on the json file and populate the button and call the function chooseTask on clicking on this button-->
        <div class="col-sm-4 col-centered-task" id="taskSearch" v-for="(data,key) in taskKeys" :key="key">
          <button type="button" name="task" id="buttonTask" class="btn btn-outline-light" v-on:click="chooseTask($event)">{{data}} </button>     
        </div>
      </div>
    </div>               
  </div>  

  <div id="cmsDiv" style="display:none;" >    
    <div class=inputSearch>
    <p>Which CMS you want to implemented your task ?</p>
    <!-- search input here, vue event onkeyUp targeting the function names searchCms-->
    <input type="text" id="myInput2"  placeholder=" search for CMS here.." title="Type in a name"  v-on:keyup="searchCms">
    </div><br>
    <!-- loop through the cmss on the json file and populate the button and call the function chooseCms on clicking on this button-->
    <div class="row row-centered">  
    <div class="col-sm-4 col-centered-cms" id="cmsSearch" v-for=" (data,key) in cmsKeys" :key="key">
        <button type="button" name="cms" id="buttonCms" class="btn btn-outline-light" v-on:click="chooseCms($event)">{{data}} </button>     
      </div>
      </div> 
  </div>

</div>
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
      taskKeys: ["Analytics", "Google Tag Manager", "Cross Domain Tracking", "Website Call Conversion", "Shopping", "Ads Conversion Tracking", "Analytics Event Tracking", "Standard Remarketing", "Dynamic Remarketing", "Standard Ecommerce", "Enhanced Ecommerce"],
      cmsKeys: ["Magento", "Wordpress", "Prestashop", "Shopify"],
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
      //hide the tasks
      document.getElementById('taskDiv').style.display = 'none';
     // display the cms
      document.getElementById('cmsDiv').style.display = 'block';

      //display only 3 last cms
      let divCmsButton = document.getElementsByClassName("col-centered-cms");
      console.log('choose your cms');
      for(i = 0; i < 1; i++){
        console.log(divCmsButton[i]);
        divCmsButton[i].style.display="none";
    }

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
      taskButton = document.getElementsByClassName("col-centered-task");
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
      taskButton = document.getElementsByClassName("col-centered-cms");
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
    //display 6 tasks
    let divTaskButton = document.getElementsByClassName("col-centered-task");
    console.log('Knowledge Base mounted')
    for(i = 0; i < 5; i++){
        console.log(divTaskButton[i]);
        divTaskButton[i].style.display="none";

    }
  },
  destroyed: function () {
    console.log('Knowledge Base destroyed')
  },
  props: {

  },
});
