function createCuisine(cuisine){
    const container = document.getElementById("cuisine-container");
    let html = "<h3>Which Cuisine Types are you in the mood for today?</h3>";
    for (i = 0; i < cuisine["cuisinetypes"].length; i++){
        html += '<input type="checkbox" id="'+cuisine["cuisinetypes"][i]+'" value="'+cuisine["cuisinetypes"][i]+'">';
        html += "<label>"+cuisine["cuisinetypes"][i]+"</label>";
    }
    container.innerHTML += html;
}

function createDiets(diets){
    const container = document.getElementById("diets-container");
    let html = "<h3>Which Diets do you follow?</h3>";
    for (i = 0; i < diets["diets"].length; i++){
        html += '<input type="checkbox" id="'+diets["diets"][i]+'" value="'+diets["diets"][i]+'">';
        html += "<label>"+diets["diets"][i]+"</label>";
    }
    container.innerHTML += html;
}


function createIngredients(ingredients){
    const container = document.getElementById("ingredients-container");
    let html = "<h3>Which Ingredients would you like to add?</h3>";
    for (i = 0; i < ingredients["short"].length; i++){
        html += '<input type="checkbox" id="'+ingredients["short"][i]+'" value="'+ingredients["short"][i]+'">';
        html += "<label>"+ingredients["short"][i]+"</label>";
    }
    container.innerHTML += html;
}

function createIntolerances(intolerances){
    const container = document.getElementById("intolerances-container");
    let html = "<h3>What Intolerances do you have?</h3>";
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
