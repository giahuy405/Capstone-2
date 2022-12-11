var productService = {
    fetchProducts: function () {
      return axios({
        url: "https://6388b325a4bb27a7f78f1cb2.mockapi.io/products",
        method: "GET",
      });
    },
    createProduct: function (product) {
      return axios({
        url: "https://6388b325a4bb27a7f78f1cb2.mockapi.io/products",
        method: "POST",
        data:product
      });
    },

    deleteProduct: function (id) {
      return axios({
        url: "https://6388b325a4bb27a7f78f1cb2.mockapi.io/products/" + id,
        method: "DELETE",
      });
    },

    fetchProductDetail: function (id) {
      return axios({
        url: "https://6388b325a4bb27a7f78f1cb2.mockapi.io/products/" + id,
        method: "GET",
      });
    },
    updateProduct: function (product) {
      return axios({
        url:
          "https://6388b325a4bb27a7f78f1cb2.mockapi.io/products/" +
          product.id,
          method: "PUT",
        // request body => POST, PUT, PATCH
        data: product,
      });
    },
  };
  