const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
// orderAdmin.js

// Function to fetch orders from the server
async function fetchOrders() {
    try {
        const response = await axios.get(`${BASE_URL}/orders.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}
async function updateOrderStatus(orderId, newStatus) {
    try {
        const response = await axios.patch(`${BASE_URL}/orders/${orderId}.json`, {
            status: newStatus
        });
        if (response.status === 200) {
            console.log('Trạng thái đơn hàng đã được cập nhật thành công:', response.data);
           
        } else {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', response.statusText);
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu cập nhật trạng thái đơn hàng:', error);
    }
}
// Function to render orders in the table
document.addEventListener('DOMContentLoaded', async function () {
    const orders = await fetchOrders();
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    const ordersArray = Object.values(orders);
    const keys = Object.keys(orders);
    console.log(keys, "và dữ liệu", ordersArray);
    ordersArray.forEach((order, index) => {
        const key = keys[index];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer_name}</td>
            <td>${order.customer_address}</td>
            <td>${order.created_date}</td>
            <td>${order.status}</td>
            <td>
            <button id="" class="btn-edit-order btn btn-primary" data-toggle="modal"
            data-target="#editOrderModal" data-order-id="${key}" data-id="${order.id}">Sửa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    const editButtons = document.querySelectorAll('.btn-edit-order');
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', async function () {
            const orderId = editButton.getAttribute('data-order-id');
            
    
            // Fetch order details based on orderId
            const order = orders[orderId];
            console.log('OrderId:', orderId);
            // Check if order exists
            if (order) {
                const editOrderForm = document.getElementById('editOrderForm');
                // Access the status property only if order is defined
                const orderStatus = order.status;
                const orderStatusSelect = editOrderForm.querySelector('#orderStatus');
                orderStatusSelect.querySelectorAll('option').forEach(option => {
                    if (option.value === orderStatus) {
                        option.selected = true;
                    }
                });
                editOrderForm.querySelector('#orderId').value = orderId;
                editOrderForm.querySelector('#orderName').value = order.customer_name;
                editOrderForm.querySelector('#orderAddress').value = order.customer_address;
                editOrderForm.querySelector('#orderDate').value = order.created_date;
            } else {
                console.error('Order not found:', orderId);
            }
        });
    });
    const editOrderForm = document.getElementById('editOrderForm');

    // Thêm sự kiện nghe cho thay đổi trạng thái
    const orderStatusSelect = editOrderForm.querySelector('#orderStatus');
    orderStatusSelect.addEventListener('change', function () {
        // Lấy giá trị của trạng thái được chọn
        const newStatus = orderStatusSelect.value;

        // Gửi yêu cầu cập nhật trạng thái đơn hàng lên server
        const orderId = editOrderForm.querySelector('#orderId').value;
        updateOrderStatus(orderId, newStatus);
    });
});

