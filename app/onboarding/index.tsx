import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Camera, Leaf, Stethoscope, ArrowRight, SkipBack as Skip } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: 'Identify Any Plant',
    description: 'Simply take a photo and our AI will instantly identify your plant species with detailed information.',
    icon: Camera,
    color: '#4CAF50',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Plant Health Diagnosis',
    description: 'Detect diseases early and get personalized treatment recommendations for your plants.',
    icon: Stethoscope,
    color: '#FF9800',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'Expert Care Guidance',
    description: 'Get tailored care schedules, watering reminders, and expert tips for each of your plants.',
    icon: Leaf,
    color: '#2E7D32',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: nextStep * width,
        animated: true,
      });
      
      // Reset and restart animation
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const stepIndex = Math.round(offsetX / width);
    if (stepIndex !== currentStep && stepIndex >= 0 && stepIndex < onboardingSteps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <LinearGradient
      colors={['#E8F5E8', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Skip Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Skip color="#666666" size={20} />
            <Text style={styles.skipText}>Skip Tutorial</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
                { backgroundColor: index === currentStep ? currentStepData.color : '#E0E0E0' }
              ]}
            />
          ))}
        </View>

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                {/* Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: step.image }}
                    style={styles.stepImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.iconOverlay, { backgroundColor: step.color }]}>
                    <IconComponent color="#FFFFFF" size={32} strokeWidth={2} />
                  </View>
                </View>

                {/* Content */}
                <View style={styles.textContainer}>
                  <Text style={[styles.stepTitle, { color: step.color }]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                </View>
              </Animated.View>
            </View>
          ))}
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: currentStepData.color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </TouchableOpacity>
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
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginLeft: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 24,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    width,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  stepImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  navigationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
});