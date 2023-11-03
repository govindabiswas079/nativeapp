import React, { Fragment, useState, useEffect, useRef } from 'react'
import PipHandler, { usePipModeListener } from 'react-native-pip-android';
import { StyleSheet, View, Text, TouchableOpacity, AppState } from 'react-native';
import Video from 'react-native-video';
import video_file from './Mai_Marjawangi.mp4'

const ReactNativePIP = () => {
    const inPipMode = usePipModeListener();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            if(appState.current === "background"){
                PipHandler.enterPipMode(300, 214)
            }else{
                
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Use this boolean to show / hide ui when pip mode changes


    if (inPipMode) {
        return (
            <View style={styles.container}>
                <Video
                    source={video_file}
                    paused={false}
                    controls={false}
                    style={styles.backgroundVideo}
                    muted={true}
                />
            </View>
        );
    }


    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.text}>
                    These text components will be hidden in pip mode
                </Text>
                <TouchableOpacity
                    onPress={() => PipHandler.enterPipMode(300, 214)}
                    style={styles.box}
                >
                    <Text>Click to Enter Pip Mode</Text>
                </TouchableOpacity>
                {/* <Video
                    source={video_file}
                    paused={false}
                    controls={false}
                    style={styles.backgroundVideo}
                    muted={true}
                    resizeMode="contain"
                /> */}
            </View>
        </Fragment>
    )
}

export default ReactNativePIP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02ff02',
        width: 200,
        height: 60,
        marginVertical: 20,
        color: 'white',
        borderRadius: 30,
    },
    text: {
        marginBottom: 50,
        fontSize: 22,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "transparent"
    },
});