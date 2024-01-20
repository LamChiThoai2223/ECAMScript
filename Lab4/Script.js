fetch('https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students')
    .then((response) => {
        response.json()
            .then((data) => {
               let apiHtml = document.getElementById('tableBody');
               console.log(data);
               data.forEach(function(student) {
                let html = `
                    <tr id="row_${student.id}">    
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td><img src="${student.avatar}" alt=""></td>
                        <td>${student.createdAt}</td>
                        <td><button onclick="toggleVisibility(${student.id})">Hide 10s</button></td>
                    </tr>`;
                apiHtml.innerHTML += html;
            });
            });
    })
    .catch((error) => {
        console.log(error);
    })
    function toggleVisibility(studentId) {
        let row = document.getElementById(`row_${studentId}`);
        row.style.display = 'none';

        setTimeout(() => {
            row.style.display = 'table-row';
        }, 10000);
    }
