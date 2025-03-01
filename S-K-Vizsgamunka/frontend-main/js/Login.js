const btnlogin = document.querySelector('.login');

btnlogin.addEventListener("click", login);

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log(email, password);

  const res = await fetch('http://127.0.0.1:3000/api/Login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'  // Include cookies for authentication
  });

  const data = await res.json();
  if (res.ok) {
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
  

    alert("Sikeres bejelentkezés!");
    window.location.href = '../html/Home.html'; // Redirect to profile
  } else if (data.errors) {
    let errorMessage = '';
    for (let i = 0; i < data.errors.length; i++) {
      errorMessage += `${data.errors[i].error}\n`;
    }
    alert(errorMessage);
  } else if (data.error) {
    alert(data.error);
  } else {
    alert('Ismeretlen hiba');
  }
}

// Remember Me Functionality
const rmCheck = document.getElementById("rememberMe"),
  emailInput = document.getElementById("email");

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rmCheck.setAttribute("checked", "checked");
  emailInput.value = localStorage.username;
} else {
  rmCheck.removeAttribute("checked");
  emailInput.value = "";
}

function lsRememberMe() {
  if (rmCheck.checked && emailInput.value !== "") {
    localStorage.username = emailInput.value;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}
