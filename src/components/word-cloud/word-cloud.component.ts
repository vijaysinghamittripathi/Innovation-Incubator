import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as D3 from 'd3';
import { Events } from 'ionic-angular';
import { Data } from '../../share/data';

declare let d3: any;

@Component({
  selector   : 'app-word-cloud',
  template: `<div class="word-cloud"></div>`
})
export class WordCloudComponent implements OnInit {

  @Input() wordData;
  @Output() selectedCategory = new EventEmitter<any>();
  data = [];
  private settingsData;

  private svg;               // SVG in which we will print our chart
  private margin: {          // Space between the svg borders and the actual chart graphic
    top: number,
    right: number,
    bottom: number,
    left: number
  };
  private width: number;      // Component width
  private height: number;     // Component height
  private fillScale;          // D3 scale for text color
  tempData = [];
  private thisref;

  constructor(public events: Events) {
    this.settingsData = Data;
  }

  ngOnInit() {
    this.thisref = this;
   }

  public renderCloud(wordData) {
    let numChars = wordData.length;
    const cls = this;
    this.data = (wordData).map(function(d) {
      return {text: d.categoryObject.category_name, size: cls.calculateFontSize(d.innovationCount, numChars)};
    });
    this.setup();
    this.buildSVG();
    this.populate();
  }

  private calculateFontSize(num, datalength): Number {
    const minFontSize: number =  (this.settingsData.minFontSize == null) ? 18 : this.settingsData.minFontSize;
    const maxFontSize: number = (this.settingsData.maxFontSize == null) ? 96 : this.settingsData.maxFontSize;;
    

    let steps = Math.round(maxFontSize/datalength);
    let fontsize = num* steps;
    if (fontsize == 0) {
      fontsize = minFontSize;
    }
    if (fontsize < minFontSize) {
      fontsize = minFontSize + num;
    }
    return fontsize
  }

  /* private getRandom() {
    const size = 10 + Math.random() * 100;
    if (size > 70 && this.tempData.length <= 10) {
      this.tempData.push(size);
    }

    if (this.tempData.length > 10 && size > 14) {
      return 12;
    }
   
    return size;
  }
*/
  private setup() {
    this.margin = {
      top   : 10,
      right : 10,
      bottom: 10,
      left  : 10
    };
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = window.innerHeight  - this.margin.top - this.margin.bottom;
    this.fillScale = D3.scaleOrdinal(D3.schemeCategory20);
  }

  private buildSVG() {
    this.svg = D3.select('div.word-cloud')
                    .append('svg')
                    .attr('width', this.width + this.margin.left + this.margin.right)
                    .attr('height', this.height + this.margin.top + this.margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + ~~(this.width / 2) + ',' + ~~(this.height / 2) + ')');
  }

  private populate() {
    const fontFace: string = (this.settingsData.fontFace == null) ? 'Roboto' : this.settingsData.fontFace;
    const fontWeight: string = (this.settingsData.fontWeight == null) ? 'bold' : this.settingsData.fontWeight;
    const spiralType: string = (this.settingsData.spiral == null) ? 'archimedean' : this.settingsData.spiral;
    
    d3.layout.cloud()
      .size([this.width, this.height])
      .words(this.data)
      .padding(5)
      .rotate(() => (~~(Math.random() * 2) * 0))
      .font(fontFace)
      .fontWeight(fontWeight)
      .fontSize(d => ((d.size)))
      .spiral(spiralType)
      .on('end', () => {
        this.drawWordCloud(this.data);
      })
      .start();
  }

 

  private drawWordCloud(words) {
    let cloud = this.svg
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-weight', 'bold')
        .style('cursor','pointer')
        .style('font-size', d => d.size + 'px')
        .on('click', d => {
          this.events.publish('selected:category', d.text);
        })
        .style('fill', (d, i) => {
          return this.fillScale(i);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
        .attr('class', 'word-cloud')
        .text(d => {
          return d.text;
        });

  }

}
