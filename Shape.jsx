/** @jsx React.DOM */
'use strict'
var React = require('react')

module.exports = React.createClass({
  displayName: 'Shape',
  propTypes: {
    id: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    w: React.PropTypes.number,
    h: React.PropTypes.number
  },

  render: function() {
    var group = maingroup.append('g').attr({
      transform:"translate("+this.x+","+this.y+")",
      id:'shape'+this.id
    });
    group.shapeObj = this;
    var block = group.append('rect').attr({
      x:0, y:0, width:177, height:100, rx:0, ry:0,
      fill: "rgb(236, 240, 241)", stroke: "#1f2c39",
    }).style({'stroke-width': 3,})

    var identifyId = group.append('text').attr({
      x:88.5, y:64, fontWeight: 'bold', fill: '#333333', "text-anchor":"middle"
    }).style({ "font-size": "40px", "font-family": "Arial Black" }).text(this.id)
  }
})

