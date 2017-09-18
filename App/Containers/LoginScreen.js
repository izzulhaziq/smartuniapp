import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import { Toolbar, COLOR, Button, Card, Avatar } from 'react-native-material-ui'
import LoginActions from '../Redux/LoginRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { ApplicationStyles, Metrics, Colors, uiTheme } from '../Themes'

class LoginScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Login',
    header: <View>
              <Toolbar
                leftElement={''}
                centerElement='Welcome'
                rightElement={''}
                isSearchActive={false}
              />
            </View>
  })

  constructor (props) {
    super(props)

    this.state = {
      isLoggingIn: props.isLoggingIn,
      username: null,
      password: null,
      loginSuccess: null
    }

    this.login = this.login.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loginSuccess) {
      this.props.navigation.navigate('Home')
    }

    this.setState({
      isLoggingIn: nextProps.isLoggingIn,
      loginSucess: nextProps.loginSuccess
    })
  }

  login () {
    this.props.login(this.state.username, this.state.password)
  }

  render () {
    const buttonText = this.state.isLoggingIn ? 'Signing In...' : 'Sign In'
    return (
      <Container>
        <Content>
          <View style={{
                flex:1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height:200,
                marginBottom: -80,
                paddingTop: 35,
                backgroundColor: uiTheme.palette.accentColor}} >
            <Text style={{fontSize: 30, fontWeight: 'bold', color: uiTheme.palette.alternateTextColor}}>ProxLabs</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: uiTheme.palette.alternateTextColor}}> university</Text>
          </View>
          <Card>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  keyboardType='email-address'
                  onChangeText={(text) => this.setState({username: text})} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry 
                  onChangeText={(text) => this.setState({password: text})} />
              </Item>
            </Form>
            <View style={styles.container}>
              <Button accent raised text={buttonText} onPress={this.login} disabled={this.state.isLoggingIn} />
              <Button accent text='Sign up now' />
            </View>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { 
    fetching: isLoggingIn,
    error,
    hasLoggedIn: loginSuccess
  } = state.login;
  return { isLoggingIn, error, loginSuccess }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
