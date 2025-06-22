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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MapPin, Sun, Droplets, Thermometer, Camera, Stethoscope, Wrench, Users, Bell, CircleCheck as CheckCircle, Calendar, TrendingUp, X, Lightbulb, Gauge, Video, UserCheck, Phone } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGuest] = useState(true); // This would come from auth context
  const [showToolsModal, setShowToolsModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, plant: 'Fiddle Leaf Fig', task: 'Water', time: '9:00 AM', completed: false },
    { id: 2, plant: 'Snake Plant', task: 'Mist', time: '2:00 PM', completed: true },
    { id: 3, plant: 'Monstera', task: 'Rotate', time: '6:00 PM', completed: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeBasedBackground = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return ['#1B5E20', '#2E7D32']; // Night
    if (hour < 12) return ['#FFE082', '#FFF3E0']; // Morning
    if (hour < 17) return ['#81C784', '#E8F5E8']; // Afternoon
    return ['#FF8A65', '#FFF3E0']; // Evening
  };

  const handleTaskToggle = (taskId: number) => {
    setTodaysTasks(tasks => 
      tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleViewAllTasks = () => {
    router.push('/tasks');
  };

  const handleIdentifyPlant = () => {
    router.push('/scan');
  };

  const handleDiagnosis = () => {
    router.push({
      pathname: '/scan',
      params: { mode: 'diagnose' }
    });
  };

  const handleLightMeter = () => {
    setShowToolsModal(false);
    router.push('/tools/light-meter');
  };

  const handleSoilMeter = () => {
    setShowToolsModal(false);
    router.push('/tools/soil-meter');
  };

  const handleOnlineConsultation = () => {
    setShowExpertModal(false);
    router.push('/services/consultation');
  };

  const handleBookGardener = () => {
    setShowExpertModal(false);
    router.push('/services/gardener');
  };

  const mainFeatures = [
    {
      id: 1,
      title: 'Identify Plant',
      description: 'AI-powered recognition',
      icon: Camera,
      color: '#4CAF50',
      onPress: handleIdentifyPlant,
    },
    {
      id: 2,
      title: 'Disease Diagnosis',
      description: 'Health assessment',
      icon: Stethoscope,
      color: '#FF9800',
      onPress: handleDiagnosis,
    },
    {
      id: 3,
      title: 'Plant Care Tools',
      description: 'Light & soil meters',
      icon: Wrench,
      color: '#2196F3',
      onPress: () => setShowToolsModal(true),
    },
    {
      id: 4,
      title: 'Expert Services',
      description: 'Consultation & marketplace',
      icon: Users,
      color: '#9C27B0',
      onPress: () => setShowExpertModal(true),
    },
  ];

  return (
    <LinearGradient
      colors={getTimeBasedBackground()}
      style={styles.container}
    >
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 24 }]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.locationContainer}>
                <MapPin color="#2E7D32" size={16} />
                <Text style={styles.locationText}>New Delhi, India</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell color="#2E7D32" size={24} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.greeting}>
              {getGreeting()}{isGuest ? '!' : ', Guest!'}
            </Text>

            {/* Weather Widget */}
            <View style={styles.weatherWidget}>
              <View style={styles.weatherInfo}>
                <View style={styles.weatherItem}>
                  <Thermometer color="#FF5722" size={20} />
                  <Text style={styles.weatherValue}>28°C</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Droplets color="#2196F3" size={20} />
                  <Text style={styles.weatherValue}>65%</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Sun color="#FFC107" size={20} />
                  <Text style={styles.weatherValue}>UV 7</Text>
                </View>
              </View>
              <Text style={styles.weatherDescription}>Perfect for plant care</Text>
            </View>
          </View>

          {/* Main Features Grid */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Plant Care Hub</Text>
            <View style={styles.featuresGrid}>
              {mainFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <TouchableOpacity
                    key={feature.id}
                    style={styles.featureCard}
                    onPress={feature.onPress}
                  >
                    <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                      <IconComponent color="#FFFFFF" size={24} strokeWidth={2} />
                    </View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Today's Tasks */}
          <View style={styles.tasksContainer}>
            <View style={styles.taskHeader}>
              <Text style={styles.sectionTitle}>Today's Tasks</Text>
              <TouchableOpacity onPress={handleViewAllTasks}>
                <Calendar color="#2E7D32" size={20} />
              </TouchableOpacity>
            </View>
            
            {todaysTasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={styles.taskInfo}>
                  <View style={styles.taskIconContainer}>
                    {task.completed ? (
                      <CheckCircle color="#4CAF50" size={20} />
                    ) : (
                      <View style={styles.taskPending} />
                    )}
                  </View>
                  <View style={styles.taskDetails}>
                    <Text style={[styles.taskPlant, task.completed && styles.taskCompleted]}>
                      {task.plant}
                    </Text>
                    <Text style={styles.taskAction}>{task.task} • {task.time}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.taskButton}
                  onPress={() => handleTaskToggle(task.id)}
                >
                  <Text style={styles.taskButtonText}>
                    {task.completed ? 'Done' : 'Mark Done'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.viewAllTasks} onPress={handleViewAllTasks}>
              <Text style={styles.viewAllTasksText}>View All Tasks</Text>
              <TrendingUp color="#2E7D32" size={16} />
            </TouchableOpacity>
          </View>

          {/* Plant Care Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Today's Tip</Text>
            <View style={styles.tipCard}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.tipImage}
              />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Morning Light is Key</Text>
                <Text style={styles.tipDescription}>
                  Most houseplants thrive with bright, indirect morning light. Position them near east-facing windows for optimal growth.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Plant Care Tools Modal */}
        <Modal
          visible={showToolsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowToolsModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Plant Care Tools</Text>
                <TouchableOpacity onPress={() => setShowToolsModal(false)}>
                  <X color="#666666" size={24} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.modalOption} onPress={handleLightMeter}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#FFC107' }]}>
                  <Lightbulb color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Light Meter</Text>
                  <Text style={styles.modalOptionDescription}>Measure light intensity for your plants</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleSoilMeter}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#8D6E63' }]}>
                  <Gauge color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Soil Meter</Text>
                  <Text style={styles.modalOptionDescription}>Check soil moisture and pH levels</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Expert Services Modal */}
        <Modal
          visible={showExpertModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowExpertModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Expert Services</Text>
                <TouchableOpacity onPress={() => setShowExpertModal(false)}>
                  <X color="#666666" size={24} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.modalOption} onPress={handleOnlineConsultation}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#2196F3' }]}>
                  <Video color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Online Consultation</Text>
                  <Text style={styles.modalOptionDescription}>Video call with plant experts</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleBookGardener}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#4CAF50' }]}>
                  <UserCheck color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Book a Gardener</Text>
                  <Text style={styles.modalOptionDescription}>Professional gardening services</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#FF9800' }]}>
                  <Phone color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Emergency Help</Text>
                  <Text style={styles.modalOptionDescription}>Urgent plant care assistance</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2E7D32',
    marginLeft: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  greeting: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
    marginBottom: 20,
    lineHeight: 38,
  },
  weatherWidget: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weatherValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  weatherDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
    textAlign: 'center',
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  tasksContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskIconContainer: {
    marginRight: 12,
  },
  taskPending: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  taskDetails: {
    flex: 1,
  },
  taskPlant: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  taskAction: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  taskButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  taskButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2E7D32',
  },
  viewAllTasks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
    gap: 8,
  },
  viewAllTasksText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2E7D32',
  },
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tipImage: {
    width: '100%',
    height: 180,
  },
  tipContent: {
    padding: 20,
  },
  tipTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalOptionText: {
    flex: 1,
  },
  modalOptionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modalOptionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});