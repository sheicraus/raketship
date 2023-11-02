import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

const Popularjobs = () => {
  const router = useRouter();
  const {data, error, isLoading} = useFetch('search', {query: 'developer', num_pages: 1});
  const [selectedJob, setSelectedJob] = useState(null)

  const handleCardPress = (item) => {
    router.push(`job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs For You</Text>
        {/* <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ? 
          <ActivityIndicator size='large' color={COLORS.primary} />
          :
          error ?
          <Text>Something went wrong.</Text>
          :
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => item?.job_id}
            renderItem={({item}) => (
              <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
            )}
            contentContainerStyle={{
              columnGap: SIZES.medium
            }}
            showsHorizontalScrollIndicator={false}
          />
        }
      </View>
    </View>
  )
}

export default Popularjobs