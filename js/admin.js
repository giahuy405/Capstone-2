

var productList = new Array();

function renderProducts(data) {
    data = data || productList;

    var html = "";
    for (var i = 0; i < data.length; i++) {
        var price = Number(data[i].price) ; 
        var productPrice =  price.toLocaleString();
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
                  <button 
                    onclick="" 
                    class="btn btn-danger">Xoá</button>
                  <button 
                    onclick=""  
                    class="btn btn-info">Sửa</button>
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


window.onload = function () {
    fetchProductList();
    
};