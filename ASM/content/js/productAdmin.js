const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
async function fecthProducts() {
    try {
        const response = await axios.get(`${BASE_URL}/products.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục sản phẩm:', error);
        return [];
    }
}
async function fetchProduct(productId) {
    try {
        const response = await axios.get(`${BASE_URL}/products/${productId}.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        return null;
    }
}
async function fetchCategories() {
    try {
        const response = await axios.get(`${BASE_URL}/categories.json`);
        const categories = response.data;
        return categories;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục từ Firebase:', error);
        return [];
    }
}
async function getCategoryName(categoryId) {
    try {
        const response = await axios.get(`${BASE_URL}/categories/${categoryId}.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin danh mục:', error);
        return '';
    }
}
async function getMaxProductId() {
    try {
        const response = await axios.get(`${BASE_URL}/products.json?orderBy="$key"&limitToLast=1`);
        const data = response.data;
        if (data) {
            // Chuyển đổi key (id) của danh mục thành số và tăng thêm 1
            const maxId = parseInt(Object.keys(data)[0]) + 1;
            return maxId;
        } else {
            // Trường hợp không có danh mục nào trong cơ sở dữ liệu
            return 1;
        }
    } catch (error) {
        console.error('Lỗi khi lấy id lớn nhất của danh mục:', error);
        return null;
    }
}
async function deleteProduct(productId) {
    try {
        const response = await axios.delete(`${BASE_URL}/products/${productId}.json`);
        console.log('Danh mục đã được xóa từ Firebase:', response.data);
        alert('Sản phẩm đã được xóa thành công');
    } catch (error) {
        console.error('Lỗi khi xóa danh mục sản phẩm:', error);
    }
}
document.addEventListener('DOMContentLoaded', async function () {
    const products = await fecthProducts();
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = "";
    const productsArray = Object.values(products);
    const keys = Object.keys(products);
    console.log(keys, "và dữ liệu", productsArray);
    productsArray.forEach((product, index) => {
        const key = keys[index];
        if (product && product.id) { // Kiểm tra xem sản phẩm có thuộc tính 'id' không
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="../../content/images/${product.image}" alt="" width="100px"></td>
                <td>${product.price}</td>
                <td>
                    <button id="" class="btn-edit-product btn btn-primary" data-toggle="modal"
                    data-target="#editProductModal" data-product-id="${key}" data-id="${product.id}">Sửa</button>
                    <button class="btn-delete-product btn btn-danger"  data-product-id="${key}">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        } else {
            console.log("Lỗi: Sản phẩm không có ID.");
        }
    });
    const categories = await fetchCategories();
    const selectElement = document.getElementById("productCategory");

    // Xóa tất cả các phần tử hiện có trong thẻ select
    selectElement.innerHTML = "";

    // Duyệt qua danh sách danh mục và tạo các phần tử option
    for (const categoryId in categories) {
        const category = categories[categoryId];
        const option = document.createElement("option");
        option.value = categoryId; 
        option.textContent = category.name; 
        selectElement.appendChild(option);
    }
    const editButtons = document.querySelectorAll(`button.btn-edit-product.btn.btn-primary`);
    console.log(editButtons);
    editButtons.forEach(editButton => { 
        editButton.addEventListener('click', async function () {
            const productId = editButton.getAttribute('data-product-id');
            const idData = editButton.getAttribute('data-id');
            console.log('ProductId:', productId);

            // Lấy thông tin của danh mục   
            const product = await fetchProduct(productId);

            // Điền thông tin của danh mục vào form sửa
            const editForm = document.getElementById('editProductForm');
            editForm.querySelector('#editProductName').value = product.name;
            editForm.querySelector('#editProductPrice').value = product.price;
            const categoryId = product.categoryId; 
            const editProductCategorySelect = editForm.querySelector('#editProductCategory');
            for (const categoryId in categories) {
                const category = categories[categoryId];
                const option = document.createElement('option');
                option.value = categoryId;
                option.textContent = category.name;
                if (categoryId === product.id_cate) {
                    option.selected = true; 
                }
                editProductCategorySelect.appendChild(option);
            }
            // Lắng nghe sự kiện gửi form sửa
            editForm.addEventListener('submit', async function (event) {
                event.preventDefault();

                // Lấy thông tin mới từ form
                const newName = editForm.querySelector('#categoryName').value;

                // Gửi yêu cầu cập nhật danh mục lên server
                try {
                    const response = await axios.put(`${BASE_URL}/categories/${categoryId}.json`, {
                        name: newName,
                        id: idData,
                    });
                    console.log('Danh mục đã được cập nhật:', response.data);
                    alert('Danh mục đã được cập nhật:');
                    location.reload();
                    // Thực hiện các hành động cần thiết sau khi cập nhật thành công
                } catch (error) {
                    console.error('Lỗi khi cập nhật danh mục sản phẩm:', error);
                }
            });
        });
    });
    const addForm = document.getElementById('addProductForm');
    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Lấy thông tin từ biểu mẫu
        const productName = addForm.querySelector('#productName').value;
        const productImage = addForm.querySelector('#productImage');
        const productPrice = addForm.querySelector('#productPrice').value;
        const productCaId = addForm.querySelector('#productCategory').value;
        const imageName = productImage.files[0].name;
        try {
            // Lấy id lớn nhất của danh mục từ Firebase
            const maxId = await getMaxProductId();

            // Nếu không có danh mục nào trong cơ sở dữ liệu, sử dụng id 1
            const newId = maxId ? maxId + 1 : 1;

            // Tạo đối tượng danh mục mới với id mới và tên được nhập từ form
            const newProduct = {
                id: newId,
                name: productName,
                image: imageName, 
                price: productPrice,
                cate_id: productCaId,
                detail: `sản phẩm: ${productName} với giá ${productPrice}`,
            };

            // Gửi yêu cầu thêm danh mục mới vào Firebase
            const response = await axios.post(`${BASE_URL}/products.json`, newProduct);
            console.log('Danh mục mới đã được thêm vào Firebase:', response.data);

            // Đóng modal sau khi thêm thành công
            $('#addProductModal').modal('hide');
            alert("Thêm sản phẩm thành công");
            location.reload();
        } catch (error) {
            console.error('Lỗi khi thêm danh mục mới:', error);
        }
    });
    const deleteButtons = document.querySelectorAll(`button.btn-delete-product.btn.btn-danger`);
    console.log(deleteButtons);
    deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async function () {
        const productId = deleteButton.getAttribute('data-product-id');
        console.log('productId:', productId);
        await deleteProduct(productId);
        location.reload();
    });
});
})