import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 80,
        paddingHorizontal: 15,
        alignItems: 'center'
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },

    form: {
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        padding: 15
    },

    story: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        padding: 15
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5
    },

    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    error: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        padding: 10
    },
    fontButton: {
        display: 'flex',
        backgroundColor: 'black',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 250,
        color: 'black'
    },
    inputAndroid: {
        width: 250,
        color: 'black',
    },
});