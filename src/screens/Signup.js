import React, { useState } from 'react';
import {
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
import database from '@react-native-firebase/database';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../action/auth';

import { options } from '../utils/options';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instaUserName, setInstaUserName] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
                console.log('[Signup.js][chooseImage]: User cancelled image picker');
            } else if (response.error) {
                console.log('[Signup.js][chooseImage][ImagePickerError]: ', response.error);
            } else if (response.customButton) {
                console.log('[Signup.js][chooseImage][userTappedCustomButton]: ', response.customButton);
            } else {
                console.log('[Signup.js][chooseImage][response]: ', response);
                uploadImage(response);
            }
        });
    };

    const uploadImage = async (response) => {
        setImageUploading(true);
        const reference = storage().ref(response.fileName);

        const task = reference.putFile(response.path);
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
        signUp({ name, email, password, instaUserName, country, bio, image });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View
                style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={chooseImage}
                >
                    {/* <Text>haha</Text> */}
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

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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