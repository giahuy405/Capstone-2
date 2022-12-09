var productService = {
    fetchProducrts: function () {
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
    
  };
  