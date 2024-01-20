function includeHTML(targetId, fileName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.innerHTML = this.responseText;
            }
        }
    };
    xhttp.open("GET", fileName, true);
    xhttp.send();
}

includeHTML("header", "header.html");
includeHTML("footer", "footer.html");
includeHTML("top", "banner.html");
includeHTML("products-main", "product-main.html");