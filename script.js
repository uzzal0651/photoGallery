const nav = document.getElementById("nav");
const content = document.getElementById("content");
const closeModal = document.querySelector(".btn-close");
console.log(closeModal);

let pageIndex = 0;
let itemsPerPage = 4;

//

loadItems();

function loadItems() {
  content.innerHTML = "";

  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataInfo) {
      console.log(dataInfo);
      for (
        let i = pageIndex * itemsPerPage;
        i < pageIndex * itemsPerPage + itemsPerPage;
        i++
      ) {
        //
        const item = document.createElement("div");
        const overlay = document.querySelector(".overlay");
        const modal = document.querySelector(".modal");
        let modalImgMain = document.querySelector("#modalImg");
        console.log(modalImgMain);

        item.addEventListener("click", (e) => {
          modalImg = e.target.src;

          console.log(modalImg);

          modalImgMain.src = modalImg;
          console.log(modalImgMain);
          modal.classList.remove("hidden");
          overlay.classList.remove("hidden");
        });

        closeModal.addEventListener("click", () => {
          //alert("close");
          modal.classList.add("hidden");
          overlay.classList.add("hidden");
        });
        item.innerHTML = `
        <section class="modal hidden">
          
          <img id ="modalImg" src="${dataInfo[i].src}"/>
       </section>
            <div>
                <img src="${dataInfo[i].src}"/>
            </div>
            <div>
                <span>${dataInfo[i].desc}</span>
            </div>
            `;
        content.append(item);
      }
    });

  loadPageNav();
}

//
function loadPageNav() {
  nav.innerHTML = "";
  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataInfo) {
      console.log(dataInfo);
      for (let i = 0; i < dataInfo.length / itemsPerPage; i++) {
        const span = document.createElement("span");
        span.innerHTML = i + 1;
        span.addEventListener("click", (e) => {
          pageIndex = e.target.innerHTML - 1;
          loadItems();
        });
        if (i === pageIndex) {
          span.style.background = "#00FFFF";
        }
        nav.append(span);
      }
    });
}
