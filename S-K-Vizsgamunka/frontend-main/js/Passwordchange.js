const editPassword = document.getElementsByClassName('btnpswchange')[0];

editPassword.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents page reload
    editProfilePassword();
});

//password change
async function editProfilePassword() {
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    //console.log(psw, psw2);
    if (password !== password2) {
        return alert('A két jelszó nem egyezik!');
    }

    const res = await fetch('http://127.0.0.1:3000/api/editProfilePassword', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({ password })
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) {
        alert(data.message || 'Sikeres jelszo valtoztatas');
        logout();
    } else {
        alert(data.error);
    }
}

async function logout() {
    const res = await fetch('http://127.0.0.1:3000/api/Logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message);
        window.location.href = '../html/Login.html';
    } else {
        alert('Hiba a kijelentkezéskor');
    }
}

