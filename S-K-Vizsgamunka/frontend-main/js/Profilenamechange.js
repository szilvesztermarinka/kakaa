const editUsername = document.getElementsByClassName('btnUsernamechange')[0];

editUsername.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents page reload
    editProfileName();
});


async function editProfileName() {
    const username = document.getElementById('username').value;
    const username2 = document.getElementById('username2').value;

  
    if (username !== username2) {
        return alert('A két felhasználónév nem egyezik!');
    }

    const res = await fetch('http://127.0.0.1:3000/api/editProfileUsername', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({ username })
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message || 'Sikeres felhasználónév válzoztatás!');
        window.location.href = '../html/Profile.html';
    } else {
        alert(data.error);
    }
}


