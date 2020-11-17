const getUser = async () => {
  try {
    const request = await fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization:
          'Bearer 707d489fc492967dbbcb80c95d6ed5c41479cc21'
      },
      body: JSON.stringify({
        query: '{ viewer { name avatarUrl bio login }}'
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
}

getUser();
