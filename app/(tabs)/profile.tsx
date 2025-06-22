import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, ChevronRight, Award, Calendar, Leaf, TrendingUp, Moon, Volume2, Smartphone, Mail, Lock, UserPlus } from 'lucide-react-native';

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  color: string;
  type: 'navigation' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGuest] = useState(true); // This would come from auth context

  const userStats = {
    plantsOwned: 12,
    careStreak: 28,
    plantsIdentified: 156,
    healthScore: 87,
  };

  const guestMenuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'sign-up',
          title: 'Create Account',
          subtitle: 'Sign up to save your plants and progress',
          icon: UserPlus,
          color: '#4CAF50',
          type: 'navigation',
          onPress: () => router.push('/auth/sign-up'),
        },
        {
          id: 'sign-in',
          title: 'Sign In',
          subtitle: 'Already have an account? Sign in here',
          icon: User,
          color: '#2E7D32',
          type: 'navigation',
          onPress: () => router.push('/auth/sign-in'),
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: Moon,
          color: '#9C27B0',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact us',
          icon: HelpCircle,
          color: '#FF5722',
          type: 'navigation',
          onPress: () => router.push('/profile/help'),
        },
      ],
    },
  ];

  const userMenuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'edit-profile',
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          icon: Edit,
          color: '#2E7D32',
          type: 'navigation',
          onPress: () => router.push('/profile/edit'),
        },
        {
          id: 'preferences',
          title: 'Preferences',
          subtitle: 'Customize your app experience',
          icon: Settings,
          color: '#666666',
          type: 'navigation',
          onPress: () => router.push('/profile/preferences'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'push-notifications',
          title: 'Push Notifications',
          subtitle: 'Care reminders and updates',
          icon: Bell,
          color: '#FF9800',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'sound',
          title: 'Sound',
          subtitle: 'Notification sounds',
          icon: Volume2,
          color: '#2196F3',
          type: 'toggle',
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: Moon,
          color: '#9C27B0',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'privacy',
          title: 'Privacy & Security',
          subtitle: 'Manage your data and security',
          icon: Shield,
          color: '#4CAF50',
          type: 'navigation',
          onPress: () => router.push('/profile/privacy'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact us',
          icon: HelpCircle,
          color: '#FF5722',
          type: 'navigation',
          onPress: () => router.push('/profile/help'),
        },
      ],
    },
  ];

  const menuSections = isGuest ? guestMenuSections : userMenuSections;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            router.replace('/auth');
          },
        },
      ]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.menuItemIcon, { backgroundColor: `${item.color}15` }]}>
            <IconComponent color={item.color} size={20} strokeWidth={2} />
          </View>
          <View style={styles.menuItemText}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.menuItemRight}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={item.value ? '#2E7D32' : '#FFFFFF'}
            />
          ) : (
            <ChevronRight color="#CCCCCC" size={20} />
          )}
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* User Info */}
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              {isGuest ? (
                <View style={styles.guestAvatar}>
                  <User color="#666666" size={40} />
                </View>
              ) : (
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                  style={styles.avatar}
                />
              )}
              {!isGuest && (
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Edit color="#FFFFFF" size={16} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.userName}>
              {isGuest ? 'Guest User' : 'Alex Thompson'}
            </Text>
            {!isGuest && (
              <>
                <Text style={styles.userEmail}>alex.thompson@example.com</Text>
                <Text style={styles.userJoinDate}>Plant parent since March 2023</Text>
              </>
            )}
            {isGuest && (
              <Text style={styles.guestMessage}>
                Sign up to save your plants and track your progress
              </Text>
            )}
          </View>

          {/* Stats - Only show for logged in users */}
          {!isGuest && (
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Leaf color="#4CAF50" size={24} />
                <Text style={styles.statNumber}>{userStats.plantsOwned}</Text>
                <Text style={styles.statLabel}>Plants</Text>
              </View>
              <View style={styles.statCard}>
                <Calendar color="#FF9800" size={24} />
                <Text style={styles.statNumber}>{userStats.careStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statCard}>
                <Award color="#2196F3" size={24} />
                <Text style={styles.statNumber}>{userStats.plantsIdentified}</Text>
                <Text style={styles.statLabel}>Identified</Text>
              </View>
              <View style={styles.statCard}>
                <TrendingUp color="#9C27B0" size={24} />
                <Text style={styles.statNumber}>{userStats.healthScore}%</Text>
                <Text style={styles.statLabel}>Health Score</Text>
              </View>
            </View>
          )}

          {/* Menu Sections */}
          {menuSections.map((section, index) => (
            <View key={index} style={styles.menuSection}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.menuContainer}>
                {section.items.map(renderMenuItem)}
              </View>
            </View>
          ))}

          {/* Logout Button - Only show for logged in users */}
          {!isGuest && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut color="#FF5722" size={20} strokeWidth={2} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}

          {/* App Version */}
          <Text style={styles.appVersion}>Mera Maali v1.0.0</Text>
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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1B5E20',
  },
  userSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  userJoinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  guestMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 18,
  },
  menuItemRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF5722',
    marginLeft: 8,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
  },
});