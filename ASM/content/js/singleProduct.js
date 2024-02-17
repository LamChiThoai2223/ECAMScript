const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';

async function getProductById(productId) {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId}.json`);
        return response.data;
    } catch (err) {
        console.log('Lỗi khi tìm sản phẩm theo ID: ', err.message);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        const product = await getProductById(productId-1);

        if (product) {
        const productNameElement = document.getElementById('productName');
        productNameElement.textContent = product.name;

        // Cập nhật giá sản phẩm
        const productPriceElement = document.getElementById('productPrice');
        const formattedPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        productPriceElement.textContent = formattedPrice;

        // Cập nhật mô tả sản phẩm
        const productDescriptionElement = document.getElementById('productDescription');
        productDescriptionElement.textContent = product.detail;

        // Cập nhật ảnh sản phẩm (nếu có)
        const productImageElement = document.getElementById('productImage');
        if (product.image) {
            productImageElement.src = `../content/images/${product.image}`;
        } 
        } else {
            console.log('Không tìm thấy sản phẩm có ID:', productId);
        }
    } else {
        console.log('Không có ID sản phẩm trên URL.');
    }
});
