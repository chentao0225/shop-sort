let shopModel = (function ($) {
  let _data = null,
    htmlStr = "",
    $cardList = $(".cardList"),
    $navList = $(".navbar-nav li"),
    $cards = null;
  function queryData() {
    $.ajax({
      url: "../json/product.json",
      method: "get",
      async: false,
      success: (res) => {
        _data = res;
      },
    });
  }

  function createCards() {
    if (_data.length === 0) return;
    _data.forEach((item) => {
      let $this = $(this);
      let { price, hot, time, title, img } = item;
      htmlStr += `
      <div class="card"
        data-price=${price}
        data-hot=${hot}
        data-time=${time}
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
      $cardList.html(htmlStr);
    });
  }

  function shopSort() {
    $cards = $(".card");
    $navList.attr("flag", -1);
    $navList.click(function () {
      let _this = $(this);
      _this
        .attr("flag", _this.attr("flag") * -1)
        .siblings()
        .attr("flag", -1);
      let pai = _this.attr("data-pai");
      // console.log(pai);
      $cards.sort((a, b) => {
        // console.log(a, b);
        let $a = $(a),
          $b = $(b);
        $a = $a.attr(pai);
        $b = $b.attr(pai);
        if (pai === "data-time") {
          $a = $a.replace(/-/g, "");
          $b = $b.replace(/-/g, "");
        }
        return ($a - $b) * _this.attr("flag");
      });
      $cards.each((index, item) => $cardList.append(item));
    });
  }
  return {
    init() {
      queryData();
      createCards();
      shopSort();
    },
  };
})(jQuery);
shopModel.init();
