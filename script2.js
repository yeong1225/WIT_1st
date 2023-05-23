var allTextLines;
var headers;
var imageColumnIndex;
var placetitleColumnIndex;
var typesColumnIndex;
var addressColumnIndex;
var menu1ColumnIndex;
var price1ColumnIndex;
var menu2ColumnIndex;
var price2ColumnIndex;
var menu3ColumnIndex;
var price3ColumnIndex;
var previousRandomIndex;

function navigateToPage(url) {
  window.location.href = url;
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "전남대후문맛집리스트(임시).csv",
    dataType: "text",
    success: function (data) {
      processData(data);
      showRandomImage();
    },
  });

  $("#randomButton").click(function () {
    showRandomImage();
  });
});

function processData(allText) {
  allTextLines = allText.split(/\r\n|\n/);
  headers = allTextLines[0].split(',');
  imageColumnIndex = headers.indexOf("image");
  placetitleColumnIndex = headers.indexOf("placetitle");
  typesColumnIndex = headers.indexOf("types");
  addressColumnIndex = headers.indexOf("address");
  menu1ColumnIndex = headers.indexOf("menu1");
  price1ColumnIndex = headers.indexOf("price1");
  menu2ColumnIndex = headers.indexOf("menu2");
  price2ColumnIndex = headers.indexOf("price2");
  menu3ColumnIndex = headers.indexOf("menu3");
  price3ColumnIndex = headers.indexOf("price3");
}

function showRandomImage() {
  var randomIndex;
  if (allTextLines.length <= 1) {
    randomIndex = 0; // Handle case when there is only one restaurant
  } else {
    do {
      randomIndex = Math.floor(Math.random() * (allTextLines.length - 1)) + 1;
    } while (randomIndex === previousRandomIndex); // Ensure a new index is selected
  }
  previousRandomIndex = randomIndex;

  var rowData = allTextLines[randomIndex].split(',');
  var imageURL = rowData[imageColumnIndex];
  var placetitle = rowData[placetitleColumnIndex];
  var types = rowData[typesColumnIndex];
  var address = rowData[addressColumnIndex];
  var menu1 = rowData[menu1ColumnIndex];
  var price1 = rowData[price1ColumnIndex];
  var menu2 = rowData[menu2ColumnIndex];
  var price2 = rowData[price2ColumnIndex];
  var menu3 = rowData[menu3ColumnIndex];
  var price3 = rowData[price3ColumnIndex];

  // 이미지를 화면에 표시하는 코드
  var img = document.createElement("img");
  img.src = imageURL;
  img.alt = placetitle;
  document.getElementById("imageContainer").innerHTML = "";
  document.getElementById("imageContainer").appendChild(img);

  // 정보를 화면에 표시하는 코드
  var infoContainer = document.getElementById("infoContainer");
  infoContainer.innerHTML = "";
  var placetitleElement = document.createElement("h1");
  placetitleElement.textContent = placetitle;
  var typesSpan = document.createElement("span");
  typesSpan.textContent = types;
  placetitleElement.appendChild(typesSpan);
  infoContainer.appendChild(placetitleElement);

  // 메뉴 정보를 화면에 표시하는 코드
  var menuContainer = document.createElement("div");
  var menu1Element = createMenuElement(menu1, price1);
  var menu2Element = createMenuElement(menu2, price2);
  var menu3Element = createMenuElement(menu3, price3);

  if (menu1Element) {
    menuContainer.appendChild(menu1Element);
  }
  if (menu2Element) {
    menuContainer.appendChild(menu2Element);
  }
  if (menu3Element) {
    menuContainer.appendChild(menu3Element);
  }

  infoContainer.appendChild(menuContainer);

  // 지도 정보를 표시하는 코드
  var mapContainer = document.getElementById("mapContainer");
  mapContainer.innerHTML = "";
  var map = document.createElement("iframe");
  map.src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(address) +
    "&output=embed";
  map.width = "100%";
  map.height = "100%";
  mapContainer.appendChild(map);
}

function createMenuElement(menu, price) {
    if (menu && price) {
      var menuElement = document.createElement("p");
      menuElement.textContent = menu + " " + price + "원";
      return menuElement;
    } else if (menu && !price) {
      var menuElement = document.createElement("p");
      menuElement.textContent = menu;
      return menuElement;
    }
    return null;
  }
  
  
  