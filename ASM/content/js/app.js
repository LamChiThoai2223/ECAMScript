const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
async function getOrderDetails(){
    try{
        const response = await axios.get(`${BASE_URL}/order_details.json`);
        return response.data;
    }catch(err){
        console.log('Lỗi hiển thị order_details: ',err.message);
    }
}
async function getProducts(){
    try{
        const response = await axios.get(`${BASE_URL}/products.json`);
        return response.data;
    }catch(err){
        console.log('Lỗi hiển thị sản phẩm', err.massege);
    }
}
async function getCategories(){
    try{
        const response = await axios.get(`${BASE_URL}/categories.json`);
        return response.data;
    }catch(err){
        console.log('Lỗi hiển thị danh mục',err.message);
    }
}
document.addEventListener('DOMContentLoaded', async function(){
    const orderDetails = await getOrderDetails();
    const products = await getProducts();
    const categories = await getCategories();
    let totalQuantity = 0;
    let totalPrice = 0;
    const QuantityCategory = document.getElementById('QuantityCategory');
    const totalProduct = document.getElementById('totalProduct');
    const totalMoney = document.getElementById('totalMoney');
    const htmlQuantityProducts = document.getElementById('QuantityProducts');
    // Kiểm tra xem orderDetails có dữ liệu không
    if (orderDetails) {
        // Lặp qua từng mục trong orderDetails và tính tổng quantity
        Object.values(orderDetails).forEach(orderDetail => {
            totalQuantity += orderDetail.quantity || 0;
            totalPrice += orderDetail.unit_price || 0;
        });

        console.log('Tổng quantity: ', totalQuantity);
        console.log(totalPrice);
        totalProduct.innerHTML = totalQuantity;
        totalMoney.innerHTML = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
    } else {
        console.log('Không có dữ liệu order_details.');
    }
    if (products) {
        const productArray = Object.values(products);
        const totalProducts = productArray.length;

        console.log('Tổng số sản phẩm: ', totalProducts);
        htmlQuantityProducts.innerHTML = totalProducts;
    } else {
        console.log('Không có dữ liệu sản phẩm.');
    }
    if (categories) {
        const categoryArray = Object.values(categories);
        const totalCategories = categoryArray.length;

        console.log('Tổng số danh mục sản phẩm: ', totalCategories);
        QuantityCategory.innerHTML = totalCategories;
    } else {
        console.log('Không có dữ liệu sản phẩm.');
    }
});