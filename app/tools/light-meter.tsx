import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lightbulb, Sun, CloudSun, Cloud } from 'lucide-react-native';

export default function LightMeterScreen() {
  const router = useRouter();
  const [lightLevel, setLightLevel] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isReading) {
      // Simulate light reading
      const interval = setInterval(() => {
        const newLevel = Math.floor(Math.random() * 100);
        setLightLevel(newLevel);
        
        Animated.timing(animatedValue, {
          toValue: newLevel / 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isReading, animatedValue]);

  const getLightCategory = (level: number) => {
    if (level < 30) return { category: 'Low Light', color: '#666666', icon: Cloud };
    if (level < 70) return { category: 'Medium Light', color: '#FF9800', icon: CloudSun };
    return { category: 'High Light', color: '#FFC107', icon: Sun };
  };

  const getLightRecommendation = (level: number) => {
    if (level < 30) return 'Perfect for snake plants, pothos, and ZZ plants';
    if (level < 70) return 'Great for most houseplants like monstera and rubber plants';
    return 'Ideal for succulents, fiddle leaf figs, and flowering plants';
  };

  const handleStartReading = () => {
    setIsReading(!isReading);
  };

  const lightInfo = getLightCategory(lightLevel);
  const IconComponent = lightInfo.icon;

  return (
    <LinearGradient
      colors={['#FFF3E0', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FF9800" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Light Meter</Text>
          <View style={styles.headerButton} />
        </View>

        {/* Light Meter Display */}
        <View style={styles.meterContainer}>
          <View style={styles.meterCircle}>
            <Animated.View
              style={[
                styles.meterFill,
                {
                  transform: [{
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-90deg', '90deg'],
                    })
                  }]
                }
              ]}
            />
            <View style={styles.meterCenter}>
              <Lightbulb color={lightInfo.color} size={48} />
              <Text style={[styles.lightValue, { color: lightInfo.color }]}>
                {lightLevel}
              </Text>
              <Text style={styles.lightUnit}>Lux</Text>
            </View>
          </View>
        </View>

        {/* Light Information */}
        <View style={styles.infoContainer}>
          <View style={[styles.categoryCard, { borderColor: lightInfo.color }]}>
            <IconComponent color={lightInfo.color} size={32} />
            <Text style={[styles.categoryText, { color: lightInfo.color }]}>
              {lightInfo.category}
            </Text>
          </View>

          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Plant Recommendations</Text>
            <Text style={styles.recommendationText}>
              {getLightRecommendation(lightLevel)}
            </Text>
          </View>

          {/* Light Scale */}
          <View style={styles.scaleContainer}>
            <Text style={styles.scaleTitle}>Light Scale</Text>
            <View style={styles.scale}>
              <View style={[styles.scaleSection, { backgroundColor: '#666666' }]}>
                <Text style={styles.scaleLabel}>Low</Text>
                <Text style={styles.scaleRange}>0-30</Text>
              </View>
              <View style={[styles.scaleSection, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.scaleLabel}>Medium</Text>
                <Text style={styles.scaleRange}>30-70</Text>
              </View>
              <View style={[styles.scaleSection, { backgroundColor: '#FFC107' }]}>
                <Text style={styles.scaleLabel}>High</Text>
                <Text style={styles.scaleRange}>70-100</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Control Button */}
        <TouchableOpacity
          style={[styles.controlButton, isReading && styles.controlButtonActive]}
          onPress={handleStartReading}
        >
          <Text style={[styles.controlButtonText, isReading && styles.controlButtonTextActive]}>
            {isReading ? 'Stop Reading' : 'Start Reading'}
          </Text>
        </TouchableOpacity>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How to Use:</Text>
          <Text style={styles.instructionsText}>
            1. Hold your device near the plant location{'\n'}
            2. Tap "Start Reading" to begin measurement{'\n'}
            3. Wait for the reading to stabilize{'\n'}
            4. Check the recommendation for suitable plants
          </Text>
        </View>
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#E65100',
  },
  headerButton: {
    width: 40,
    height: 40,
  },
  meterContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  meterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  meterFill: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    borderColor: '#FFC107',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  meterCenter: {
    alignItems: 'center',
  },
  lightValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  lightUnit: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  infoContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  scaleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scaleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  scale: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  scaleSection: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  scaleLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  scaleRange: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  controlButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButtonActive: {
    backgroundColor: '#FF5722',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  controlButtonTextActive: {
    color: '#FFFFFF',
  },
  instructionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructionsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 18,
  },
});