import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ChatRoomItem from '../components/ChatRoomItem'
import type { ChatRoom } from '../types';

import ChatRoomsData from '../assets/ChatRooms';
import tw from 'tailwind-react-native-classnames';

export default function ChatRooms({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <ScrollView style={tw`flex-grow`}>
      {ChatRoomsData.map( ( item: ChatRoom ) => (
        <ChatRoomItem id={item.id} users={item.users} lastMessage={item.lastMessage} />
      ))}
    </ScrollView>
  );
}
