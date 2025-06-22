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
import { ArrowLeft, UserCheck, Star, MapPin, Clock, Wrench, Scissors, Droplets } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Gardener {
  id: number;
  name: string;
  experience: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  image: string;
  location: string;
  services: string[];
  availability: string;
}

const gardenersData: Gardener[] = [
  {
    id: 1,
    name: 'Ramesh Singh',
    experience: '8 years experience',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 150,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Connaught Place, Delhi',
    services: ['Plant Care', 'Pruning', 'Soil Testing', 'Pest Control'],
    availability: 'Available today'
  },
  {
    id: 2,
    name: 'Sunita Devi',
    experience: '12 years experience',
    rating: 4.8,
    reviews: 89,
    hourlyRate: 200,
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Lajpat Nagar, Delhi',
    services: ['Garden Design', 'Plant Installation', 'Maintenance', 'Organic Gardening'],
    availability: 'Available tomorrow'
  },
  {
    id: 3,
    name: 'Mohan Kumar',
    experience: '6 years experience',
    rating: 4.7,
    reviews: 156,
    hourlyRate: 120,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: 'Karol Bagh, Delhi',
    services: ['Watering', 'Fertilizing', 'Repotting', 'Plant Health Check'],
    availability: 'Available now'
  }
];

const serviceIcons = {
  'Plant Care': Wrench,
  'Pruning': Scissors,
  'Watering': Droplets,
  'Garden Design': UserCheck,
  'Plant Installation': UserCheck,
  'Maintenance': Wrench,
  'Soil Testing': Wrench,
  'Pest Control': Wrench,
  'Organic Gardening': UserCheck,
  'Fertilizing': Droplets,
  'Repotting': Wrench,
  'Plant Health Check': UserCheck,
};

export default function GardenerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedGardener, setSelectedGardener] = useState<Gardener | null>(null);

  const handleBookGardener = (gardener: Gardener) => {
    setSelectedGardener(gardener);
    // Navigate to booking screen or show booking modal
  };

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
          <Text style={styles.headerTitle}>Book a Gardener</Text>
          <View style={styles.headerButton} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Service Info */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <UserCheck color="#2E7D32" size={32} />
            </View>
            <Text style={styles.serviceTitle}>Professional Gardening Services</Text>
            <Text style={styles.serviceDescription}>
              Book experienced gardeners for plant care, maintenance, and garden design. 
              All our gardeners are verified and trained professionals.
            </Text>
          </View>

          {/* Service Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <View style={styles.categoriesGrid}>
              <View style={styles.categoryCard}>
                <Wrench color="#4CAF50" size={24} />
                <Text style={styles.categoryText}>Plant Care</Text>
              </View>
              <View style={styles.categoryCard}>
                <Scissors color="#FF9800" size={24} />
                <Text style={styles.categoryText}>Pruning</Text>
              </View>
              <View style={styles.categoryCard}>
                <Droplets color="#2196F3" size={24} />
                <Text style={styles.categoryText}>Watering</Text>
              </View>
              <View style={styles.categoryCard}>
                <UserCheck color="#9C27B0" size={24} />
                <Text style={styles.categoryText}>Garden Design</Text>
              </View>
            </View>
          </View>

          {/* Available Gardeners */}
          <View style={styles.gardenersContainer}>
            <Text style={styles.sectionTitle}>Available Gardeners</Text>
            {gardenersData.map((gardener) => (
              <View key={gardener.id} style={styles.gardenerCard}>
                <Image source={{ uri: gardener.image }} style={styles.gardenerImage} />
                <View style={styles.gardenerInfo}>
                  <Text style={styles.gardenerName}>{gardener.name}</Text>
                  <Text style={styles.gardenerExperience}>{gardener.experience}</Text>
                  <View style={styles.gardenerRating}>
                    <Star color="#FFC107" size={16} fill="#FFC107" />
                    <Text style={styles.ratingText}>{gardener.rating}</Text>
                    <Text style={styles.reviewsText}>({gardener.reviews} reviews)</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin color="#666666" size={14} />
                    <Text style={styles.locationText}>{gardener.location}</Text>
                  </View>
                  <View style={styles.servicesContainer}>
                    {gardener.services.slice(0, 3).map((service, index) => {
                      const IconComponent = serviceIcons[service as keyof typeof serviceIcons] || Wrench;
                      return (
                        <View key={index} style={styles.serviceTag}>
                          <IconComponent color="#4CAF50" size={12} />
                          <Text style={styles.serviceTagText}>{service}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.availabilityContainer}>
                    <Clock color="#4CAF50" size={14} />
                    <Text style={styles.availabilityText}>{gardener.availability}</Text>
                  </View>
                </View>
                <View style={styles.gardenerActions}>
                  <Text style={styles.rateText}>₹{gardener.hourlyRate}/hr</Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookGardener(gardener)}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Why Choose Us */}
          <View style={styles.whyChooseContainer}>
            <Text style={styles.sectionTitle}>Why Choose Our Gardeners</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <UserCheck color="#4CAF50" size={20} />
                <Text style={styles.benefitText}>Verified & experienced professionals</Text>
              </View>
              <View style={styles.benefitItem}>
                <Star color="#4CAF50" size={20} />
                <Text style={styles.benefitText}>Highly rated by customers</Text>
              </View>
              <View style={styles.benefitItem}>
                <Clock color="#4CAF50" size={20} />
                <Text style={styles.benefitText}>Flexible scheduling</Text>
              </View>
              <View style={styles.benefitItem}>
                <Wrench color="#4CAF50" size={20} />
                <Text style={styles.benefitText}>Complete gardening solutions</Text>
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
    color: '#1B5E20',
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
    backgroundColor: '#E8F5E8',
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
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
    marginTop: 8,
    textAlign: 'center',
  },
  gardenersContainer: {
    marginBottom: 24,
  },
  gardenerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gardenerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  gardenerInfo: {
    marginBottom: 16,
  },
  gardenerName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  gardenerExperience: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  gardenerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  serviceTagText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#2E7D32',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  gardenerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2E7D32',
  },
  bookButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  whyChooseContainer: {
    marginBottom: 24,
  },
  benefitsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
  },
});