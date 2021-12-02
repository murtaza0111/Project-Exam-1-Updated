const POSTS = [];
let start = 0;
let end = 0;
const displayPostsSection = document.getElementById("blogPosts");

// 4
function display(data, start, end) {
  displayPostsSection.innerHTML = "";
  let descriptionArray = []
  data.map((v, i) => {
    if (i >= start && i <= end) {
      descriptionArray = v.description.split(" ")
      displayPostsSection.innerHTML += `
          <div class="card">
            <div class="card-header">
              <div class="card-img">
                <img src="${v.image}" alt="${v.title}"/>
              </div>
            </div>
  
            <div class="card-body">
              <div class="card-body-title">
                <h3>${v.title}</h3> <span>${v.author}</span> 
              </div>
              <div class="card-body-description">
              <p>${descriptionArray[0]} ${descriptionArray[1]} ${descriptionArray[2]} ${descriptionArray[3]}...</p>
              </div>
            </div>
  
            <div class="card-footer">
              <div class="card-footer-date">
                <p>${v.date}</p>
              </div>
              <div class="card-footer-author">
                <a href="blogDetails.html?id=${v.id}">Read More</a>   
              </div>
            </div>  
          </div>
        `;
    }
  });
}
// 3
async function addPosts(data) {
  let singleProduct = {};
  if (data) {
    data.map((v) => {
      singleProduct = {
        id: v.id,
        title: v.name,
        description: v.description,
        date: "24-5-2021",
        author: "Murtaza",
        image: v.images[0].src,
      };
      POSTS.push(singleProduct);
    });
    return POSTS;
  }
  return [];
}
// 2
async function getData() {
  try {
    const response = await fetch(
      "https://flowerpower.seedtotree.info/flowerpower/wp-json/wc/store/products"
    );
    return await response.json();
  } catch (error) {}
}
// 1
async function BLOGS(){
  let data = await getData();
  let posts = await addPosts(data);
  start = 0;
  end = POSTS.length;
  display(posts, start, end);
}


BLOGS()