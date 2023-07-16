import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
    position: 'relative'
  },
  inputs: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  inputLabel: {
    marginTop: 10
  },
  defaultMainButton: {
    backgroundColor: '#673ab6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 4,
    margin: 5
  },
  secondaryButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#673ab6',
    margin: 5
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonTextSecondary: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'black',
  },
  loginMainContent: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  forgotPasswordText: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  loginInputContainer: {
    flexDirection: 'column',
    padding: 30,
    margin: 10
  },
  logInButtons: {
    flexDirection: 'column',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    alignSelf: 'center',
    width: '100%'
  },
  welcomeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#673ab6',
    textAlign: 'center',
  },
  map: {
    // marginTop: 30,
    width: '100%',
    height: '70%',
    zIndex: -1
  },
  autoComplete: {
    position: 'absolute',
    marginTop: 40
  },
  loadingText: {
    textAlign: 'center',
  },
  homeContainer: {
    flexDirection: 'column',
    padding: 30,
    margin: 10

  },
  locationText: {
    flexDirection: 'column',
    padding: 30,
    color: '#a28acb',

  },
  mainContentContainer: {
    flexDirection: 'column',
    padding: 30,
    marginTop: 30
  },
  mainContentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a28acb',
    textAlign: 'center',
  },
  searchInput: {
    marginTop: 30
  },
  listItems: {
    zIndex: -100,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 35,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
  },
  backText: {
    textAlign: 'center'
  },
  markerStyling: {
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#673ab6',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  modalContent: {
    flexDirection: 'column',
    padding: 30,
    marginTop: 50,
  },
  restaurantInfo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#673ab6',
    textAlign: 'center',
  },
  restaurantInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#673ab6',
    textAlign: 'center',
  },
  modalClose: {
    padding: 20,
    backgroundColor: '#673ab6',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 4,
    margin: 5,
    width: '100%'
  },
  modalCloseText: {
    color: 'white'
  },
  modalButtons: {
    padding: 20,
    bottom: 0,
    alignSelf: 'center',
    width: '100%'
  },
  creditIcon: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a28acb',
    textAlign: 'center',
  }
});