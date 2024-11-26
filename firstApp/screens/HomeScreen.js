import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [userId, setUserId] = useState(null); // เก็บ userId ของผู้ใช้ที่ล็อกอิน
  const [userLikes, setUserLikes] = useState([]); // เก็บโพสต์ที่ถูกใจโดยผู้ใช้

  // ดึง userId จาก AsyncStorage เมื่อ component โหลด
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(parseInt(storedUserId)); // เปลี่ยนเป็น number
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  // ดึงโพสต์จากเซิร์ฟเวอร์
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://43.154.77.24:3000/posts");
      const data = await response.json();
      setPosts(data);
      // ดึงข้อมูลการถูกใจจากเซิร์ฟเวอร์
      const likesResponse = await fetch("http://43.154.77.24:3000/actions");
      const likesData = await likesResponse.json();
      // เก็บ postId ของโพสต์ที่ผู้ใช้กดถูกใจแล้ว
      const likedPosts = likesData.filter(like => like.userId === userId).map(like => like.postId);
      setUserLikes(likedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  // เพิ่มโพสต์ใหม่
  const handleAddPost = async () => {
    if (newPost.trim() && userId !== null) {
      try {
        const postData = { userId, content: newPost.trim() };

        const response = await fetch("http://43.154.77.24:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const result = await response.json();
        console.log("Response from server:", result);

        // เพิ่มโพสต์ใหม่ใน state
        setPosts((prevPosts) => [
          {
            id: result.id,
            content: result.content,
            userId: result.userId,
            username: result.username,
            likes: 0,
          },
          ...prevPosts,
        ]);
        setNewPost("");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else {
      console.log("User not logged in or post content is empty");
    }
  };

  // ฟังก์ชันสำหรับ "ถูกใจ" หรือยกเลิกการถูกใจ
  const handleLikePost = async (postId) => {
    if (userId) {
      try {
        const actionData = { postId, userId, actionType: userLikes.includes(postId) ? "unlike" : "like" };
        
        // ส่งข้อมูลไปยังเซิร์ฟเวอร์
        const response = await fetch("http://43.154.77.24:3000/actions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(actionData),
        });

        const result = await response.json();
        console.log("Like action result:", result);

        if (result.success) {
          // อัปเดตการแสดงผลว่าโพสต์ถูกใจแล้วหรือยัง
          if (userLikes.includes(postId)) {
            // ถ้าเคยกดแล้ว ให้ลบโพสต์นั้นออกจาก userLikes
            setUserLikes(userLikes.filter(id => id !== postId));
          } else {
            // ถ้ายังไม่กด ให้เพิ่มโพสต์นั้นลงใน userLikes
            setUserLikes([...userLikes, postId]);
          }
          // อัปเดตจำนวนถูกใจใน state
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: userLikes.includes(postId) ? post.likes - 1 : post.likes + 1 }
                : post
            )
          );
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  // Render UI สำหรับแต่ละโพสต์
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <View style={styles.likesContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLikePost(item.id)}
          >
            <Icon 
              name={userLikes.includes(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={userLikes.includes(item.id) ? "red" : "black"} 
            />
          </TouchableOpacity>
          <Text style={styles.likesText}>{item.likes || 0}</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="mail-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-social-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Post" onPress={handleAddPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderPost}
        style={styles.postList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  postList: {
    marginTop: 10,
  },
  postContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  postContent: {
    fontSize: 16,
    color: "#333",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#555",
  },
});