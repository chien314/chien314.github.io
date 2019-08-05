/*
*    main.js
*    Mastering Data Visualization with D3.js
*    6.7 - Adding a jQuery UI slider
*/

var margin = { left:80, right:20, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

var time = 0;
var interval;
var formattedData;

// Tooltip
var tip = d3.tip().attr('class', 'd3-tip')
    .html(function(d) {
        var text = "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
        text += "<strong>Country name:</strong> <span style='color:red'>" + d.country + "</span><br>";
        text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
        text += "<strong>GDP per capita:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
        text += "<strong>Life expectancy:</strong> <span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
        return text;
    });
g.call(tip);

//begin annotation
g.append("text")
    .attr("y", 150)
    .attr("x", width / 3)
    .attr("font-size", "17px")
    .attr("text-anchor", "middle")
    .attr("fill","red")
    .text("Region: Africa");
g.append("text")
    .attr("y", 170)
    .attr("x", width / 2.3)
    .attr("font-size", "17px")
    .attr("text-anchor", "middle")
    .attr("fill","red")
    .text("Average life expectancy: 59.30 years");

// Scales
var x = d3.scaleLog()
    .base(10)
    .range([0, width*0.7])
    .domain([142, 150000]);
var y = d3.scaleLog()
    .base(10)
    .range([height, 0])
    .domain([10, 100]);
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);
var continentColor = d3.scaleOrdinal(d3.schemeCategory10);

// Labels
var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP per capita (USD)");
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life expectancy (years)")
//var timeLabel = g.append("text")
//    .attr("y", height -10)
//    .attr("x", width - 40)
//    .attr("font-size", "40px")
//    .attr("opacity", "0.4")
//    .attr("text-anchor", "middle")
//    .text("1800");

// X Axis
var xAxisCall = d3.axisBottom(x)
    .tickValues([500, 5000, 50000])
    .tickFormat(d3.format("$"));
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickValues([20, 30, 40, 60, 80, 100])
    .tickFormat(function(d){ return +d; });
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

var continents = ["africa", "americas", "asia", "europe"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width - 250) + 
        "," + (height - 125) + ")");

continents.forEach(function(continent, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(10, " + (i * 30) + ")");

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(continent));

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent);
});

d3.json("data/data2014.json").then(function(data){
    console.log(data);

    // Clean data
    formattedData = data.map(function(year){
        return year["countries"].filter(function(country){
            var dataExists = (country.income && country.life_exp);
            return dataExists
        }).map(function(country){
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;            
        })
    });

    // First run of the visualization
    update(formattedData[0]);

})

//$("#play-button")
//    .on("click", function(){
//        var button = $(this);
//        if (button.text() == "Play"){
//            button.text("Pause");
//            interval = setInterval(step, 100);            
//        }
//        else {
//            button.text("Play");
//            clearInterval(interval);
//        }
//    })
//
//$("#reset-button")
//    .on("click", function(){
//        time = 0;
//        update(formattedData[0]);
//    })

$("#continent-select")
    .on("change", function(){
        update(formattedData[time]);
    })

$("#date-slider").slider({
    max: 2014,
    min: 1800,
    step: 1,
    slide: function(event, ui){
        time = ui.value - 1800;
        update(formattedData[time]);
    }
})

function step(){
    // At the end of our data, loop back
    time = (time < 214) ? time+1 : 0
    update(formattedData[time]);
}

//begin modify

var continent = $("#continent-select").val();

    var data = data.filter(function(d){
        if (continent == "all") { return true; }
        else {
            return d.continent == continent;
        }
    })

    // JOIN new data with old elements.
    var circles = g.selectAll("circle").data(data, function(d){
        return d.country;
    });

    // EXIT old elements not present in new data.
//    circles.exit()
//        .attr("class", "exit")
//        .remove();

        
  circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function(d) { return continentColor(d.continent); })
        .merge(circles)
            .attr("cy", function(d){ return y(d.life_exp); })
            .attr("cx", function(d){ return x(d.income) })
            .attr("r", function(d){ return Math.sqrt(area(d.population))/2 });

//begin update
function update(data) {
    // Standard transition time for the visualization
    var t = d3.transition()
        .duration(100);

    var continent = $("#continent-select").val();

    var data = data.filter(function(d){
        if (continent == "all") { return true; }
        else {
            return d.continent == continent;
        }
    })

    // JOIN new data with old elements.
    var circles = g.selectAll("circle").data(data, function(d){
        return d.country;
    });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr("class", "exit")
        .remove();

    // ENTER new elements present in new data.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function(d) { return continentColor(d.continent); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .merge(circles)
        .transition(t)
            .attr("cy", function(d){ return y(d.life_exp); })
            .attr("cx", function(d){ return x(d.income) })
            .attr("r", function(d){ return Math.sqrt(area(d.population))/2 });

    // Update the time label
  //  timeLabel.text(+(time + 1800))
    $("#year")[0].innerHTML = +(time + 1800)

    $("#date-slider").slider("value", +(time + 1800))
}