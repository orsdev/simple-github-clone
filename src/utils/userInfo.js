const getUser = async () => {
  try {
    const request = await fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: process.env.GITHUB_TOKEN
      },
      body: JSON.stringify({
        query:
          '{ viewer { name avatarUrl bio login status { message } }}'
      })
    });

    const response = await request.json();

    // extract viewer from response(destruct)
    const {
      data: { viewer }
    } = response;

    // call function
    loadUserInfo(viewer);
  } catch (e) {
    console.log('something went wrong');
  }
};

function loadUserInfo(data) {
  // get dom elements
  const imgTags = document.querySelectorAll('.avatar--pic');
  const name = document.querySelector('.name');
  const fullname = document.getElementById('fullname');
  const username = document.getElementById('username');
  const about = document.getElementById('about');
  const status = document.getElementById('status');

  //  convert imgTags dom elements to array
  const toArray = Array.from(imgTags);
  toArray.map((img) => {
    img.src = data.avatarUrl;
    img.alt = data.login;
  });

  fullname.textContent = data.name;
  name.textContent = data.name;
  username.textContent = data.login;
  about.textContent = data.bio;

  if (data.status) {
    status.textContent = data.status.message;
  }
}

getUser();
