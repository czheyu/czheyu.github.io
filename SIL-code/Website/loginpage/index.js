var url = "https://czheyuchatapp.onrender.com";
//url ="https://9f385a7a-d4b2-4c35-b8fc-9937e0c39c58-00-zrl36mrg5918.picard.replit.dev:3001";

function submit() {
  const loadingPlaceholder = document.getElementById("loadingPlaceholder");

  loadingPlaceholder.innerHTML = 
    `<div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div>`;
  
  console.log("submit clicked");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const apiUrl = url + "/api/login";
  const data = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log("starting to fetch")
    fetch(apiUrl, requestOptions)
    .then((response) => {
      console.log("fetched")
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.result)
      if (data.result == "success") {
        const loadingPlaceholder = document.getElementById("loadingPlaceholder");

        loadingPlaceholder.innerHTML = 
          ``;

        localStorage.setItem("loggedin", true);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        
        appendAlert("Login Success, redirecting to chat page in 5 seconds.", "success");
        sleep(5000);
        window.location.href = url + "/chatlist";
      } else if (data.result == "failed") {

        const loadingPlaceholder = document.getElementById("loadingPlaceholder");

        loadingPlaceholder.innerHTML = 
          ``;
        appendAlert("Username or password is incorrect.", "danger");
      }
    });
    
  enableAll();


  loadingPlaceholder.innerHTML = 
    ``;
}

function disableAll() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const submit = document.getElementById("submit");
  username.disabled = true;
  password.disabled = true;
  submit.disabled = true;
}

function enableAll() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const submit = document.getElementById("submit");
  username.disabled = false;
  password.disabled = false;
  submit.disabled = false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function appendAlert(message, type){
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '     <button type="button" onclick="this.parentNode.remove();" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

window.onload = function () {

  const sendbutton = document.getElementById("submit");

  const usernamebox = document.getElementById("username");
const passwordbox = document.getElementById("password");
usernamebox.value = localStorage.getItem("username");
passwordbox.value = localStorage.getItem("password");
sendbutton.onclick = function () {
if (
      document.getElementById("username").value &&
      document.getElementById("password").value
    ) {

      disableAll();
      submit();
    } else {
      console.log("user or pass empty");
    }
  };
  const register = document.getElementById("register");
  register.onclick = function () {
    window.location.href = url + "/chat/register";
  };

  //for alerts

};
