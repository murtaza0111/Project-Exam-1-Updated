const displayPostsSection = document.getElementById("blogPosts");

// 3
function display(data) {
  displayPostsSection.innerHTML = "";
  
  document.title = `${data.title} | BLOG DETAILS | BLOG | FLOWER POWER`
      displayPostsSection.innerHTML += `
          <div class="card">
            <div class="card-header">
              <div class="card-img">
                <img src="${data.image}" alt="${data.title}"/>
              </div>
            </div>
  
            <div class="card-body">
              <div class="card-body-title">
                <h3>${data.title}</h3>  
              </div>
              <div class="card-body-description">
                <p>${data.description}</p>
              </div>
            </div>
  
            <div class="card-footer">
              <div class="card-footer-date">
                <p>${data.date}</p>
              </div>
              <div class="card-footer-author">
              <span>${data.author}</span>
              </div>
            </div>  
          </div>
        `;
}
// 2
async function getData(id) {
  try {
    displayPostsSection.innerHTML = "<h2 style='font-size:4rem;'>Loading...</h2>"
    const response = await fetch(
      `https://flowerpower.seedtotree.info/flowerpower/wp-json/wc/store/products/${id}`
    );
    if(response.status === 200) {
      return await response.json();
    }else{
      location.href ="index.html"
    }

  } catch (error) {}
}
// 2
function addPosts(data) {
  let singleProduct = {};
  if (data) {
    
    singleProduct = {
        id: data.id,
        title: data.name,
        description: data.description,
        date: "24-5-2021",
        author: "Murtaza Mehmood",
        image: data.images[0].src,
      }
    return singleProduct;
  }
  return [];
}
// 1
async function BLOGDETAILS() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postId = urlParams.get("id");
  const postIdType = parseInt(postId);
  if (postIdType < 0) {
    location.href = "index.html";
  }

  let data = await getData(postId);
  let postDetails = await addPosts(data)
  if (postDetails) {
    display(postDetails);
  } else {
    location.href = "index.html";
  }
}
BLOGDETAILS();
