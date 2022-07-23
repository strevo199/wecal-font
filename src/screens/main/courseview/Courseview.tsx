import { ActivityIndicator, Alert, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{FC, Fragment, useEffect, useState} from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { cancel, edit, FONTS, setting, SIZES, trash } from '../../../constants'
import { COLORS } from '../../../constants/theme';
import { httpService } from '../../../services/http.service';
import moment from 'moment';
import { ConfrimDelete, getCourse, handleEditCourse } from './CourseviewLogic';


interface CourseviewProps {
    route:any, 
    navigation: StackNavigationProp<any>
    
  }

  interface CourseDetail {
    status: ReactNode;
    code: string,
    name: string,
    grade: string,
    semester: string,
    created_at: string,
    updated_at: string,
    unit: string,
    quality_point: number,
    course_grade_point: number
}

export const Courseview:FC <CourseviewProps> = ({route,navigation}) => {
    const [courseDetail, setCourseDetail] = useState({} as CourseDetail)
    const [isLoading, setisLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const {item} = route.params || {};

      const handleDelete = () => {
            Alert.alert('Delete Alert','Are you sure you want to delete this course',[
                {
                    text: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => ConfrimDelete(setModalVisible,navigation,courseDetail,setisLoading) 
                }
            ])
            
      }

      
 
      useEffect( () => {
        getCourse(setisLoading,item,setCourseDetail)
       }, [])

    const renderCourseDetail = () => {
        return (
            <>
            <Modal
                animationType='slide'
                transparent = {true}
                visible = {modalVisible}
                onRequestClose ={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style ={{backgroundColor: COLORS.transparentBlack,flex: 1, justifyContent: 'flex-end'}}>
                    <View style = {{backgroundColor: COLORS.white, padding: SIZES.padding, paddingBottom: SIZES.padding*4}}>
                        <TouchableOpacity 
                            onPress={() => handleEditCourse(setEditModalVisible,navigation,courseDetail,setisLoading) }
                        style = {{borderBottomWidth:0.7, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={edit}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={handleDelete}
                        style = {{borderBottomWidth:0.7, marginVertical: SIZES.base, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={trash}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                        style = {{borderBottomWidth:0.7, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={cancel}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* edit */}
            <Modal
                animationType='slide'
                transparent = {true}
                visible = {editModalVisible}
                onRequestClose ={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style ={{backgroundColor: COLORS.transparentBlack,flex: 1, justifyContent: 'flex-end'}}>
                    <View style = {{backgroundColor: COLORS.white, padding: SIZES.padding, paddingBottom: SIZES.padding*4}}>
                        <TouchableOpacity 
                            onPress={() => handleEditCourse(setEditModalVisible,navigation,courseDetail,setisLoading) }
                        style = {{borderBottomWidth:0.7, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={edit}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={handleDelete}
                        style = {{borderBottomWidth:0.7, marginVertical: SIZES.base, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={trash}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                        style = {{borderBottomWidth:0.7, borderColor: COLORS.ligthGray ,flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginHorizontal: SIZES.padding, paddingVertical: SIZES.padding}}>
                            <Image
                                source={cancel}
                                style ={{
                                    height: 20,
                                    width: 20
                                }}
                            />
                            <View style ={{flex: 1, alignItems: 'center'}}>
                                <Text style = {{...FONTS.h3}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                <View>
                    <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Status: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.status} </Text></Text>
                </View>
            </View>
            <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Code: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.code}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Title: <Text style ={{...FONTS.h3}}>{courseDetail.name}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Date added: <Text style ={{...FONTS.h3}}>{moment(courseDetail?.created_at).format("MMM-Do-YYYY")}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Date updated: <Text style ={{...FONTS.h3}}>{moment(courseDetail?.updated_at).format("MMM-Do-YYYY")}</Text></Text>
            </View>
            <View style ={{backgroundColor: COLORS.ligthGray, height:SIZES.largeTitle*1.5, width: SIZES.largeTitle* 1.5, justifyContent: 'center', alignItems: 'center', borderRadius: SIZES.base }}>
                <Text style ={{...FONTS.largeTitle, color:COLORS.primary}}>{courseDetail.grade}</Text>
            </View>
        </View>
        <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Units: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.unit} </Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Quality Point: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.quality_point} </Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Semester: <Text style ={{...FONTS.h3}}>{courseDetail.semester} </Text></Text>
            </View>
            
        </View>
        </>
        )
    }
    const renderCourseAction = () => {
        return (
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style ={{
                    position: 'absolute',
                    bottom: 70,
                    right: 20,
                    padding:10,
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.darkPrimary,
                    shadowColor:COLORS.black, shadowOffset: {width:2, height: 2},shadowOpacity:0.4, shadowRadius: 5
                }}
            >
                <Image
                   source={setting}
                   resizeMode ='cover'
                   style ={{
                    tintColor: COLORS.white,
                    height: 35,
                    width: 35,
                   }}
                />
            </TouchableOpacity>
        )
    }
  return (
    <Fragment>
        <StatusBar barStyle={'light-content'} />
        {
            isLoading ?
            <ActivityIndicator size={'large'} color = {COLORS.primary}/>:
            <View style ={{
                flex: 1
            }}>
            {renderCourseDetail()}
            {renderCourseAction()}
            </View>
        }
    </Fragment>
  )
}


const styles = StyleSheet.create({})