 following code calls out to an image that is the average size of the service responses that our mobile application calls out to. I combine that with a javascript timeout that stops the processing of the success callback if the timeout occurs. Check out the code below.

function(onlineFunction,offlineFunction)
{
    var timeOutInteger = null;
    var timeOutOccured = false;
 
      var net_callback = function(reachability) {
 
        // There is no consistency on the format of reachability
            var networkState = reachability.code || reachability;
 
            var states = {};
            states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
            states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
            states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
 
            if(states[networkState] == 'No network connection')
            {
                if(!timeOutOccured){
                    clearTimeout(timeOutInteger);
                    offlineFunction();
                }
            }
            else
            {
                var url = "http://yourservicehere/LeadWeight.jpg";
 
                    $.ajax({ type: "GET",
                            data: "{}",
                            url: url,
                            cache: false,
                            timeout: 20 * 1000,
                            success:function(response)
                            {
                                if(!timeOutOccured){
                                    clearTimeout(timeOutInteger);
                                    onlineFunction();
                                }
                            },
                            error:function(xhr, textStatus, errorThrown) {
                                if(!timeOutOccured){
                                    clearTimeout(timeOutInteger);
                                    offlineFunction();
                                }
                            }
                        });
            }
      };
 
      navigator.network.isReachable("www.google.com", net_callback);
 
      timeOutInteger = setTimeout( function() {
                timeOutOccured = true;
                                offlineFunction();
                             }, 20 * 1000 );
}