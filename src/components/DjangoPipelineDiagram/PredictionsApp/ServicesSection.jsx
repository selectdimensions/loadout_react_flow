// src/components/DjangoPipelineDiagram/PredictionsApp/ServicesSection.jsx
import React from 'react';
import { colors, Tooltip, FileWithCode } from '../../DiagramComponents';

const ServicesSection = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '325px'
        }}>
            <Tooltip content="Core services implementing business logic and ML integration">
                <div style={{
                    backgroundColor: colors.field01,
                    color: colors.white,
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '4px'
                }}>
                    services/
                </div>
            </Tooltip>

            <Tooltip content="Main orchestration service that coordinates the prediction pipeline">
                <FileWithCode
                    name="pipeline.py"
                    language="Python"
                    color={colors.field01}
                    textColor={colors.white}
                    code={`import logging
import time
from django.db import transaction
from .data_extractor import DataExtractor
from .data_transformer import DataTransformer
from .model_predictor import ModelPredictor
from .model_manager import ModelManager
from .cache_manager import CacheManager
from ..models import PredictionResult
from ..api.exceptions import ModelNotReadyException, FeatureExtractionError

class TruckPredictionPipeline:
    """Orchestrates the end-to-end prediction process"""
    
    def __init__(self):
        self.extractor = DataExtractor()
        self.transformer = DataTransformer()
        self.model_manager = ModelManager()
        self.cache = CacheManager()
        self.logger = logging.getLogger(__name__)
        
        # Get active model version
        active_model = self.model_manager.get_active_model()
        if not active_model:
            raise ModelNotReadyException()
            
        self.predictor = ModelPredictor(model_version=active_model.version)
    
    def predict(self, movement_id):
        """
        Perform end-to-end prediction for a movement
        
        Args:
            movement_id: UUID of the movement to predict
            
        Returns:
            dict: Prediction result with trucks and confidence
        """
        # Check cache first
        cache_key = f"pred_{movement_id}"
        cached_result = self.cache.get(cache_key)
        if cached_result:
            self.logger.info(f"Cache hit for movement {movement_id}")
            return cached_result`}
                    marginLeft='10px'
                />
            </Tooltip>

            <div style={{
                marginLeft: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
            }}>
                {/* These would be separate small components with their own FileWithCode elements */}
                <Tooltip content="Extracts raw data from database and external sources">
                    <FileWithCode
                        name="data_extractor.py"
                        language="Python"
                        color={colors.field01}
                        textColor={colors.white}
                        code={`from django.db import transaction
from loadout.models import Movement, CargoItem, Equipment, Unit, Location
import logging

class DataExtractor:
    """Handles extracting data from various sources"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
    def extract_movement(self, movement_id):
        """
        Get all relevant movement data
        
        Args:
            movement_id: UUID of the movement
            
        Returns:
            dict: All data needed for prediction
        """`}
                        width='140px'
                    />
                </Tooltip>

                <Tooltip content="Transforms raw data into ML model features">
                    <FileWithCode
                        name="data_transformer.py"
                        language="Python"
                        color={colors.field01}
                        textColor={colors.white}
                        code={`from .osrm_distance_calculator import OSRMDistanceCalculator
from .cargo_features import CargoFeatures
from .weight_features import WeightCalculator
from .operation_features import OperationContextExtractor
import logging

class DataTransformer:
    """Transforms raw data into ML model features"""
    
    def __init__(self):
        self.distance_calculator = OSRMDistanceCalculator()
        self.cargo_processor = CargoFeatures()
        self.weight_calculator = WeightCalculator()
        self.context_extractor = OperationContextExtractor()
        self.logger = logging.getLogger(__name__)`}
                        width='140px'
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default ServicesSection;