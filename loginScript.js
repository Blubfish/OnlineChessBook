window.Login = () => {
    const username = document.getElementById("username").value
    localStorage.setItem('username', username);
    loginUser(username)
    setTimeout(function(){
        window.location.href = "mainScreen.html";
    }, 1000);
   
}
