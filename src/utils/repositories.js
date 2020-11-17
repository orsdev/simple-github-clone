const queryTag =
  '{' +
  'viewer {' +
  'repositories(first: 20, orderBy:{field: UPDATED_AT, direction: DESC}) {' +
  'totalCount,' +
  'nodes {' +
  'name,' +
  'updatedAt,' +
  'description,' +
  'url,' +
  'primaryLanguage {' +
  'name,' +
  'color' +
  '}' +
  'stargazers {' +
  'totalCount' +
  '},' +
  'forkCount,' +
  'parent {' +
  'forkCount' +
  '}' +
  '}' +
  '}' +
  '}' +
  '}';

const getRepositories = async () => {
  try {
    const request = await fetch('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: process.env.GITHUB_TOKEN
      },
      body: JSON.stringify({ query: queryTag })
    });

    const response = await request.json();

    // extract repositories from response(destruct)
    const {
      data: {
        viewer: { repositories }
      }
    } = response;

    loadRepositories(repositories);
  } catch (e) {
    console.log('something went wrong', e);
  }
};

function loadRepositories({ totalCount, nodes }) {
  // get dom elements
  const badge = document.getElementById('badge');
  const result = document.getElementById('result');
  const totalRepo = document.getElementById('total-repo');

  badge.textContent = totalCount;
  totalRepo.textContent = `${totalCount} results for public repositories`;
  let html = '';
  nodes.map((node) => {
    html += `
      <div class="main--content-repositories-item">
          <div class="repository--header">
            <a href=${
              node.url
            } target="_blank" class="main--content-repositories-item-name">${
      node.name
    }</a>
            <p class="main--content-repositories-item-about">
             ${node.description ? node.description : ''}
            <div class="repository--header-footer">
              <p class="main--content-repositories-item-lang">
                <span class="main--content-repositories-item-lang-icon" style="background: ${
                  node.primaryLanguage.color
                };"></span>
                ${node.primaryLanguage.name}
              </p>
              <p class="main--content-repositories-item-star">
              ${
                node.stargazers && node.stargazers.totalCount > 0
                  ? `<i class="fa fa-star-o main--content-repositories-item-star-icon" aria-hidden="true"></i> ${node.stargazers.totalCount}`
                  : ''
              }
              </p>
              <p class="main--content-repositories-item-fork">

     ${
       node.parent
         ? `<i class="fa fa-code-fork main--content-repositories-item-fork-icon" aria-hidden="true"></i> ${node.parent.forkCount}`
         : ''
     }
     ${
       !node.parent && node.forkCount > 0
         ? `<i class="fa fa-code-fork main--content-repositories-item-fork-icon" aria-hidden="true"></i> ${node.forkCount}`
         : ''
     }
              </p>
              <p class="main--content-repositories-item-update">
              Updated on
               ${new Date(node.updatedAt).toLocaleString('default', {
                 month: 'short'
               })}
               ${new Date(node.updatedAt).getDate()}
              </p>
            </div>
          </div>
          <div class="repository--star">
            <button class="repository--star-btn">
     <i class="fa fa-star-o repository--star-btn-icon" aria-hidden="true"></i>
              Star
            </button>
          </div>
        </div>
  `;
  });

  result.innerHTML = html;
}

getRepositories();
