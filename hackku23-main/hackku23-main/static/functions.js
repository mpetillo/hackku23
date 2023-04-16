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
    console.log("POP!");
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

//toggle dropdown for selection options
function toggleDropdown(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = (container.style.display === "block") ? "none" : "block";
}

