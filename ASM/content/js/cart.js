
const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId-1}.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        return null;
    }
};
const getorder = async () =>{
    try{
        const response = await axios.get(`${BASE_URL}/orders.json`)
        return response.data;
    } catch(error){
        console.log('Lỗi order',error.message);
    }
}
document.addEventListener("DOMContentLoaded", async function() {
    const cartTableBody = document.querySelector(".table tbody");
    
    // Lấy dữ liệu từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Hiển thị thông tin sản phẩm trong cart.html
    for (const item of cart) {
        const productId = item.productId;
        const product = await getProductById(productId);
    
        if (product) {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.textContent = product.name;
            row.appendChild(nameCell);

            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.src = `../content/images/${product.image}`;
            image.alt = product.name;
            image.width = 100;
            imageCell.appendChild(image);
            row.appendChild(imageCell);
  
            const priceCell = document.createElement("td");
            priceCell.textContent = product.price;
            row.appendChild(priceCell);
    
            // Thêm nút xóa
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Xóa";
            deleteButton.addEventListener("click", function() {
                deleteItemFromCart(productId);
                // Sau khi xóa, cập nhật lại giao diện giỏ hàng
                row.remove();
                updateTotalAmount();
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
    
            cartTableBody.appendChild(row);
        }
    }
    updateTotalAmount();
});
function deleteItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Hàm cập nhật tổng tiền
async function updateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    for (const item of cart) {
        const productId = item.productId;
        const product = await getProductById(productId);
        if (product) {
            total += parseInt(product.price);
        }
    }
    // Hiển thị tổng tiền lên giao diện
    document.getElementById("totalAmount").innerText = total.toLocaleString() + " đ";
    console.log(total.toLocaleString());
}


document.getElementById('checkout-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    // Thu thập dữ liệu từ form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const currentDate = new Date();
    const createdDate = currentDate.toISOString().slice(0, 10);
    const orders = await getorder();
    const order = Object.values(orders);
    const orderNew = order.length;
    console.log(orderNew);
    // Tạo object chứa thông tin thanh toán
    const paymentInfo = {
        id : orderNew + 1,
        created_date: createdDate,
        customer_name: name,
        customer_email: email,
        customer_address: address,
        customer_phone_number: phone,
        status: "Đang chờ xác nhận",
    };  

    try {
        // Gửi dữ liệu thanh toán lên Firebase
        const paymentResponse = await axios.post(`${BASE_URL}/orders.json`, paymentInfo);
        console.log('Thanh toán thành công:', paymentResponse.data);
        const orderId = paymentResponse.data.name; // Firebase trả về id của đơn hàng mới
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderDetails = [];
        for (const item of cart) {
            const productId = item.productId;
            const quantity = item.quantity;
            const product = await getProductById(productId);
            
            if (product) {
                const unitPrice = product.price;
                const orderDetail = {
                    order_id: orderId,
                    product_id: productId,
                    quantity: quantity,
                    unit_price: unitPrice
                };
                orderDetails.push(orderDetail);
            }
        }
        const orderDetailsResponse = await axios.post(`${BASE_URL}/order_details.json`, orderDetails);
        console.log('Thêm chi tiết đơn hàng thành công:', orderDetailsResponse.data);
        localStorage.removeItem('cart');
        window.location.href = 'thankyou.html';
    } catch (error) {
        console.error('Lỗi khi thanh toán:', error);
    }
});
