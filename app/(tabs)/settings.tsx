// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { LogOut, History, User, ChevronRight } from 'lucide-react-native';
// import { useRouter } from 'expo-router';

// const mockUser = {
//   email: 'user@example.com',
//   created_at: '2024-01-01T00:00:00Z',
// };

// const mockSchedules = [
//   {
//     id: '1',
//     load_type: 'heavy',
//     start_time: '2024-04-01T10:00:00Z',
//     end_time: '2024-04-01T12:00:00Z',
//   },
//   {
//     id: '2',
//     load_type: 'light',
//     start_time: '2024-04-01T14:00:00Z',
//     end_time: '2024-04-01T16:00:00Z',
//   },
// ];

// export default function SettingsScreen() {
//   const router = useRouter();

//   const handleLogout = () => {
//     router.replace('/auth');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Profile</Text>
//       </View>

//       <View style={styles.content}>
//         <View style={styles.profileSection}>
//           <Image
//             source={{
//               uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop',
//             }}
//             style={styles.profileImage}
//           />
//           <Text style={styles.userName}>{mockUser.email}</Text>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editButtonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <User size={20} color="#4CAF50" />
//             <Text style={styles.sectionTitle}>Personal Information</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoLabel}>Email</Text>
//             <Text style={styles.infoValue}>{mockUser.email}</Text>
//           </View>
//           <View style={styles.infoItem}>
//             <Text style={styles.infoLabel}>Member Since</Text>
//             <Text style={styles.infoValue}>
//               {new Date(mockUser.created_at).toLocaleDateString()}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <History size={20} color="#4CAF50" />
//             <Text style={styles.sectionTitle}>Recent Activity</Text>
//           </View>
//           {mockSchedules.map((schedule) => (
//             <View key={schedule.id} style={styles.activityItem}>
//               <View>
//                 <Text style={styles.activityTitle}>
//                   {schedule.load_type.charAt(0).toUpperCase() +
//                     schedule.load_type.slice(1)}{' '}
//                   Load
//                 </Text>
//                 <Text style={styles.activitySubtitle}>
//                   {new Date(schedule.start_time).toLocaleTimeString()} -
//                   {new Date(schedule.end_time).toLocaleTimeString()}
//                 </Text>
//               </View>
//               <ChevronRight size={20} color="#666" />
//             </View>
//           ))}
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <LogOut size={20} color="#F44336" />
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 20,
//     backgroundColor: '#4CAF50',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   editButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     backgroundColor: '#E8F5E9',
//     borderRadius: 20,
//   },
//   editButtonText: {
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   section: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   infoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   infoLabel: {
//     color: '#666',
//   },
//   infoValue: {
//     fontWeight: '500',
//   },
//   activityItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//   },
//   activityTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   activitySubtitle: {
//     color: '#666',
//     fontSize: 14,
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FEE2E2',
//     padding: 15,
//     borderRadius: 12,
//     marginTop: 20,
//   },
//   logoutText: {
//     color: '#F44336',
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
// });
