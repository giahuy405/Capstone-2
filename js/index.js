var productList = [];
var cart = getCartLocalStorage();

document.getElementById('deleteAllCart').onclick = function () {
    if (cart.length === 0) {
        document.querySelector('.modal-dialog').showModal();
        setTimeout(function () {
            document.querySelector('.modal-dialog').close();
        }, 1300)
    }
    else {
        Swal.fire({
            title: 'Xác nhận lại',
            text: "Dữ liệu của bạn sẽ bị xóa hoàn toàn",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    {
                        title: 'Đã xóa',
                        text: 'Giỏ hàng của bạn đã được xóa',
                        icon: 'success',
                        timer: 1300,
                    }
                )
                cart = [];
                document.getElementById('notifyNoCartItem').style.display = 'block';
                document.getElementById('tableCart').style.display = 'none';

                saveCartLocalStorage();
                renderCart();
            }
        })
    }
}
document.getElementById('btnBuy').onclick = function () {
    if (cart.length === 0) {
        document.querySelector('.modal-dialog').showModal();
        setTimeout(function () {
            document.querySelector('.modal-dialog').close();
        }, 1300)
    }
}
function mapProductList(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var newData = new Product(
            data[i].id,
            data[i].name,
            data[i].price,
            data[i].screen,
            data[i].backCamera,
            data[i].frontCamera,
            data[i].img,
            data[i].desc,
            data[i].type,
        );
        result.push(newData);
    }
    return result;
}
function renderProductList(data) {
    var data = data || productList;
    var html = '';

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        useGrouping: true,
        minimumFractionDigits: 0
    });
    
    for (var i = 0; i < data.length; i++) {
        
        var price = data[i].price;
        var tempPrice;
        if(!Boolean(Number(price))){
            tempPrice = price;
        }else{
            tempPrice = dollarUS.format(Number(price));
        }
        html +=
            `<div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
        <div class="product-item p-sm-3 p-4">
            <a href="#">
                <div class="mb-2 mx-auto">
                    <img class="img-fluid d-block" style='width:65%; margin: 0 auto;'  src="${data[i].img}" alt="">
                </div>
                <h5>${data[i].name}</h5>
                <h6><em>${data[i].desc}</em></h6>
                <span class="myBadge">${data[i].type}</span>
                <p class="mt-2">Màn hình : ${data[i].screen}</p>
                <p>Camera trước : ${data[i].frontCamera}</p>
                <p>Camera sau : ${data[i].backCamera}</p>
              
            </a>
            <div class=" product__price  border-top d-flex align-items-center pt-2">
                <h4>${tempPrice}</h4>
                <div class="ml-auto" >
                    <div class="form-inline border rounded">
                        <button class="btn btn-cart-plus btn-outline-primary " onclick="addToCart(${data[i].id})"  >
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
    }
    
    document.getElementById("displayProductList").innerHTML = html;
}
function totalMoney() {

    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        var price = +cart[i].product[0].price;
        var quantity = cart[i].quantity;
        total = total + price * quantity;
    }
    document.getElementById('totalMoney').innerHTML = '$' + total.toLocaleString();
}
function renderCart() {
    var html = '';
    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        useGrouping: true,
        minimumFractionDigits: 0
    });
    for (var i = 0; i < cart.length; i++) {
       
        var price = cart[i].product[0].price;
        var tempPrice;
        if(!Boolean(Number(price))){
            tempPrice = price;
        }else{
            tempPrice = dollarUS.format(Number(price));
        }
        html +=
            `
        <tr>
            <td><img class="rounded" style='width:60px;'  src="${cart[i].product[0].img}" alt=""></td>
            <td>${cart[i].product[0].name}</td>
            <td>
                <div class="chooseQuantity">
                    <button  onclick="minusQuantity('${cart[i].product[0].id}')" class="btn Mybtn"><i class="fa-solid fa-minus"></i></button>
                    <input type='text' style="width:35px" readonly="readonly" class="displayQty text-center border-0" placeholder="${cart[i].quantity}">
                    <button onclick="plusQuantity('${cart[i].product[0].id}')" class="btn Mybtn"> <i class="fa-solid fa-plus"></i></button> 
                </div>
            </td>
            <td>${tempPrice}</td>
            <td><button onclick="removeProductFromCart('${i}')" class="btn p-0"><i class="fa-regular fa-trash-can text-danger"></i></button></td>
        </tr>
        `
    }
    document.getElementById('renderCart').innerHTML = html;
    totalMoney();
    saveCartLocalStorage();
}
function saveCartLocalStorage() {
    localStorage.setItem('Cart', JSON.stringify(cart));
}
function getCartLocalStorage() {
    return localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : [];
}
function removeProductFromCart(index) {

    Swal.fire({
        title: 'Xóa ?',
        text: "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                {
                    title: 'Đã xóa',
                    text: 'Đã xóa ra khỏi giỏ hàng.',
                    icon: 'success',
                    timer:1200
                }
            );
            var i = +index;
            cart.splice(i, 1);
            saveCartLocalStorage();
            renderCart()
        }
    })
}
function fetchProductList(data) {
    var data = data || "";
    document.querySelector('.myLoader').style.display = 'block';
    productService.fetchProducts()
        .then(function (res) {
            console.log(res);
            productList = mapProductList(res.data)
            renderProductList(data);
        })
        .catch(function (err) {
            console.log(err);
        })
        .finally(function () {
            document.querySelector('.myLoader').style.display = 'none';
        });
}
function displayAlertSucess() {
    document.getElementById('body').insertAdjacentHTML('afterbegin',
        `
    <section class="alertSuccess"  >
        <i class="fa-regular fa-circle-check"></i>
        <h6>Thêm vào giỏ hàng thành công</h6>
    </section>
    <div class="alert-overlay"></div>
     `
    );

    document.querySelector('.alertSuccess').classList.add('active');
    document.querySelector('.alert-overlay').classList.add('active')
    setTimeout(function () {
        document.querySelector('.alertSuccess').classList.remove('active');
        document.querySelector('.alert-overlay').classList.remove('active');
        setTimeout(function () {
            document.querySelector('.alertSuccess').remove();
            document.querySelector('.alert-overlay').remove();
        }, 200)
    }, 1100);
}
function displayAlertError() {
    document.getElementById('body').insertAdjacentHTML('afterbegin',
        `
   <section class="alertSuccess">
       <i class="fa-solid text-danger fa-ban"></i>
       <h6 class="text-danger">Bạn chỉ được mua tối đa 10 cái trên mỗi sản phẩm</h6>
   </section>
   `
    )
    document.querySelector('.alertSuccess').classList.add('active');
    setTimeout(function () {
        document.querySelector('.alertSuccess').classList.remove('active');
        setTimeout(function () {
            document.querySelector('.alertSuccess').remove();
        }, 200)
    }, 1400);
}
function minusQuantity(id) {

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product[0].id === id) cart[i].quantity--;
    }
    for (var i = 0; i < cart.length; i++)
        if (cart[i].quantity === 0) cart[i].quantity = 1;
    renderCart();
}
function plusQuantity(id) {

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product[0].id === id) cart[i].quantity++;
        if (cart[i].quantity === 11) {
            cart[i].quantity = 10;
            displayAlertError();
        }
    }

    renderCart();
}
function addToCart(id) {
    var cartItem = {
        product: [],
        quantity: 1,
    };
    // document.getElementById('btnAddToCart' + id).style.display = 'none';
    // document.getElementById('btnChooseQuantity' + id).style.display = 'block';
    // productService.fetchProductDetail(id) -> lỗi is not a function ?
    // axios({
    //     url: 'https://639181b2b750c8d178c51517.mockapi.io/productDetail/' + id,
    //     method: "GET",
    // })
    productService.fetchProductDetail(id)
        .then(function (res) {
            displayAlertSucess();
            for (var i = 0; i < cart.length; i++) {
                // kiểm tra xem id của product có từng nằm trong cart không ? 
                // do thằng cart[i].product[0].id -> typeof của nó là string
                // trong khi thằng id -> typeof là number 
                // nên so sánh === sẽ không được :)) 
                // C1 chuyển cart[i].product[0].id thành number và dùng ===
                // C2 ta so sánh 2 dấu == (abstract equality) 
                if (+cart[i].product[0].id === id) {
                    // nếu có thì chỉ tăng quantity lên 1
                    return cart[i].quantity++;
                }
            }
            // chạy hết vòng for, product chưa từng nằm trong cart thì push -> cartItem ->  cart
            cartItem.product.push(res.data);
            cart.push(cartItem);
            saveCartLocalStorage();
        })
        .catch(function (err) {
            console.log(err)
        })
}
function selectType(e) {
    var newProductList = [];
    if (e.target.value === "") {
        return fetchProductList();
    }
    for (var i = 0; i < productList.length; i++) {
        if (e.target.value.toLowerCase() === productList[i].type.toLowerCase()) {
            var newData = new Product(
                productList[i].id,
                productList[i].name,
                productList[i].price,
                productList[i].screen,
                productList[i].backCamera,
                productList[i].frontCamera,
                productList[i].img,
                productList[i].desc,
                productList[i].type,
            );
            newProductList.push(newData);
        }
    }
    return fetchProductList(newProductList);
}
function searchProduct(e) {
    var keyword = e.target.value.trim().toLowerCase();
    var newProductList = [];
    for (var i = 0; i < productList.length; i++) {
        var product = productList[i].name.toLowerCase();
        if (product.includes(keyword))
            newProductList.push(productList[i]);
    }
    return fetchProductList(newProductList);
}
function openCart() {

    document.getElementById('cart').classList.add('active');
    document.querySelector('.cart-overlay').style.display = 'block';

    document.getElementById('tableCart').style.display = 'table';
    document.getElementById('notifyNoCartItem').style.display = 'none';

    if (cart.length === 0) {
        document.getElementById('notifyNoCartItem').style.display = 'block';
        document.getElementById('tableCart').style.display = 'none';
    }
    renderCart();
}
function closeCart() {
    document.getElementById('cart').classList.remove('active');
    document.querySelector('.cart-overlay').style.display = 'none';
}
// close Cart khi click ra overlay 
window.onclick = function (event) {
    if (event.target == document.getElementById('overlay')) {
        document.getElementById('cart').classList.remove('active');
        document.querySelector('.cart-overlay').style.display = 'none';
    }
}
window.onload = function (event) {
    fetchProductList();
}

