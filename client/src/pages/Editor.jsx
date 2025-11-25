import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Image, Type, Square, Download, Save, Undo, Redo, 
  ZoomIn, ZoomOut, Trash2, Eye, EyeOff, Copy, AlignLeft, 
  AlignCenter, AlignRight, Bold, Italic, Upload, Layers,
  Grid, Move, RotateCw, FlipHorizontal, ArrowLeft
} from 'lucide-react';

const Editor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [layers, setLayers] = useState([]);
  const [zoom, setZoom] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [bgColor, setBgColor] = useState('#ffffff');
  const fileInputRef = useRef(null);

  // Load Fabric.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
    script.async = true;
    script.onload = () => {
      console.log('Fabric.js loaded');
      setFabricLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Fabric.js');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Canvas
  useEffect(() => {
    if (fabricLoaded && canvasRef.current && !fabricCanvas && window.fabric) {
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
      console.log('Canvas initialized');
    }
  }, [fabricLoaded, canvasRef.current, bgColor]);

  const updateLayers = (canvas) => {
    if (!canvas) return;
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

  const addText = () => {
    if (!fabricCanvas) return;
    
    const text = new window.fabric.IText('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 32,
      fill: '#000000',
      fontFamily: 'Arial'
    });
    text.name = 'Text Layer';
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
  };

  const addShape = (shapeType) => {
    if (!fabricCanvas) return;
    
    let shape;
    if (shapeType === 'rectangle') {
      shape = new window.fabric.Rect({
        left: 150,
        top: 150,
        width: 200,
        height: 150,
        fill: '#6366f1',
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Rectangle';
    } else if (shapeType === 'circle') {
      shape = new window.fabric.Circle({
        left: 150,
        top: 150,
        radius: 100,
        fill: '#ec4899',
        stroke: '#000',
        strokeWidth: 2
      });
      shape.name = 'Circle';
    }
    
    if (shape) {
      fabricCanvas.add(shape);
      fabricCanvas.setActiveObject(shape);
      fabricCanvas.renderAll();
    }
  };

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

  const deleteSelected = () => {
    if (!fabricCanvas || !activeObject) return;
    fabricCanvas.remove(activeObject);
    fabricCanvas.renderAll();
  };

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

  const changeBackground = (color) => {
    if (!fabricCanvas) return;
    setBgColor(color);
    fabricCanvas.setBackgroundColor(color, fabricCanvas.renderAll.bind(fabricCanvas));
  };

  const toggleLayerVisibility = (layer) => {
    if (!fabricCanvas) return;
    layer.object.visible = !layer.object.visible;
    fabricCanvas.renderAll();
    updateLayers(fabricCanvas);
  };

  if (!fabricLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2">
        <button
          onClick={addText}
          className="p-3 hover:bg-gray-100 rounded-lg transition"
          title="Add Text"
        >
          <Type className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => addShape('rectangle')}
          className="p-3 hover:bg-gray-100 rounded-lg transition"
          title="Add Rectangle"
        >
          <Square className="w-5 h-5" />
        </button>

        <button
          onClick={() => addShape('circle')}
          className="p-3 hover:bg-gray-100 rounded-lg transition"
          title="Add Circle"
        >
          <div className="w-5 h-5 border-2 border-current rounded-full"></div>
        </button>
        
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

        {activeObject && (
          <>
            <button 
              onClick={duplicateSelected}
              className="p-3 hover:bg-gray-100 rounded-lg transition" 
              title="Duplicate"
            >
              <Copy className="w-5 h-5" />
            </button>
            
            <button 
              onClick={deleteSelected}
              className="p-3 hover:bg-red-100 text-red-600 rounded-lg transition" 
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Left Panel */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
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

          {activeObject && activeObject.type === 'i-text' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Text Properties</h3>
              
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
            </div>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
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
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Design saved!')}
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
              Export
            </button>
          </div>
        </div>

        {/* Canvas */}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {layer.type === 'image' && <Image className="w-4 h-4 text-blue-600" />}
                      {layer.type === 'i-text' && <Type className="w-4 h-4 text-green-600" />}
                      {(layer.type === 'rect' || layer.type === 'circle') && <Square className="w-4 h-4 text-orange-600" />}
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