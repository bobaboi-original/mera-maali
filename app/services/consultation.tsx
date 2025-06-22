import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Video, Star, Clock, Calendar, MessageCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  availability: string;
  languages: string[];
}

const expertsData: Expert[] = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialty: 'Plant Pathologist',
    rating: 4.9,
    reviews: 156,
    price: 299,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200',
    availability: 'Available now',
    languages: ['Hindi', 'English']
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    specialty: 'Indoor Plant Expert',
    rating: 4.8,
    reviews: 203,
    price: 199,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    availability: 'Available in 30 mins',
    languages: ['Hindi', 'English', 'Punjabi']
  },
  {
    id: 3,
    name: 'Dr. Meera Patel',
    specialty: 'Organic Gardening',
    rating: 4.9,
    reviews: 89,
    price: 349,
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
    availability: 'Available tomorrow',
    languages: ['Hindi', 'English', 'Gujarati']
  }
];

export default function ConsultationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const handleBookConsultation = (expert: Expert) => {
    setSelectedExpert(expert);
    // Navigate to booking screen or show booking modal
  };

  return (
    <LinearGradient
      colors={['#E3F2FD', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 24 }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#1976D2" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Online Consultation</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Service Info */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Video color="#1976D2" size={32} />
            </View>
            <Text style={styles.serviceTitle}>Expert Plant Consultation</Text>
            <Text style={styles.serviceDescription}>
              Get personalized advice from certified plant experts through video calls. 
              Discuss plant care, disease diagnosis, and get solutions for your gardening challenges.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>What You Get</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Video color="#4CAF50" size={20} />
                <Text style={styles.featureText}>30-minute video consultation</Text>
              </View>
              <View style={styles.featureItem}>
                <MessageCircle color="#4CAF50" size={20} />
                <Text style={styles.featureText}>Personalized care plan</Text>
              </View>
              <View style={styles.featureItem}>
                <Calendar color="#4CAF50" size={20} />
                <Text style={styles.featureText}>Follow-up support for 7 days</Text>
              </View>
              <View style={styles.featureItem}>
                <Star color="#4CAF50" size={20} />
                <Text style={styles.featureText}>Expert recommendations</Text>
              </View>
            </View>
          </View>

          {/* Available Experts */}
          <View style={styles.expertsContainer}>
            <Text style={styles.sectionTitle}>Available Experts</Text>
            {expertsData.map((expert) => (
              <View key={expert.id} style={styles.expertCard}>
                <Image source={{ uri: expert.image }} style={styles.expertImage} />
                <View style={styles.expertInfo}>
                  <Text style={styles.expertName}>{expert.name}</Text>
                  <Text style={styles.expertSpecialty}>{expert.specialty}</Text>
                  <View style={styles.expertRating}>
                    <Star color="#FFC107" size={16} fill="#FFC107" />
                    <Text style={styles.ratingText}>{expert.rating}</Text>
                    <Text style={styles.reviewsText}>({expert.reviews} reviews)</Text>
                  </View>
                  <Text style={styles.languages}>
                    Languages: {expert.languages.join(', ')}
                  </Text>
                  <View style={styles.availabilityContainer}>
                    <Clock color="#4CAF50" size={16} />
                    <Text style={styles.availabilityText}>{expert.availability}</Text>
                  </View>
                </View>
                <View style={styles.expertActions}>
                  <Text style={styles.priceText}>₹{expert.price}</Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookConsultation(expert)}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* How it Works */}
          <View style={styles.howItWorksContainer}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Choose Expert</Text>
                  <Text style={styles.stepDescription}>
                    Select from our certified plant experts based on your needs
                  </Text>
                </View>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Book Session</Text>
                  <Text style={styles.stepDescription}>
                    Schedule a convenient time for your video consultation
                  </Text>
                </View>
              </View>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Get Expert Advice</Text>
                  <Text style={styles.stepDescription}>
                    Discuss your plants and receive personalized care recommendations
                  </Text>
                </View>
              </View>
            </View>
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
    color: '#0D47A1',
  },
  headerButton: {
    width: 44,
    height: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  featuresList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
  },
  expertsContainer: {
    marginBottom: 24,
  },
  expertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  expertImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  expertSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1976D2',
    marginBottom: 6,
  },
  expertRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  languages: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 6,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  expertActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#1976D2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  howItWorksContainer: {
    marginBottom: 24,
  },
  stepsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
});