export default {
  "background": "background.png",
  "width": 300,
  "height": 250,
  "frames": [
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "duration": 500, "delay": 500 },
          "animation-out": { "type": "fade", "duration": 500, "delay": 2500 }
        },
        {
          "type": "image",
          "src": "spritesheet.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "slide-left", "duration": 500, "delay": 500 },
          "animation-out": { "type": "slide-left", "duration": 500, "delay": 2500 }
        }
      ]
    },
    {
      "duration": 4000,
      "layers": [
        {
          "type": "image",
          "src": "image4.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "fade", "duration": 500, "delay": 1500 },
          "animation-out": { "type": "fade", "duration": 500, "delay": 2000 }
        },
        {
          "type": "image",
          "src": "image2.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "slide-left", "duration": 500, "delay": 500 },
          "animation-out": { "type": "slide-left", "duration": 500, "delay": 3000 }
        },
        {
          "type": "image",
          "src": "image3.png",
          "x": 0,
          "y": 0,
          "animation-in": { "type": "slide-up", "duration": 500, "delay": 500 },
          "animation-out": { "type": "slide-up", "duration": 500, "delay": 3000 }
        }
      ]
    }
  ]
}