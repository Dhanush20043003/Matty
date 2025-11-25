import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, AppBar, Toolbar, Button, IconButton, Typography, 
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  TextField, Slider, Paper, Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Download, Save, ZoomIn, ZoomOut, 
  Type, Square, Circle, Upload, Trash2, Eye, EyeOff, 
  Copy, Layers, Image as ImageIcon
} from 'lucide-react';

const NewEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [layers, setLayers] = useState([]);
  const [zoom, setZoom] = useState(100);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);

  // Get template data from navigation state
  const templateData = location.state?.template;

  // Load Fabric.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
    script.async = true;
    script.onload = () => {
      console.log('Fabric.js loaded successfully');
      setFabricLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Fabric.js');
      alert('Failed to load the editor. Please refresh the page.');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Canvas
  useEffect(() => {
    if (fabricLoaded && canvasRef.current && !fabricCanvas && window.fabric) {
      console.log('Initializing canvas...');
      
      const canvas = new window.fabric.Canvas(canvasRef.current, {
        width: 1080,
        height: 1080,
        backgroundColor: bgColor,
        preserveObjectStacking: true
      });

      // Event listeners
      canvas.on('selection:created', (e) => {
        console.log('Object selected');
        setActiveObject(e.selected[0]);
      });
      canvas.on('selection:updated', (e) => setActiveObject(e.selected[0]));
      canvas.on('selection:cleared', () => setActiveObject(null));
      canvas.on('object:added', () => updateLayers(canvas));
      canvas.on('object:removed', () => updateLayers(canvas));

      setFabricCanvas(canvas);
      console.log('Canvas initialized successfully');

      // Load template if provided
      if (templateData) {
        loadTemplate(canvas, templateData);
      }
    }
  }, [fabricLoaded, canvasRef.current, bgColor, templateData]);

  const loadTemplate = (canvas, template) => {
    console.log('Loading template:', template);
    
    // Set background color
    if (template.backgroundColor) {
      canvas.setBackgroundColor(template.backgroundColor, canvas.renderAll.bind(canvas));
      setBgColor(template.backgroundColor);
    }

    // Load background image if exists
    if (template.backgroundImage) {
      window.fabric.Image.fromURL(template.backgroundImage, (img) => {
        img.scaleToWidth(1080);
        img.scaleToHeight(1080);
        img.selectable = false;
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }

    // Add template elements
    if (template.elements) {
      template.elements.forEach(element => {
        switch(element.type) {
          case 'text':
            const text = new window.fabric.IText(element.text || 'Edit me', {
              left: element.left || 100,
              top: element.top || 100,
              fontSize: element.fontSize || 32,
              fill: element.fill || '#000000',
              fontFamily: element.fontFamily || 'Arial',
              fontWeight: element.fontWeight || 'normal'
            });
            text.name = element.name || 'Text Layer';
            canvas.add(text);
            break;

          case 'rect':
            const rect = new window.fabric.Rect({
              left: element.left || 150,
              top: element.top || 150,
              width: element.width || 200,
              height: element.height || 150,
              fill: element.fill || '#6366f1',
              stroke: element.stroke || '#000',
              strokeWidth: element.strokeWidth || 2
            });
            rect.name = element.name || 'Rectangle';
            canvas.add(rect);
            break;

          case 'circle':
            const circle = new window.fabric.Circle({
              left: element.left || 150,
              top: element.top || 150,
              radius: element.radius || 100,
              fill: element.fill || '#ec4899',
              stroke: element.stroke || '#000',
              strokeWidth: element.strokeWidth || 2
            });
            circle.name = element.name || 'Circle';
            canvas.add(circle);
            break;

          case 'image':
            if (element.src) {
              window.fabric.Image.fromURL(element.src, (img) => {
                img.set({
                  left: element.left || 100,
                  top: element.top || 100
                });
                if (element.scaleX) img.scaleX = element.scaleX;
                if (element.scaleY) img.scaleY = element.scaleY;
                img.name = element.name || 'Image';
                canvas.add(img);
              });
            }
            break;
        }
      });
    }

    canvas.renderAll();
  };

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
    if (!fabricCanvas || !window.fabric) {
      console.error('Canvas not ready');
      alert('Canvas is not ready. Please wait a moment and try again.');
      return;
    }

    console.log('Adding text...');
    try {
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
      console.log('Text added successfully');
    } catch (error) {
      console.error('Error adding text:', error);
      alert('Failed to add text. Please try again.');
    }
  };

  const addShape = (shapeType) => {
    if (!fabricCanvas || !window.fabric) {
      console.error('Canvas not ready');
      alert('Canvas is not ready. Please wait a moment and try again.');
      return;
    }

    console.log('Adding shape:', shapeType);
    try {
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
        console.log('Shape added successfully');
      }
    } catch (error) {
      console.error('Error adding shape:', error);
      alert('Failed to add shape. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !fabricCanvas || !window.fabric) return;
    
    console.log('Uploading image...');
    const reader = new FileReader();
    reader.onload = (event) => {
      window.fabric.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(400);
        img.name = 'Uploaded Image';
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        console.log('Image uploaded successfully');
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
      cloned.set({ left: cloned.left + 20, top: cloned.top + 20 });
      fabricCanvas.add(cloned);
      fabricCanvas.setActiveObject(cloned);
      fabricCanvas.renderAll();
    });
  };

  const handleZoom = (newZoom) => {
    if (!fabricCanvas) return;
    const zoomLevel = newZoom / 100;
    fabricCanvas.setZoom(zoomLevel);
    setZoom(newZoom);
    fabricCanvas.renderAll();
  };

  const exportCanvas = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
    const link = document.createElement('a');
    link.download = 'matty-design.png';
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ 
            width: 60, 
            height: 60, 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            mx: 'auto',
            mb: 2,
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
          <Typography variant="h6">Loading Editor...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Left Toolbar */}
      <Drawer
        variant="permanent"
        sx={{
          width: leftDrawerOpen ? 280 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: 64,
            borderRight: '1px solid #e0e0e0'
          },
        }}
        open={leftDrawerOpen}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Tools
          </Typography>
          <List>
            <ListItem 
              button 
              onClick={addText}
              sx={{ 
                mb: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon><Type size={20} /></ListItemIcon>
              <ListItemText primary="Add Text" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => addShape('rectangle')}
              sx={{ 
                mb: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon><Square size={20} /></ListItemIcon>
              <ListItemText primary="Add Rectangle" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => addShape('circle')}
              sx={{ 
                mb: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon><Circle size={20} /></ListItemIcon>
              <ListItemText primary="Add Circle" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => fileInputRef.current?.click()}
              sx={{ 
                mb: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon><Upload size={20} /></ListItemIcon>
              <ListItemText primary="Upload Image" />
            </ListItem>
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Background Color
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
            {['#ffffff', '#000000', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fab1a0'].map((color) => (
              <Box
                key={color}
                onClick={() => changeBackground(color)}
                sx={{
                  width: '100%',
                  height: 40,
                  borderRadius: 1,
                  bgcolor: color,
                  cursor: 'pointer',
                  border: bgColor === color ? '3px solid #667eea' : '2px solid #e0e0e0',
                  '&:hover': { transform: 'scale(1.1)' },
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </Box>

          {activeObject && activeObject.type === 'i-text' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                Text Properties
              </Typography>
              <TextField
                label="Text Color"
                type="color"
                fullWidth
                value={activeObject.fill}
                onChange={(e) => {
                  activeObject.set('fill', e.target.value);
                  fabricCanvas.renderAll();
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" gutterBottom>Font Size: {activeObject.fontSize}px</Typography>
              <Slider
                value={activeObject.fontSize}
                min={12}
                max={120}
                onChange={(e, val) => {
                  activeObject.set('fontSize', val);
                  fabricCanvas.renderAll();
                }}
              />
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Main Canvas Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Toolbar */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <IconButton onClick={() => navigate('/dashboard')} edge="start">
              <ArrowLeft />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
              {templateData ? templateData.title : 'Untitled Design'}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton onClick={() => handleZoom(Math.max(50, zoom - 10))}>
                <ZoomOut />
              </IconButton>
              <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
                {zoom}%
              </Typography>
              <IconButton onClick={() => handleZoom(Math.min(200, zoom + 10))}>
                <ZoomIn />
              </IconButton>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              
              <Button 
                variant="outlined" 
                startIcon={<Save />}
                onClick={() => alert('Design saved!')}
              >
                Save
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Download />}
                onClick={exportCanvas}
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                  }
                }}
              >
                Export
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Canvas */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          bgcolor: '#f5f5f5', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4
        }}>
          <Paper elevation={8} sx={{ display: 'inline-block' }}>
            <canvas ref={canvasRef} />
          </Paper>
        </Box>
      </Box>

      {/* Right Sidebar - Layers */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: rightDrawerOpen ? 300 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            top: 64,
            borderLeft: '1px solid #e0e0e0'
          },
        }}
        open={rightDrawerOpen}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Layers size={20} />
            Layers ({layers.length})
          </Typography>
          
          {layers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <ImageIcon size={48} style={{ opacity: 0.3, marginBottom: 8 }} />
              <Typography variant="body2">No layers yet</Typography>
              <Typography variant="caption">Add elements to get started</Typography>
            </Box>
          ) : (
            <List>
              {layers.map((layer) => (
                <ListItem
                  key={layer.id}
                  button
                  onClick={() => {
                    fabricCanvas.setActiveObject(layer.object);
                    fabricCanvas.renderAll();
                  }}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: activeObject === layer.object ? '#ede9fe' : '#f5f5f5',
                    border: activeObject === layer.object ? '2px solid #7c3aed' : '2px solid transparent',
                    '&:hover': { bgcolor: activeObject === layer.object ? '#ede9fe' : '#e0e0e0' }
                  }}
                >
                  <ListItemIcon>
                    {layer.type === 'image' && <ImageIcon size={18} />}
                    {layer.type === 'i-text' && <Type size={18} />}
                    {(layer.type === 'rect' || layer.type === 'circle') && <Square size={18} />}
                  </ListItemIcon>
                  <ListItemText primary={layer.name} />
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); toggleLayerVisibility(layer); }}>
                    {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </IconButton>
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); fabricCanvas.remove(layer.object); fabricCanvas.renderAll(); }}>
                    <Trash2 size={16} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}

          {activeObject && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ my: 2 }} />
              <Button fullWidth variant="outlined" startIcon={<Copy />} onClick={duplicateSelected}>
                Duplicate
              </Button>
              <Button fullWidth variant="outlined" color="error" startIcon={<Trash2 />} onClick={deleteSelected} sx={{ mt: 1 }}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default NewEditor;