import React, { useState, useRef, useEffect } from 'react';
import { 
  Image, Type, Square, Circle, Download, Save, Undo, Redo, 
  ZoomIn, ZoomOut, Trash2, Eye, EyeOff, Copy, AlignLeft, 
  AlignCenter, AlignRight, Bold, Italic, Upload, Layers,
  Grid, Palette, Filter, Sun, Moon, Droplet, ChevronDown,
  Move, RotateCw, FlipHorizontal, Star, Heart, ArrowLeft
} from 'lucide-react';

const ProfessionalEditor = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [layers, setLayers] = useState([]);
  const [zoom, setZoom] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [activeTool, setActiveTool] = useState('select');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState('normal');
  const fileInputRef = useRef(null);

  // Initialize Fabric Canvas
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fabric && canvasRef.current && !fabricCanvas) {
      const canvas = new window.fabric.Canvas(canvasRef.current, {
        width: canvasSize.width,
        height: canvasSize.height,
        backgroundColor: bgColor,
        preserveObjectStacking: true
      });

      canvas.on('selection:created', (e) => {
        setActiveObject(e.selected[0]);
      });

      canvas.on('selection:updated', (e) => {
        setActiveObject(e.selected[0]);
      });

      canvas.on('selection:cleared', () => {
        setActiveObject(null);
      });

      canvas.on('object:added', () => {
        updateLayers(canvas);
      });

      canvas.on('object:removed', () => {
        updateLayers(canvas);
      });

      setFabricCanvas(canvas);
    }
  }, [canvasRef.current]);

  // Load Fabric.js library
  useEffect(() => {
    if (!window.fabric) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const updateLayers = (canvas) => {
    const objects = canvas.getObjects();
    const layerList = objects.map((obj, idx) => ({
      id: idx,
      name: obj.name || `${obj.type} ${idx + 1}`,
      type: obj.type,
      visible: obj.visible !== false,
      object: obj
    }));
    setLayers(layerList.reverse());
  };

  // Add Text
  const addText = () => {
    if (!fabricCanvas) return;
    
    const text = new window.fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: 'Arial',
      fontWeight: fontWeight
    });
    text.name = 'Text Layer';
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
  };

  // Add Shape
  const addShape = (shapeType) => {
    if (!fabricCanvas) return;
    
    let shape;
    if (shapeType === 'rectangle') {
      shape = new window.fabric.Rect({
        left: 150,
        top: 150,
        width: 200,
        height: 150,
        fill: textColor,
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Rectangle';
    } else if (shapeType === 'circle') {
      shape = new window.fabric.Circle({
        left: 150,
        top: 150,
        radius: 100,
        fill: textColor,
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Circle';
    } else if (shapeType === 'triangle') {
      shape = new window.fabric.Triangle({
        left: 150,
        top: 150,
        width: 150,
        height: 150,
        fill: textColor,
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Triangle';
    } else if (shapeType === 'star') {
      const points = [];
      const spikes = 5;
      const outerRadius = 80;
      const innerRadius = 40;
      
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / spikes) * i;
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      
      shape = new window.fabric.Polygon(points, {
        left: 150,
        top: 150,
        fill: textColor,
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Star';
    }
    
    if (shape) {
      fabricCanvas.add(shape);
      fabricCanvas.setActiveObject(shape);
      fabricCanvas.renderAll();
    }
  };

  // Upload Image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      window.fabric.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(400);
        img.name = 'Uploaded Image';
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  // Delete Selected Object
  const deleteSelected = () => {
    if (!fabricCanvas || !activeObject) return;
    fabricCanvas.remove(activeObject);
    fabricCanvas.renderAll();
  };

  // Duplicate Selected Object
  const duplicateSelected = () => {
    if (!fabricCanvas || !activeObject) return;
    activeObject.clone((cloned) => {
      cloned.set({
        left: cloned.left + 20,
        top: cloned.top + 20
      });
      fabricCanvas.add(cloned);
      fabricCanvas.setActiveObject(cloned);
      fabricCanvas.renderAll();
    });
  };

  // Alignment Functions
  const alignObject = (alignment) => {
    if (!fabricCanvas || !activeObject) return;
    
    const canvasCenter = fabricCanvas.getCenter();
    
    switch(alignment) {
      case 'left':
        activeObject.set({ left: 0 });
        break;
      case 'center':
        activeObject.set({ left: canvasCenter.left });
        activeObject.setCoords();
        break;
      case 'right':
        activeObject.set({ left: fabricCanvas.width - activeObject.width * activeObject.scaleX });
        break;
    }
    fabricCanvas.renderAll();
  };

  // Zoom Functions
  const handleZoom = (direction) => {
    if (!fabricCanvas) return;
    
    let newZoom = zoom;
    if (direction === 'in') {
      newZoom = Math.min(zoom + 10, 200);
    } else {
      newZoom = Math.max(zoom - 10, 50);
    }
    
    const zoomLevel = newZoom / 100;
    fabricCanvas.setZoom(zoomLevel);
    setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  // Export Canvas
  const exportCanvas = (format = 'png') => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: format,
      quality: 1,
      multiplier: 2
    });
    
    const link = document.createElement('a');
    link.download = `matty-design.${format}`;
    link.href = dataURL;
    link.click();
  };

  // Apply Filter
  const applyFilter = (filterType) => {
    if (!fabricCanvas || !activeObject || activeObject.type !== 'image') return;

    activeObject.filters = [];
    
    switch(filterType) {
      case 'grayscale':
        activeObject.filters.push(new window.fabric.Image.filters.Grayscale());
        break;
      case 'sepia':
        activeObject.filters.push(new window.fabric.Image.filters.Sepia());
        break;
      case 'brightness':
        activeObject.filters.push(new window.fabric.Image.filters.Brightness({ brightness: 0.2 }));
        break;
      case 'contrast':
        activeObject.filters.push(new window.fabric.Image.filters.Contrast({ contrast: 0.3 }));
        break;
    }
    
    activeObject.applyFilters();
    fabricCanvas.renderAll();
  };

  // Flip and Rotate
  const flipObject = (direction) => {
    if (!fabricCanvas || !activeObject) return;
    
    if (direction === 'horizontal') {
      activeObject.set('flipX', !activeObject.flipX);
    } else {
      activeObject.set('flipY', !activeObject.flipY);
    }
    fabricCanvas.renderAll();
  };

  const rotateObject = () => {
    if (!fabricCanvas || !activeObject) return;
    activeObject.rotate((activeObject.angle || 0) + 90);
    fabricCanvas.renderAll();
  };

  // Background Color Change
  const changeBackground = (color) => {
    if (!fabricCanvas) return;
    setBgColor(color);
    fabricCanvas.setBackgroundColor(color, fabricCanvas.renderAll.bind(fabricCanvas));
  };

  // Layer Visibility Toggle
  const toggleLayerVisibility = (layer) => {
    if (!fabricCanvas) return;
    layer.object.visible = !layer.object.visible;
    fabricCanvas.renderAll();
    updateLayers(fabricCanvas);
  };

  // Bring to Front/Back
  const changeLayerOrder = (layer, direction) => {
    if (!fabricCanvas) return;
    
    if (direction === 'front') {
      fabricCanvas.bringToFront(layer.object);
    } else {
      fabricCanvas.sendToBack(layer.object);
    }
    fabricCanvas.renderAll();
    updateLayers(fabricCanvas);
  };

  const templates = [
    { name: 'Instagram Post', size: { width: 1080, height: 1080 } },
    { name: 'Instagram Story', size: { width: 1080, height: 1920 } },
    { name: 'Facebook Post', size: { width: 1200, height: 630 } },
    { name: 'YouTube Thumbnail', size: { width: 1280, height: 720 } },
    { name: 'Twitter Header', size: { width: 1500, height: 500 } },
    { name: 'A4 Document', size: { width: 794, height: 1123 } }
  ];

  const applyTemplate = (template) => {
    if (!fabricCanvas) return;
    
    fabricCanvas.setDimensions({
      width: template.size.width,
      height: template.size.height
    });
    setCanvasSize(template.size);
    fabricCanvas.renderAll();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Tools */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2">
        <button
          onClick={() => setActiveTool('select')}
          className={`p-3 rounded-lg transition ${activeTool === 'select' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
          title="Select Tool"
        >
          <Move className="w-5 h-5" />
        </button>
        
        <button
          onClick={addText}
          className="p-3 hover:bg-gray-100 rounded-lg transition"
          title="Add Text"
        >
          <Type className="w-5 h-5" />
        </button>
        
        <div className="relative group">
          <button
            className="p-3 hover:bg-gray-100 rounded-lg transition"
            title="Add Shape"
          >
            <Square className="w-5 h-5" />
          </button>
          <div className="absolute left-full ml-2 top-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 z-50">
            <button onClick={() => addShape('rectangle')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Rectangle</button>
            <button onClick={() => addShape('circle')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Circle</button>
            <button onClick={() => addShape('triangle')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Triangle</button>
            <button onClick={() => addShape('star')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">Star</button>
          </div>
        </div>
        
        <label className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition" title="Upload Image">
          <Upload className="w-5 h-5" />
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <div className="flex-1"></div>

        <button 
          onClick={() => fabricCanvas?.undo?.()} 
          className="p-3 hover:bg-gray-100 rounded-lg transition" 
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => fabricCanvas?.redo?.()} 
          className="p-3 hover:bg-gray-100 rounded-lg transition" 
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

      {/* Left Panel - Properties & Templates */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-bold text-lg mb-4">Canvas Templates</h3>
          <div className="space-y-2">
            {templates.map((template, idx) => (
              <button
                key={idx}
                onClick={() => applyTemplate(template)}
                className="w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg text-left transition"
              >
                <div className="font-semibold text-sm">{template.name}</div>
                <div className="text-xs text-gray-500">{template.size.width} × {template.size.height}px</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4">Background</h3>
            <div className="grid grid-cols-5 gap-2">
              {['#ffffff', '#000000', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fab1a0'].map((color) => (
                <button
                  key={color}
                  onClick={() => changeBackground(color)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-purple-500 transition"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {activeObject && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Object Properties</h3>
              
              {activeObject.type === 'i-text' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Text Color</label>
                    <input
                      type="color"
                      value={activeObject.fill}
                      onChange={(e) => {
                        activeObject.set('fill', e.target.value);
                        fabricCanvas.renderAll();
                      }}
                      className="w-full h-10 rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-1">Font Size</label>
                    <input
                      type="range"
                      min="12"
                      max="120"
                      value={activeObject.fontSize}
                      onChange={(e) => {
                        activeObject.set('fontSize', parseInt(e.target.value));
                        fabricCanvas.renderAll();
                      }}
                      className="w-full"
                    />
                    <span className="text-sm">{activeObject.fontSize}px</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
                        fabricCanvas.renderAll();
                      }}
                      className={`flex-1 p-2 rounded ${activeObject.fontWeight === 'bold' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                    >
                      <Bold className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => {
                        activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
                        fabricCanvas.renderAll();
                      }}
                      className={`flex-1 p-2 rounded ${activeObject.fontStyle === 'italic' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                    >
                      <Italic className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              )}

              {activeObject.type === 'image' && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Filters</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => applyFilter('grayscale')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">Grayscale</button>
                    <button onClick={() => applyFilter('sepia')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">Sepia</button>
                    <button onClick={() => applyFilter('brightness')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">Brighten</button>
                    <button onClick={() => applyFilter('contrast')} className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">Contrast</button>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => flipObject('horizontal')} className="p-2 bg-blue-100 hover:bg-blue-200 rounded text-sm flex items-center justify-center gap-2">
                    <FlipHorizontal className="w-4 h-4" /> Flip H
                  </button>
                  <button onClick={() => flipObject('vertical')} className="p-2 bg-blue-100 hover:bg-blue-200 rounded text-sm flex items-center justify-center gap-2">
                    <FlipHorizontal className="w-4 h-4 rotate-90" /> Flip V
                  </button>
                  <button onClick={rotateObject} className="p-2 bg-green-100 hover:bg-green-200 rounded text-sm flex items-center justify-center gap-2">
                    <RotateCw className="w-4 h-4" /> Rotate
                  </button>
                  <button onClick={duplicateSelected} className="p-2 bg-purple-100 hover:bg-purple-200 rounded text-sm flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4" /> Duplicate
                  </button>
                </div>
                <button onClick={deleteSelected} className="w-full p-2 bg-red-100 hover:bg-red-200 rounded text-sm flex items-center justify-center gap-2 text-red-600">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/dashboard'} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Dashboard</span>
            </button>
            
            <div className="flex items-center gap-2 ml-8">
              <button onClick={() => handleZoom('out')} className="p-2 hover:bg-gray-100 rounded-lg">
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded min-w-[60px] text-center">{zoom}%</span>
              <button onClick={() => handleZoom('in')} className="p-2 hover:bg-gray-100 rounded-lg">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {activeObject && (
              <div className="flex items-center gap-2 ml-4 border-l pl-4">
                <button onClick={() => alignObject('left')} className="p-2 hover:bg-gray-100 rounded" title="Align Left">
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button onClick={() => alignObject('center')} className="p-2 hover:bg-gray-100 rounded" title="Align Center">
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button onClick={() => alignObject('right')} className="p-2 hover:bg-gray-100 rounded" title="Align Right">
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Design saved! (Connect to backend)')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button 
              onClick={() => exportCanvas('png')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PNG
            </button>
            <button 
              onClick={() => exportCanvas('jpeg')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export JPG
            </button>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8 flex items-center justify-center">
          <div className="shadow-2xl" style={{ display: 'inline-block' }}>
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Layers */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Layers ({layers.length})
            </h3>
          </div>

          {layers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Grid className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No layers yet</p>
              <p className="text-xs">Add text, shapes or images</p>
            </div>
          ) : (
            <div className="space-y-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => {
                    fabricCanvas.setActiveObject(layer.object);
                    fabricCanvas.renderAll();
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    activeObject === layer.object 
                      ? 'bg-purple-50 border-2 border-purple-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {layer.type === 'image' && <Image className="w-4 h-4 text-blue-600" />}
                      {layer.type === 'i-text' && <Type className="w-4 h-4 text-green-600" />}
                      {(layer.type === 'rect' || layer.type === 'circle' || layer.type === 'triangle' || layer.type === 'polygon') && <Square className="w-4 h-4 text-orange-600" />}
                      <span className="font-semibold text-sm">{layer.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLayerVisibility(layer);
                        }}
                        className="p-1 hover:bg-white rounded"
                      >
                        {layer.visible ? <Eye className="w-4 h-4 text-gray-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          fabricCanvas.remove(layer.object);
                          fabricCanvas.renderAll();
                        }}
                        className="p-1 hover:bg-white rounded text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-1 text-xs">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        changeLayerOrder(layer, 'front');
                      }}
                      className="px-2 py-1 bg-white hover:bg-gray-200 rounded"
                    >
                      To Front
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        changeLayerOrder(layer, 'back');
                      }}
                      className="px-2 py-1 bg-white hover:bg-gray-200 rounded"
                    >
                      To Back
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;