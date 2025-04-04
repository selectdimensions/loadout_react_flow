// src/components/DjangoPipelineDiagram/PredictionsApp.jsx
import React from 'react';
import { colors, Tooltip, FileWithCode, Badge } from '../DiagramComponents';
import ApiSection from './PredictionsApp/ApiSection';
import ServicesSection from './PredictionsApp/ServicesSection';
import PipelineWorkflow from './PredictionsApp/PipelineWorkflow';

const PredictionsApp = ({ getSectionStyle, handleSectionHover, clearActiveSection }) => {
    return (
        <div
            style={{
                border: `2px solid ${colors.tan}`,
                borderRadius: '6px',
                width: '650px',
                height: '520px',
                backgroundColor: 'rgba(241, 228, 199, 0.2)',
                position: 'relative',
                ...getSectionStyle('predictions')
            }}
            onMouseEnter={() => handleSectionHover('predictions')}
            onMouseLeave={clearActiveSection}
        >
            <Tooltip content="Specialized app for ML-based cost prediction and associated services">
                <div style={{
                    backgroundColor: colors.tan,
                    color: colors.armyBlack,
                    padding: '6px 10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    predictions (App) - Cost Prediction Pipeline
                    <Badge text="ML ENABLED" color={colors.armyBlack} backgroundColor={colors.lightBlue} />
                </div>
            </Tooltip>

            <div style={{
                padding: '10px',
                display: 'flex',
                gap: '15px'
            }}>
                {/* Core Files */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    width: '110px'
                }}>
                    <Tooltip content="Database models for prediction results, model versions, and feature records">
                        <FileWithCode
                            name="models.py"
                            language="Python"
                            color={colors.tan}
                            textColor={colors.armyBlack}
                            code={`class PredictionResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    movement = models.ForeignKey(
        'loadout.Movement', 
        on_delete=models.CASCADE,
        related_name='predictions'
    )
    prediction_date = models.DateTimeField(
        auto_now_add=True
    )
    predicted_trucks = models.IntegerField()
    confidence_score = models.FloatField()
    model_version = models.CharField(max_length=50)
    features_used = models.JSONField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL
    )
    
    class Meta:
        ordering = ['-prediction_date']`}
                        />
                    </Tooltip>

                    <Tooltip content="URL routing for prediction endpoints">
                        <FileWithCode
                            name="urls.py"
                            language="Python"
                            color={colors.tan}
                            textColor={colors.armyBlack}
                            code={`from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import PredictionViewSet, ModelVersionViewSet
from . import views

router = DefaultRouter()
router.register(
    'predictions', 
    PredictionViewSet, 
    basename='prediction'
)
router.register(
    'model-versions',
    ModelVersionViewSet,
    basename='model-version'
)

urlpatterns = [
    path('api/', include(router.urls)),
    path('metrics/', views.prediction_metrics, name='metrics'),
    path('dashboard/', views.prediction_dashboard, name='dashboard'),
    path('batch-predict/', views.batch_predict, name='batch-predict'),
]`}
                        />
                    </Tooltip>

                    <Tooltip content="App configuration and initialization">
                        <FileWithCode
                            name="apps.py"
                            language="Python"
                            color={colors.tan}
                            textColor={colors.armyBlack}
                            code={`from django.apps import AppConfig
import os

class PredictionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictions'
    
    def ready(self):
        # Initialize ML model cache on startup
        # This prevents cold starts when first prediction is made
        from .services.model_manager import ModelManager
        
        # Only run in main process, not in reloader process
        if os.environ.get('RUN_MAIN') == 'true':
            ModelManager().initialize_models()
            
            # Start background tasks if needed
            from .tasks import start_scheduled_tasks
            start_scheduled_tasks()`}
                        />
                    </Tooltip>

                    <Tooltip content="Background task management using Celery">
                        <FileWithCode
                            name="tasks.py"
                            language="Python"
                            color={colors.tan}
                            textColor={colors.armyBlack}
                            code={`from celery import shared_task
from celery.schedules import crontab
from django.conf import settings
from loadout.models import Movement
from .services.pipeline import TruckPredictionPipeline
import logging

logger = logging.getLogger(__name__)

@shared_task
def predict_trucks_for_movement(movement_id):
    """Asynchronous task to predict trucks for a movement"""
    pipeline = TruckPredictionPipeline()
    try:
        result = pipeline.predict(movement_id=movement_id)
        logger.info(f"Prediction completed for movement {movement_id}")
        return result
    except Exception as e:
        logger.error(f"Prediction failed for movement {movement_id}: {str(e)}")
        raise`}
                        />
                    </Tooltip>
                </div>

                <ApiSection />
                <ServicesSection />
            </div>

            <PipelineWorkflow />

            {/* Model Performance Metrics */}
            <div style={{
                position: 'absolute',
                backgroundColor: 'rgb(255, 255, 255)',
                border: `1px solid ${colors.lightBlue}`,
                borderRadius: '4px',
                padding: '8px',
                fontSize: '10px',
                bottom: '-55px',
                left: '-200px',
                width: '180px'
            }}>
                <div style={{ fontWeight: 'bold', color: colors.armyGreen, marginBottom: '5px' }}>Model Performance Metrics:</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.armyGreen }}>
                    <span>Accuracy (within ±1 truck):</span>
                    <span style={{ fontWeight: 'bold', color: colors.success }}>94.2%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.armyGreen }}>
                    <span>Mean Absolute Error:</span>
                    <span style={{ fontWeight: 'bold', color: colors.armyGreen }}>0.36 trucks</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.armyGreen }}>
                    <span>Samples Used in Training:</span>
                    <span style={{ fontWeight: 'bold', color: colors.armyGreen }}>2,874</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.armyGreen }}>
                    <span>Last Model Update:</span>
                    <span style={{ fontWeight: 'bold', color: colors.armyGreen }}>Mar 12, 2025</span>
                </div>
            </div>

            {/* Error Handling */}
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                right: '0px',
                backgroundColor: 'rgba(229,115,115,0.1)',
                border: `1px solid ${colors.alert}`,
                borderRadius: '4px',
                padding: '5px 8px',
                fontSize: '9px',
                color: colors.armyBlack
            }}>
                <div style={{ fontWeight: 'bold', color: colors.alert, marginBottom: '3px' }}>Error Handling:</div>
                <div>• Invalid inputs → 400 Bad Request</div>
                <div>• Model failures → Fallback to rule-based estimates</div>
                <div>• Network issues → Retry with exponential backoff</div>
                <div>• OSRM API failure → Fall back to straight-line distance</div>
            </div>
        </div>
    );
};

export default PredictionsApp;