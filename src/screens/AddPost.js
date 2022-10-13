import React, { useState, useEffect } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input,
    Text,
    TextArea,
    VStack,
} from 'native-base';
import shortid from 'shortid';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/database';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const AddPost = ({ navigation, userState }) => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);

    const chooseImageSource = () => {
        Alert.alert(
            'Select Image',
            null,
            [
                {
                    text: 'Take Picture',
                    onPress: takePicture
                },
                {
                    text: "Select Picture",
                    onPress: choosePicture
                }
            ]
        );
    };

    const takePicture = () => {
        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280,
            maxHeight: 720
        }, response => {
            processImage(response);
        });
    };

    const choosePicture = () => {
        launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 1280,
            maxHeight: 720
        }, response => {
            processImage(response);
        });
    }

    const processImage = response => {
        if (response.didCancel) {
            console.log('[Signup.js][processImage]: User cancelled image picker');
        } else if (response.errorCode) {
            console.log('[Signup.js][processImage][ImagePickerError]: ', response.errorCode);
        } else {
            console.log('[Signup.js][processImage][response]: ', response);
            uploadImage(response.assets[0]);
        }
    };

    const uploadImage = async (response) => {
        setImageUploading(true);
        const reference = storage().ref(response.fileName);

        const task = reference.putFile(response.uri);
        task.on('state_changed', taskSnapshot => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
            setUploadStatus(percentage);
        });

        task.then(async () => {
            const url = await reference.getDownloadURL();
            setImage(url);
            setImageUploading(false);
        });
    };

    const addPost = async () => {
        try {
            if (!location || !description || !image) {
                return Snackbar.show({
                    text: 'Please Add All the Fields',
                    textColor: 'white',
                    backgroundColor: 'red'
                });
            }

            const uid = shortid.generate()

            await firebase.app()
                .database('https://instatest-cccda-default-rtdb.asia-southeast1.firebasedatabase.app/')
                .ref(`/posts/${uid}`)
                .set({
                    location,
                    description,
                    picture: image,
                    by: userState.name,
                    date: Date.now(),
                    instaId: userState.instaUserName,
                    userImage: userState.image,
                    id: uid
                });
            console.log('[AddPost.js][addPost]: Post Added');
            navigation.navigate('Home');
        } catch (error) {
            console.log('[AddPost.js][addPost][error]: ', error);
            Snackbar.show({
                text: "Post Upload Failed",
                textColor: "white",
                backgroundColor: "red"
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode='center'
                />
            )}
            <FormControl>
                <VStack space={2} style={{ margin: 8 }}>
                    <Box>
                        <Input
                            placeholder="Location"
                            value={location}
                            variant='rounded'
                            style={{ color: '#eee' }}
                            onChangeText={text => setLocation(text)}
                        />
                    </Box>

                    {imageUploading ? (
                        <ProgressBar progress={uploadStatus} style={styles.progress} />
                    ) : (
                        <Button
                            onPress={chooseImageSource}
                            variant="outline"
                            borderRadius='full'
                            colorScheme='info'
                        >
                            <HStack space={3}>
                                <Icon
                                    name='md-image-outline'
                                    as={Ionicons}
                                    style={styles.icon}
                                />
                                <Text style={{ color: '#FDCB9E' }}>Choose Image</Text>
                            </HStack>
                        </Button>
                    )}
                    <Box>
                        <TextArea
                            rowSpan={5}
                            placeholder="Some Description"
                            value={description}
                            style={{ color: '#eee' }}
                            onChangeText={text => setDescription(text)} variant='rounded'
                        />
                    </Box>
                    <Button
                        variant='outline'
                        onPress={addPost}
                    >
                        <Text
                            style={{ color: '#FDCB9E' }}
                        >Add Post</Text>
                    </Button>
                </VStack>
            </FormControl>
        </ScrollView>
    );
};

AddPost.propTypes = {
    userState: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userState: state.auth.user
});

export default connect(mapStateToProps, null)(AddPost);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262C',
        flex: 1,
        justifyContent: 'flex-start',
    },
    icon: {
        fontSize: 20,
        color: '#FDCB9E'
    },
    image: {
        width: null,
        height: 150,
        marginVertical: 15
    },
    progress: {
        width: '90%',
        marginBottom: 20
    }
});