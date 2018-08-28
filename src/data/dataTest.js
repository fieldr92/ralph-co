export default {
  "background": "background.png",
  "width": '300px',
  "height": '250px', 
  "frames": [
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 500, "delay": 500 },
          "animation-out": { "type": "fade", "direction": "none", "duration": 500, "delay": 500 }
        },
        {
          "type": "spritesheet",
          "src": "spritesheet.png",
          "start-time": 1000,
          "count": 100,
          "framerate": 25,
          "animation-in": { "type": "fade", "direction": "none", "duration": 500, "delay": 2500 },
          "animation-out": { "type": "zoom", "direction": "none", "duration": 500, "delay": 500 }
        }
      ]
    },
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image2.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 500, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 500, "delay": 1000 }
        },
        {
          "type": "image",
          "src": "image3.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 500, "delay": 2500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 500, "delay": 1000 }
        },
        {
          "type": "image",
          "src": "image4.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "direction": "none", "duration": 500, "delay": 4500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 500, "delay": 1000 }
        },
        {
          "type": "text",
          "text-input": "hello world",
          "start-time": 1000,
          "animation-in": { "type": "fade", "direction": "none", "duration": 0, "delay": 500 },
          "animation-out": { "type": "slide", "direction": "right", "duration": 0, "delay": 500 }
        }
      ]
    }
  ]
}