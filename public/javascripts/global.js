var app = angular.module('adminApp', ['googlechart']);

app.controller('adminController', function($scope, $http, $window) {

//MAP RELATED VARIABLES
$scope.selected_gender = '';
$scope.selected_age = '';
$scope.selected_title = '';
$scope.selected_issue = '';

$scope.gender = ['Male', 'Female'];
$scope.age = ['10-19', '20-29', '30-39', '40-49', '50-59', '60-69'];
$scope.title = ['Basic Services', 'Education Improvement', 'Health Issues', 'Home Improvement', 'Personal Issues.', 'Infrastructure'];
$scope.basic_services = ['No access to tap water.', 'Need electricity connections', 'No access to cooking fuel.', 'Need access to sewer line', 'Need access to tap water.', 'No access to sewer line'];
$scope.education_improvements = ['Need of Public School'];
$scope.health_issues = ['Need a health center.', 'Malaria Epidemic.', 'No access to health centre.'];
$scope.home_improvements = ['Need Pakka Roof', 'Need pakka walls.', 'No access to cooking fuel.'];
$scope.personal_issues = ['Domestic quarells and fights', 'Need Private toilet'];
$scope.infrastructure_issues = ['Need community toilets', 'Need Private toilet', 'Need Pakka Roof', 'Need pakka walls.', 'Need individual bathrooms'];

var overlays = {};
var layers ={};
var featureLayer={};

//CHART RELATED VARIABLES  
$scope.clusters = ['Ramdevnagar','Hollywood Basti', 'Liberty Slums', 'Gharnala Na Chhapra'];
$scope.selected_cluster = $scope.clusters[0];
$scope.cluster_node_count = 0;
$scope.cluster_gender_count = [0,0];
$scope.cluster_age_count = [0,0,0,0,0,0];
$scope.cluster_title_count = [0,0,0,0,0,0];
$scope.cluster_male_title_count = [0,0,0,0,0,0];
$scope.cluster_female_title_count = [0,0,0,0,0,0];

var mybindPopup = function(){
        featureLayer.eachLayer(function(layer){
        var content = "<div><h3>Type of need: "+layer.feature.properties.Title+"</h3><p>Gender: "+layer.feature.properties.Gender+"</p><p>Age: "+layer.feature.properties.Age+"</p><p>Type of "+layer.feature.properties.Issue+"</p></div>";
        layer.bindPopup(content);
                    });
    }

var init_map = function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJoaXNoZWtkb3NoaTEiLCJhIjoiY2lsbm9maWtzMDhlZXV6bHl5YzBqZndsMSJ9.TBDTsl2Jtlr3MGplIDgYJA';

    var map = L.mapbox.map('map', 'abhishekdoshi2007.29dac7bc').setView([23.02658980823171,72.55227027527204],12);

    overlays = L.layerGroup().addTo(map);
    
    featureLayer = L.mapbox.featureLayer('abhishekdoshi1.pp9a2b5p')
        .on('ready', function(e) {
            layers = e.target;
            $scope.filterMap();
            mybindPopup();
            $scope.draw_charts();
        });
}
$scope.fill_chart_data = function(){
    layers.eachLayer(function(layer) {
        //cluster
        if(layer.feature.properties.Cluster !== $scope.selected_cluster){
            return;
        }
        $scope.cluster_node_count +=1;
        //gender
        if(layer.feature.properties.Gender==$scope.gender[0]){
            $scope.cluster_gender_count[0] +=1;
        }
        if(layer.feature.properties.Gender==$scope.gender[1]){
            $scope.cluster_gender_count[1] +=1;
        }

        //age
        switch(layer.feature.properties.Age){
            case $scope.age[0]:
                $scope.cluster_age_count[0] +=1;
                break;
            case $scope.age[1]:
                $scope.cluster_age_count[1] +=1;
                break;
            case $scope.age[2]:
                $scope.cluster_age_count[2] +=1;
                break;
            case $scope.age[3]:
                $scope.cluster_age_count[3] +=1;
                break;
            case $scope.age[4]:
                $scope.cluster_age_count[4] +=1;
                break;
            case $scope.age[5]:
                $scope.cluster_age_count[5] +=1;
                break;
        }
        
        //issues
        switch(layer.feature.properties.Title){
            case $scope.title[0]: 
                $scope.cluster_title_count[0] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[0]+=1;
                }else{
                    $scope.cluster_female_title_count[0]+=1;
                }
                break;
            case $scope.title[1]: 
                $scope.cluster_title_count[1] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[1]+=1;
                }else{
                    $scope.cluster_female_title_count[1]+=1;
                }
                break;
            case $scope.title[2]: 
                $scope.cluster_title_count[2] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[2]+=1;
                }else{
                    $scope.cluster_female_title_count[2]+=1;
                }
                break;
            case $scope.title[3]: 
                $scope.cluster_title_count[3] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[3]+=1;
                }else{
                    $scope.cluster_female_title_count[3]+=1;
                }
                break;
            case $scope.title[4]: 
                $scope.cluster_title_count[4] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[4]+=1;
                }else{
                    $scope.cluster_female_title_count[4]+=1;
                }
                break;
            case $scope.title[5]: 
                $scope.cluster_title_count[5] +=1;
                if(layer.feature.properties.Gender == $scope.gender[0]){
                    $scope.cluster_male_title_count[5]+=1;
                }else{
                    $scope.cluster_female_title_count[5]+=1;
                }
                break;
        }

        
    });
       
}

$scope.draw_chart_1 = function(){
    $scope.chart1 = {};
    $scope.chart1.type = "PieChart";
    $scope.chart1.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Male"},
            {v: $scope.cluster_gender_count[0]},
        ]},
        {c: [
            {v: "Female"},
            {v: $scope.cluster_gender_count[1]},
        ]}
    ]};
    $scope.chart1.options = {
        height: 500
    };

}
$scope.draw_chart_2 = function(){
    $scope.chart2 = {};
    $scope.chart2.type = "PieChart";
    $scope.chart2.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: $scope.age[0]},
            {v: $scope.cluster_age_count[0]},
        ]},
        {c: [
            {v: $scope.age[1]},
            {v: $scope.cluster_age_count[1]},
        ]},
        {c: [
            {v: $scope.age[2]},
            {v: $scope.cluster_age_count[2]},
        ]},
        {c: [
            {v: $scope.age[3]},
            {v: $scope.cluster_age_count[3]},
        ]},
        {c: [
            {v: $scope.age[4]},
            {v: $scope.cluster_age_count[4]},
        ]},
        {c: [
            {v: $scope.age[5]},
            {v: $scope.cluster_age_count[5]},
        ]},
    ]};
    $scope.chart2.options = {
        height: 500
    };
}

$scope.draw_chart_3 = function(){
    $scope.chart3 = {};
    $scope.chart3.type = "PieChart";
    $scope.chart3.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: $scope.title[0]},
            {v: $scope.cluster_title_count[0]},
        ]},
        {c: [
            {v: $scope.title[1]},
            {v: $scope.cluster_title_count[1]},
        ]},
        {c: [
            {v: $scope.title[2]},
            {v: $scope.cluster_title_count[2]},
        ]},
        {c: [
            {v: $scope.title[3]},
            {v: $scope.cluster_title_count[3]},
        ]},
        {c: [
            {v: $scope.title[4]},
            {v: $scope.cluster_title_count[4]},
        ]},
        {c: [
            {v: $scope.title[5]},
            {v: $scope.cluster_title_count[5]},
        ]},
    ]};
    $scope.chart3.options = {
        height: 500
    };
}
$scope.draw_chart_4 = function(){
    $scope.chart4 = {};
    $scope.chart4.type = "PieChart";
    $scope.chart4.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: $scope.title[0]},
            {v: $scope.cluster_male_title_count[0]},
        ]},
        {c: [
            {v: $scope.title[1]},
            {v: $scope.cluster_male_title_count[1]},
        ]},
        {c: [
            {v: $scope.title[2]},
            {v: $scope.cluster_male_title_count[2]},
        ]},
        {c: [
            {v: $scope.title[3]},
            {v: $scope.cluster_male_title_count[3]},
        ]},
        {c: [
            {v: $scope.title[4]},
            {v: $scope.cluster_male_title_count[4]},
        ]},
        {c: [
            {v: $scope.title[5]},
            {v: $scope.cluster_male_title_count[5]},
        ]},
    ]};
    $scope.chart4.options = {
        title: "Needs reported by Males",
        height: 500,
        width: 500
    };
}

$scope.draw_chart_5 = function(){
    $scope.chart5 = {};
    $scope.chart5.type = "PieChart";
    $scope.chart5.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: $scope.title[0]},
            {v: $scope.cluster_female_title_count[0]},
        ]},
        {c: [
            {v: $scope.title[1]},
            {v: $scope.cluster_female_title_count[1]},
        ]},
        {c: [
            {v: $scope.title[2]},
            {v: $scope.cluster_female_title_count[2]},
        ]},
        {c: [
            {v: $scope.title[3]},
            {v: $scope.cluster_female_title_count[3]},
        ]},
        {c: [
            {v: $scope.title[4]},
            {v: $scope.cluster_female_title_count[4]},
        ]},
        {c: [
            {v: $scope.title[5]},
            {v: $scope.cluster_female_title_count[5]},
        ]},
    ]};
    $scope.chart5.options = {
        title: "Needs reported by Females",
        height: 500,
        width:500
    };
}

$scope.filterMap = function() {
    
    var filter_gender = document.getElementById('colors').filter_gender;
    var filter_issues = document.getElementById('colors').filter_issues;
    var chosen_gender = [];
    var chosen_issues = [];
    
    for (var i = 0; i < filter_gender.length; i++) {
        if (filter_gender[i].checked) chosen_gender.push(filter_gender[i].value);
    }
    for (var i = 0; i < filter_issues.length; i++) {
        if (filter_issues[i].checked) chosen_issues.push(filter_issues[i].value);
    }

    overlays.clearLayers();
    
    var clusterGroup = new L.MarkerClusterGroup().addTo(overlays);
    
    layers.eachLayer(function(layer) {
        
        if (chosen_gender.length && chosen_gender.indexOf(layer.feature.properties.Gender) == -1) {
            return;
        }

        if( $scope.selected_age.length && (layer.feature.properties.Age !== $scope.selected_age)){
            return;
        }

        if( $scope.selected_title.length && (layer.feature.properties.Title !== $scope.selected_title)){
            return;
        }

        if (chosen_issues.length && chosen_issues.indexOf(layer.feature.properties.Issue) == -1) {
            return;
        }
        clusterGroup.addLayer(layer);
    });
}

$scope.downloadCsv = function(){
    $http({
            method: 'GET',
            url: '/downloads',
        }).then(function(res){
            $window.open('/downloads');
        });
}

$scope.draw_charts = function(){

    $scope.fill_chart_data();
    $scope.draw_chart_1();
    $scope.draw_chart_2();
    $scope.draw_chart_3();
    $scope.draw_chart_4();
    $scope.draw_chart_5();
}

init_map();




});

