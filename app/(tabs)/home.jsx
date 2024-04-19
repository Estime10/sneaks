import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import StateEmpty from '../../components/StateEmpty';
import { getLatestPosts, getPosts, getUsers } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import PostCard from '../../components/PostCard';
import Users from '../../components/Users';
import { useGlobalContext } from '../../context/GlobalProvider';


function Home() {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(getPosts);
  const { data: latestPosts, } = useAppwrite(getLatestPosts);
  const { data: users } = useAppwrite(getUsers);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
        ListHeaderComponent={() => (
          <View className=" px-4">
            <View className="justify-between items-start flex-row">
              <View>
                <Text className="font-pmedium text-sm text-primary mb-3">
                  welcome to sneaker land
                </Text>
                <Text className="text-2xl font-psemibold text-primary capitalize">{user?.username}</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-32 h-24"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="w-full flex-1 pb-4">
              <Users
              users={users ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <StateEmpty
            title="no posts found"
            subtitle="no one has posted anything yet."
          />
        )}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default Home;
