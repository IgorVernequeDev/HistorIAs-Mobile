import { StyleSheet } from 'react-native';
import { TextStyle } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 80,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },

    story: {
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
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
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    checkbox: {
        marginLeft: 10,
    },
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        width: 250,
    },
    inputAndroid: {
        width: 230,
        fontSize: 16,
        color: 'black',
    },
});

export const htmlStyles: Record<string, TextStyle> = {
  h2: {
    fontSize: 24,
    fontWeight: '700', // use número ou 'bold'
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    color: '#6A0572',
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#444444', // fallback para narração
  },
  '.narracao': {
    color: '#444444',
    fontSize: 16,
  },
  '.personagem-1': { color: '#1A5276', fontSize: 16 },
  '.personagem-2': { color: '#C70039', fontSize: 16 },
  '.personagem-3': { color: '#FF8C00', fontSize: 16 },
  '.personagem-4': { color: '#008000', fontSize: 16 },
  '.personagem-5': { color: '#800080', fontSize: 16 },
  strong: { fontWeight: '700' },
  em: { fontStyle: 'italic' },
  ul: { marginTop: 10, marginBottom: 10, paddingLeft: 20 },
  li: { marginBottom: 5, fontSize: 16 },
};