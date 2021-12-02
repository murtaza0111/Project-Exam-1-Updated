const POSTS = [];
let start = 0;
let end = 0;

const displayPostsSection = document.getElementById("blogPosts");
// Carasoul Arrow Buttons
const leftTopCarasoulArrow = document.getElementById("left-top-carasoul-arrow");
const rightTopCarasoulArrow = document.getElementById(
  "right-top-carasoul-arrow"
);
const leftCarasoulArrow = document.getElementById("left-carasoul-arrow");
const rightCarasoulArrow = document.getElementById("right-carasoul-arrow");
const leftBottomCarasoulArrow = document.getElementById(
  "left-bottom-carasoul-arrow"
);
const rightBottomCarasoulArrow = document.getElementById(
  "right-bottom-carasoul-arrow"
);

// 8
function toggleCarasoulLeftPosts() {
  event.preventDefault();

  console.log(start + " " + end);
  if (start < 0) {
    start = 0;
    end = end + 3;
  } else if (start != 0 && end != 3) {
    end = start - 1;
    start = end - 3;
  }

  postsCarasoul(POSTS, start, end);
}
// 7
function toggleCarasoulRightPosts() {
  event.preventDefault();

  start = start + 4;
  end = end + 4;

  if (end > 11) {
    end = 11;
    start = end - 3;
  }

  postsCarasoul(POSTS, start, end);
}
// 6
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
                <h3>${v.title}</h3><span>${v.date}</span> 
              </div>
              <div class="card-body-description">
                <p>${descriptionArray[0]} ${descriptionArray[1]} ${descriptionArray[2]} ${descriptionArray[3]}...</p>
              </div>
            </div>
  
            <div class="card-footer">
              <div class="card-footer-date">
                
                <p>${v.author}</p> 
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
// 5
function toggleCarasoulArrows(applyTo, toggle) {
  if (applyTo === "all") {
    leftTopCarasoulArrow.style.display = toggle;
    rightTopCarasoulArrow.style.display = toggle;
    leftCarasoulArrow.style.display = toggle;
    rightCarasoulArrow.style.display = toggle;
    leftBottomCarasoulArrow.style.display = toggle;
    rightBottomCarasoulArrow.style.display = toggle;
  } else if (applyTo === "left") {
    leftTopCarasoulArrow.style.display = toggle;
    leftCarasoulArrow.style.display = toggle;
    leftBottomCarasoulArrow.style.display = toggle;
  } else if (applyTo === "right") {
    rightTopCarasoulArrow.style.display = toggle;
    rightCarasoulArrow.style.display = toggle;
    rightBottomCarasoulArrow.style.display = toggle;
  }
}
// 4
function postsCarasoul(posts, start, end) {
  let postsLength = posts.length;

  if (Object.keys(posts).length <= 0 || posts.length <= 0) {
    toggleCarasoulArrows("all", "none");
    displayPostsSection.innerHTML = `<h2 style='font-size:4rem;'>No Posts Found !!!</h2>`;
    return;
  }
  if (postsLength <= 4) {
    toggleCarasoulArrows("all", "none");
  }
  if (postsLength >= 4) {
    toggleCarasoulArrows("right", "block");
  }
  if (start <= 0 && end <= 4) {
    toggleCarasoulArrows("left", "none");
  }
  if (end >= postsLength - 1) {
    toggleCarasoulArrows("right", "none");
  }
  if (start >= 4) {
    toggleCarasoulArrows("left", "block");
  }

  // add Click Event Listners to the Carasoul Buttons
  leftTopCarasoulArrow.addEventListener("click", toggleCarasoulLeftPosts);
  rightTopCarasoulArrow.addEventListener("click", toggleCarasoulRightPosts);
  leftCarasoulArrow.addEventListener("click", toggleCarasoulLeftPosts);
  rightCarasoulArrow.addEventListener("click", toggleCarasoulRightPosts);
  leftBottomCarasoulArrow.addEventListener("click", toggleCarasoulLeftPosts);
  rightBottomCarasoulArrow.addEventListener("click", toggleCarasoulRightPosts);
  // Display Posts
  display(posts, start, end);
}
// 3
async function addPosts(data) {
  
  let singleProduct = {};
  if (data) {
    data.map((v, i) => {
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
    displayPostsSection.innerHTML = "<h2 style='font-size:4rem;'>Loading...</h2>"
    const response = await fetch(
      "https://flowerpower.seedtotree.info/flowerpower/wp-json/wc/store/products"
    );
    return await response.json();
  } catch (error) {}
}
// 1
async function HOME() {
  let data = await getData();

  let posts = await addPosts(data);
  start = 0;
  end = 3;
  postsCarasoul(posts, start, end);
}

HOME();
