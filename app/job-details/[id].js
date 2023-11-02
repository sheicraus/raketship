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
import { jobTabs } from "../../constants/constants";

export default function JobDetails() {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const { id } = params;

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(jobTabs[0]);

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: id,
  });
  
  const onRefresh = () => {}

  const displayTabContent = () => {
    switch (activeTab) {
      case jobTabs[0]: // About
        return <JobAbout info={data[0].job_description ?? "No data provided."} />
      case jobTabs[1]: // Qualifications
        return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>
        case jobTabs[2]: // Responsibilities
        return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A']}/>
      default:
        break;
    }
  }

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
              <JobTabs tabs={jobTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent()}
            </View>
          }


        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? `https://careers.google.com/jobs/results`}/>
      </>

    </SafeAreaView>
  );
}
