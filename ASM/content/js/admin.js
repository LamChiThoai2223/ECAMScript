const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
async function fetchCategories() {
    try {
        const response = await axios.get(`${BASE_URL}/categories.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục sản phẩm:', error);
        return [];
    }
}
async function fetchCategory(categoryId) {
    try {
        const response = await axios.get(`${BASE_URL}/categories/${categoryId}.json`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin danh mục:', error);
        return null;
    }
}
async function getNextCategoryId() {
    try {
        const response = await axios.get(`${BASE_URL}/categoryId.json`);
        let nextId = response.data || 1;
        return nextId;
    } catch (error) {
        console.error('Lỗi khi lấy ID tiếp theo cho danh mục:', error);
        return null;
    }
}
async function deleteCategory(categoryId) {
    try {
        const response = await axios.delete(`${BASE_URL}/categories/${categoryId}.json`);
        console.log('Danh mục đã được xóa từ Firebase:', response.data);
        alert('Danh mục đã được xóa thành công');
    } catch (error) {
        console.error('Lỗi khi xóa danh mục sản phẩm:', error);
    }
}
document.addEventListener('DOMContentLoaded', async function () {
    const categories = await fetchCategories();
    const tbody = document.querySelector('table tbody');

    // Xóa bất kỳ nội dung cũ nào trong tbody
    tbody.innerHTML = '';

    const categoriesArray = Object.values(categories);

    // Duyệt qua mỗi danh mục và thêm nó vào bảng
    const keys = Object.keys(categories);

categoriesArray.forEach((category, index) => {
    const key = keys[index];
    const tr = document.createElement('tr');
    if (category && category.id) { 
    tr.innerHTML = `
        <td >${category.id  }</td>
        <td>${category.name}</td>
        <td>
            <button id="" class="btn-edit-category btn btn-primary" data-toggle="modal"
            data-target="#editCategoryModal" data-category-id="${key}" data-id="${category.id}">Sửa</button>
            <button class="btn-delete-category btn btn-danger"  data-category-id="${key}">Xóa</button>
        </td>
    `;
    
    tbody.appendChild(tr);
    
    }else{
        console.log("lỗi");
    }
    }); 
    const editButtons = document.querySelectorAll(`button.btn-edit-category.btn.btn-primary`);
    console.log(editButtons);
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', async function () {
            const categoryId = editButton.getAttribute('data-category-id');
            const idData = editButton.getAttribute('data-id');
            console.log('CategoryId:', categoryId);

            // Lấy thông tin của danh mục   
            const category = await fetchCategory(categoryId);

            // Điền thông tin của danh mục vào form sửa
            const editForm = document.getElementById('editCategoryForm');
            editForm.querySelector('#categoryName').value = category.name;

            // Lắng nghe sự kiện gửi form sửa
            editForm.addEventListener('submit', async function (event) {
                event.preventDefault();

                // Lấy thông tin mới từ form
                const newName = editForm.querySelector('#categoryName').value;

                // Gửi yêu cầu cập nhật danh mục lên server
                try {
                    const response = await axios.put(`${BASE_URL}/categories/${categoryId}.json`, {
                        id: idData,
                        name: newName,
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
    const addForm = document.getElementById('addCategoryForm');
    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Lấy thông tin từ biểu mẫu
        const categoryName = addForm.querySelector('#categoryName').value;

        try {
            // Tạo đối tượng danh mục mới với id mới và tên được nhập từ form
            const newCategory = {
                id: categoriesArray.length + 1,
                name: categoryName
            };

            // Gửi yêu cầu thêm danh mục mới vào Firebase
            const response = await axios.post(`${BASE_URL}/categories.json`, newCategory);
            console.log('Danh mục mới đã được thêm vào Firebase:', response.data);

            // Đóng modal sau khi thêm thành công
            $('#addCategoryModal').modal('hide');
            // Ví dụ: có thể reload lại trang để hiển thị danh sách danh mục mới
            location.reload();
        } catch (error) {
            console.error('Lỗi khi thêm danh mục mới:', error);
        }
    });
    const deleteButtons = document.querySelectorAll(`button.btn-delete-category.btn.btn-danger`);
    console.log(deleteButtons);
    deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async function () {
        const categoryId = deleteButton.getAttribute('data-category-id');
        console.log('CategoryId:', categoryId);
        await deleteCategory(categoryId);
        location.reload();
    });
});
});

