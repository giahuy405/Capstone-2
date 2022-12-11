var typeP = [];

function supFilterType(){
    var tempArray = [];
    var tempP; 
    productService.fetchProducts()
    .then(function(response){

        var arrayData = response.data;

        for (var i = 0; i < arrayData.length; i++) {
            var productType = arrayData[i].type.toLowerCase();
            for(var j = 0; j < arrayData.length; j ++){
               if(productType !== arrayData[j].type.toLowerCase())
               {
                tempP = productType[0].toUpperCase() + productType.substring(1);
                tempArray.push(tempP);
               }
            }
            
        }
        var tempTypeP = new Set(tempArray);
         typeP = [...tempTypeP];
      
         renderOption(typeP, 'typeOption');
    })
    .catch(function (error) {
        console.log("Error", error);
    });
}
function renderOption(data, optionId){

 var html ='';
 for (var i = 0; i < data.length; i++) {
    var optionTag = document.createElement("option");
    var dataInOption = document.createTextNode(data[i]);
    optionTag.appendChild(dataInOption);
    document.getElementById(optionId).appendChild(optionTag);
}
}

