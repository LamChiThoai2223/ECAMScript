fetch('../db.json')
.then(response => response.json())
.then(data => {

  const products = data.products;
  const productListContainer = document.getElementById("listProduct");
  const productListHTML = Object.keys(products).map(productId => {
    const product = products[productId];
      return `
      <div class="col-lg-4">
      <div class="item">
          <div class="thumb">
              <div class="hover-content">
                  <ul>
                      <li><a href="single-product.html"><i class="fa fa-eye"></i></a></li>
                      <li><a href="single-product.html"><i class="fa fa-star"></i></a></li>
                      <li><a href="single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
                  </ul>
              </div>
              <img src="../content/images/${product.image}" alt="">
          </div>
          <div class="down-content">
              <h4>${product.name}</h4>
              <span>${product.price}</span>
          </div>
      </div>
  </div>
      `;

  }).join('');

  productListContainer.innerHTML = productListHTML;
})
.catch(error => console.error('Lỗi khi lấy dữ liệu:', error));