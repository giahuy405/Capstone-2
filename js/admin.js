

var productList = new Array();

function renderProducts(data) {
    data = data || productList;

    var html = "";
    for (var i = 0; i < data.length; i++) {
        var price = Number(data[i].price);
        var productPrice = price.toLocaleString();
        html += `
        <tr>
                <td>
                  <div class="imgColumn">
                    <img src="${data[i].img}" alt="">
                  </div>
                </td>
                <td>${data[i].name}</td>
                <td>${productPrice}</td>
                <td>${data[i].screen}</td>
                <td>${data[i].backCamera}</td>
                <td>${data[i].frontCamera}</td>
                <td>${data[i].desc}</td>
                <td>${data[i].type}</td>
                <td>
                <div class="d-flex">
                <button
                type="button" 
                onclick="getUpdateProduct('${data[i].id}')" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal" 
                class="btn btn-secondary ">Edit</button>
               
                <button 
                onclick="deleteProduct('${data[i].id}')" 
                class="btn btn-outline-danger ms-1">Delete</button>
        
                </div>
                </td>
            </tr>
        `
            ;
    }
    document.getElementById("productTable").innerHTML = html;
}

function mapProductList(data) {
    var result = [];

    for (var i = 0; i < data.length; i++) {
        var oldProduct = data[i];
        var newProduct = new Product(
            oldProduct.id,
            oldProduct.name,
            oldProduct.price,
            oldProduct.screen,
            oldProduct.backCamera,
            oldProduct.frontCamera,
            oldProduct.img,
            oldProduct.desc,
            oldProduct.type
        );
        result.push(newProduct);
    }

    return result;
}

function fetchProductList() {
    productList = [];
    renderProducts();
    var promise = productService.fetchProducrts();
    promise
        .then(function (response) {
            
            productList = mapProductList(response.data);
            renderProducts();

           
        })
        .catch(function (error) {
            console.log("Error", error);
        })
        .finally(function () {
            document.querySelector('.centerSpinner').classList.add('d-none');
        });
}


// Delete

function deleteProduct(id) {
    Swal.fire({
      title: "CHÚ Ý !!!",
      text: "Bạn chắc muốn xoá thông tin của sản phẩm không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async function (result) {
      if (result.isConfirmed) {
        try {
          var res = await productService.deleteProduct(id);
          fetchProductList();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã xoá thành công !!!',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
  

// //////////////////////////


// Get Product to update 
function getUpdateProduct(id) {

    productService
      .fetchProductDetail(id)
      .then(function (response) {
        var product = response.data;
  
        document.getElementById("updNameProduct").value = product.name;
        document.getElementById("updPriceProduct").value = product.price;
        document.getElementById("updScreenProduct").value = product.screen;
        document.getElementById("updBackCamera").value = product.backCamera;
        document.getElementById("updFrontCamera").value = product.frontCamera;
        document.getElementById("updImgProduct").value = product.img;
        document.getElementById("updDescProduct").value = product.desc;
        document.getElementById("updTypeProduct").value = product.type;
  

 
      })
      .catch(function (error) {
        
      });
  }

  function updateStudent() {
    
    var id;
    var name = document.getElementById("updNameProduct").value;
    var price = document.getElementById("updPriceProduct").value;
    var screen = document.getElementById("updScreenProduct").value;
    var backCamera = document.getElementById("updBackCamera").value;
    var frontCamera = document.getElementById("updFrontCamera").value;
    var img = document.getElementById("updImgProduct").value;
    var desc = document.getElementById("updDescProduct").value;
    var type = document.getElementById("updTypeProduct").value;
  
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

  
    productService
      .updateProduct(product)
      .then(function (response) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cập nhật thành công',
            showConfirmButton: false,
            timer: 1500
          })
        fetchProductList();
        
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  document.getElementById('confirmEdit').onclick = updateStudent;

////////////////

window.onload = function () {
    fetchProductList();

   
};














///Filter Type to set for option

// var typeP = [];
// function filterType() {
//     var count = 0;
//     var tempP;
//     for (var i = 0; i < productList.length; i++) {
//         var productType = productList[i].type;
//         for(var j = 0; j < productList.length; j ++){
//            if(productType === productList[j].type ){
//                 count ++;
//            }else if(productType !== productList[j].type)
//            {
//             tempP =productType;
//             typeP.push(tempP);
//            }
//         }
        
//     }
//     var tempTypeP = new Set(typeP);
//     var newArryType = [...tempTypeP];
//     console.log(newArryType);
//    console.log(tempTypeP);
//    console.log(newArryType[1]);
   
// }
