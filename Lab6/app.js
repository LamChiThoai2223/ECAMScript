const BASE_URL = 'https://asmecmascript-71a25-default-rtdb.asia-southeast1.firebasedatabase.app';
const getProducts = async () => {
    try {
        const resp = await axios.get(`${BASE_URL}/products.json`);
    } catch (err) {
        console.log(err);
    }
};
const getCategories = async () => {
    try {
        const resp = await axios.get(`${BASE_URL}/categories.json`);
    } catch (err) {
        console.log('lỗi hiển thị danh mục', err.message);
    }
};
const renderProduct = async () => {
    try {
        const productsResponse = await axios.get(`${BASE_URL}/products.json`);
        const products = productsResponse.data;

        const categoriesResponse = await axios.get(`${BASE_URL}/categories.json`);
        const categories = categoriesResponse.data;

        const tableBody = document.getElementById('listProduct');
        const productCategory = document.getElementById('productCategory');
        tableBody.innerHTML = '';
        productCategory.innerHTML = `
                        <option value="" disabled selected>Vui lòng chọn danh mục sản phẩm...</option>
                    `;
        categories.forEach(category => {
            productCategory.innerHTML += `
                            <option value="${category.id}">${category.name}</option>
                        `;
        });
        const productsArray = Object.values(products);
        productsArray.forEach(product => {
            const category = categories.find(cat => cat.id === product.cate_id);
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${BASE_URL}/products.json/${product.image}</td>
                        <td>${category ? category.name : 'N/A'}</td>
                        <td>${product.price}</td>
                        <td>
                            <div>
                            <a href="" class="btn-edit-product btn btn-primary" data-toggle="modal"
                            data-target="#editProductModal" data-product-id="${product.id}">Sửa</a>
                            <a href="" class="btn-delete-product btn btn-danger"  data-product-id="${product.id}">Xóa</a>
                            </div>
                        </td>
                        `;
            tableBody.appendChild(row);
        });

    } catch (err) {
                
    }
}
const renderCategory = async () => {
    try {
        const categoriesResponse = await axios.get(`${BASE_URL}/categories.json`);
        const categories = categoriesResponse.data;
        const tableBody = document.getElementById('listCategories');
        tableBody.innerHTML = '';
        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                        <div>
                        <a href="" class="btn-edit-category btn btn-primary" data-toggle="modal"
                            data-target="#editCategoryModal" data-category-id="${category.id}">Sửa</a>
                        <a href=""class="btn-delete-category btn btn-danger" data-category-id="${category.id}">Xóa</a>
                        </div>
                        </td>
                        `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.log('Lỗi');
    }
}
// Lấy tên file ảnh
const getFileNameFromPath = (filePath) => {
    const match = filePath.match(/[^\\\/]+$/);
    return match ? match[0] : null;
};
//===================
const addProduct = async () => {
    try {
        const productName = document.getElementById('productName').value;
        const productImage = document.getElementById('productImage').value;
        const productCategory = document.getElementById('productCategory').value;
        const productPrice = document.getElementById('productPrice').value;
        let lastProductId = 0;
        const productsResponse = await axios.get(`${BASE_URL}/products.json`);
        const productsArray = Object.values(productsResponse.data);
        for (const product of productsArray) {
            lastProductId = Math.max(lastProductId, product.id);
        }
        const newProductId = lastProductId + 1;
        const imageName = getFileNameFromPath(productImage);
        const newProduct = {
            id: newProductId,
            name: productName,
            image: imageName,
            cate_id: parseInt(productCategory),
            price: productPrice,
        };
        const resp = await axios.post(`${BASE_URL}/products.json`, newProduct);
        return resp.data;
    } catch (err) {
        console.log('Lỗi thêm sản phẩm', err.message);
    }
};
// add  products
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const addedProduct = await addProduct();
    alert('Sản phẩm đã được thêm', addedProduct);
    await renderProduct();
});

// add Category
const addCategory = async () => {
    try {
        const categoryName = document.getElementById('categoryName').value;
        const newCategory = {
            name: categoryName,
        };
        const resp = await axios.post(`${BASE_URL}/categories.json`, newCategory);
        return resp.data;
    } catch (err) {
        alert('Lỗi thêm danh mục', err.message);
    }
}
document.getElementById('addCategoryForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const addedCategory = await addCategory();
    alert('Danh mục sản phẩm đã thêm', addedCategory);
    await renderCategory();
})
// ====================Edit product=======================
// Thêm sự event click
const addEditProductEventListeners = () => {
    const editButtons = document.querySelectorAll('a.btn-edit-product.btn.btn-primary');
    console.log(editButtons)
    editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.productId;
            await populateEditForm(productId);
        });
    });
};
// Lấy thông tin dụa trên id
const getProductById = async (productId) => {
    try {
        const resp = await axios.get(`${BASE_URL}/products.json/${productId}`);
        return resp.data;
    } catch (err) {
        console.log('Lỗi lấy dữ liệu theo id sản phẩm', err);
    }
}
// Hiển thị ra sản phẩm theo id
const populateEditForm = async (productId) => {
    try {
        const productIdInt = parseInt(productId);
        const product = await getProductById(productIdInt);
        if (product) {
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductImageName').textContent = product.image;
            document.getElementById('editProductCategory').value = product.cate_id;
            document.getElementById('editProductPrice').value = product.price;
        } else {
            console.log('không tìm thấy');
        }
    } catch (err) {
        console.log('lỗi', err);
    }
};
//================Cập nhật sản phẩm==================
const updateProduct = async (productId, updatedProduct) => {
    try {
        const resp = await axios.put(`${BASE_URL}/products.json/${productId}`, updatedProduct);
        return resp.data;
    } catch (err) {
        console.log('lỗi cập nhật sản phẩm', err.message);
    }
};
document.getElementById('editProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = document.getElementById('editProductId').value;
    const productCategory = document.getElementById('editProductCategory').value;
    const productImage = document.getElementById('editProductImage').value;
    const imageName = getFileNameFromPath(productImage);
    const updatedProduct = {
        name: document.getElementById('editProductName').value,
        image: imageName !== null ? imageName : document.getElementById('editProductImageName').textContent,
        cate_id: parseInt(productCategory),
        price: document.getElementById('editProductPrice').value,
    };
    try {
        const updatedProductData = await updateProduct(productId, updatedProduct);
        console.log('Sản phẩm đã được cập nhật:', updatedProductData);
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
});
// ========================Edit category=========================
// thêm sự kiện click
const addEditCategoryEventListeners = () => {
    const editButtons = document.querySelectorAll('a.btn-edit-category.btn.btn-primary');
    console.log(editButtons)
    editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const categoryId = event.target.dataset.categoryId;
            await populateEditFormCategory(categoryId);
        });
    });
};
// Lấy id category
const getCategoryById = async (categoryId) => {
    try {
        const resp = await axios.get(`${BASE_URL}/categories.json/${categoryId}`);
        return resp.data;
    } catch (err) {
        console.log('Lỗi lấy dữ liệu theo id sản phẩm', err);
    }
}
// Hiển thị ra sản phẩm theo id
const populateEditFormCategory = async (categoryId) => {
    try {
        const categoryIdInt = parseInt(categoryId);
        const category = await getCategoryById(categoryIdInt);
        if (category) {
            document.getElementById('editCategoryId').value = category.id;
            document.getElementById('editCategoryName').value = category.name;
        } else {
            console.log('không tìm thấy');
        }
    } catch (err) {
        console.log('lỗi', err);
    }
};
// ====================Cập nhật Category======================
const updateCategories = async (categoryId, updatedCategory) => {
    try {
        const resp = await axios.put(`${BASE_URL}/categories.json/${categoryId}`, updatedCategory);
        return resp.data;
    } catch (err) {
        console.log('lỗi cập nhật danh mục', err.message);
    }
};
document.getElementById('editCategoryForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const categoryId = document.getElementById('editCategoryId').value;
    const categoryName = document.getElementById('editCategoryName').value;
    const updatedCategory = {
        name: categoryName,
    };
    try {
        const updatedData = await updateCategories(categoryId, updatedCategory);
        console.log('Sản phẩm đã được cập nhật:', updatedData);
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
});
// ======================Xóa sản phẩm======================================
// Thêm sự event click
const deleteProductEventListeners = () => {
    const deleteButtons = document.querySelectorAll('a.btn-delete-product.btn.btn-danger');
    console.log(deleteButtons);
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.productId;
            const confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
            if (confirmation) {
                await deleteCategories(productId);
                await renderCategory();
            }
        });
    });
};
const deleteProduct = async (productId) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/products.json/${productId}`);
        return resp.data;
    } catch (err) {
        console.log('lỗi xóa sản phẩm', err.message);
    }
};
// ======================Xóa Danh mục======================================
// Thêm sự event click
const deleteCategoryEventListeners = () => {
    const deleteButtons = document.querySelectorAll('a.btn-delete-category.btn.btn-danger');
    console.log(deleteButtons);
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const categoryId = event.target.dataset.categoryId;
            const confirmation = confirm("Bạn có chắc chắn muốn xóa danh mục này?");
            if (confirmation) {
                await deleteCategories(categoryId);
                await renderCategory();
            }
        });
    });
};
const deleteCategories = async (categoryId) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/categories.json/${categoryId}`);
        return resp.data;
    } catch (err) {
        console.log('lỗi xóa danh mục', err.message);
    }
};
//  lấy danh mục
const categoriesResponse = await axios.get(`${BASE_URL}/categories.json`);
const categories = categoriesResponse.data;
const editProductCategory = document.getElementById('editProductCategory');
editProductCategory.innerHTML = `
                        <option value="" disabled selected>Vui lòng chọn danh mục sản phẩm...</option>
                    `;
categories.forEach(category => {
    editProductCategory.innerHTML += `
                            <option value="${category.id}">${category.name}</option>
                        `;
});

const loadData = async () => {
    try {
        await getProducts();
        await getCategories();
        await renderProduct();
        await renderCategory();
        await addEditProductEventListeners();
        await addEditCategoryEventListeners();
        await deleteProductEventListeners();
        await deleteCategoryEventListeners();
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
};

loadData();