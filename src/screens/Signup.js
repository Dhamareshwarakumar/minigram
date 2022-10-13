import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Box,
    FormControl,
    Input,
    Text,
    Button,
    Avatar,
    VStack
} from 'native-base';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../action/auth';


const Signup = ({ signUp }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instaUserName, setInstaUserName] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const chooseImageSource = () => {
        Alert.alert(
            "Select Avatar",
            null,
            [
                {
                    text: "Take Picture",
                    onPress: takePicture,
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
            cameraType: 'front',
            maxHeight: 200,
            maxWidth: 200
        }, response => {
            processImage(response);
        });
    };

    const choosePicture = () => {
        launchImageLibrary({
            mediaType: 'photo',
            maxHeight: 200,
            maxWidth: 200
        }, response => {
            processImage(response);
        });
    }

    const processImage = (response) => {
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

    const doSignUp = async () => {
        // TODO: Add Validation
        signUp({ name, email, password, instaUserName, country, bio, image });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View
                style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={chooseImageSource}
                >
                    <Avatar size="lg" source={{ uri: image }} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.progressContainer}
            >
                {imageUploading && (
                    <ProgressBar progress={uploadStatus} style={styles.progress} />
                )}
                <FormControl>
                    <VStack space={2} style={{ marginHorizontal: 8 }}>
                        <Box>
                            <Input
                                placeholder="Name"
                                value={name}
                                variant='rounded'
                                style={{ color: '#eee' }}
                                onChangeText={text => setName(text)}
                            />
                        </Box>

                        <Box>
                            <Input
                                placeholder="Email"
                                value={email}
                                variant='rounded'
                                style={{ color: '#eee' }}
                                onChangeText={text => setEmail(text)}
                            />
                        </Box>

                        <Box>
                            <Input
                                placeholder="Password"
                                value={password}
                                style={{ color: '#eee' }}
                                variant='rounded'
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={true}
                            />
                        </Box>

                        <Box>
                            <Input
                                placeholder="Instagram Username"
                                value={instaUserName}
                                style={{ color: '#eee' }}
                                variant='rounded'
                                onChangeText={text => setInstaUserName(text)}
                            />
                        </Box>

                        <Box>
                            <Input
                                placeholder="Your Short Bio"
                                value={bio}
                                variant='rounded'
                                style={{ color: '#eee' }}
                                onChangeText={text => setBio(text)}
                            />
                        </Box>

                        <Box>
                            <Input
                                placeholder="Country"
                                value={country}
                                variant='rounded'
                                style={{ color: '#eee' }}
                                onChangeText={text => setCountry(text)}
                            />
                        </Box>
                        <Button
                            variant="outline"
                            borderRadius="full"
                            onPress={doSignUp}
                        ><Text style={{ color: '#eee' }}>SignUp</Text></Button>
                    </VStack>
                </FormControl>
            </View>
        </ScrollView>
    );
};

Signup.propTypes = {
    signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    signUp
};

export default connect(null, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262C',
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    progress: {
        width: '90%',
        marginBottom: 20
    },
    progressContainer: {
        alignItems: 'center'
    }
})