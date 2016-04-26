/** @jsx React.DOM */
'use strict'
var d3 = require('d3')

var ContainerD3 = {
};
var nowZoomScale = 1;

ContainerD3.create = function(el, props) {
  var svg = d3.select(el).append('svg')
    .attr('width', props.width)
    .attr('height', props.height)
    .attr("preserveAspectRatio","xMinYMin meet")
    .style({'background': 'grey'});

  var defs = svg.append("defs");
  var bgPattern = defs.append("pattern")
    .attr({ id:"gridbg", width:"27", height:"27", patternUnits:"userSpaceOnUse", viewBox:"0 0 27 27"})
    .append("path")
    .attr('d','M0 13.5 L27 13.5 M13.5 0 L13.5 27')
    .attr({ stroke:"#F0F0F0"});

  var zoomgroup = svg.append('g').attr("transform","translate(0,0)").attr("id", "zoomgroup");
  var rect = zoomgroup.append("rect")
    .attr("width", props.width)
    .attr("height", props.height)
    .style("fill", "none")
    .style("pointer-events", "all");

  var maingroup = zoomgroup.append('g')
    .attr("transform","translate(0,0)scale(1)")
    .attr("id","maingroup");

 var background = maingroup.append('rect')
    .attr({x:0, y:0, width:props.width, height:props.height,fill:'url(#gridbg)'});

 return this;
};

ContainerD3.panable = function(){
	// if you want only pan, don't want zoom
	var drag = d3.behavior.drag()
		.origin(function() {
			var t = d3.select(this);
			return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
				y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
		})
	.on("dragstart", function() {
		d3.event.sourceEvent.stopPropagation(); // silence other listeners
	})
	.on("drag", function(d,i) {
		d3.select(this).attr("transform", function(d,i){
			return "translate(" + [ d3.event.x,d3.event.y ] + ")scale(" + nowZoomScale + ")"
		})
	});
	d3.select('#maingroup').call(drag);
	return this;
}

ContainerD3.zoomable = function(){
	var maingroup = d3.select('#maingroup');
	var zoomgroup = d3.select('#zoomgroup');
	var zoom = d3.behavior.zoom()
		.scaleExtent([1, 10])
		.on("zoom", zoomed);

	function zoomed() {
	  maingroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		nowZoomScale = d3.event.scale;

	}
	zoomgroup.call(zoom);

	return this;
}

module.exports = ContainerD3

