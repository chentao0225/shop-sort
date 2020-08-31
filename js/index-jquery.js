let data = null;
$.ajax({
  url: "../json/product.json",
  method: "get",
  async: false,
  dataType: "json",
  success: (result) => {
    data = result;
  },
});
// console.log(data);
let htmlStr = "";
data.forEach(({ img, hot, title, price, time }) => {
  htmlStr += `
    <div class="card"
        price=${price}
        hot=${hot}
        time=${time}
    >
        <img src=${img} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">价格：${price}</p>
            <p class="card-text">热度：${hot}</p>
            <p class="card-text"><small class="text-muted">${time}</small></p>
        </div>
    </div>
    `;
});
let $cardList = $(".cardList");
$cardList.html(htmlStr);

let $navList = $(".navbar-nav >li");
$navList.attr("flag", -1);
// console.dir($navList);
$navList.click(function () {
  let flag = $(this).attr("flag");
  $(this)
    .attr("flag", flag * -1)
    .siblings()
    .attr("flag", -1);
  let pai = $(this).attr("data-pai");
  //   console.log(pai);
  let $card = $(".card");
  //   console.log($(".card"));
  $card.sort((a, b) => {
    // console.log(a, b);
    // console.dir(a);
    a = a.getAttribute(pai);
    b = b.getAttribute(pai);
    if (pai === "time") {
      a = a.replace(/-/g, "");
      b = b.replace(/-/g, "");
    }
    return (a - b) * $(this).attr("flag");
  });
  $card.toArray().forEach((item) => $cardList.append(item));
});
