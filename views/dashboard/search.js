
    // PROJECTS LIST GOTTEN FROM LOCAL STORAGE

    projects = JSON.parse(localStorage.getItem("projects"));
    if (projects == null || projects == undefined) {
      projects = [];
    }
    
    // CURRENT USER GOTTEN FROM LOCAL STORAGE
    currentProject = JSON.parse(localStorage.getItem("currentProject"));
    if (currentProject == null || currentProject == undefined) {
      currentProject = {};
    }
    
    const projectList = getProjectList(projects);
    
    
    const searchList = document.getElementById("searchList");
    
    //save projects name from localStorage to a list
    function getProjectList(projects){
        let list = [];
            for (let i = 0; i < projects.length; i++) {
                list[i] = {name: projects[i].projectName.toLowerCase()};
            }
            return list;
    }
    

    //load valid search result
    function openSearchResult(event){
        result = event.target.firstChild.nodeValue;
        if (result){
        for (let i = 0; i < projects.length; i++) {
            if (result === projects[i].projectName.toLowerCase()){
                localStorage.setItem("currentProject", JSON.stringify(projects[i]));
                location.href ="taskoverview.html"; 
            }  
        }
    }
        
    }
    
    //set searchList from localStorage
    function setList(group){
        clearList();
        for (const searchTerm of group){
            const item = document.createElement("li");
            const text = document.createTextNode(searchTerm.name);
            item.classList.add("list-group-item","search-display");  
            item.appendChild(text);
            searchList.addEventListener('click', openSearchResult);
            searchList.appendChild(item);
        }
        
        if(group.length === 0){
            setNoResults();
        }
    
    }
    
    //clear searchList so we dont have duplicates 
    function clearList(){
        while(searchList.firstChild){
            searchList.removeChild(searchList.firstChild);
        }
    }
    
    
    //set invalid search response
    function setNoResults(){
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        const text = document.createTextNode("No results found");
        item.appendChild(text);
        searchList.appendChild(item);
    }
    
    //get relevant of search input
    function getRelevancy(value, searchTerm){
        if (value === searchTerm){
            return 2;
        } else if (value.startsWith(searchTerm)){
            return 1;
        } else if (value.includes(searchTerm)){
            return 0;
        } else{
            return -1;
        }
    }
    
    const searchInput = document.getElementById("search");
    
    // main search action is performed here
    searchInput.addEventListener('keyup', (event) => {
        let value = event.target.value;
    
        if(value && value.trim().length > 0){
            value = value.trim().toLowerCase();
            setList(projectList.filter(searchTerm => {
                return searchTerm.name.includes(value);
            }).sort((searchTermA, searchTermB) => {
                return getRelevancy(searchTermB.name, value)   -  getRelevancy(searchTermA.name, value);
            }));
        } else {
    
            clearList();
        }
    }); 
    
    