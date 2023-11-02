import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";

export default function JobDetails() {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { id } = params;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {}

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: id,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={()=>router.back()}/>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
     />

      <>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
        >
          {
            isLoading ?
            <ActivityIndicator size='large' color={COLORS.primary} />
            :
            error ?
            <Text>Something went wrong.</Text>
            :
            data.length === 0 ?
            <Text>No job found.</Text>
            :
            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company 
                logo={data[0].employer_logo} 
                location={data[0].job_country} 
                name={data[0].employer_name} 
                jobTitle={data[0].job_title} 
              />
              <JobTabs job={data[0]} />
            </View>
          }

        </ScrollView>
      </>

    </SafeAreaView>
  );
}
