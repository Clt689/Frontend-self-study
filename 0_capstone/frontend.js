document.addEventListener("DOMContentLoaded", function () {
  // 카카오맵 초기화
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(35.14152416269298, 126.9312745478554), // 초기 위치:중앙도서관
    level: 4
  };
  var map = new kakao.maps.Map(container, options);

  // 버스 마커 생성
  var busMarker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(35.141939023044976, 126.92780114915257), // 초기 위치 설정
    image: new kakao.maps.MarkerImage('/0_capstone/그림2.svg', new kakao.maps.Size(20, 40)),
  });

  // 마커 지도에 표시
  busMarker.setMap(map);

  // 위도와 경도를 출력할 div 엘리먼트
  var locationInfoDiv = document.getElementById('location-info');

  // 서버로부터 위치 데이터를 받아와서 마커 이동
  function updateBusLocation() {
    // 서버로부터 위치 데이터를 받아오는 Ajax 요청
    // 서버에서는 필요한 데이터를 JSON 형식으로 응답해야 함
    fetch('http://13.125.227.53/Logtest.php') // php 링크 넣기
      .then(response => response.json())
      .then(data => {
        // 위도와 경도를 출력
        locationInfoDiv.innerHTML = '현재 위치 : 위도: ' + data.lat + ', 경도: ' + data.lon;
        // 받아온 위치로 마커 이동
        busMarker.setPosition(new kakao.maps.LatLng(data.lat, data.lon));
      })
      .catch(error => console.error('Error:', error));
  }

  // 0.8초 간격으로 위치 업데이트
  setInterval(updateBusLocation, 800);
});
