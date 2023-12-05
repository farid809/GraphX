import { Component, OnInit } from '@angular/core';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import ctxmenu from 'cytoscape-cxtmenu';
import  jsonPath from 'jsonpath';
import { RefreshService } from '../../refresh.service';
import { Subscription } from 'rxjs';
import {
  Blade,
  BladeManager
} from '../../blader/index';
import { GraphService } from '../../graph.service';

@Component({
  selector: 'tw-detail',
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.less'

})
export class GraphViewComponent implements Blade, OnInit {
  public id: number;
  public title = 'Graph View';
  public isDirty = false;

  public viewDefId: string;
  public objKey: string;

  public cy: cytoscape.Core;
  private options: any;
  private defaults: any;
  private layout: any;
  private ctxmenu: any;
  public defaultState: any= 2;

  private refreshSubscription: Subscription;
  private graphServiceSubscription: Subscription;

  public graph: any;

  showPopup = false;

  isPanelOpen = true;

  private monacoEditor: monaco.editor.IStandaloneCodeEditor;
  editorOptions = { theme: 'vs-light', language: 'json' };
  code: string = '';


  public constructor(
    private _mgr: BladeManager,
    private refreshService: RefreshService,
    private graphService: GraphService
  ) { }

  public ngOnInit(): void {
    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
    this.objKey = this._mgr.getParamValue<string>(this.id, 'objKey');
    this.demoCytoscape();

    this.refreshSubscription = this.refreshService.getRefreshObservable().subscribe(() => {
      setTimeout(() => {
        this.refresh();
      }, 1)});

    
    this.graphServiceSubscription = this.graphService.getJsonData().subscribe((graphData)=>{
       this.graph=graphData;
       
       this.refresh();
       console.log(this.graph);


    });
    

  }

  togglePopup() {

  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }


  refresh() {

   this.demoCytoscape();


  }

  public newTitle(): void {
    this.title = new Date().toDateString();
    this.isDirty = true;
  }

  public cancel(): void {
    this.isDirty = false;
  }

  public select(id: string): void {
    this._mgr.select(Number.parseFloat(id));
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
  demoCytoscape(): void {

    cytoscape.use(dagre);
    cytoscape.use(ctxmenu);
    
    this.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,



      elements: this.graph,


      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#D3D3D3' ,
            'background-image' : (node: any) => jsonPath.query(node.data(), '$.image')[0],
            'background-fit': 'cover',
             'font-size' : '8px'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 2,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        },
        {
          "selector": ".multiline-auto",
          "style": {
            "text-wrap": "wrap",
            "text-max-width" : "80"
          }
        },
        {
          "selector": "node[label]",
          "style": {
            "label": "data(label)"
          }
        },
      
        {
          "selector": "edge[label]",
          "style": {
            "label": "data(label)",
            "width": 3
          }
        },
      
        {
          "selector": ".top-left",
          "style": {
            "text-valign": "top",
            "text-halign": "left"
          }
        },
      
        {
          "selector": ".top-center",
          "style": {
            "text-valign": "top",
            "text-halign": "center"
          }
        },
      
        {
          "selector": ".top-right",
          "style": {
            "text-valign": "top",
            "text-halign": "right"
          }
        },
      
        {
          "selector": ".center-left",
          "style": {
            "text-valign": "center",
            "text-halign": "left"
          }
        },
      
        {
          "selector": ".center-center",
          "style": {
            "text-valign": "center",
            "text-halign": "center"
          }
        },
      
        {
          "selector": ".center-right",
          "style": {
            "text-valign": "center",
            "text-halign": "right"
          }
        },
      
        {
          "selector": ".bottom-left",
          "style": {
            "text-valign": "bottom",
            "text-halign": "left"
          }
        },
      
        {
          "selector": ".bottom-center",
          "style": {
            "text-valign": "bottom",
            "text-halign": "center"
          }
        },
      
        {
          "selector": ".bottom-right",
          "style": {
            "text-valign": "bottom",
            "text-halign": "right"
          }
        },
      
        {
          "selector": ".multiline-manual",
          "style": {
            "text-wrap": "wrap"
          }
        },
    
      
        {
          "selector": ".background",
          "style": {
            "text-background-opacity": 1,
            "color": "#fff",
            "text-background-color": "#888",
            "text-background-shape": "roundrectangle",
            "text-border-color": "#000",
            "text-border-width": 1,
            "text-border-opacity": 1
          }
        },
      
        {
          "selector": ".outline",
          "style": {
            "color": "#fff",
            "text-outline-color": "#888",
            "text-outline-width": 3
          }
        },
        {
          "selector": ".bottom-center",
          "style": {
            "text-valign": "bottom",
            "text-halign": "center"
          }
        },
        {
          selector: 'node.hidden',
          style: {
            'display': 'none'
          }
        }
      ],
    });



    this.options = {
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


    this.defaults = {
      // dagre algo options, uses default value on undefined
      name: 'dagre',
      nodeSep: undefined, // the separation between adjacent nodes in the same rank
      edgeSep: undefined, // the separation between adjacent edges in the same rank
      rankSep: undefined, // the separation between adjacent nodes in the same rank
      rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
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

    this.cy.on('click', 'node', (event) => {
      const node = event.target;
    //  console.log('Clicked node:' , node.data());

      // You can do more here, like showing details of the node or triggering Angular-specific logic

      
    });
    this.layout = this.cy.layout(this.defaults);
    // let layout=this.cy.layout();
     //this.cy.minZoom(0.5);
     this.cy.maxZoom(3);
     this.cy.zoom();

     this.cy.style()
  .selector('edge')
  .style({
    'label': 'data(label)', // Assuming you have labels in data
    'text-rotation': 'autorotate',
    'font-size' : '8px',
     'text-margin-x' : -5
  })
  .update();




 //this.cy.nodes().not(this.cy.$('#root')).style("display","none")

 
 this.cy.nodes().addClass("multiline-auto");
 this.cy.nodes().addClass("bottom-center");
 this.cy.on('tap', 'node', (event) => {
  const tappedNode = event.target;
  // Change the style of the tapped node(s)
 
 if(tappedNode.connectedEdges().length>1 )
 {
  console.log(tappedNode.connectedEdges().length)
    if (tappedNode.connectedEdges().targets()[1].style("display") == "none"){
    //show the nodes and edges
    tappedNode.connectedEdges().targets().style("display", "element");
  } else {
    //hide the children nodes and edges recursively
    tappedNode.successors().targets().style("display", "none");
  }



  this.cy.animate({
    fit: {
      eles: tappedNode,
      padding: 50 // Adjust padding as needed
    },
    duration: 1000 // Animation duration in milliseconds
  });
  //this.cy.layout({ name: 'cose' }).run();
}
});


//  this.cy.on('tap', 'node', function(){
//   //if the node's children have been hidden
//   //getting the element at 1 because the element at 0 is the node itself
//   //want to check if its children are hidden
//   if (this.connectedEdges().targets()[1].style("display") == "none"){
//     //show the nodes and edges
//     this.connectedEdges().targets().style("display", "element");
//   } else {
//     //hide the children nodes and edges recursively
//     this.successors().targets().style("display", "none");
//   }

  
//   console.log(this)

 
// }); 


    this.cy.cxtmenu({
      selector: 'node, edge',
      outsideMenuCancel: 10,
      commands: [
        {
          content: '<span class="fa fa-flash fa-2x"></span>',
          select: function(ele){
            console.log( ele.id() );
          }
        },

        {
          content: '<span class="fa fa-star fa-2x"></span>',
          select: function(ele){
            console.log( ele.data('name') );
          },
          enabled: false
        },

        {
          content: 'Node Details',
          select: (ele)=>{
            let node=ele;
            
            this.code=JSON.stringify(node.data().original,null, 2)
            this.monacoEditor.layout();
            console.log(node.data().original)



          }
        }
      ]
    });


    this.layout.run();



 //this.cy.fit( this.cy.$('#root'));


    // this.cy.elements().remove();
    // this.cy.add(this.elements);
    // this.layout = this.cy.layout(this.defaults);
    // // let layout=this.cy.layout();
    //  //this.cy.minZoom(0.5);
    //  this.cy.maxZoom(3);
    //  this.cy.zoom();

    // this.layout.run();

   
  }

  refreshLayout(){
    this.layout.run();
  
  }

  // demoCytoscape() {
   

  //   cytoscape.use(dagre);
  //   this.cy = cytoscape({
  //     container: document.getElementById('cy'),

  //     boxSelectionEnabled: false,
  //     autounselectify: true,



  //     elements: this.graph,


  //     style: [
  //       {
  //         selector: 'node',
  //         style: {
  //           'background-color': '#11479e'
  //         }
  //       },

  //       {
  //         selector: 'edge',
  //         style: {
  //           'width': 4,
  //           'target-arrow-shape': 'triangle',
  //           'line-color': '#9dbaea',
  //           'target-arrow-color': '#9dbaea',
  //           'curve-style': 'bezier'
  //         }
  //       }
  //     ],
  //   });



  //   let options = {
  //     // On/Off Modules
  //     /* From the following four snap options, at most one should be true at a given time */
  //     snapToGridOnRelease: true, // Snap to grid on release
  //     snapToGridDuringDrag: true, // Snap to grid during drag
  //     snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
  //     snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
  //     distributionGuidelines: false, // Distribution guidelines
  //     geometricGuideline: false, // Geometric guidelines
  //     initPosAlignment: false, // Guideline to initial mouse position
  //     centerToEdgeAlignment: false, // Center to edge alignment
  //     resize: false, // Adjust node sizes to cell sizes
  //     parentPadding: false, // Adjust parent sizes to cell sizes by padding
  //     drawGrid: true, // Draw grid background

  //     // General
  //     gridSpacing: 20, // Distance between the lines of the grid.

  //     // Draw Grid
  //     zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
  //     panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
  //     gridStackOrder: -1, // Namely z-index
  //     gridColor: '#dedede', // Color of grid lines
  //     lineWidth: 1.0, // Width of grid lines

  //     // Guidelines
  //     guidelinesStackOrder: 4, // z-index of guidelines
  //     guidelinesTolerance: 2.00, // Tolerance distance for rendered positions of nodes' interaction.
  //     guidelinesStyle: { // Set ctx properties of line. Properties are here:
  //       strokeStyle: "#8b7d6b", // color of geometric guidelines
  //       geometricGuidelineRange: 400, // range of geometric guidelines
  //       range: 100, // max range of distribution guidelines
  //       minDistRange: 10, // min range for distribution guidelines
  //       distGuidelineOffset: 10, // shift amount of distribution guidelines
  //       horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
  //       verticalDistColor: "#00ff00", // color of vertical distribution alignment
  //       initPosAlignmentColor: "#0000ff", // color of alignment to initial mouse location
  //       lineDash: [0, 0], // line style of geometric guidelines
  //       horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
  //       verticalDistLine: [0, 0], // line style of vertical distribution guidelines
  //       initPosAlignmentLine: [0, 0], // line style of alignment to initial mouse position
  //     },

  //     // Parent Padding
  //     parentSpacing: -1 // -1 to set paddings of parents to gridSpacing
  //   };


  //   let defaults = {
  //     // dagre algo options, uses default value on undefined
  //     name: 'dagre',
  //     nodeSep: undefined, // the separation between adjacent nodes in the same rank
  //     edgeSep: undefined, // the separation between adjacent edges in the same rank
  //     rankSep: undefined, // the separation between adjacent nodes in the same rank
  //     rankDir: 'LR', // 'TB' for top to bottom flow, 'LR' for left to right,
  //     align: undefined,  // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
  //     acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
  //     // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
  //     ranker: undefined, // Type of algorithm to assigns a rank to each node in the input graph.
  //     // Possible values: network-simplex, tight-tree or longest-path
  //     minLen: function (edge: any) { return 1; }, // number of ranks to keep between the source and target of the edge
  //     edgeWeight: function (edge: any) { return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

  //     // general layout options
  //     fit: true, // whether to fit to viewport
  //     padding: 30, // fit padding
  //     spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  //     nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
  //     animate: false, // whether to transition the node positions
  //     animateFilter: function (node: any, i: any) { return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  //     animationDuration: 500, // duration of animation in ms if enabled
  //     animationEasing: undefined, // easing of animation if enabled
  //     boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  //     transform: function (node: any, pos: any) { return pos; }, // a function that applies a transform to the final node position
  //     ready: function () { }, // on layoutready
  //     sort: undefined, // a sorting function to order the nodes and edges; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  //     // because cytoscape dagre creates a directed graph, and directed graphs use the node order as a tie breaker when
  //     // defining the topology of a graph, this sort function can help ensure the correct order of the nodes/edges.
  //     // this feature is most useful when adding and removing the same nodes and edges multiple times in a graph.
  //     stop: function () { } // on layoutstop
  //   };

  //   this.layout = this.cy.layout(defaults
  //   )
  //   // let layout=this.cy.layout();
  //    //this.cy.minZoom(0.5);
  //    this.cy.maxZoom(3);
  //    this.cy.zoom();

  //   this.layout.run();


  // }
  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor) {
    this.monacoEditor = editor;
    setTimeout(() => {
      this.monacoEditor.layout();


    }, 1);
  }
 
}
