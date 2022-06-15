$(function () {
  loadRecipes();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#addBtn").click(addRecipe);
  $("#recipes").on("click", ".btn-warning", updateRecipe);
  //$(".btn-warning").click(updateRecipe);
  $("#updateSave").click(function(){
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
      method: "PUT",
      data: {title,body},
      success: function(response){
        loadRecipes();
        $("#modelUpdate").modal("hide");

      }
        
    })
  });
});

function updateRecipe(){
  
  var btn = $(this);
    var parentDiv = btn.closest(".recipes");
    var id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(response){
            $("#updateId").val(response._id);
            $("#updateTitle").val(response.title);
            $("#updateBody").val(response.body);
            $("#modelUpdate").modal("show");
    })

}

  function clearValues(){

    $("#title").val("");
    $("#body").val("");

  }



function addRecipe(){
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: {title, body},
    success: function(response){
      clearValues();
      loadRecipes();

    
    }
  })

}

function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipes");
    var id = parentDiv.attr("data-id");
    console.log(id);
    //console.log("Binding delete");
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      method: "DELETE",
      success: function(response){
        loadRecipes();
      }
    });
}

function loadRecipes() {
  //console.log("Binding")
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipes" data-id = ${rec._id} ><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm btnHandle">Delete</button><button class="btn btn-warning btn-sm btnHandle">Edit</button>${rec.body}</p></div>`
        );
      }
    },
  });
}
