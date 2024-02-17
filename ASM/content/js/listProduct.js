const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
    const listProduct = async (category) => {
        try {
            const response = await axios.get(`${BASE_URL}/products.json`);
            const products = response.data;
            const productListContainer = document.getElementById("listProduct");
            let productCounter = 0; 
            for (const productId in products) {
                const product = products[productId];
                if (product && product.id && (product.cate_id.toString() === category || category === 'all')) {
                    const productHTML = `
                        <div class="col-lg-4">
                            <div class="item">
                                <div class="thumb">
                                    <div class="hover-content">
                                        <ul>
                                            <li><a href="single-product.html?productId=${product.id}"><i class="fa fa-eye"></i></a></li>
                                            <li><a href="cart.html" onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></a></li>
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
                    if (productCounter < 9) {
                        productListContainer.innerHTML += productHTML;
                        productCounter++;
                    } else {
                        break; 
                    }
                }else{
                    console.log("lỗi");
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };
listProduct(category);
document.addEventListener("DOMContentLoaded", function() {
    const filterForm = document.querySelector(".filter");
    const productListContainer = document.getElementById("listProduct");

    filterForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const category = filterForm.elements["category"].value;
        const minPrice = filterForm.elements["minPrice"].value;
        const maxPrice = filterForm.elements["maxPrice"].value;

        try {
            const response = await axios.get(`${BASE_URL}/products.json`);
            const products = response.data;

            productListContainer.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại

            for (const productId in products) {
                const product = products[productId];
                
                // Kiểm tra xem sản phẩm có thuộc danh mục được chọn không
                // và có giá nằm trong khoảng giá được chỉ định không
                if ((product && product.id && (product.cate_id.toString() === category || category === 'all')) &&
                    (minPrice === "" || parseInt(product.price) >= parseInt(minPrice)) &&
                    (maxPrice === "" || parseInt(product.price) <= parseInt(maxPrice))) {
                    // Tạo HTML cho sản phẩm
                    const productHTML = `
                        <div class="col-lg-4">
                            <div class="item">
                                <div class="thumb">
                                    <div class="hover-content">
                                        <ul>
                                            <li><a href="single-product.html?productId=${product.id}"><i class="fa fa-eye"></i></a></li>
                                            <li><a href="cart.html" onclick="addToCart(${product.id})" ><i class="fa fa-shopping-cart"></i></a></li>
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
                    productListContainer.innerHTML += productHTML;
                }
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    });
});
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productId });
    localStorage.setItem('cart', JSON.stringify(cart));
}