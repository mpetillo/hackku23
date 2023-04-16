function loadRecipes(recipes) {
// Get a reference to the items container in the HTML file
var recipeContainer = document.getElementById("recipe-container");

// Loop through each item in the array and create an HTML element for it
for (var i = 0; i < recipes.length; i++) {
    // Create a div element for the item
    var itemDiv = document.createElement("div");
    itemDiv.className = "item";
    
    // Create a span element for the item's title
    var titleSpan = document.createElement("span");
    titleSpan.innerHTML = recipes[i].title;
    
    // Create an anchor element for the item's link
    var linkAnchor = document.createElement("a");
    linkAnchor.href = recipes[i].link;
    linkAnchor.innerHTML = "Link";
    
    // Add the title and link to the item div
    itemDiv.appendChild(titleSpan);
    itemDiv.appendChild(linkAnchor);
    
    // Add a click event listener to the item div to select it
    itemDiv.addEventListener("click", function() {
        // Unselect any previously selected item
        var selectedItems = document.getElementsByClassName("selected");
        for (var j = 0; j < selectedItems.length; j++) {
            selectedItems[j].classList.remove("selected");
        }
        
        // Select the clicked item
        this.classList.add("selected");
        
        // Log the item's title and link to the console
        console.log("Selected item: " + this.getElementsByTagName("span")[0].innerHTML + " - " + this.getElementsByTagName("a")[0].href);
    });
    
    // Add the item div to the items container
    recipeContainer.appendChild(itemDiv);
}
}

function getSelectedRecipe() {
    // Get the selected item
    var selectedItem = document.querySelector('.item.selected');
    
    // Check if an item is selected
    if (selectedItem) {
        // Get the title and link of the selected item
        var title = selectedItem.querySelector('span').textContent;
        var link = selectedItem.querySelector('a').href;
        
        // Return the title and link as a string
        return title + ' - ' + link;
    } else {
        // Return null if no item is selected
        return null;
    }
}
