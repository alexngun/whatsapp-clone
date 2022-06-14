import React from 'react'
import type { ChatRoom } from '../types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'

const toDay : {[key:number] : string} = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thrusday',
    5: 'Friday',
    6: 'Saturday'
}

function ChatRoomItem( {id, users, lastMessage}: ChatRoom ) {

    const navigation = useNavigation()
    const date = new Date(lastMessage.createdAt)
    const today = new Date()
    
    const formatDate = () => {
        if(today.getDate() == date.getDate() && today.getMonth() == date.getMonth())
            return `0${date.getHours()}`.slice(-2) + ':' + `0${date.getMinutes()}`.slice(-2)

        var SevenDaysAgo = new Date()
        SevenDaysAgo.setDate(today.getDate() - 7)
        if(date > SevenDaysAgo)
            return toDay[ date.getDay() ]

        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }

    return (
    <TouchableOpacity style={tw`h-20 px-2 bg-gray-100 flex-row items-center mb-2`} onPress={()=>navigation.navigate("Chat")}>
        <Image source={{uri: users[1].imageUri}} style={tw`w-16 h-16 rounded-full`} />
        <View style={tw`flex-grow ml-2 h-full pt-2`}>
            <Text style={tw`text-base font-bold`}>{users[1].name}</Text>
            <Text style={tw`text-sm text-gray-500 mt-1 flex-grow`}>{lastMessage.content}</Text>
        </View>
        <View style={tw`h-full pt-4`}>
            <Text style={tw`text-sm tracking-tighter text-gray-700`}>{formatDate()}</Text>
        </View>
    </TouchableOpacity>
    )
}

export default ChatRoomItem