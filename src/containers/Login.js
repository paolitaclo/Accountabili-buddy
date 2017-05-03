import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button, CardSection, Card, Input, Spinner } from '../components/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

const mapStateToProps = ({ login }) => {
  const { email, password, error, loading, isLoggedIn } = login;

  return { email, password, error, loading, isLoggedIn };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ emailChanged, loginUser, passwordChanged }, dispatch);
};

class Login extends Component {
  componentWillMount() {
    if (this.props.isLoggedIn) {
      return this.props.navigation.navigate('Slider')
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginAttempt = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });

    // console.log('Our loggedIn prop: ',this.props.isLoggedIn)

    if (this.props.isLoggedIn) {
      return this.props.navigation.navigate("Slider")
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size='large' />
        </CardSection>
      )
    }
    const { navigate } = this.props.navigation;

    return (
      <CardSection>
        <Button whenPressed={this.onLoginAttempt.bind(this)}>
          Log in
        </Button>
        <Button whenPressed={() => navigate('Register')} style={{ backgroundColor: '#4CB906', borderColor: '#4CB906' }}>
          Sign Up
        </Button>
      </CardSection>
    );
  }

  render() {

    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('Slider')
    }
    return (
      <Card>
        <Text style={styles.welcome}>Accountabili-Buddy</Text>

        <CardSection>
          <Input
            placeholder="example@gmail.com"
            label='Email'
            autoCapitalize={'none'}
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder='Password'
            label="Password"
            autoCapitalize={'none'}
            secureTextEntry
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        {this.renderSpinner()}

        <CardSection>
          <Button whenPressed={() => this.props.navigation.navigate('Slider')}>
            Ducky Schmucky
          </Button>
        </CardSection>
      </Card>
    )
  }
}

Login.navigationOptions = {
  title: "Login"
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
