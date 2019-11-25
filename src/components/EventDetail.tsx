import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import TabHeader from './TabHeader';
import {Container, Right, Content} from 'native-base';
import storage from '@react-native-firebase/storage';

const {width} = Dimensions.get('window');

export default function EventDetail({navigation}) {
  const event = navigation.getParam('event');

  const [image, setImage] = useState(null);

  useEffect(() => {
    const ref = storage().refFromURL(
      'gs://reactnativefirebaseauth-f4117.appspot.com/Webp.net-resizeimage (1).png',
    );
    ref.getDownloadURL().then(response => {
      setImage(response);
    });
  }, [image, setImage]);

  return (
    <Container>
      <TabHeader navigation={navigation} />
      <Content>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center', margin: 20, flex: 1}}>
            <Text style={{fontSize: 40}}>{event.title}</Text>
          </View>
          <View style={{alignItems: 'flex-end', marginRight: 30, flex: 1}}>
            <Text>{event.date}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginVertical: 50,
              marginHorizontal: 50,
            }}>
            <Text>
              {event.description}
              fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;
              fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;
              fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;
              fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;fddsakfdafdjaskjfdaslfdasjfl;afjla;fjlfksafjaslk;fjflk;fjsalk;fjlask;fj;
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          {image ? (
            <Image
              style={{width: 200, height: 200}}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1543185377-b75671ac8741?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
              }}
            />
          ) : null}
        </View>
      </Content>
    </Container>
  );
}
