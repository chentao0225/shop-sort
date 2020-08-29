~(function () {
  //原生ajax

  let data = null,
    xhr = new XMLHttpRequest();
  xhr.open("get", "../json/product.json", false);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = xhr.responseText;
    }
  };
  xhr.send();
  data = JSON.parse(data);
  //   console.log(data);
  let htmlStr = ``;
  data.forEach(({ hot, img, price, time, title }) => {
    htmlStr += `
<div class="card" data-hot="${hot}" data-price="${price}" data-time="${time}">
        <img src="${img}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
          ${title}
          </h5>
          <p class="card-text">
          价格：￥${price}
          </p>
          <p class="card-text">
            好评：${hot}
          </p>
          <p class="card-text">
            上架时间：${time}
          </p>
        </div>
      </div>
  `;
  });
  let cardList = document.querySelector(".cardList");
  cardList.innerHTML = htmlStr;
  let cards = document.querySelectorAll(".card");
  let navList = document.querySelectorAll(".navbar-nav li");
  navList.forEach((item) => {
    item["flag"] = -1;
    item.onclick = function () {
      [].forEach.call(navList, (item) =>
        item === this ? (this["flag"] *= -1) : (item["flag"] = -1)
      );
      let pai = this.getAttribute("data-pai");
      cards = [].slice.call(cards, 0);
      cards.sort((a, b) => {
        a = a.getAttribute(pai);
        b = b.getAttribute(pai);
        if (pai === "data-time") {
          a = a.replace(/-/g, "");
          b = b.replace(/-/g, "");
        }
        return (a - b) * this["flag"];
      });
      cards.forEach((item) => cardList.appendChild(item));
    };
  });
})();
