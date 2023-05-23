    var allTextLines;
    var headers;
    var imageColumnIndex;
    var placetitleColumnIndex;
    var typesColumnIndex;
    var addressColumnIndex;
    var previousRandomIndex;

    // 페이지를 이동하도록 해주는 함수
    function navigateToPage(url) {
        window.location.href = url;
      }
    // csv 파일을 불러오는 코드.
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            url: "전남대상대맛집.csv",
            dataType: "text",
            success: function(data) {
                processData(data);
                showRandomImage();
            }
        });
        // 랜덤 버튼을 누르면 랜덤 이미지를 보여주는 코드.
        $("#randomButton").click(function() {
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
    }

    function showRandomImage() {
        var randomIndex;
        if (allTextLines.length <= 2) {
            randomIndex = 1;  // Handle case when there is only one restaurant
        } else {
            do {
                randomIndex = Math.floor(Math.random() * (allTextLines.length - 1)) + 1;
            } while (randomIndex === previousRandomIndex);  // Ensure a new index is selected
        }
        previousRandomIndex = randomIndex;

        var rowData = allTextLines[randomIndex].split(',');
        var imageURL = rowData[imageColumnIndex];
        var placetitle = rowData[placetitleColumnIndex];
        var types = rowData[typesColumnIndex];
        var address = rowData[addressColumnIndex];


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

        // 지도 정보를 표시하는 코드
        var mapContainer = document.getElementById("mapContainer");
        mapContainer.innerHTML = "";
        var map = document.createElement("iframe");
        map.src = "https://www.google.com/maps?q=" + encodeURIComponent(address) + "&output=embed";
        map.width = "100%";
        map.height = "100%";
        mapContainer.appendChild(map);

        //메인으로
         //버튼
          
        
    }
