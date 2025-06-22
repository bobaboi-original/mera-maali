import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Grid3x3 as Grid3X3, List, Plus, Droplets, Sun, Calendar, TrendingUp, Bell, MoveVertical as MoreVertical, Heart, Clock, X, Camera, Image as ImageIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Plant {
  id: number;
  name: string;
  hindiName: string;
  species: string;
  image: string;
  health: number;
  nextWatering: string;
  lastWatered: string;
  lightLevel: 'Low' | 'Medium' | 'High';
  careStreak: number;
  isFavorite: boolean;
}

const plantsData: Plant[] = [
  {
    id: 1,
    name: 'Fiddle Leaf Fig',
    hindiName: 'फिडल लीफ फिग',
    species: 'Ficus lyrata',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    health: 85,
    nextWatering: 'Water in 2 days',
    lastWatered: '3 days ago',
    lightLevel: 'High',
    careStreak: 12,
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Snake Plant',
    hindiName: 'सांप का पौधा',
    species: 'Sansevieria trifasciata',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
    health: 92,
    nextWatering: 'Water in 1 week',
    lastWatered: '1 week ago',
    lightLevel: 'Low',
    careStreak: 8,
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Monstera',
    hindiName: 'मॉन्स्टेरा',
    species: 'Monstera deliciosa',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
    health: 78,
    nextWatering: 'Water today',
    lastWatered: '4 days ago',
    lightLevel: 'Medium',
    careStreak: 15,
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Pothos',
    hindiName: 'पोथोस',
    species: 'Epipremnum aureum',
    image: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=400',
    health: 95,
    nextWatering: 'Water in 3 days',
    lastWatered: '2 days ago',
    lightLevel: 'Medium',
    careStreak: 20,
    isFavorite: false,
  },
];

export default function MyPlantsScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [plants, setPlants] = useState(plantsData);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.hindiName.includes(searchQuery) ||
    plant.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (plantId: number) => {
    setPlants(plants.map(plant =>
      plant.id === plantId ? { ...plant, isFavorite: !plant.isFavorite } : plant
    ));
  };

  const handleAddPlant = () => {
    setShowAddModal(true);
  };

  const handleTakePhoto = () => {
    setShowAddModal(false);
    router.push({
      pathname: '/scan',
      params: { mode: 'add-plant' }
    });
  };

  const handleChooseFromGallery = () => {
    setShowAddModal(false);
    // Handle gallery selection
  };

  const handleManualAdd = () => {
    setShowAddModal(false);
    router.push('/plants/add-manual');
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return '#4CAF50';
    if (health >= 70) return '#FFC107';
    return '#FF5722';
  };

  const getLightIcon = (level: string) => {
    switch (level) {
      case 'High': return <Sun color="#FFC107" size={16} />;
      case 'Medium': return <Sun color="#FF9800" size={16} />;
      case 'Low': return <Sun color="#666666" size={16} />;
      default: return <Sun color="#666666" size={16} />;
    }
  };

  const renderPlantCard = (plant: Plant) => {
    if (viewMode === 'grid') {
      return (
        <TouchableOpacity key={plant.id} style={styles.gridCard}>
          <View style={styles.gridImageContainer}>
            <Image source={{ uri: plant.image }} style={styles.gridImage} />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(plant.id)}
            >
              <Heart
                color={plant.isFavorite ? '#FF5722' : '#FFFFFF'}
                size={16}
                fill={plant.isFavorite ? '#FF5722' : 'transparent'}
              />
            </TouchableOpacity>
            <View style={styles.healthBadge}>
              <View
                style={[
                  styles.healthIndicator,
                  { backgroundColor: getHealthColor(plant.health) }
                ]}
              />
              <Text style={styles.healthText}>{plant.health}%</Text>
            </View>
          </View>
          <View style={styles.gridCardContent}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantHindiName}>{plant.hindiName}</Text>
            <Text style={styles.plantSpecies}>{plant.species}</Text>
            <View style={styles.plantInfo}>
              <View style={styles.infoItem}>
                <Droplets color="#2196F3" size={12} />
                <Text style={styles.infoText}>{plant.nextWatering}</Text>
              </View>
              <View style={styles.infoItem}>
                {getLightIcon(plant.lightLevel)}
                <Text style={styles.infoText}>{plant.lightLevel}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity key={plant.id} style={styles.listCard}>
        <Image source={{ uri: plant.image }} style={styles.listImage} />
        <View style={styles.listCardContent}>
          <View style={styles.listCardHeader}>
            <View>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.plantHindiName}>{plant.hindiName}</Text>
              <Text style={styles.plantSpecies}>{plant.species}</Text>
            </View>
            <View style={styles.listCardActions}>
              <TouchableOpacity onPress={() => toggleFavorite(plant.id)}>
                <Heart
                  color={plant.isFavorite ? '#FF5722' : '#CCCCCC'}
                  size={20}
                  fill={plant.isFavorite ? '#FF5722' : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.moreButton}>
                <MoreVertical color="#666666" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listCardInfo}>
            <View style={styles.listInfoRow}>
              <View style={styles.listInfoItem}>
                <Droplets color="#2196F3" size={16} />
                <Text style={styles.listInfoText}>{plant.nextWatering}</Text>
              </View>
              <View style={styles.listInfoItem}>
                {getLightIcon(plant.lightLevel)}
                <Text style={styles.listInfoText}>{plant.lightLevel} light</Text>
              </View>
            </View>
            <View style={styles.listInfoRow}>
              <View style={styles.listInfoItem}>
                <View
                  style={[
                    styles.healthDot,
                    { backgroundColor: getHealthColor(plant.health) }
                  ]}
                />
                <Text style={styles.listInfoText}>Health {plant.health}%</Text>
              </View>
              <View style={styles.listInfoItem}>
                <TrendingUp color="#4CAF50" size={16} />
                <Text style={styles.listInfoText}>{plant.careStreak} day streak</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#E8F5E8', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Plants</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell color="#2E7D32" size={24} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search color="#666666" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search plants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999999"
            />
          </View>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
              onPress={() => setViewMode('grid')}
            >
              <Grid3X3 color={viewMode === 'grid' ? '#FFFFFF' : '#666666'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
              onPress={() => setViewMode('list')}
            >
              <List color={viewMode === 'list' ? '#FFFFFF' : '#666666'} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{plants.length}</Text>
            <Text style={styles.statLabel}>Total Plants</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {plants.filter(p => p.nextWatering.includes('today')).length}
            </Text>
            <Text style={styles.statLabel}>Need Water</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round(plants.reduce((acc, p) => acc + p.health, 0) / plants.length)}%
            </Text>
            <Text style={styles.statLabel}>Avg Health</Text>
          </View>
        </View>

        {/* Plants List */}
        <ScrollView
          contentContainerStyle={styles.plantsContainer}
          showsVerticalScrollIndicator={false}
        >
          {viewMode === 'grid' ? (
            <View style={styles.plantsGrid}>
              {filteredPlants.map(renderPlantCard)}
            </View>
          ) : (
            <View style={styles.plantsList}>
              {filteredPlants.map(renderPlantCard)}
            </View>
          )}

          {filteredPlants.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No plants found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search terms
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Add Plant Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Plus color="#FFFFFF" size={24} strokeWidth={2} />
        </TouchableOpacity>

        {/* Add Plant Modal */}
        <Modal
          visible={showAddModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Plant</Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <X color="#666666" size={24} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#4CAF50' }]}>
                  <Camera color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Take Photo</Text>
                  <Text style={styles.modalOptionDescription}>Identify plant using camera</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleChooseFromGallery}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#2196F3' }]}>
                  <ImageIcon color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Choose from Gallery</Text>
                  <Text style={styles.modalOptionDescription}>Select photo from your gallery</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={handleManualAdd}>
                <View style={[styles.modalOptionIcon, { backgroundColor: '#FF9800' }]}>
                  <Plus color="#FFFFFF" size={24} />
                </View>
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>Add Manually</Text>
                  <Text style={styles.modalOptionDescription}>Enter plant details manually</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    paddingVertical: 12,
    paddingLeft: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
  },
  viewButtonActive: {
    backgroundColor: '#2E7D32',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
  },
  plantsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  plantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  plantsList: {
    gap: 12,
  },
  gridCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gridImageContainer: {
    position: 'relative',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  healthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  healthText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  gridCardContent: {
    padding: 12,
  },
  plantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  plantHindiName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
    marginBottom: 2,
  },
  plantSpecies: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  plantInfo: {
    gap: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginLeft: 4,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  listCardContent: {
    flex: 1,
  },
  listCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moreButton: {
    padding: 4,
  },
  listCardInfo: {
    gap: 6,
  },
  listInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listInfoText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginLeft: 6,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    color: '#333333',
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
    color: '#333333',
    marginBottom: 4,
  },
  modalOptionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});