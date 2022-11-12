(function ($) {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function (e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function (e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  $(window).on("resize", function () {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function () {
        menu.classList.remove("open");
      });
    }
  });
  $(".hover").mouseleave(function () {
    $(this).removeClass("hover");
  });

  $(".isotope-wrapper").each(function () {
    var $isotope = $(".isotope-box", this);
    var $filterCheckboxes = $('input[type="radio"]', this);

    var filter = function () {
      var type = $filterCheckboxes.filter(":checked").data("type") || "*";
      if (type !== "*") {
        type = '[data-type="' + type + '"]';
      }
      $isotope.isotope({
        filter: type,
        layoutMode: 'vertical'
      });
    };

    $isotope.isotope({
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });

    $(this).on("change", filter);
    filter();
  });
  /* stackoverflow api */
  const api = "https://api.stackexchange.com/2.3/users/11850259?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=reputation&filter=default";
  const getStackoverData = async (api, divId) => {
    let userDetails = [];
    let selectedDiv = document.querySelector(`#${divId}`);
    const response = await fetch(api);
    const data = await response.json();
    userDetails.push({
      "name": data.items[0].display_name,
      "badges": data.items[0].badge_counts,
      "link": data.items[0].link,
      "profile_image": data.items[0].profile_image,
      "reputation": data.items[0].reputation,
    });
    let html = `<div class="stackcard"><img src="${userDetails[0].profile_image}" alt="stackoverflow profile image"><div class="content"><h3 class="name">${userDetails[0].name}</h3><span>Reputation: ${userDetails[0].reputation}</span><div class="badges"><h4>Badges</h4><span class="gold">Gold ${userDetails[0].badges.gold}</span><span class="silver">Silver ${userDetails[0].badges.silver}</span><span class="bronze">Bronze ${userDetails[0].badges.bronze}</span></div><a class="primary-btn" target="_blank" href="${userDetails[0].link}">Visit Profile</a></div></div>`;
    selectedDiv.innerHTML = html;
  }
  getStackoverData(api, "stack-container");
})(jQuery);