// src/components/DjangoPipelineDiagram/index.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { InfoPanel } from '../DiagramComponents';
import DiagramControls from './DiagramControls';
import MiniMap from './MiniMap';
import DjangoProjectContainer from './DjangoProjectContainer';

const DjangoPipelineDiagram = () => {
    const [viewportSize, setViewportSize] = useState({ width: 1000, height: 800 });
    const [activeSection, setActiveSection] = useState(null);
    const diagramRef = useRef(null);

    // Adjust viewport size based on container
    useEffect(() => {
        const updateSize = () => {
            if (diagramRef.current) {
                const container = diagramRef.current.parentElement;
                setViewportSize({
                    width: container.clientWidth,
                    height: container.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleSectionHover = useCallback((section) => {
        setActiveSection(section);
    }, []);

    const clearActiveSection = useCallback(() => {
        setActiveSection(null);
    }, []);

    // Determine section highlight styling
    const getSectionStyle = useCallback((sectionName) => {
        const baseStyle = {};

        if (activeSection && activeSection !== sectionName) {
            baseStyle.opacity = 0.7;
            baseStyle.filter = 'grayscale(30%)';
            baseStyle.transition = 'all 0.3s ease';
        } else if (activeSection === sectionName) {
            baseStyle.boxShadow = '0 0 15px rgba(255, 204, 1, 0.6)';
            baseStyle.zIndex = 10;
            baseStyle.transition = 'all 0.3s ease';
        }

        return baseStyle;
    }, [activeSection]);

    return (
        <div
            ref={diagramRef}
            className="diagram-container relative bg-white w-full h-full overflow-hidden border border-gray-200 rounded-lg shadow-sm"
            style={{ minHeight: '600px' }}
        >
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                limitToBounds={false}
                minScale={0.5}
                maxScale={2}
                wheelDisabled={false}
                centerOnInit={true}
                panning={{ velocityDisabled: false }}
            >
                {({ zoomIn, zoomOut, resetTransform, state }) => (
                    <>
                        <DiagramControls 
                            zoomIn={zoomIn} 
                            zoomOut={zoomOut} 
                            resetTransform={resetTransform} 
                        />
                        
                        <MiniMap state={state} />

                        {/* Information Panel - Shows when hovering sections */}
                        {activeSection && (
                            <InfoPanel
                                section={activeSection}
                                className="absolute bottom-4 left-4 z-10"
                            />
                        )}

                        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                            <div style={{
                                padding: '20px',
                                fontFamily: 'Arial, sans-serif',
                                width: '1000px',
                                height: '800px',
                                position: 'relative',
                                overflow: 'visible',
                                backgroundColor: '#ffffff'
                            }}>
                                <h2 style={{
                                    color: '#221F20',
                                    margin: '0 0 15px 0',
                                    textAlign: 'center',
                                    fontSize: '32px'
                                }}>
                                    Django Truck Prediction Pipeline Integration
                                </h2>

                                <div style={{
                                    fontSize: '14px',
                                    color: '#221F20',
                                    textAlign: 'center',
                                    marginBottom: '15px',
                                    maxWidth: '800px',
                                    margin: '0 auto 20px'
                                }}>
                                    End-to-end pipeline for predicting optimal truck quantities needed for military movement operations
                                </div>
                                
                                <DjangoProjectContainer 
                                    activeSection={activeSection}
                                    handleSectionHover={handleSectionHover}
                                    clearActiveSection={clearActiveSection}
                                    getSectionStyle={getSectionStyle}
                                />
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default DjangoPipelineDiagram;