function drawGRbar(id,dataset){
	var svgWidth  = 350
	var svgHeight = 320;
	var xOffset = 150;
	var yOffset = 10;
	var barWidth = 30;
	var barMargin = 15;
	var colorArr = ['#96d946','#e9d848','#85d0f6','#e95956'];

	var RgetGRCourse = parseFloat(((dataset[1]/dataset[0])*100).toFixed(1));//取得済み単位(CSV)
    var RnowGRCourse = parseFloat(((dataset[2]/dataset[0])*100).toFixed(1));//履修中単位(CSV)
    var RpreGRCourse = parseFloat(((dataset[3]/dataset[0])*100).toFixed(1));//履修予定単位(シミュレーション)
    var RrestGRCourse = parseFloat(0.0);
    if(dataset[1]+dataset[2]+dataset[3] <= dataset[0]){
        RrestGRCourse = parseFloat((((dataset[0]-(dataset[1]+dataset[2]+dataset[3]))/dataset[0])*100).toFixed(1));
    }
    var datasetRate = [RgetGRCourse, RnowGRCourse, RpreGRCourse, RrestGRCourse];

	var svg = d3.select(id)
	.attr({
		width : svgWidth,
		height : svgHeight
	})
	.selectAll("rect")
	.data(datasetRate);

	svg.enter()
	.append("rect")
	.attr("class","fillPink")
	.attr("height",0)
	.attr("width",barWidth)
	.attr("x",function(d,i){
		return i * (barWidth + barMargin) + xOffset;
	})
	.attr("y",svgHeight-yOffset)
	.attr("fill",function(d,i){
		return colorArr[i];
	})
	.transition()
	.duration(1200)
	.delay(function(d,i){
		return i * 120;
	})
	.attr("y",function(d,i){
		return svgHeight - d*2.96 - yOffset;
	})
	.attr("height",function(d,i){
		return d*2.96;
	});

	svg.enter()
	.append("text")
	.attr("class","barRate")
	.attr("fill","#464646")
	.text(function(d){return d+"%";})
	.attr("x",function(d,i){
		return i * (barWidth + barMargin) + xOffset-2.96;
	})
	.attr("y",svgHeight-yOffset-5)
	.transition()
	.duration(1200)
	.attr("y",function(d,i){
		return svgHeight - d*2.96 - yOffset -5;
	});
	svg.enter()
	.append("rect")
	.attr("height",20)
	.attr("width",20)
	.attr("x",20)
	.attr("y",function(d,i){
		return i*30+50;
	})
	.attr("fill",function(d,i){
		return colorArr[i];
	});
	var textArr = ["取得済み","履修中","履修予定","残り"];
	svg.enter()
	.append("text")
	.attr("class","legend")
	.attr("font-size","12px")
	.attr("fill","#464646")
	.text(function(d,i){
		return textArr[i];
	})
	.attr("x",45)
	.attr("y",function(d,i){
		return i*30+64;
	});
}