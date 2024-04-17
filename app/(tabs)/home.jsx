import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import StateEmpty from '../../components/StateEmpty';
import { getLatestPosts, getPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import PostCard from '../../components/PostCard';


function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refectch } = useAppwrite(getPosts);
  const { data: latestPosts, } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refectch();
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
          <View className="my-2 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-primary">
                  welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-primary capitalize">john doe</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-32 h-20"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-2 pb-8">
              <Text className="text-gray-400 text-lg font-pregular capitalize">
                popular posts
              </Text>
              <Trending
              posts={latestPosts ?? []}
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
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
         showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default Home;
