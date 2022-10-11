import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    VStack,
    HStack,
    Text,
    Button
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import PropTypes from 'prop-types';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import shortid from 'shortid';


const Home = ({ navigation }) => {
    const showSnackbar = () => {
        Snackbar.show({
            text: 'Hey I am a Snackbar',
            textColor: 'white',
            backgroundColor: '#6200ee',
        })
    };

    const openCamera = () => {
        return launchCamera({
            mediaType: 'photo'
        }, (response) => {
            Snackbar.show({
                text: "Image Captured"
            })
        });
    };

    const openGallery = () => {
        return launchImageLibrary({
            mediaType: 'photo'
        }, response => {
            Snackbar.show({
                text: "Image Selected"
            })
        });
    };

    return (
        <VStack style={{ margin: 8 }} space={2}>
            <Button
                colorScheme="success"
                onPress={() => navigation.navigate('Test')}
            >
                <HStack space={2}>
                    <Icon name='arrow-right' color='#fff' size={20} />
                    <Text color='#fff'>Go To Test</Text>
                </HStack>
            </Button>
            <Button
                onPress={showSnackbar}
            >
                <HStack space={2}>
                    <Icon name='rocket' color='#fff' size={20} />
                    <Text color='#fff'>Show Snackbar</Text>
                </HStack>
            </Button>
            <Button
                colorScheme={'warning'}
                onPress={openCamera}
            >
                <HStack space={2}>
                    <Icon name='camera' color='#fff' size={20} />
                    <Text color='#fff'>Show Snackbar</Text>
                </HStack>
            </Button>
            <Button
                colorScheme={'yellow'}
                onPress={openGallery}
            >
                <HStack space={2}>
                    <Icon name='camera' color='#fff' size={20} />
                    <Text color='#fff'>Load Picture</Text>
                </HStack>
            </Button>
            <View>
                <Text>ShortId: {shortid.generate()}</Text>
            </View>
        </VStack>
    );
};

Home.propTypes = {
    navigation: PropTypes.object.isRequired
};


export default Home;