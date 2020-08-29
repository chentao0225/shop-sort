~(function () {
  let data = null,
    xhr = new XMLHttpRequest();

  xhr.open("get", "../json/product.json", false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = xhr.responseText;
    }
  };
  xhr.send();
  data = JSON.parse(data);
  //   console.log(data);

  let htmlStr = ``;
  data.forEach(({ img, hot, price, time, title }) => {
    htmlStr += `
    <div class="card"
        data-time="${time}"
        data-price="${price}"
        data-hot="${hot}"
    >
        <img src=${img} class="card-img-top" alt="...">
        <div class="card-body">
            <h6 class="card-title">${title}</h6>
            <p class="card-text">价格:${price}</p>
            <p class="card-text">热度:${hot}</p>
            <p class="card-text"><small class="text-muted">上架时间:${time}</small></p>
        </div>
    </div>
    `;
  });
  let cardList = document.querySelector(".cardList");
  cardList.innerHTML = htmlStr;

  let navList = document.querySelectorAll(".navbar-nav li");
  let cards = cardList.querySelectorAll(".card");
  //   console.log(navList, cards);
  navList.forEach((item) => {
    item["flag"] = -1;
    item.onclick = function () {
      let _this = this,
        pai = _this.getAttribute("data-pai");

      navList.forEach((i) =>
        i === _this ? (_this["flag"] *= -1) : (i["flag"] = -1)
      );
      console.log(pai, _this["flag"]);
      cards = [].slice.call(cards, 0);
      cards.sort((a, b) => {
        a = a.getAttribute(pai);
        b = b.getAttribute(pai);
        if (pai === "data-time") {
          a = a.replace(/-/g, "");
          b = b.replace(/-/g, "");
        }
        return (a - b) * _this["flag"];
      });
      //   console.log(cards);
      cards.forEach((item) => cardList.appendChild(item));
    };
  });
})();
