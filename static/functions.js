function createCuisine(cuisineJSON){
    const cuisine = cuisineJSON;
    document.write("<h3>Which Cuisine Types are you in the mood for today?</h3>");
    for (i = 0; i < cuisine["cuisinetypes"].length; i++){
        document.write('<input type="checkbox" id="'+cuisine["cuisinetypes"][i]+'" value="'+cuisine["cuisinetypes"][i]+'"');
        document.write("<label>"+cuisine["cuisinetypes"][i]+"</label>");
    }
}

function createDiets(dietsJSON){
    const cuisine = JSON.parse(cuisineJSON);
    document.write("<h3>Which Cuisine Types are you in the mood for today?</h3>");
    for (i = 0; i < cuisine["cuisinetypes"].length; i++){
        document.write('<input type="checkbox" id="'+cuisine["cuisinetypes"][i]+'" value="'+cuisine["cuisinetypes"][i]+'"');
        document.write("<label>"+cuisine["cuisinetypes"][i]+"</label>");
    }
}

function createIngredients(ingredientsJSON){

}

function createIntolerences(intolerencesJSON){

}

function callJSONFiles(){
    console.log("POP!");
    fetch('/API/GetDropDownConfigurations', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        console.log(data.cuisine);
        createCuisine(data.cuisine); // assuming the cuisine data is the first element of the returned array
    })
        .catch(error => {
        console.error(error);
    });
} 
