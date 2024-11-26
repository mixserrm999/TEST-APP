import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ChatsScreen() {
  const { colors } = useTheme();

  const chatData = [
    { id: '1', name: 'Chat 1', message: 'Hello! How are you?', logo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Chat 2', message: 'Let’s catch up later.', logo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Chat 3', message: 'Meeting at 5 PM.', logo: 'https://via.placeholder.com/50' },
  ];

  const renderChatItem = ({ item }) => (
    <View style={[styles.chatItem, { borderColor: colors.border }]}>
      <Image 
        source={{ uri: item.logo }} 
        style={styles.chatLogo} 
      />
      <View style={styles.chatDetails}>
        <Text style={[styles.chatName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.chatMessage, { color: colors.text }]}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginVertical: 0,
      borderBottomWidth: 1, // เพิ่มเส้นด้านล่าง
      borderColor: 'gray', // ใช้สีของเส้น
    },
    chatLogo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    chatDetails: {
      flex: 1,
    },
    chatName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    chatMessage: {
      fontSize: 14,
      marginTop: 5,
    },
  });