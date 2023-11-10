document.addEventListener("DOMContentLoaded", function () {
  // 카카오맵 초기화
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(35.14152416269298, 126.9312745478554), // 초기 위치는 서울을 기준으로 설정
    level: 4
  };
  var map = new kakao.maps.Map(container, options);

  // 버스 마커 생성
  var busMarker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(35.141939023044976, 126.92780114915257), // 초기 위치 설정
    image: new kakao.maps.MarkerImage('/02/그림2.svg', new kakao.maps.Size(20, 40)),
  });

  // 마커 지도에 표시
  busMarker.setMap(map);

  // 서버로부터 위치 데이터를 받아와서 마커 이동
  function updateBusLocation() {
    // 서버로부터 위치 데이터를 받아오는 Ajax 요청
    // 서버에서는 필요한 데이터를 JSON 형식으로 응답해야 함
    fetch('http://13.125.227.53/???????????.php') // php 링크 넣기
      .then(response => response.json())
      .then(data => {
        // 받아온 위치 데이터를 이용하여 마커 이동
        var newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
        busMarker.setPosition(newPosition);
        map.panTo(newPosition); // 지도 이동
        // 1초마다 위치 업데이트
        setTimeout(updateBusLocation, 1000);
      })
      .catch(error => console.error('Error:', error));
  }

  // 초기 위치 업데이트
  updateBusLocation();
});
