// apiLoader.js
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function loadHeader() {
  try {
    const headerHtml = await fetchData('../client/header.html');
    document.getElementById('header').innerHTML = headerHtml;
  } catch (error) {
    console.error('Error loading header:', error);
  }
}

async function loadFooter() {
  try {
    const footerHtml = await fetchData('../client/footer.html');
    document.getElementById('footer').innerHTML = footerHtml;
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}
  async function loadBanner() {
    try {
      const bannerHtml = await fetchData('../client/banner.html');
      document.getElementById('top').innerHTML = bannerHtml;
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
  // async function loadProduct() {
  //   try {
  //     const bannerHtml = await fetchData('/client/product-main.html');
  //     document.getElementById('products-main').innerHTML = bannerHtml;
  //   } catch (error) {
  //     console.error('Error loading footer:', error);
  //   }
  // }
  export { loadHeader, loadFooter, loadBanner};

  