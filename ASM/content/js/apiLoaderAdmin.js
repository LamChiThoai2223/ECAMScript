async function fetchData(url){
    try {
        const response = await fetch(url);
        return await response.text();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
}
async function loadLayout() {
    try {
      const layoutHtml = await fetchData('../layout.html');
      document.getElementById('layout').innerHTML = layoutHtml;
    } catch (error) {
      console.error('Error loading layout:', error);
    }
  }
  export{loadLayout};