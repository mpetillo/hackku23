function createCuisine(cuisine){
    const container = document.getElementById("cuisine-container");
    let html = "";
    for (i = 0; i < cuisine["cuisinetypes"].length; i++){
        html += '<input type="checkbox" id="'+cuisine["cuisinetypes"][i]+'" value="'+cuisine["cuisinetypes"][i]+'">';
        html += "<label>"+cuisine["cuisinetypes"][i]+"</label>";
    }
    container.innerHTML += html;
}

function createDiets(diets){
    const container = document.getElementById("diets-container");
    let html = "";
    for (i = 0; i < diets["diets"].length; i++){
        html += '<input type="checkbox" id="'+diets["diets"][i]+'" value="'+diets["diets"][i]+'">';
        html += "<label>"+diets["diets"][i]+"</label>";
    }
    container.innerHTML += html;
}


function createIngredients(ingredients){
    const container = document.getElementById("ingredients-container");
    let html = "<h3>(Water, Salt, Pepper are assumed)</h3>";
    for (i = 0; i < ingredients["short"].length; i++){
        html += '<input type="checkbox" id="'+ingredients["short"][i]+'" value="'+ingredients["short"][i]+'">';
        html += "<label>"+ingredients["short"][i]+"</label>";
    }
    container.innerHTML += html;
}

function createIntolerances(intolerances){
    const container = document.getElementById("intolerances-container");
    let html = "";
    for (i = 0; i < intolerances["intolerances"].length; i++){
        html += '<input type="checkbox" id="'+intolerances["intolerances"][i]+'" value="'+intolerances["intolerances"][i]+'">';
        html += "<label>"+intolerances["intolerances"][i]+"</label>";
    }
    container.innerHTML += html;

}

function callJSONFiles(){
    fetch('/API/GetDropDownConfigurations', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        createCuisine(data.cuisine);
        createDiets(data.diets);
        createIngredients(data.ingredients);
        createIntolerances(data.intolerances);
    })
        .catch(error => {
        console.error(error);
    });
} 

//A function to test the containers and return selected items
// Can be modified later to return info that needs to be passed to APIs
function printSelected(container_name) {
    const container = document.getElementById(container_name);
    const checkboxes = container.getElementsByTagName("input");

    let selected = []
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selected.push(checkboxes[i].value);
        }
    }
    console.log("Selected: " + selected.join(", "));
}

//helper function
function jsonSelected(){
    //define everything!
    const cuisine = document.getElementById("cuisine-container");
    const diets = document.getElementById("diets-container");
    const ingredients = document.getElementById("ingredients-container");
    const intolerances = document.getElementById("intolerances-container");
    const temp = [];
    const checkboxes1 = cuisine.getElementsByTagName("input");
    const checkboxes2 = diets.getElementsByTagName("input");
    const checkboxes3 = ingredients.getElementsByTagName("input");
    const checkboxes4 = intolerances.getElementsByTagName("input");
    const temptemp = [];
    //each for loop - because else it doesn't work! in order: cuisine, diets, ingredients, intolerances 
    for (j = 0; j < checkboxes1.length; j++){
        if (checkboxes1[j].checked) {
            temptemp.push(checkboxes1[j].value);
        }
    }
    temp.push(temptemp)
    temptemp = [];
    for (j = 0; j < checkboxes2.length; j++){
        if (checkboxes2[j].checked) {
            temptemp.push(checkboxes2[j].value);
        }
    }
    temp.push(temptemp)
    temptemp = [];
    for (j = 0; j < checkboxes3.length; j++){
        if (checkboxes3[j].checked) {
            temptemp.push(checkboxes3[j].value);
        }
    }
    temp.push(temptemp)
    temptemp = [];
    for (j = 0; j < checkboxes4.length; j++){
        if (checkboxes4[j].checked) {
            temptemp.push(checkboxes4[j].value);
        }
    }
    temp.push(temptemp);
    
    const jsonlist = {'cuisine':temp[0],'diets':temp[1],'ingredients':temp[2],'intolerances':temp[3]};
    return jsonlist;
}

//specific usecase function for when submitting data on recipe.html
function submitPreferences(){
    console.log("POP!")
    const jsonlist = jsonSelected();
    fetch('/API/CheckForRecipes', { method: 'POST' })

}

//toggle dropdown for selection options
function toggleDropdown(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = (container.style.display === "block") ? "none" : "block";
}