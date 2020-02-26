let templateknowledgebase = `
<div class="container" style="margin-top:10px ">

  <div style="background-color:#252a2e; color:white"  aria-labelledby="dropdownMenuButton" >
    <div id="taskDiv" v-show="seeDiv">
      <div class=inputSearch>
        <p>What's the task you're looking for ?</p>
        <!-- search input here, vue event onkeyUp targeting the function names searchTask-->
        <i class="fas fa-search" aria-hidden="true"></i>
        <input type="text" class="form-control-sm ml-3 w-50" id="myInput" ref="search" placeholder=" search for task here..." title="Type in a name" @keyup="searchTask(); displayButton()">
      </div><br>
      <div class="row row-centered">
        <!-- loop through the tasks on the json file and populate the button and call the function chooseTask on clicking on this button-->
        <div class="col-sm-4 col-centered-task" id="taskSearch" v-for="(data,key) in taskKeys" :key="key">
          <button type="button" name="task" id="buttonTask" class="btn btn-outline-light" v-on:click="chooseTask($event); seeDiv=!seeDiv">{{data}}</button>     
        </div>
      </div>
    </div>               
  </div>  

  <div id="cmsDiv" v-show="!seeDiv">    
    <div class="inputSearch">
    <button type="button" class="btn btn-outline-light backButton" @click="seeDiv = !seeDiv"><i class="fa fa-angle-left"></i> Back</button>
    <p>Which CMS you want to implemented your task ?</p>
    <!-- search input here, vue event onkeyUp targeting the function names searchCms-->
    <i class="fas fa-search" aria-hidden="true"></i>
    <input type="text" class="form-control-sm ml-3 w-50" id="myInput2"  placeholder=" search for CMS here..." title="Type in a name"  @keyup="searchCms(); displayButton()">
    </div><br>
    <!-- loop through the cmss on the json file and populate the button and call the function chooseCms on clicking on this button-->
    <div class="row row-centered">  
    <div class="col-sm-4 col-centered-cms" id="cmsSearch" v-for=" (data,key) in cmsKeys" :key="key">
        <button type="button" name="cms" id="buttonCms" class="btn btn-outline-light" v-on:click="chooseCms($event); seeDiv=!seeDiv">{{data}} </button>     
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
      seeDiv: true,
      task: "",
      cms: "",
      //result is the json file from gitlab
      result: {},
      taskKeys: ["Ads Conversion Tracking","Analytics Event Tracking","Standard Remarketing", "Dynamic Remarketing", "Standard Ecommerce", "Enhanced Ecommerce", "Analytics", "Google Tag Manager", "Cross Domain Tracking", "Website Call Conversion", "Shopping"],
      cmsKeys: ["Wordpress", "Prestashop","Shopify","Magento", "Shopware"],
      instructions:'',
      code:{},
      href:""
    };
  },
  methods: {
    displayButton: function (){
    let divTaskButton, divCmsButton, inputTask, inputCms;
    divTaskButton = document.getElementsByClassName("col-centered-task");
    divCmsButton = document.getElementsByClassName("col-centered-cms");
    inputTask = document.getElementById("myInput");
    inputCms = document.getElementById("myInput2");
    if(inputTask.value.length == 0){
      for(i = 6; i < this.taskKeys.length; i++){
        console.log(i);
        divTaskButton[i].style.display = "none";
      }
    }
    if(inputCms.value.length == 0){
      for(i = 3; i < this.cmsKeys.length; i++){
        divCmsButton[i].style.display = "none";
      }
    }
  },
    //chooseTask: to select the task chosen 
    chooseTask: function (taskChosen) {
      //taskChosen is the event that is gotten from the click on the button task
      this.task = taskChosen.target.innerText.split(' ').join('-').toLowerCase()
      //get the keys of the second layer of the json object which are the cms names
      this.cmsKeys
      console.log('choose your cms');
    },
    //chooseCms: to select the CMS chosen
    chooseCms: function (cmsChosen) {
      //cmsChosen is the event that is gotten from the click on the button CMS      
      this.cms = cmsChosen.target.innerText.toLowerCase()
      //use the task and cms selected before and open new tab
      this.href="http://kb.stsandbox.vddigi.com/docs/cms/"+this.cms+"/"+this.task+"/"
      window.open("http://kb.stsandbox.vddigi.com/docs/cms/"+this.cms+"/"+this.task+"/")      
    },
    //search bar function
    searchTask: function() {
      let inputTask, filter, taskButton, tasks;
      //get the input from the user
      inputTask = document.getElementById("myInput");
      //make the text uppercase
      filter = inputTask.value.toUpperCase();
      //get all the buttons
      taskButton = document.getElementsByClassName("col-centered-task");
      tasks = this.taskKeys;
      //cycle through all the buttons to display the match and hide the others
      for (let i = 0; i < taskButton.length; i++) {
       if (tasks[i].toUpperCase().indexOf(filter) > -1) {
          //display the match
          taskButton[i].style.display = "";
          console.log(taskButton[i]);
        } else {
          //hide the mismatch
          taskButton[i].style.display = "none";
        }
      }
    },
    //this function does the same as the above one but we need another way of doing only one
    searchCms: function () {
      let inputCms, filter, cmsButton, cms;
      inputCms = document.getElementById("myInput2");
      filter = inputCms.value.toUpperCase();
      cmsButton = document.getElementsByClassName("col-centered-cms");
      cms = this.cmsKeys;

      for (i = 0; i < cmsButton.length; i++) {
        if (cms[i].toUpperCase().indexOf(filter) > -1) {
          cmsButton[i].style.display = "";
          console.log(cmsButton[i]);
        } else {
          cmsButton[i].style.display = "none";
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
    console.log('Knowledge Base mounted');
    this.displayButton();
    
  },
  destroyed: function () {
    console.log('Knowledge Base destroyed')
  },
  props: {

  },
});
