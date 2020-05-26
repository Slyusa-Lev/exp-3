let form = document.querySelector('.project-from-git');
let buttonGetUserProject = form.querySelector('.button-get-user-project');
let textArea = document.querySelector('.text-area');
let inputName = form.querySelector('.input-name');


const getProjectByName = (userName) => {
  return new Promise((resolve, reject) => {
    const user = fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(profile => {
        if (profile.message) {
          textArea.innerHTML = '';
          createTextP('User not found', 'not-found-message');
          reject();
        }
        fetch(profile.repos_url)
          .then(response => response.json())
          .then(repos => {
            let reposArr = [];
            for (let i = 0; i < repos.length; i++) {
              reposArr.push(repos[i].name);
            }
            resolve(reposArr)
      });
    });
  })
}

let createTextP = function(text, className) {
	let message = document.createElement('p');
  var newMessage;
	newMessage = message.cloneNode(true);
	newMessage.textContent = text;
  if (className) newMessage.classList.add(className);
	textArea.appendChild(newMessage);
}

buttonGetUserProject.addEventListener('click', function() {
  textArea.innerHTML = '';
  createTextP('Loading...');
  let nameValue = inputName.value;
  getProjectByName(nameValue).then( reposArr => {
    textArea.innerHTML = '';
    if (reposArr.length == 0)  {
      createTextP('User do not have repository');
    } else {
      createTextP(reposArr);
    }
  })
})

// https://api.github.com/users/Slyusa-Lev
