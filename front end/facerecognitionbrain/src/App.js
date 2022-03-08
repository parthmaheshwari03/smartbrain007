import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import 'tachyons'
import Clarifai from 'clarifai'
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles";
import ImagelinkForms from './Components/ImagelinkForms/ImagelinkForms'
import Rank from './Components/Rank/Rank'
import { Component } from 'react/cjs/react.production.min';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '2d8a576bb0f643eb95ded4595238c022'
 });

const particlesOptions = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 60,
fullScreen: { enable: true },
particles: {
number: {
  value: 50
},
shape: {
  type: "circle"
},
opacity: {
  value: 0.5
},
size: {
  value: 400,
  random: {
    enable: true,
    minimumValue: 200
  }
},
move: {
  enable: true,
  speed: 10,
  direction: "top",
  outModes: {
    default: "out",
    top: "destroy",
    bottom: "none"
  }
}
},
interactivity: {
detectsOn: "canvas",
events: {
  resize: true
}
},
style: {
filter: "blur(50px)"
},
detectRetina: true,
themes: [
{
  name: "light",
  default: {
    value: true,
    mode: "light"
  },
  options: {
    background: {
      color: "#f7f8ef"
    },
    particles: {
      color: {
        value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
      }
    }
  }
},
{
  name: "dark",
  default: {
    value: true,
    mode: "dark"
  },
  options: {
    background: {
      color: "#080710"
    },
    particles: {
      color: {
        value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"]
      }
    }
  }
}
],
emitters: {
direction: "top",
position: {
  x: 50,
  y: 150
},
rate: {
  delay: 0.2,
  quantity: 2
},
size: {
  width: 100,
  height: 0
}
}}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

    constructor(){
      super();
      this.state = initialState
    }

    loadUser = (data) => {
      this.setState({ user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
    }

    

    calculatefacelocation = (data) => {
      const image = document.getElementById('inputImage');
      const height = Number(image.height);
      const width = Number(image.width);
      console.log(height, width);
      return {
        leftCol: width*(data.left_col),
        topRow: height*(data.top_row),
        rightCol: width - width*(data.right_col),
        bottomRow: height - height*(data.bottom_row)
      }
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value})
    }

    onSubmit = () => {
      this.setState({imageURL: this.state.input})
      console.log(this.state.imageURL);
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
        })
        .then(resp => resp.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        }).then(console.log)
        }
        console.log('hi', response)
        // console.log();
        this.setState({box: this.calculatefacelocation(response.outputs[0].data.regions[0].region_info.bounding_box)})
        console.log(this.state.box);

        
      }).catch(console.log)
  }

  onRouteChange = (input) => {
    if(input === 'signin'){
      this.setState(initialState)
    }
    this.setState({route: input})
  }

  // onRouteChange1 = () => {
  //   this.setState({route: 'signin'})
  // }
      
    

    render(){
      const { route , imageURL , box } = this.state;
      return (
        <div>
          <Particles className='particles'
          options={particlesOptions}/>
            <Navigation onRouteChange={this.onRouteChange} route={route}/>
          {
            route === 'home' ? 
              <div>
                <Logo/>
                <Rank name = {this.state.user.name} entries= {this.state.user.entries} />
                <ImagelinkForms onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
                <FaceRecognition imageURL={imageURL} box= {box}/>
              </div> : (route === 'signin') ?
              <SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/> :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              
          }  
        </div>
      )
    }
}

export default App;
