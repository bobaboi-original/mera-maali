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
import { ArrowLeft, CircleCheck as CheckCircle, Calendar, Droplets, Sun, RotateCcw, Scissors, Sprout } from 'lucide-react-native';

interface Task {
  id: number;
  plant: string;
  plantImage: string;
  task: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: any;
  color: string;
}

const tasksData: Task[] = [
  {
    id: 1,
    plant: 'Fiddle Leaf Fig',
    plantImage: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100',
    task: 'Water',
    time: '9:00 AM',
    completed: false,
    priority: 'high',
    icon: Droplets,
    color: '#2196F3',
  },
  {
    id: 2,
    plant: 'Snake Plant',
    plantImage: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=100',
    task: 'Mist',
    time: '2:00 PM',
    completed: true,
    priority: 'medium',
    icon: Droplets,
    color: '#4CAF50',
  },
  {
    id: 3,
    plant: 'Monstera',
    plantImage: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=100',
    task: 'Rotate',
    time: '6:00 PM',
    completed: false,
    priority: 'low',
    icon: RotateCcw,
    color: '#FF9800',
  },
  {
    id: 4,
    plant: 'Pothos',
    plantImage: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=100',
    task: 'Fertilize',
    time: '10:00 AM',
    completed: false,
    priority: 'medium',
    icon: Sprout,
    color: '#8BC34A',
  },
  {
    id: 5,
    plant: 'Peace Lily',
    plantImage: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=100',
    task: 'Prune',
    time: '4:00 PM',
    completed: false,
    priority: 'low',
    icon: Scissors,
    color: '#E91E63',
  },
];

export default function TasksScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState(tasksData);

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666666';
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

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
            <ArrowLeft color="#2E7D32" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Today's Tasks</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar color="#2E7D32" size={24} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedTasks.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingTasks.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pending Tasks</Text>
              {pendingTasks.map((task) => {
                const IconComponent = task.icon;
                return (
                  <TouchableOpacity key={task.id} style={styles.taskCard}>
                    <Image source={{ uri: task.plantImage }} style={styles.plantImage} />
                    <View style={styles.taskContent}>
                      <View style={styles.taskHeader}>
                        <Text style={styles.plantName}>{task.plant}</Text>
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                          <Text style={styles.priorityText}>{task.priority}</Text>
                        </View>
                      </View>
                      <View style={styles.taskDetails}>
                        <View style={styles.taskInfo}>
                          <View style={[styles.taskIcon, { backgroundColor: `${task.color}15` }]}>
                            <IconComponent color={task.color} size={16} />
                          </View>
                          <Text style={styles.taskText}>{task.task}</Text>
                        </View>
                        <Text style={styles.taskTime}>{task.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.checkButton}
                      onPress={() => handleTaskToggle(task.id)}
                    >
                      <View style={styles.checkCircle} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Completed Tasks</Text>
              {completedTasks.map((task) => {
                const IconComponent = task.icon;
                return (
                  <TouchableOpacity key={task.id} style={[styles.taskCard, styles.completedCard]}>
                    <Image source={{ uri: task.plantImage }} style={[styles.plantImage, styles.completedImage]} />
                    <View style={styles.taskContent}>
                      <View style={styles.taskHeader}>
                        <Text style={[styles.plantName, styles.completedText]}>{task.plant}</Text>
                        <View style={[styles.priorityBadge, { backgroundColor: '#E0E0E0' }]}>
                          <Text style={[styles.priorityText, { color: '#999999' }]}>done</Text>
                        </View>
                      </View>
                      <View style={styles.taskDetails}>
                        <View style={styles.taskInfo}>
                          <View style={[styles.taskIcon, { backgroundColor: '#F5F5F5' }]}>
                            <IconComponent color="#999999" size={16} />
                          </View>
                          <Text style={[styles.taskText, styles.completedText]}>{task.task}</Text>
                        </View>
                        <Text style={[styles.taskTime, styles.completedText]}>{task.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.checkButton}
                      onPress={() => handleTaskToggle(task.id)}
                    >
                      <CheckCircle color="#4CAF50" size={24} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {tasks.length === 0 && (
            <View style={styles.emptyState}>
              <Calendar color="#CCCCCC" size={64} />
              <Text style={styles.emptyStateTitle}>No Tasks Today</Text>
              <Text style={styles.emptyStateText}>
                All your plants are well taken care of!
              </Text>
            </View>
          )}
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
    color: '#1B5E20',
  },
  calendarButton: {
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.7,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  completedImage: {
    opacity: 0.6,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  plantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  taskText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  taskTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  checkButton: {
    marginLeft: 16,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
  },
});