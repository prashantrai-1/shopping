import React, { useEffect, useState, memo } from "react";
import { Text, View, Image, FlatList, SafeAreaView, RefreshControl, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ShopAction } from '../action/ShopAction';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
export function Home() {
  const dispatch = useDispatch();
 
  const [isFocus, setIsFocus] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userDetailData, setUserDetailData] = useState()
  const getUserDetail = useSelector((state) => state?.userDetail)
  console.log("selectordata==>", getUserDetail)
  
  useEffect(() => {
    console.log("enterhome==>")
    dispatch(ShopAction())
  }, [isRefreshing]);
 
  function showModalDetail(user) {
    console.log("userget==>", user)
    setUserDetailData(user)
    setIsFocus(true)

  }

  const renderModalShow = () => {
    return (
      <View>
        <Modal visible={isFocus} animationType="slide" transparent={true} >
          <View style={styles.headModal}>
            <View style={{ backgroundColor: 'white', height: '50%', width: '80%', borderRadius: 10, padding: 20 }}>
            <View style={{justifyContent:'flex-end',alignItems:"flex-end",marginBottom:5}}>
            <Ionicons
                name="close"
                size={25}
                color={"#041B3E"}
                onPress={() => setIsFocus(false)}
              />
            </View>
            
              <View style={styles.heading}><Text style={styles.txt}>User Detail !</Text></View>
              <View style={{ flexDirection: 'row' }}>
               <View>
               <Image
                  style={{ width: 50, height: 50,marginRight: 10 }}
                  source={{ uri: userDetailData?.avatar_url }}
                />
               </View>
                <View>
                <Text style={styles.txtlist}>Id : #{userDetailData?.id}</Text>
                <Text style={styles.txtlist}>Login : {userDetailData?.login}</Text>
                <Text style={styles.txtlist}>Type : {userDetailData?.type}</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const UserItem = memo(({ user }) => {
    return (
      <TouchableOpacity style={styles.listView} onPress={() => showModalDetail(user)}>
        <View style={{ marginRight: 10 }}>
          <Image
            style={{ width: 50, height: 50}}
            source={{ uri: user?.avatar_url }}
          />
        </View>
        <View>
          <Text style={styles.txtlist}>Type : {user?.type}</Text>
          <Text style={[styles.txtlist, { marginTop: 3 }]}>Login : {user?.login}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  const fetchData = () => {
    setTimeout(() => {
      // dispatch(ShopAction())
      setIsRefreshing(false);
    }, 2000);
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topView}><Text style={styles.txt}>Welcome to Home Screen !</Text></View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={getUserDetail}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserItem user={item} />}
          style={{ padding: 20 }}
          ListFooterComponent={<View style={{ height: 50 }} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
      {renderModalShow()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "purple",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  viewBox: {
    // backgroundColor:'pink',,
    flexDirection: 'row',
    // padding: 15,
    width: "100%",
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 100 },
    // backgroundColor: 'red',
    //  margin: 5, 
    // flexDirection: 'row'
  },
  listView: {
    flexDirection: 'row',
    margin: 3,
    marginVertical: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    borderRadius: 10,
    padding: 20
  },
  txtlist: {
    color: '#041B3E',
    fontSize: 16,
    fontWeight: '600'
  },
  headModal:{
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
     alignItems: 'center',
    justifyContent:"center",
    alignItems:'center'
  },
  heading:{
    backgroundColor:'purple',
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20,
    padding:15,
    borderRadius:10
  }
})