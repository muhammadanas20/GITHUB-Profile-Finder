
let usernameInput = document.getElementById("username-input");
let searchButton = document.getElementById("search-btn"); 
let infoBox = document.querySelector(".info-box");


usernameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && usernameInput.value.trim() !== '') {
        getData(usernameInput.value.trim());
    }
});

searchButton.addEventListener("click", () => {
    if (usernameInput.value.trim() !== '') {
        getData(usernameInput.value.trim());
    }
});

let getData = (username) => {
    let url = `https://api.github.com/users/${username}`;

    infoBox.classList.remove('show');
    infoBox.style.display = 'block'; 
    infoBox.innerHTML = `<p style="text-align: center; padding: 2rem;">Loading profile...</p>`;
    
    setTimeout(() => {
        infoBox.classList.add('show');
    }, 10);


    fetch(url)
        .then((res) => {
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('User not found');
                } else {
                    throw new Error('Could not fetch data. Try again later.');
                }
            }
            return res.json();
        })
        .then((data) => {
           
            displayUserData(data);
        })
        .catch((error) => {
           
            infoBox.innerHTML = `<p style="text-align: center; color: red; padding: 2rem;">${error.message}</p>`;
            infoBox.classList.add('show'); 
        });
};

function displayUserData(data) {
    const dateData = new Date(data.created_at).toDateString();
    const name = data.name || data.login;
    const location = data.location || "Not Available";
    const company = data.company || "Not Available";
    const bio = data.bio || "This profile has no bio";
    
   
    const twitter = data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>` : "Not Available";
    const website = data.blog ? `<a href="${data.blog}" target="_blank">${data.blog}</a>` : "Not Available";
    const linkedin = "Not Available";
 
    infoBox.innerHTML = `
        <div class="user-details">
            <div class="img-box">
                <img src="${data.avatar_url}" alt="Profile picture for ${data.login}">
            </div>
            <div class="details">
                <h3 class="name">${name}</h3>
                <h3 class="username">@${data.login}</h3>
                <span class="join-date">Joined ${dateData}</span>
            </div>
        </div>
        <p class="bio">${bio}</p>
        <div class="user-profile">
            <div class="repos">
                <h2>${data.public_repos}</h2>
                <span>Repos</span>
            </div>
            <div class="followers">
                <h2>${data.followers}</h2>
                <span>Followers</span>
            </div>
            <div class="following">
                <h2>${data.following}</h2>
                <span>Following</span>
            </div>
        </div>
        <div class="user-other-details">
            <p class_name="${!data.company ? 'not-available' : ''}">
                <i class="fa-solid fa-building"></i>
                ${company}
            </p>
            <p class_name="${!data.location ? 'not-available' : ''}">
                <i class="fa-solid fa-location-pin"></i>
                ${location}
            </p>
            <p class_name="${!data.blog ? 'not-available' : ''}">
                <i class="fa-solid fa-link"></i>
                ${website}
            </p>
            <p class_name="${!data.twitter_username ? 'not-available' : ''}">
                <i class="fa-brands fa-x-twitter"></i>
                ${twitter}
            </p>
            <p class="not-available">
                <i class="fa-brands fa-linkedin"></i>
                ${linkedin}
            </p>
        </div>`;
    
    infoBox.classList.add('show');
}

