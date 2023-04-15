function createCuisine(cuisineJSON){
    const cuisine = JSON.parse(cuisineJSON);
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
        document.write("<label>"+cuisine["cuisinetypes"][i]+"</label>"); //cuisine needs to be replaced with diets, etc etc
    }
}

function createIngredients(ingredientsJSON){

}

function createIntolerences(intolerencesJSON){

}

function callJSONFiles(){
    console.log("POP!");
    let apilist = fetch('/API/GetDropDownConfigurations', {Method:'GET'});
    createCuisine(apilist[0]);
}