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
import { ArrowLeft, Droplets, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Gauge } from 'lucide-react-native';

export default function SoilMeterScreen() {
  const router = useRouter();
  const [moistureLevel, setMoistureLevel] = useState(0);
  const [phLevel, setPhLevel] = useState(7.0);
  const [isReading, setIsReading] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isReading) {
      // Simulate soil reading
      const interval = setInterval(() => {
        const newMoisture = Math.floor(Math.random() * 100);
        const newPh = (Math.random() * 6 + 4).toFixed(1); // pH between 4.0 and 10.0
        setMoistureLevel(newMoisture);
        setPhLevel(parseFloat(newPh));
        
        Animated.timing(animatedValue, {
          toValue: newMoisture / 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isReading, animatedValue]);

  const getMoistureCategory = (level: number) => {
    if (level < 30) return { category: 'Dry', color: '#FF5722', icon: AlertTriangle };
    if (level < 70) return { category: 'Optimal', color: '#4CAF50', icon: CheckCircle };
    return { category: 'Wet', color: '#2196F3', icon: Droplets };
  };

  const getPhCategory = (ph: number) => {
    if (ph < 6.0) return { category: 'Acidic', color: '#FF9800' };
    if (ph > 8.0) return { category: 'Alkaline', color: '#9C27B0' };
    return { category: 'Neutral', color: '#4CAF50' };
  };

  const getMoistureRecommendation = (level: number) => {
    if (level < 30) return 'Your plant needs watering soon. Check soil depth before watering.';
    if (level < 70) return 'Perfect moisture level! Your plant is happy and healthy.';
    return 'Soil is quite wet. Avoid watering and ensure good drainage.';
  };

  const getPhRecommendation = (ph: number) => {
    if (ph < 6.0) return 'Acidic soil. Good for blueberries, azaleas, and rhododendrons.';
    if (ph > 8.0) return 'Alkaline soil. Consider adding organic matter to lower pH.';
    return 'Neutral pH. Perfect for most houseplants and vegetables.';
  };

  const handleStartReading = () => {
    setIsReading(!isReading);
  };

  const moistureInfo = getMoistureCategory(moistureLevel);
  const phInfo = getPhCategory(phLevel);
  const MoistureIcon = moistureInfo.icon;

  return (
    <LinearGradient
      colors={['#E8F5E8', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#8D6E63" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Soil Meter</Text>
          <View style={styles.headerButton} />
        </View>

        {/* Dual Meter Display */}
        <View style={styles.metersContainer}>
          {/* Moisture Meter */}
          <View style={styles.meterCard}>
            <Text style={styles.meterTitle}>Soil Moisture</Text>
            <View style={styles.meterCircle}>
              <Animated.View
                style={[
                  styles.meterFill,
                  {
                    backgroundColor: moistureInfo.color,
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
                <MoistureIcon color={moistureInfo.color} size={32} />
                <Text style={[styles.meterValue, { color: moistureInfo.color }]}>
                  {moistureLevel}%
                </Text>
              </View>
            </View>
            <Text style={[styles.categoryText, { color: moistureInfo.color }]}>
              {moistureInfo.category}
            </Text>
          </View>

          {/* pH Meter */}
          <View style={styles.meterCard}>
            <Text style={styles.meterTitle}>Soil pH</Text>
            <View style={styles.meterCircle}>
              <View style={[styles.phMeterFill, { backgroundColor: phInfo.color }]} />
              <View style={styles.meterCenter}>
                <Gauge color={phInfo.color} size={32} />
                <Text style={[styles.meterValue, { color: phInfo.color }]}>
                  {phLevel}
                </Text>
              </View>
            </View>
            <Text style={[styles.categoryText, { color: phInfo.color }]}>
              {phInfo.category}
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.infoContainer}>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Moisture Analysis</Text>
            <Text style={styles.recommendationText}>
              {getMoistureRecommendation(moistureLevel)}
            </Text>
          </View>

          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>pH Analysis</Text>
            <Text style={styles.recommendationText}>
              {getPhRecommendation(phLevel)}
            </Text>
          </View>

          {/* Reference Scales */}
          <View style={styles.scalesContainer}>
            <View style={styles.scaleCard}>
              <Text style={styles.scaleTitle}>Moisture Scale</Text>
              <View style={styles.scale}>
                <View style={[styles.scaleSection, { backgroundColor: '#FF5722' }]}>
                  <Text style={styles.scaleLabel}>Dry</Text>
                  <Text style={styles.scaleRange}>0-30%</Text>
                </View>
                <View style={[styles.scaleSection, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.scaleLabel}>Optimal</Text>
                  <Text style={styles.scaleRange}>30-70%</Text>
                </View>
                <View style={[styles.scaleSection, { backgroundColor: '#2196F3' }]}>
                  <Text style={styles.scaleLabel}>Wet</Text>
                  <Text style={styles.scaleRange}>70-100%</Text>
                </View>
              </View>
            </View>

            <View style={styles.scaleCard}>
              <Text style={styles.scaleTitle}>pH Scale</Text>
              <View style={styles.scale}>
                <View style={[styles.scaleSection, { backgroundColor: '#FF9800' }]}>
                  <Text style={styles.scaleLabel}>Acidic</Text>
                  <Text style={styles.scaleRange}>4.0-6.0</Text>
                </View>
                <View style={[styles.scaleSection, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.scaleLabel}>Neutral</Text>
                  <Text style={styles.scaleRange}>6.0-8.0</Text>
                </View>
                <View style={[styles.scaleSection, { backgroundColor: '#9C27B0' }]}>
                  <Text style={styles.scaleLabel}>Alkaline</Text>
                  <Text style={styles.scaleRange}>8.0-10.0</Text>
                </View>
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
    color: '#5D4037',
  },
  headerButton: {
    width: 40,
    height: 40,
  },
  metersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  meterCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  meterTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  meterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  meterFill: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  phMeterFill: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  meterCenter: {
    alignItems: 'center',
  },
  meterValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  infoContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 6,
  },
  recommendationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 16,
  },
  scalesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  scaleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scaleTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  scale: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  scaleSection: {
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 2,
  },
  scaleLabel: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 1,
  },
  scaleRange: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  controlButton: {
    backgroundColor: '#8D6E63',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#8D6E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButtonActive: {
    backgroundColor: '#5D4037',
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
});