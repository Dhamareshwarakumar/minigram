import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    Text,
    VStack
} from 'native-base';


const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doSignIn = () => {
        alert('Aigned Up')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Heading size='xl' style={styles.heading}>Welcome to MiniGram</Heading>

            <Image
                source={'Welcome'}
                style={{ width: null, height: 150, marginTop: 30 }}
                resizeMode='contain'
            />

            <FormControl>
                <VStack space={2} style={{ marginHorizontal: 8 }}>
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
                            variant='rounded'
                            style={{ color: '#eee' }}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </Box>
                    <Button
                        variant="outline"
                        borderRadius="full"
                        onPress={doSignIn}
                    ><Text style={{ color: '#eee' }}>SignIn</Text></Button>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text
                            style={{ color: '#E5D68A', textAlign: 'center' }}
                        >
                            Do not have an account? Signup here...
                        </Text>
                    </TouchableOpacity>
                </VStack>
            </FormControl>

        </ScrollView>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B262C',
        flex: 1,
        justifyContent: 'flex-start'
    },
    heading: {
        textAlign: 'center',
        color: '#FDCB9E',
        marginHorizontal: 5,
        marginTop: 5
    }
});