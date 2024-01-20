export async function loadHeader() {
    try {
        const response = await fetch('../client/header.html');
        const html = await response.text();
        document.querySelector('header').innerHTML = html;
    } catch (error) {
        console.error('Error loading header:', error);
    }
}