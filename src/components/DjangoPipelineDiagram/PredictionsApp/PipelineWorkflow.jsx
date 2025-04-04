// src/components/DjangoPipelineDiagram/PredictionsApp/PipelineWorkflow.jsx
import React from 'react';
import { colors, Tooltip } from '../../DiagramComponents';

const PipelineWorkflow = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            border: `2px dashed ${colors.armyGold}`,
            borderRadius: '6px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}>
            <div style={{
                fontWeight: 'bold',
                color: colors.armyBlack,
                marginBottom: '8px',
                fontSize: '14px',
                textAlign: 'center'
            }}>
                Prediction Pipeline Workflow
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Tooltip content="Input data: Movement ID or direct parameters (cargo details, distances, etc.)">
                    <div style={{
                        backgroundColor: colors.armyGreen,
                        color: colors.white,
                        padding: '8px',
                        borderRadius: '4px',
                        width: '140px',
                        textAlign: 'center',
                        fontSize: '11px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        1. Request Input<br /><span style={{ fontSize: '9px' }}>Movement ID or Parameters</span>
                    </div>
                </Tooltip>

                <svg width="30" height="20">
                    <defs>
                        <marker id="arrowhead-unique1" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill={colors.armyBlack} />
                        </marker>
                    </defs>
                    <line x1="0" y1="10" x2="20" y2="10" stroke={colors.armyBlack} strokeWidth="2" markerEnd="url(#arrowhead-unique1)" />
                </svg>

                <Tooltip content="Process raw data into features: total cargo weight, volume, distance, terrain factors, unit type, priority">
                    <div style={{
                        backgroundColor: colors.field01,
                        color: colors.white,
                        padding: '8px',
                        borderRadius: '4px',
                        width: '140px',
                        textAlign: 'center',
                        fontSize: '11px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        2. Feature Extraction<br /><span style={{ fontSize: '9px' }}>14+ Key Features</span>
                    </div>
                </Tooltip>

                <svg width="30" height="20">
                    <line x1="0" y1="10" x2="20" y2="10" stroke={colors.armyBlack} strokeWidth="2" markerEnd="url(#arrowhead-unique1)" />
                </svg>

                <Tooltip content="XGBoost model predicts optimal number of trucks based on extracted features">
                    <div style={{
                        backgroundColor: colors.gray01,
                        color: colors.white,
                        padding: '8px',
                        borderRadius: '4px',
                        width: '140px',
                        textAlign: 'center',
                        fontSize: '11px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        3. Model Prediction<br /><span style={{ fontSize: '9px' }}>Number of Trucks</span>
                    </div>
                </Tooltip>

                <svg width="30" height="20">
                    <line x1="0" y1="10" x2="20" y2="10" stroke={colors.armyBlack} strokeWidth="2" markerEnd="url(#arrowhead-unique1)" />
                </svg>

                <Tooltip content="Returns predicted truck quantity, confidence score, and supporting data">
                    <div style={{
                        backgroundColor: colors.field02,
                        color: colors.armyBlack,
                        padding: '8px',
                        borderRadius: '4px',
                        width: '140px',
                        textAlign: 'center',
                        fontSize: '11px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        4. Response<br /><span style={{ fontSize: '9px' }}>Prediction + Confidence</span>
                    </div>
                </Tooltip>
            </div>

            {/* Data flow arrows */}
            <div style={{
                position: 'absolute',
                top: '-25px',
                left: '70px',
                width: '400px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="100%" height="20">
                    <defs>
                        <marker id="feedbackArrow-unique" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill={colors.info} />
                        </marker>
                    </defs>
                    <path d="M0,10 C100,40 300,-20 400,10" fill="none" stroke={colors.info} strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#feedbackArrow-unique)" />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '-15px',
                    fontSize: '10px',
                    color: colors.info,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    padding: '2px 5px',
                    borderRadius: '3px'
                }}>
                    Feedback Loop: Results stored for model improvement
                </div>
            </div>
        </div>
    );
};

export default PipelineWorkflow;