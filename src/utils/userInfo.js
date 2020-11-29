const queryTag = `
          query { 
              viewer { 
                name 
                avatarUrl 
                bio 
                login 
                status {
                  message
                }
                following {
                  totalCount
                }
                followers {
                  totalCount
                }
                starredRepositories{
                  totalCount
                } 
              }
          }`;

const getUser = async () => {
  try {
    const request = await fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: process.env.GITHUB_TOKEN
      },
      body: JSON.stringify({ query: queryTag })
    });

    const response = await request.json();

    // extract viewer from response(destruct)
    const {
      data: { viewer }
    } = response;

    // call function
    loadUserInfo(viewer);
  } catch (e) {
    console.log('something went wrong', e);
  }
};

function loadUserInfo(data) {
  renderHtml(data);
}

function renderHtml(data) {
  const headerimg = document.querySelector('.avatar--pic');
  const asideContainer = document.querySelector('.main--aside-container');

  headerimg.src = data.avatarUrl;
  headerimg.alt = data.login;

  const html = `
      <div class="main--aside-user">
        <img src=${data.avatarUrl} alt=${data.login} class="avatar--large-pic">
      </div>
      <div class="main--aside-name">
        <h2 class="main--aside-fullname" id="fullname">${data.name}</h2>
        <p class="main--aside-username" id="username">${data.login}</p>
      </div>
      <p class="main--aside-status" id="status">${data.status.message}</p>
      <p class="main--aside-about" id="about">${data.bio}</p>
      <button type="button" role="button">Edit profile</button>
      <div class="main--aside-footer">
        <div class="followers">
        <img src="https://res.cloudinary.com/osdev/image/upload/v1606611846/github/follower_ek9uzc.svg" alt="follower">
        <span class="followers--count">${data.followers.totalCount}</span>
        <span class="followers--text">followers</span>
        </div>
        <div class="following">
        <span class="following--count">${data.following.totalCount}</span>
        <span class="following--text">following</span>
        </div>
        <div class="stargazzers">
        <img src="https://res.cloudinary.com/osdev/image/upload/v1606463789/github/star_jjg6rw.svg" alt="stargazzers">
        <span class="stargazzers--count">${data.starredRepositories.totalCount}</span>
        </div>
      </div>
  `;

  asideContainer.innerHTML = html;
}

getUser();
