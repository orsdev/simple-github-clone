import {lastUpdated} from './lastUpdated';

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

  badge.textContent = totalCount;
  let html = `<h4 class="main--content-repositories-result" id="total-repo">${totalCount} results for public repositories</h4>`;
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
              ${
                node.stargazers && node.stargazers.totalCount > 0
                  ? ` <p class="main--content-repositories-item-star">
                   <i class="fa fa-star-o main--content-repositories-item-star-icon" aria-hidden="true"></i> ${node.stargazers.totalCount} </p>`
                  : ''
              }
             
             ${
               node.parent
                 ? `<p class="main--content-repositories-item-fork">
            <i class="fa fa-code-fork main--content-repositories-item-fork-icon" aria-hidden="true"></i> ${node.parent.forkCount} </p>`
                 : ''
             }
           ${
             !node.parent && node.forkCount > 0
               ? `<p class="main--content-repositories-item-fork"><i class="fa fa-code-fork main--content-repositories-item-fork-icon" aria-hidden="true"></i> ${node.forkCount}</p>`
               : ''
           }
              <p class="main--content-repositories-item-update">
               ${lastUpdated(node.updatedAt)}
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
