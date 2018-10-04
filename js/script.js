$(document).ready(function(){

  // Update table with new information
  var updateTableContent = function() {
    $.ajax({
      url: 'https://8f1gmxcfwf.execute-api.us-west-2.amazonaws.com/prod',
      dataType: "json",
      contentType: 'application/json',
      success: processJSON
    });
  }

  // JSON Handler function
  var processJSON =  function(data, textStatus, xhr) {
    /* Logging the data -- JSON.stringify turns the data into a readable string,
     otherwise its a json object with actual properties that you can access */
    console.log(JSON.stringify(data));

    var payload = data.Items[0].payload;

    // Might not exist if Items[0].payload_raw is a thing
    if (payload) {
      var deviceID = payload.deviceID;
      if (["sensorTag1", "sensorTag2", "sensorTag3"].indexOf(deviceID) >= 0) {
        console.log(deviceID)
        $('#' + deviceID).find(".lightmeter").html(parseInt(payload.lightmeter) + " lux");
		$('#' + deviceID).find(".barometer").html(payload.barometer);
        		
			var size = payload.IRtemperature.length;
			var str2  = payload.IRtemperature.slice(1, size -1);
			var IRtempArray = str2.split(",");
		
		$('#' + deviceID).find(".ambientTemperature").html(parseInt(IRtempArray[0]) + "&deg;C");
		$('#' + deviceID).find(".objectTemperature").html(parseInt(IRtempArray[1]) + "&deg;C");
		
			var size = payload.humidity.length;
			var str2  = payload.humidity.slice(1, size -1);
			var humidityArray = str2.split(",");
			
        $('#' + deviceID).find(".humidity").html(parseInt(humidityArray[1]) + "%");
		
		
		if(payload.deviceID === "sensorTag1") {
			$("#lightmeter_sensorTag1").css("width",String((payload.lightmeter/1000)*100) + "%"); 
			$("#ambientTemp_sensorTag1").css("width",String(IRtempArray[0])+ "%"); 
			$("#objectTemp_sensorTag1").css("width",String(IRtempArray[1])+ "%");
			$("#humidity_sensorTag1").css("width", String(humidityArray[1]) +"%"); 
        }
		
		if(payload.deviceID === "sensorTag2") {
			$("#lightmeter_sensorTag2").css("width",String((payload.lightmeter/1000)*100) + "%"); 
			$("#ambientTemp_sensorTag2").css("width",String(IRtempArray[0])+ "%"); 
			$("#objectTemp_sensorTag2").css("width",String(IRtempArray[1])+ "%");
			$("#humidity_sensorTag2").css("width", String(humidityArray[1]) +"%"); 
        }
		
		if(payload.deviceID === "sensorTag3") {
			$("#lightmeter_sensorTag3").css("width",String((payload.lightmeter/1000)*100) + "%"); 
			$("#ambientTemp_sensorTag3").css("width",String(IRtempArray[0])+ "%"); 
			$("#objectTemp_sensorTag3").css("width",String(IRtempArray[1])+ "%");
			$("#humidity_sensorTag3").css("width", String(humidityArray[1]) +"%"); 
        }
      }


    }


  }

  // Update table content every 100ms (1 second)
  setInterval(updateTableContent, 1000);
});