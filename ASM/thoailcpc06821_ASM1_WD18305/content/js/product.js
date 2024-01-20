fetch('db.json')
.then(response => response.json())
.then(data => {
  var listProduct = (htmlProduct,categoryId) => {
  const products = data.products;
  const productListContainer = document.getElementById(htmlProduct);
  const productListHTML = Object.keys(products).map(productId => {
    const product = products[productId];
    // Kiểm tra nếu cate_id bằng 1
    if (product.cate_id === categoryId) {
      return `
        <div class="item">
        <div class="thumb">
            <div class="hover-content">
                <ul>
                    <li><a href="../client/single-product.html"><i class="fa fa-eye"></i></a></li>
                    <li><a href="../client/single-product.html"><i class="fa fa-star"></i></a></li>
                    <li><a href="../client/single-product.html"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <img src="content/images/${product.image}" alt="" height="400px">
        </div>
        <div class="down-content">
            <h4>${product.name}</h4>
            <span>${product.price}</span>
        </div>
    </div>
      `;
    }
    return '';
  }).join('');

  productListContainer.innerHTML = productListHTML;
}
listProduct('products-cate1',1);
listProduct('products-cate2',2);
listProduct('products-cate3',3);
})
.catch(error => console.error('Lỗi khi lấy dữ liệu:', error));