
//signIn//
// 입력 없으면 표시 현재 구현 안됨


window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');

    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);


async function handleSignIn() {
   
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
        // const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });

    const response_json = await response.json();

  

    localStorage.setItem("access", response_json.access); //로컬스토리지에 access 토큰 저장
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1]; // access토큰의 두번째 요소인 Payload 정보만 취함
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload); // Payload를 로컬스토리지에 저장

    window.location.href="http://127.0.0.1:5500/main.html"

};



async function handleMock() {
    // const response = await fetch('http://127.0.0.1:8000/users/mock/', {
    const response = await fetch('http://127.0.0.1:8000/users/mock/', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}

async function go_Signup() {
    move_page('signlog.html');
}

function move_page(page) {
    window.location.href = page
}

async function handleSocial() {
    
    window.location.href="http://127.0.0.1:5500/main.html"


}


//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//signUp//
// 입력 없으면 표시 
window.onload = () => {
   
}

async function check_value() {
    const forms = document.getElementsByClassName('validation-form');
    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}


async function handleSignUp() {
    const username = document.getElementById("username2").value
    const password = document.getElementById("password2").value
    const email = document.getElementById("email2").value
    
    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password,
            "email" : email
        })
    });

}
