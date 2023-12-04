import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }



getMockCode(): any {
  return this.code
}
public code: any={
  "name": "Root",
  "image": "https://example.com/root-image.jpg",
  "children": [
    {
      "name": "Level 1A",
      "image": "https://example.com/level-1a-image.jpg",
      "children": [
        {
          "name": "Level 2A",
          "image": "https://example.com/level-2a-image.jpg",
          "children": [
            {
              "name": "Level 3A",
              "image": "https://example.com/level-3a-image.jpg",
              "children": [
                {
                  "name": "Level 4A",
                  "image": "https://example.com/level-4a-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4B",
                  "image": "https://example.com/level-4b-image.jpg",
                  "children": []
                }
              ]
            },
            {
              "name": "Level 3B",
              "image": "https://example.com/level-3b-image.jpg",
              "children": [
                {
                  "name": "Level 4C",
                  "image": "https://example.com/level-4c-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4D",
                  "image": "https://example.com/level-4d-image.jpg",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Level 2B",
          "image": "https://example.com/level-2b-image.jpg",
          "children": [
            {
              "name": "Level 3C",
              "image": "https://example.com/level-3c-image.jpg",
              "children": [
                {
                  "name": "Level 4E",
                  "image": "https://example.com/level-4e-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4F",
                  "image": "https://example.com/level-4f-image.jpg",
                  "children": []
                }
              ]
            },
            {
              "name": "Level 3D",
              "image": "https://example.com/level-3d-image.jpg",
              "children": [
                {
                  "name": "Level 4G",
                  "image": "https://example.com/level-4g-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4H",
                  "image": "https://example.com/level-4h-image.jpg",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "Level 1B",
      "image": "https://example.com/level-1b-image.jpg",
      "children": [
        {
          "name": "Level 2C",
          "image": "https://example.com/level-2c-image.jpg",
          "children": [
            {
              "name": "Level 3E",
              "image": "https://example.com/level-3e-image.jpg",
              "children": [
                {
                  "name": "Level 4I",
                  "image": "https://example.com/level-4i-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4J",
                  "image": "https://example.com/level-4j-image.jpg",
                  "children": []
                }
              ]
            },
            {
              "name": "Level 3F",
              "image": "https://example.com/level-3f-image.jpg",
              "children": [
                {
                  "name": "Level 4K",
                  "image": "https://example.com/level-4k-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4L",
                  "image": "https://example.com/level-4l-image.jpg",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Level 2D",
          "image": "https://example.com/level-2d-image.jpg",
          "children": [
            {
              "name": "Level 3G",
              "image": "https://example.com/level-3g-image.jpg",
              "children": [
                {
                  "name": "Level 4M",
                  "image": "https://example.com/level-4m-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4N",
                  "image": "https://example.com/level-4n-image.jpg",
                  "children": []
                }
              ]
            },
            {
              "name": "Level 3H",
              "image": "https://example.com/level-3h-image.jpg",
              "children": [
                {
                  "name": "Level 4O",
                  "image": "https://example.com/level-4o-image.jpg",
                  "children": []
                },
                {
                  "name": "Level 4P",
                  "image": "https://example.com/level-4p-image.jpg",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
}
