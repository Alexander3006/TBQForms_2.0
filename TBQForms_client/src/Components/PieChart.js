'use strict';

import React, {createRef} from 'react';
import * as d3 from 'd3';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    const {width, height} = this.props;
    this.radius = Math.min(width, height) / 2;
    this.pie = d3.pie().padAngle(0.05)
        .value((d) => d.number)
        .value((d) => d.value)
        .sort(null);
    this.ref = createRef();

    this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    this.props.setColor(this.colors);
  }

  componentDidMount() {
    const {total} = this.props;
    const {data} = this.props;
    console.dir(data);
    const arc = d3.arc()
        .innerRadius(this.radius/2)
        .outerRadius(this.radius);

    const arcOver = d3.arc()
        .innerRadius(this.radius/2)
        .outerRadius(this.radius * 1.1);

    const svg = d3.select(this.ref.current)
        .attr('width', this.props.width * 1.2)
        .attr('height', this.props.height * 1.2);

    const arcs = svg.selectAll('g')
        .data(this.pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr(`transform`, `translate(${this.radius * 1.2}, ${this.radius * 1.2})`)
        .on('mouseenter', function(d) {
          d3.select(this).select('text')
              .text((d) => Math.round(d.value * total / 100));

          d3.select(this).select('path')
              .transition()
              .duration(1000)
              .attr('d', arcOver);
        })
        .on('mouseleave', function(d) {
          d3.select(this).select('text')
              .text((d) => d.value!=0? d.value + '%': '');

          d3.select(this).select('path').transition()
              .duration(500)
              .attr('d', arc);
        });

    arcs.append('path')
        .attr('fill', (d, i) => this.colors(i))
        .attr('stroke', 'white')
        .attr('d', arc);

    arcs.append('text')
        .attr('transform', (d)=> 'translate(' + arc.centroid(d) + ')')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text((d) => d.value!=0? d.value + '%': '');
  }

  render() {
    return (
      <svg ref={this.ref}/>
    );
  }
}

export default PieChart;
