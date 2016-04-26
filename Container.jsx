/** @jsx React.DOM */
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')

var ContainerD3 = require('./ContainerD3')
var ShapeD3 = require('./ShapeD3')

var getRondom = function(max) {
	var min = 0;//,max = 150;
	return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = React.createClass({

  displayName: 'Container',

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    ContainerD3.create(el, {width: 60*28, height: 90*28}).zoomable();
  },

  render: function() {
    return (
        <div id='myContainer'>
          <button onClick={this.addRect} >Add Rect</button>
          <button onClick={this.addCircle} >Add Circle</button>
          <button onClick={this.saveAsPng} >Save As Png</button>
          <div id="myCanvas"> </div>
        </div>
        );
  },

  addRect: function(e) {
    e.preventDefault();
		var shape = new ShapeD3.rect(null,
        10+getRondom(500),
        10+getRondom(500),
        177,100,0,"");
		shape.draw();
	},

  addCircle: function(e) {
    e.preventDefault();
		var shape = new ShapeD3.circle(null,
        10+getRondom(500),
        10+getRondom(500),
        100,0,"");
		shape.draw();
	},

  saveAsPng: function(e) {
    var svg = document.querySelector("svg");
    var svgData = new XMLSerializer().serializeToString(svg);
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", 1680);
    canvas.setAttribute("height", 2520);
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    img.setAttribute("width", 1680);
    img.setAttribute("height", 2520);
    ctx.drawImage(img, 0, 0);
    var a = document.createElement("a");
    a.download = "fallback.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }
});

