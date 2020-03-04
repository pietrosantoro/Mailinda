let templateknowledgebase = `
<div class="container">
    <div class="mainDiv">
        <div class="inputSearch">
            <p> What are you looking for ?</p>
        </div>
        <div class="row">
            <div class="row-centered column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:click="chooseSubject">CMS</button>
                <div class="dropdown-menu">
                    <div id="taskSearch" class=" dropdown-item dropdown dropright" v-for="(data,key) in cmsKeys"
                        :key="key" v-on:click="stopPropagation">
                        <button type="button" name="task" class="dropdown-item dropdown-toggle" data-toggle="dropdown"
                            v-on:mouseover="mouseOver">{{data}}</button>
                        <div class="dropdown-content dropdownTask">
                            <input type="search" class="form-control" id="myInput" v-model="search"
                                placeholder="Search" />
                            <div id="taskSearch" v-for="(data,key) in cmsFiltered" :key="key">
                                <button type="button" name="task" class="dropdown-item"
                                    v-on:click="chooseTask">{{data}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-centered column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:click="chooseSubject">Analytics</button>
                <div class="dropdown-menu dropdownAnalytics">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" class="dropdown-item" v-for="(data,key) in analyticsFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
                </div>
            </div>
            <div class="row-centered column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:click="chooseSubject">Adwords</button>
                <div class="dropdown-menu dropdownAnalytics">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" class="dropdown-item" v-for="(data,key) in adwordsFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
                </div>
            </div>
            <div class="row-centered column">
                <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown"
                    v-on:click="chooseSubject">Shopping</button>
                <div class="dropdown-menu dropdownAnalytics">
                    <input type="search" class="form-control" v-model="search" placeholder="Search" />
                    <div id="taskSearch" class="dropdown-item" v-for="(data,key) in shoppingFiltered" :key="key">
                        <button type="button" name="task" id="" class="dropdown-item" data-toggle="dropdown"
                            v-on:click="chooseTask">{{data}}</button>
                    </div>
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
            subject: "",
            task: "",
            cms: "",
            //result is the json file from gitlab
            result: {},
            shoppingKeys: ["Gearloose", "Merchant Center Setup", "Shopping Feed Setup", "Shopping Feed Optimization", "Merchant Center Features", "Handy Go Links", "Offline Shopping GSS"],
            taskKeys: ["Ads Conversion Tracking", "Analytics Event Tracking", "Standard Remarketing", "Dynamic Remarketing", "Standard Ecommerce", "Enhanced Ecommerce", "Analytics", "Google Tag Manager", "Cross Domain Tracking", "Website Call Conversion", "Shopping"],
            cmsKeys: ["Wordpress", "Prestashop", "Shopify", "Magento", "Shopware"],
            adwordsKeys: ["Conversion Tracking", "Standard Remarketing", "Dynamic Remarketing Retail", "Dynamic Remarketing non Retail", "Site Wide Tracking ITP", "Website Call Conversion", "Offline Conversion Tracking"],
            analyticsKeys: ["Goal Tracking","Cross Domain Tracking", "Standard Ecommerce", "Enhanced Ecommerce", "Standard Remarketing", "Dynamic Remarketing Retail", "Dynamic Remarketing non Retail", "Filters", "Audience lists"],           
            search: '',
            code: {},
            href: ""
        };
    },
    computed: {
        cmsFiltered: function(){
            return this.taskKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        analyticsFiltered: function(){
            return this.analyticsKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        adwordsFiltered: function(){
            return this.adwordsKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        },
        shoppingFiltered: function(){
            return this.shoppingKeys.filter((data) => {
                return data.toLowerCase().match(this.search.toLowerCase())
            });
        }
    },
    methods: {
        //to select the cms by mouseover 
        chooseSubject: function(subjectChosen){
            this.subject = subjectChosen.target.innerText.split(' ').join('-').toLowerCase() + "/";
            console.log(this.subject);

        },
        stopPropagation: function(){
            jQuery('.dropdown-menu').on('click', function (e) {
                e.stopPropagation();
              }); 
        },
        mouseOver: function (cmsChosen) {
            this.cms = cmsChosen.target.innerText.split(' ').join('-').toLowerCase() + "/";
            console.log(this.cms);
        },
        //after choose cms, open new tab to the knowledge base with the task chosen 
        chooseTask: function (taskChosen) {
            this.task = taskChosen.target.innerText.split(' ').join('-').toLowerCase();
            this.href = "http://kb.stsandbox.vddigi.com/docs/" + this.subject + this.cms + this.task;
            console.log(this.href);
            window.open("http://kb.stsandbox.vddigi.com/docs/" + this.subject + this.cms + this.task);

        },   
    },
    activated: function () {
        console.log('Knowledge Base activated')
    },
    deactivated: function () {
        console.log('Knowledge Base deactivated')
    },
    mounted: function () {
        console.log('Knowledge Base mounted');
        
    },
    destroyed: function () {
        console.log('Knowledge Base destroyed')
    },
    props: {

    },
});
