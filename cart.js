window.onload = function () {
  cartCounter()
  btAddCart()
  addToHtml()

  function getS() {
    var productList = [];
    if (localStorage.getItem('myCart') !== null) {
      productList = JSON.parse(localStorage.getItem('myCart'));
    } else {
      productList = [];
    }
    return productList;
  }

  function cartCounter() {
    var cartCount = document.querySelector('.js-cart-count');
    if (cartCount) {
      cartCount.innerHTML = getS().length;
    }
  }

  function btAddCart() {
    var buttonAddCart = document.querySelector('.js-add-cart');
    if (buttonAddCart) {
      buttonAddCart.addEventListener('click', function () {
        var itemId = document.querySelector('.js-item-id').innerHTML;
        var itemName = document.querySelector('.js-item-name').innerHTML;
        var item = getS().find(function (i) {
          return i.id === itemId;
        });
        if (item === undefined) {
          var newProduct = {
            id: itemId,
            name: itemName
          };

          var prList = getS()
          prList.push(newProduct);
          var myCart = JSON.stringify(prList);
          localStorage.setItem('myCart', myCart);

          addToHtml()
          cartCounter()
        }
      });
    }
  }

  function addToHtml() {
    var productFromCart = document.querySelector('#productFromCart');

    productFromCart.innerHTML = '';
    var productInCart = getS();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < productInCart.length; i++) {
      var line = document.createElement('div');
      line.classList.add("user-cart-list-line");
      line.innerHTML = "<div><span class=\"user-cart-list-line-num\">".concat(i + 1, ".</span> ").concat(productInCart[i].name, "</div>");
      var del = document.createElement('span');
      del.classList.add("user-cart-list-line-delete")
      del.dataset.id = productInCart[i].id;
      line.appendChild(del);

      fragment.appendChild(line);

      del.addEventListener('click', function () {
        var dataId = this.getAttribute('data-id');
        var index = productInCart.findIndex(
          function (i) {
            return i.id == dataId;
          }
        );
        productInCart.splice(index, 1);

        var myCarts = JSON.stringify(productInCart);
        localStorage.setItem('myCart', myCarts);
        cartCounter()
        addToHtml()
      })

    }
    productFromCart.appendChild(fragment);

    var form = document.querySelector('[name="products"]');
    if (form) {
      form.value = JSON.stringify(productInCart);
    }

  }


  function clearCart() {
    localStorage.removeItem('myCart');
    cartCounter();
    addToHtml()
  }

}


