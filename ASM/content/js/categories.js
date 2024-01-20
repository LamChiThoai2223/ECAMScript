fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const listProduct = (categoryId) => {
      const categories = data.categories;
      for (const categoryIdKey in categories) {
        const category = categories[categoryIdKey];
        if (category.id === categoryId) {
            const productListContainer = document.getElementById(`cate${categoryId}`);
            if (productListContainer) {
              productListContainer.innerHTML = `
                <h2 class="text text-center">${category.name}</h2>
              `;
            } else {
              console.error(`Phần tử với id 'cate${categoryId}' không tồn tại.`);
            }
        }
      }
    }

    listProduct(1);
    listProduct(2);
    listProduct(3);
  })
  // .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  //   const idtest = document.getElementById(`cate_id`);
  //             if (idtest) {
  //               productListContainer.innerHTML = `
  //                 <h2 class="text text-center">${category.name}</h2>
  //               `;
  //             } else {
  //               console.error(`Phần tử với id '${idtest}' không tồn tại.`);
  //             }
