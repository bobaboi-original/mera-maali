import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, RotateCcw, Zap, ZapOff, Image as ImageIcon, CircleCheck as CheckCircle, X, Lightbulb } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanMode, setScanMode] = useState<'identify' | 'diagnose' | 'add-plant'>(
    (params.mode as 'identify' | 'diagnose' | 'add-plant') || 'identify'
  );
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    // Set scan mode based on params
    if (params.mode === 'diagnose') {
      setScanMode('diagnose');
    } else if (params.mode === 'add-plant') {
      setScanMode('add-plant');
    }
  }, [params.mode]);

  if (!permission) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.loadingText}>Camera permissions are loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, styles.permissionContainer]}>
        <View style={styles.permissionContent}>
          <Camera color="#2E7D32" size={64} strokeWidth={1.5} />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to identify plants and diagnose diseases
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo?.uri) {
          setCapturedImage(photo.uri);
          analyzeImage(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push({
        pathname: '/results',
        params: {
          imageUri,
          mode: scanMode,
        },
      });
    }, 3000);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => {
      if (Platform.OS === 'web') {
        // Flash not supported on web
        Alert.alert('Flash not supported', 'Flash functionality is not available on web platform');
        return current;
      }
      return current === 'off' ? 'on' : 'off';
    });
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
  };

  const getModeTitle = () => {
    switch (scanMode) {
      case 'diagnose': return 'Disease Diagnosis';
      case 'add-plant': return 'Add Plant';
      default: return 'Plant Scanner';
    }
  };

  const getGuideText = () => {
    switch (scanMode) {
      case 'diagnose': return 'Focus on affected leaves or problem areas';
      case 'add-plant': return 'Center the entire plant in the frame';
      default: return 'Center the plant in the frame';
    }
  };

  const getAnalysisText = () => {
    switch (scanMode) {
      case 'diagnose': return 'Diagnosing plant health...';
      case 'add-plant': return 'Identifying plant for your collection...';
      default: return 'Identifying plant species...';
    }
  };

  if (capturedImage) {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={[styles.header, { paddingTop: 24 }]}>
          <TouchableOpacity style={styles.headerButton} onPress={retakePhoto}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isAnalyzing ? 'Analyzing...' : 'Image Captured'}
          </Text>
          <View style={styles.headerButton} />
        </View>

        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          {isAnalyzing && (
            <View style={styles.analysisOverlay}>
              <View style={styles.analysisContainer}>
                <Zap color="#FFC107" size={48} strokeWidth={2} />
                <Text style={styles.analysisTitle}>AI Analysis in Progress</Text>
                <Text style={styles.analysisText}>
                  {getAnalysisText()}
                </Text>
                <View style={styles.loadingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            </View>
          )}
        </View>

        {!isAnalyzing && (
          <View style={[styles.actionsContainer, { paddingBottom: insets.bottom + 32 }]}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeButtonText}>Retake Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.analyzeButton}
              onPress={() => analyzeImage(capturedImage)}
            >
              <Text style={styles.analyzeButtonText}>Analyze Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        flash={flash}
      >
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
          {/* Header */}
          <View style={[styles.header, { paddingTop: 24 }]}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{getModeTitle()}</Text>
            <TouchableOpacity style={styles.headerButton} onPress={toggleFlash}>
              {flash === 'on' ? (
                <Zap color="#FFC107" size={24} />
              ) : (
                <ZapOff color="#FFFFFF" size={24} />
              )}
            </TouchableOpacity>
          </View>

          {/* Mode Selector - Only show if not coming from specific mode */}
          {!params.mode && (
            <View style={styles.modeSelector}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  scanMode === 'identify' && styles.modeButtonActive,
                ]}
                onPress={() => setScanMode('identify')}
              >
                <Camera color={scanMode === 'identify' ? '#FFFFFF' : '#CCCCCC'} size={20} />
                <Text
                  style={[
                    styles.modeButtonText,
                    scanMode === 'identify' && styles.modeButtonTextActive,
                  ]}
                >
                  Identify
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  scanMode === 'diagnose' && styles.modeButtonActive,
                ]}
                onPress={() => setScanMode('diagnose')}
              >
                <Lightbulb color={scanMode === 'diagnose' ? '#FFFFFF' : '#CCCCCC'} size={20} />
                <Text
                  style={[
                    styles.modeButtonText,
                    scanMode === 'diagnose' && styles.modeButtonTextActive,
                  ]}
                >
                  Diagnose
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Camera Guide */}
          <View style={styles.cameraGuide}>
            <View style={styles.guideBorder} />
            <Text style={styles.guideText}>
              {getGuideText()}
            </Text>
          </View>

          {/* Bottom Controls */}
          <View style={[styles.bottomControls, { paddingBottom: insets.bottom + 32 }]}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <ImageIcon color="#FFFFFF" size={24} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner}>
                <CheckCircle color="#2E7D32" size={32} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
              <RotateCcw color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={[styles.tipsContainer, { bottom: insets.bottom + 140 }]}>
            <Text style={styles.tipsTitle}>📸 Photography Tips:</Text>
            <Text style={styles.tipsText}>
              • Use natural lighting{'\n'}
              • Keep the plant in focus{'\n'}
              • Avoid shadows and reflections
            </Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 32,
  },
  permissionContent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
  },
  modeButtonActive: {
    backgroundColor: '#2E7D32',
  },
  modeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#CCCCCC',
    marginLeft: 8,
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  cameraGuide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  guideBorder: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  guideText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backdropFilter: 'blur(10px)',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  galleryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  captureButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  tipsContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    lineHeight: 18,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  analysisContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  analysisTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  analysisText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  dot1: {
    // Animation would be added here
  },
  dot2: {
    // Animation would be added here
  },
  dot3: {
    // Animation would be added here
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    gap: 16,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    backdropFilter: 'blur(10px)',
  },
  retakeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  analyzeButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});