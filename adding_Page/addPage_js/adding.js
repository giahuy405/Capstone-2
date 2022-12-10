
function createProduct(){
    var id;
    var name = document.getElementById("nameProduct").value;
    var price = document.getElementById("priceProduct").value;
    var screen = document.getElementById("screenProduct").value;
    var backCamera = document.getElementById("backCamera").value;
    var frontCamera = document.getElementById("frontCamera").value;
    var img = document.getElementById("imgProduct").value;
    var desc = document.getElementById("descProduct").value;
    var type = document.getElementById("typeProduct").value;

    var product = new Product(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );

      var promise = productService.createProduct(product);
    promise
    .then(function(response){
        Swal.fire({
            title: 'Thêm sản phẩm thành công',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!!!'
          }).then((result) => {
            if (result.isConfirmed) {
            window.location = '../../admin.html';
            }
          })
       
    })
    .catch(function(error){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    })
    .finally(function(){
        
    })


}

document.getElementById('addBtn').onclick = createProduct;