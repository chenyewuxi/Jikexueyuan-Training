function setUserGEOLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
            // 指示浏览器获取高精度的位置，默认为false  
            enableHighAcuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
            maximumAge: 3000
        });
    } else {
        alert("Your browser does not support Geolocation!");
    }

}

function locationError(error) {
    switch (error.code) {
        case error.TIMEOUT:
            alert("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
            alert('We can\'t detect your location. Sorry!');
            break;
        case error.PERMISSION_DENIED:
            alert('Please allow geolocation access for this to work.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occured!');
            break;
    }
}

function locationSuccess(position) {
    var coords = position.coords;
    var latlng = new google.maps.LatLng(
        // 维度  
        coords.latitude,
        // 精度  
        coords.longitude
    );
    var myOptions = {
        // 地图放大倍数     
        zoom: 12,
        // 地图中心设为指定坐标点     
        center: latlng,
        // 地图类型     
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // 创建地图并输出到页面     
    var myMap = new google.maps.Map(
        document.getElementById("map"), myOptions
    );
    // 创建标记     
    var marker = new google.maps.Marker({
        // 标注指定的经纬度坐标点     
        position: latlng,
        // 指定用于标注的地图     
        map: myMap
    });
    //创建标注窗口     
    var infowindow = new google.maps.InfoWindow({
        content: "您在这里<br/>纬度：" +
            coords.latitude +
            "<br/>经度：" + coords.longitude
    });
    //打开标注窗口     
    infowindow.open(myMap, marker);
}



// 
// 
// 
// 
// Baidu GEOLocation
function setUserGEOLocation() {

    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);


    map.enableScrollWheelZoom();

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    })
}

