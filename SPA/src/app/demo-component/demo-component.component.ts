import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrl: './demo-component.component.less'
})
export class DemoComponentComponent implements OnInit {
  
  editorOptions = {theme: 'vs-dark', language: 'json'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  private monacoEditor: monaco.editor.IStandaloneCodeEditor;

  public cy: cytoscape.Core;
  private options: any;
  private defaults: any;
  private layout: any;



  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.monacoEditor = editor;
  }
  
  ngOnInit(): void {
   this.demoJquery();
   this.demoCytoscape();
  }

  demoJquery()
  {
    $('button').click( evt=>{
      alert('Hello world from Jquery button');
      console.log(evt);
    })
  }

  public graph: any = {
    nodes: [
      { data: { id: 'n0' } },
      { data: { id: 'n1' } },
      { data: { id: 'n2' } },
      { data: { id: 'n3' } },
      { data: { id: 'n4' } },
      { data: { id: 'n5' } },
      { data: { id: 'n6' } },
      { data: { id: 'n7' } },
      { data: { id: 'n8' } },
      { data: { id: 'n9' } },
      { data: { id: 'n10' } },
      { data: { id: 'n11' } },
      { data: { id: 'n12' } },
      { data: { id: 'n13' } },
      { data: { id: 'n14' } },
      { data: { id: 'n15' } },
      { data: { id: 'n16' } }
    ],
    edges: [
      { data: { source: 'n0', target: 'n1' } },
      { data: { source: 'n1', target: 'n2' } },
      { data: { source: 'n1', target: 'n3' } },
      { data: { source: 'n4', target: 'n5' } },
      { data: { source: 'n4', target: 'n6' } },
      { data: { source: 'n6', target: 'n7' } },
      { data: { source: 'n6', target: 'n8' } },
      { data: { source: 'n8', target: 'n9' } },
      { data: { source: 'n8', target: 'n10' } },
      { data: { source: 'n11', target: 'n12' } },
      { data: { source: 'n12', target: 'n13' } },
      { data: { source: 'n13', target: 'n14' } },
      { data: { source: 'n13', target: 'n15' } },
    ]
  }

  public showAllStyle: cytoscape.Stylesheet[] = [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-shape': 'triangle'
        //'curve-style': 'segments',
        //'source-endpoint': '180deg',
        //'target-endpoint': '0deg'
      }
    },
    {
      selector: 'node[type= "bendPoint"]',
      style: {
        'width': '1.00001px',
        'height': '1.00001px'
      }
    },
    {
      selector: 'node[type = "node"]',
      style: {
        'width': '60px',
        'height': '40px',
        'content': 'data(id)',
        'font-size': 4,
        'text-valign': 'center',
        'text-halign': 'center'
      }
    },
    {
      selector: 'edge[type = "bendPoint" ]',
      style: {
        'width': 1,
        'target-arrow-shape': 'none',
        'opacity': 1
      }
    },
    {
      selector: '.eh-handle',
      style: {
        'label': ''
      }
    },
    {
      selector: '.eh-ghost',
      style: {
        'label': ''

      }
    }
  ];


  demoCytoscape() {
   

    cytoscape.use(dagre);
    this.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,



      elements: this.graph,


      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#11479e'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        }
      ],
    });



    let options = {
      // On/Off Modules
      /* From the following four snap options, at most one should be true at a given time */
      snapToGridOnRelease: true, // Snap to grid on release
      snapToGridDuringDrag: true, // Snap to grid during drag
      snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
      snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
      distributionGuidelines: false, // Distribution guidelines
      geometricGuideline: false, // Geometric guidelines
      initPosAlignment: false, // Guideline to initial mouse position
      centerToEdgeAlignment: false, // Center to edge alignment
      resize: false, // Adjust node sizes to cell sizes
      parentPadding: false, // Adjust parent sizes to cell sizes by padding
      drawGrid: true, // Draw grid background

      // General
      gridSpacing: 20, // Distance between the lines of the grid.

      // Draw Grid
      zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
      panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
      gridStackOrder: -1, // Namely z-index
      gridColor: '#dedede', // Color of grid lines
      lineWidth: 1.0, // Width of grid lines

      // Guidelines
      guidelinesStackOrder: 4, // z-index of guidelines
      guidelinesTolerance: 2.00, // Tolerance distance for rendered positions of nodes' interaction.
      guidelinesStyle: { // Set ctx properties of line. Properties are here:
        strokeStyle: "#8b7d6b", // color of geometric guidelines
        geometricGuidelineRange: 400, // range of geometric guidelines
        range: 100, // max range of distribution guidelines
        minDistRange: 10, // min range for distribution guidelines
        distGuidelineOffset: 10, // shift amount of distribution guidelines
        horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
        verticalDistColor: "#00ff00", // color of vertical distribution alignment
        initPosAlignmentColor: "#0000ff", // color of alignment to initial mouse location
        lineDash: [0, 0], // line style of geometric guidelines
        horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
        verticalDistLine: [0, 0], // line style of vertical distribution guidelines
        initPosAlignmentLine: [0, 0], // line style of alignment to initial mouse position
      },

      // Parent Padding
      parentSpacing: -1 // -1 to set paddings of parents to gridSpacing
    };


    let defaults = {
      // dagre algo options, uses default value on undefined
      name: 'dagre',
      nodeSep: undefined, // the separation between adjacent nodes in the same rank
      edgeSep: undefined, // the separation between adjacent edges in the same rank
      rankSep: undefined, // the separation between adjacent nodes in the same rank
      rankDir: 'LR', // 'TB' for top to bottom flow, 'LR' for left to right,
      align: undefined,  // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
      acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
      // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
      ranker: undefined, // Type of algorithm to assigns a rank to each node in the input graph.
      // Possible values: network-simplex, tight-tree or longest-path
      minLen: function (edge: any) { return 1; }, // number of ranks to keep between the source and target of the edge
      edgeWeight: function (edge: any) { return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

      // general layout options
      fit: true, // whether to fit to viewport
      padding: 30, // fit padding
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
      animate: false, // whether to transition the node positions
      animateFilter: function (node: any, i: any) { return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      transform: function (node: any, pos: any) { return pos; }, // a function that applies a transform to the final node position
      ready: function () { }, // on layoutready
      sort: undefined, // a sorting function to order the nodes and edges; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      // because cytoscape dagre creates a directed graph, and directed graphs use the node order as a tie breaker when
      // defining the topology of a graph, this sort function can help ensure the correct order of the nodes/edges.
      // this feature is most useful when adding and removing the same nodes and edges multiple times in a graph.
      stop: function () { } // on layoutstop
    };

    let layout = this.cy.layout(defaults
    )
    // let layout=this.cy.layout();
     //this.cy.minZoom(0.5);
     this.cy.maxZoom(3);
     this.cy.zoom();

    layout.run();


  }
  
  }


 


