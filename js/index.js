let shopModel = (function ($) {
  let _data = null,
    $cardBox = $(".cardList"),
    $navList = $(".navbar-nav li");
  $cards = null;
  function handleData() {
    $.ajax({
      url: "../json/product.json",
      method: "get",
      async: false,
      success: (res) => {
        _data = res;
      },
    });
  }
  function render() {
    // console.log(_data);
    let htmlStr = ``;
    _data.forEach((item) => {
      let { title, time, hot, price, img } = item;
      htmlStr += `
    <div class="card"
        
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
    // console.log(htmlStr);
    $cardBox.html(htmlStr);
    // handleSort();
  }

  function handleSort() {
    console.log("sort");
    $navList.attr("flag", -1);
    $navList.click(function () {
      let $this = $(this),
        pai = $this.attr("data-pai");
      //   console.log(pai);
      $this
        .attr("flag", $this.attr("flag") * -1)
        .siblings()
        .attr("flag", -1);
      console.log($this.attr("flag"));
      _data.sort((a, b) => {
        a = a[pai];
        b = b[pai];
        if (pai === "time") {
          a = a.replace(/-/g, "");
          b = b.replace(/-/g, "");
        }
        return (a - b) * $this.attr("flag");
      });

      render();
    });
  }
  return {
    init() {
      handleData();
      render();
      handleSort();
    },
  };
})(jQuery);

shopModel.init();
