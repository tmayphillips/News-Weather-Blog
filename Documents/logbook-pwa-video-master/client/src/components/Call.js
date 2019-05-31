import React, {Component} from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import {Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../Call.css'
let client = AgoraRTC.createClient({mode: 'live', codec: 'h264'})

const ADMIN = "admin"
const USER_ID = Math.floor(Math.random() * 1000000001)

class Call extends Component {

  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false
  })

  state = {
    remoteStreams: {}
  }

  componentDidMount() {
    this.initLocalStream()
    this.initClient()
    this.joinChannel()
  }

  componentDidUpdate(prevProps,prevState) {
    this.joinChannel()
  }

  initLocalStream = () => {
    let me = this
    me.localStream.init(
      function() {
        console.log('Assistant media received');
        me.localStream.play('assistant_local')
      },
      function(err) {
        console.log('Assistant media failed', err)
      }
    )
  }

  initClient = () => {
    client.init(
      'd4452d55136f4fc9a2620e0b4f1a497b',
      function() {
        console.log('Client initialized')
      },
      function(err) {
        console.log('Client initialize failed', err)
      }
    )
    this.subscribeToClient()
  }

  joinChannel = () => {
    let me = this
    client.join(
      null,
      'assistance',
      USER_ID,
      function(uid) {
        console.log('User ' + uid + ' joined channel')
        client.publish(me.localStream, function(err) {
          console.log('Published local stream')
        })
      },
      function(err) {
        console.log('Joining channel failed', err)
      }
    )
  }

  subscribeToClient = () => {
    let me = this
    client.on('stream-added', me.onStreamAdded)
    client.on('stream-subscribed', me.onRemoteClientAdded)
    client.on('stream-removed', me.onStreamRemoved)
    client.on('peer-leave', me.onPeerLeave)
  }

  onStreamAdded = e => {
    let me = this
    let stream = e.stream
    console.log('New stream added: ' + stream.getId())
    me.setState(
      {
        remoteStreams: {
          ...me.state.remoteStream,
          [stream.getId()]: stream
        }
      },
      () => {
        client.subscribe(stream, function(err) {
          console.log('Subscribe failed', err)
        })
      }
    )
  }
  onRemoteClientAdded = e => {
    let me = this
    let remoteStream = e.stream
    me.state.remoteStreams[remoteStream.getId()].play(
      'agora_remote ' + remoteStream.getId()
    )
  }

  onStreamRemoved = e => {
    let me = this
    let stream = e.stream
    if (stream) {
      let streamId = stream.getId()
      let {remoteStreams} = me.state
      stream.stop()
      delete remoteStreams[streamId]
      me.setState({remoteStreams})
      console.log('Remote stream removed ' + stream.getId())
    }
  }

  onPeerLeave = e => {
    let me = this
    let stream = e.stream
    if (stream) {
      let streamId = stream.getId()
      let {remoteStreams} = me.state
      stream.stop()
      delete remoteStreams[streamId]
      me.setState({remoteStreams})
      console.log('Remote stream removed ' + stream.getId())
    }
  }

  render() {
    return (
      <Row>
      <div style={{position: 'absolute', top: '0px', left: '0px'}}>
        <Link to='/'>
          <input type="submit" value="Exit" />
        </Link>
      </div>
        <div id='assistant_local' style={{minWidth: '20vw', maxWidth: '150px', minHeight: '20vh', maxHeight: '150px', position: 'relative', top: '0px', left: '0px', borderRadius: '50px', zIndex: '-1'}} />
        {Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key]
          let streamId = stream.getId()
          return (
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{width: '100vw', height: '100vh', position: 'absolute', top: '0px', left: '0px', zIndex: '-2'}}
            />
          )
        })}
      </Row>
    )
  }
}

export default Call
