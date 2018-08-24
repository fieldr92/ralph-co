export default {
  "frames": [
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image.png",
          "sheen": { "type": "simple", "duration": 1000, "delay": 1000},
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        },
        {
          "type": "spritesheet",
          "src": "spritesheet.png",
          "start-time": 1000,
          "count": 100,
          "framerate": 25,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "zoom", "direction": "none", "duration": 0, "delay": 500 }
        }
      ]
    },
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image2.png",
          "sheen": { "type": "simple", "duration": 1000, "delay": 1000},
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        },
        {
          "type": "image",
          "src": "image3.png",
          "sheen": { "type": "simple", "duration": 1000, "delay": 1000},
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        },
        {
          "type": "image",
          "src": "image4.png",
          "sheen": { "type": "simple", "duration": 1000, "delay": 1000},
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        },
        {
          "type": "text",
          "text-input": "hello world",
          "sheen": { "type": "simple", "duration": 1000, "delay": 1000},
          "start-time": 1000,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        }
      ]
    }
  ]
}