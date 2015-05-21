var hasSteps = false;
var hasDistance = false;
var hasFloors = false;

var app = {
    // Application Constructor
    initialize: function() {

        $("#error").append('<span class="label label-primary">Initializing...</span><br>');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        $("#error").append('<span class="label label-primary">Device Ready!</span><br>');
        pedometer.isStepCountingAvailable(function (isAvailable) {
            
            $("#error").append('<span class="label label-primary">Steps checked! -- ' + isAvailable + '</span><br>');

            hasSteps = isAvailable;
            if(hasSteps) {
                $("#checkStep").removeClass("glyphicon-remove");
                $("#checkStep").addClass("glyphicon-ok");
            }

            pedometer.isDistanceAvailable(function (isAvailable) {
                
            $("#error").append('<span class="label label-primary">Distance checked! -- ' + isAvailable + '</span><br>');

                hasDistance = isAvailable;
                if(hasSteps) {
                    $("#checkDistance").removeClass("glyphicon-remove");
                    $("#checkDistance").addClass("glyphicon-ok");
                }

                pedometer.isFloorCountingAvailable(function (isAvailable) {
            
                    $("#error").append('<span class="label label-primary">Floor checked! -- ' + isAvailable + '</span><br>');

                    hasFloors = isAvailable;
                    if(hasSteps) {
                        $("#checkFloor").removeClass("glyphicon-remove");
                        $("#checkFloor").addClass("glyphicon-ok");
                    }

                    var options = [];
                    for (var i = 0; i < 7; i++) {

                        var iniDate = moment();
                        iniDate.hour(0);
                        iniDate.minute(0);
                        iniDate.second(0);
                        iniDate.subtract(i, 'days');

                        var endDate = iniDate.clone();
                        endDate.add(1, 'days');

                        options.push({
                            "label": iniDate.format("ddd MM/dd"),
                            "startDate": iniDate.toDate(),
                            "endDate": endDate.toDate()
                        });
                    };

                    _.each(options, function (element, index, list) {
                        pedometer.queryData(function (pedometerData) {
                            $("#dataTable").append(
                                "<tr><td>" + element.label + 
                                "</td><td>" + hasSteps ? pedometerData.numberOfSteps : "n/a" + 
                                "</td><td>" + hasDistance ? pedometerData.distance : "n/a" + 
                                "</td><td>" + hasFloors ? pedometerData.floorsAscended : "n/a" + 
                                "</td><td>" + hasFloors ? pedometerData.floorsDescended : "n/a" + "</td></tr>")
                        }, function error () {
                            $("#error").append('<span class="label label-danger">Error retrieving the information</span><br>');
                        });
                    });
                    
                }, function error () {
                            $("#error").append('<span class="label label-danger">Error determining if floor count is available</span><br>');
                });

            }, function error () {
                            $("#error").append('<span class="label label-danger">Error determining if distance is available</span><br>');
            });

        }, function error (argument) {
                            $("#error").append('<span class="label label-danger">Error determining if steps count are available</span><br>');
        });
    }
};

app.initialize();

