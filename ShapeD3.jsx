/** @jsx React.DOM */
'use strict'

var d3 = require('d3')

var ShapeD3 = {}

// 方形
ShapeD3.rect = function (id, x, y, w, h,portrait, model){
	this.id = id || (Math.floor(Math.random() * 1000000000));
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;
	this.portrait = portrait || 0;
	this.model = model || 'undefind';
  return this;
};

ShapeD3.rect.prototype.draw = function() {
	var maingroup = d3.select('#maingroup');
	var group = maingroup.append('g').attr({
		transform:"translate("+this.x+","+this.y+")",
		id:'rect_'+this.id
	});
	group.shapeObj = this;
	var block = group.append('rect').attr({
		x:0, y:0,
		width:177, height:100,
		rx:20, ry:20, // 圆角
		fill: "rgb(236, 240, 241)", stroke: "#1f2c39",
	}).style({
		'stroke-width': 3,
	})
	var identifyId = group.append('text').attr({
		x:88.5, y:64,
		fontWeight: 'bold', fill: '#333333', "text-anchor":"middle"
	}).style({
		"font-size": "14px", "font-family": "Arial Black"
	}).text(this.id)

	var drag = d3.behavior.drag()
		.origin(function() {
			var t = d3.select(this);
			return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
				y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
		})
	.on("drag", function(d,i) {
		d3.select(this).attr("transform", function(d,i){
			return "translate(" + [ d3.event.x,d3.event.y ] + ")"
		})
	})
	.on("dragstart", function() {
		d3.event.sourceEvent.stopPropagation(); // silence other listeners
		d3.select(this).style({
			cursor:'move'
		})
	})
	.on("dragend", function() {
		var tf = d3.transform(d3.select(this).attr("transform"));
		group.shapeObj.x = tf.translate[0];
		group.shapeObj.y = tf.translate[1];
		d3.select(this).style({
			cursor:'auto'
		})
	});
	group.call(drag);
	return;
}

ShapeD3.circle = function (id, cx, cy, r, model){
	this.id = id || (Math.floor(Math.random() * 1000000000));
	this.cx = cx || 0;
	this.cy = cy || 0;
	this.r = r || 1;
	this.model = model || 'undefind';
  return this;
};

ShapeD3.circle.prototype.draw = function() {
	var maingroup = d3.select('#maingroup');
	var group = maingroup.append('g').attr({
		transform:"translate("+this.cx+","+this.cy+")",
		id:'shape'+this.id
	});
	group.shapeObj = this;
	var block = group.append('circle').attr({
		cx:this.cx, cy:this.cy,
		r: this.r,
		fill: "rgb(236, 240, 241)", stroke: "#1f2c39",
	}).style({
		'stroke-width': 3,
	})

	var identifyId = group.append('text').attr({
		x:this.cx, y:this.cy,
		fontWeight: 'bold', fill: '#333333', "text-anchor":"middle"
	}).style({
		"font-size": "14px", "font-family": "Arial Black"
	}).text(this.id)

	var drag = d3.behavior.drag()
		.origin(function() {
			var t = d3.select(this);
			return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
				y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
		})
	.on("drag", function(d,i) {
		d3.select(this).attr("transform", function(d,i){
			return "translate(" + [ d3.event.x,d3.event.y ] + ")"
		})
	})
	.on("dragstart", function() {
		d3.event.sourceEvent.stopPropagation(); // silence other listeners
		d3.select(this).style({
			cursor:'move'
		})
	})
	.on("dragend", function() {
		var tf = d3.transform(d3.select(this).attr("transform"));
		group.shapeObj.x = tf.translate[0];
		group.shapeObj.y = tf.translate[1];
		d3.select(this).style({
			cursor:'auto'
		})
	});
	group.call(drag);
	return;
}


module.exports = ShapeD3

