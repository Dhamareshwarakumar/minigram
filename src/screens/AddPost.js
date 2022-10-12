import React, { useState, useEffect } from 'react';
import {
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
import Ionicons from 'react-native-vector-icons/Ionicons';


const AddPost = () => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    const chooseImage = async () => { };
    const addPost = () => { };

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
                            onPress={chooseImage}
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

export default AddPost;

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