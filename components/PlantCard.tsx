import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Droplets, Sun, Heart, TrendingUp } from 'lucide-react-native';

interface PlantCardProps {
  plant: {
    id: number;
    name: string;
    species: string;
    image: string;
    health: number;
    nextWatering: string;
    lightLevel: 'Low' | 'Medium' | 'High';
    careStreak: number;
    isFavorite: boolean;
  };
  onPress?: () => void;
  onToggleFavorite?: () => void;
}

export default function PlantCard({ plant, onPress, onToggleFavorite }: PlantCardProps) {
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: plant.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
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
      <View style={styles.content}>
        <Text style={styles.plantName}>{plant.name}</Text>
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
          <View style={styles.infoItem}>
            <TrendingUp color="#4CA F50" size={12} />
            <Text style={styles.infoText}>{plant.careStreak} days</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  image: {
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
  content: {
    padding: 12,
  },
  plantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
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
});