import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Share, BookOpen, Heart, Droplets, Sun, Thermometer, Calendar, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Info } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface PlantResult {
  name: string;
  hindiName: string;
  scientificName: string;
  confidence: number;
  description: string;
  careInstructions: {
    watering: string;
    light: string;
    temperature: string;
    humidity: string;
  };
  commonIssues: string[];
  funFacts: string[];
}

interface DiagnosisResult {
  condition: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const mode = params.mode as string;
  const imageUri = params.imageUri as string;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (mode === 'diagnose') {
        setDiagnosisResult({
          condition: 'Leaf Spot Disease',
          severity: 'Medium',
          confidence: 87,
          description: 'A common fungal infection that causes brown or black spots on leaves. Usually caused by overwatering or poor air circulation.',
          symptoms: [
            'Brown or black circular spots on leaves',
            'Yellow halos around spots',
            'Leaf yellowing and dropping',
            'Reduced plant vigor'
          ],
          treatment: [
            'Remove affected leaves immediately',
            'Improve air circulation around plant',
            'Reduce watering frequency',
            'Apply fungicide spray if severe',
            'Isolate plant from other plants'
          ],
          prevention: [
            'Water at soil level, not on leaves',
            'Ensure good drainage',
            'Maintain proper spacing between plants',
            'Avoid overhead watering',
            'Regular inspection for early detection'
          ]
        });
      } else {
        setPlantResult({
          name: 'Fiddle Leaf Fig',
          hindiName: 'फिडल लीफ फिग',
          scientificName: 'Ficus lyrata',
          confidence: 94,
          description: 'A popular houseplant native to western Africa. Known for its large, violin-shaped leaves and tree-like growth pattern. Requires bright, indirect light and consistent care.',
          careInstructions: {
            watering: 'Water when top 1-2 inches of soil are dry. Usually every 7-10 days.',
            light: 'Bright, indirect light. Avoid direct sunlight which can scorch leaves.',
            temperature: 'Ideal range: 65-75°F (18-24°C). Avoid cold drafts.',
            humidity: 'Prefers 40-60% humidity. Use humidifier or pebble tray if needed.'
          },
          commonIssues: [
            'Brown spots from overwatering',
            'Leaf drop from inconsistent watering',
            'Yellowing from too much direct sun',
            'Slow growth in low light'
          ],
          funFacts: [
            'Can grow up to 50 feet tall in its native habitat',
            'Leaves can grow up to 18 inches long',
            'Popular Instagram plant due to its photogenic appearance',
            'Produces small green fruits in the wild'
          ]
        });
      }
      setIsLoading(false);
    }, 2000);
  }, [mode]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return '#FF5722';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#666666';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return AlertTriangle;
      case 'Medium': return Info;
      case 'Low': return CheckCircle;
      default: return Info;
    }
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#E8F5E8', '#FFFFFF']}
        style={styles.container}
      >
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 24 }]}>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingSpinner} />
            <Text style={styles.loadingTitle}>Analyzing Image...</Text>
            <Text style={styles.loadingText}>
              Our AI is processing your image and identifying the plant species
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#E8F5E8', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 24 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#2E7D32" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {mode === 'diagnose' ? 'Diagnosis Results' : 'Plant Identified'}
          </Text>
          <TouchableOpacity style={styles.shareButton}>
            <Share color="#2E7D32" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.resultImage} />
            <View style={styles.confidenceOverlay}>
              <Text style={styles.confidenceText}>
                {mode === 'diagnose' ? diagnosisResult?.confidence : plantResult?.confidence}% Confidence
              </Text>
            </View>
          </View>

          {mode === 'diagnose' && diagnosisResult ? (
            // Diagnosis Results
            <>
              {/* Condition Info */}
              <View style={styles.resultCard}>
                <View style={styles.conditionHeader}>
                  <View style={styles.conditionInfo}>
                    <Text style={styles.conditionName}>{diagnosisResult.condition}</Text>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(diagnosisResult.severity) }]}>
                      {React.createElement(getSeverityIcon(diagnosisResult.severity), { 
                        color: '#FFFFFF', 
                        size: 16 
                      })}
                      <Text style={styles.severityText}>{diagnosisResult.severity} Severity</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.description}>{diagnosisResult.description}</Text>
              </View>

              {/* Symptoms */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Symptoms</Text>
                {diagnosisResult.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>{symptom}</Text>
                  </View>
                ))}
              </View>

              {/* Treatment */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Treatment Steps</Text>
                {diagnosisResult.treatment.map((step, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.listText}>{step}</Text>
                  </View>
                ))}
              </View>

              {/* Prevention */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Prevention Tips</Text>
                {diagnosisResult.prevention.map((tip, index) => (
                  <View key={index} style={styles.listItem}>
                    <CheckCircle color="#4CAF50" size={16} />
                    <Text style={styles.listText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : plantResult ? (
            // Plant Identification Results
            <>
              {/* Plant Info */}
              <View style={styles.resultCard}>
                <View style={styles.plantHeader}>
                  <View>
                    <Text style={styles.plantName}>{plantResult.name}</Text>
                    <Text style={styles.hindiName}>{plantResult.hindiName}</Text>
                    <Text style={styles.scientificName}>{plantResult.scientificName}</Text>
                  </View>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Heart color="#FF5722" size={24} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.description}>{plantResult.description}</Text>
              </View>

              {/* Care Instructions */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Care Instructions</Text>
                
                <View style={styles.careItem}>
                  <View style={styles.careIcon}>
                    <Droplets color="#2196F3" size={20} />
                  </View>
                  <View style={styles.careContent}>
                    <Text style={styles.careLabel}>Watering</Text>
                    <Text style={styles.careText}>{plantResult.careInstructions.watering}</Text>
                  </View>
                </View>

                <View style={styles.careItem}>
                  <View style={styles.careIcon}>
                    <Sun color="#FFC107" size={20} />
                  </View>
                  <View style={styles.careContent}>
                    <Text style={styles.careLabel}>Light</Text>
                    <Text style={styles.careText}>{plantResult.careInstructions.light}</Text>
                  </View>
                </View>

                <View style={styles.careItem}>
                  <View style={styles.careIcon}>
                    <Thermometer color="#FF5722" size={20} />
                  </View>
                  <View style={styles.careContent}>
                    <Text style={styles.careLabel}>Temperature</Text>
                    <Text style={styles.careText}>{plantResult.careInstructions.temperature}</Text>
                  </View>
                </View>

                <View style={styles.careItem}>
                  <View style={styles.careIcon}>
                    <Calendar color="#9C27B0" size={20} />
                  </View>
                  <View style={styles.careContent}>
                    <Text style={styles.careLabel}>Humidity</Text>
                    <Text style={styles.careText}>{plantResult.careInstructions.humidity}</Text>
                  </View>
                </View>
              </View>

              {/* Common Issues */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Common Issues</Text>
                {plantResult.commonIssues.map((issue, index) => (
                  <View key={index} style={styles.listItem}>
                    <AlertTriangle color="#FF9800" size={16} />
                    <Text style={styles.listText}>{issue}</Text>
                  </View>
                ))}
              </View>

              {/* Fun Facts */}
              <View style={styles.resultCard}>
                <Text style={styles.sectionTitle}>Fun Facts</Text>
                {plantResult.funFacts.map((fact, index) => (
                  <View key={index} style={styles.listItem}>
                    <BookOpen color="#4CAF50" size={16} />
                    <Text style={styles.listText}>{fact}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {mode !== 'diagnose' && (
              <TouchableOpacity style={styles.addToGardenButton}>
                <Text style={styles.addToGardenButtonText}>Add to My Garden</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.scanAgainButton} onPress={() => router.back()}>
              <Text style={styles.scanAgainButtonText}>Scan Another Plant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#E0E0E0',
    borderTopColor: '#2E7D32',
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  resultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  confidenceOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  confidenceText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  conditionHeader: {
    marginBottom: 16,
  },
  conditionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  conditionName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 16,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  plantName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  hindiName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    fontStyle: 'italic',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A4A4A',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  careIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  careContent: {
    flex: 1,
  },
  careLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  careText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666666',
    marginTop: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  listText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A4A4A',
    lineHeight: 20,
    flex: 1,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  addToGardenButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addToGardenButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  scanAgainButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});