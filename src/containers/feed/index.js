import { connection } from '../../helpers/mapStateToProps.js';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Post from '../../components/post';
import './index.css';
const uuid = require('uuid/v4');

class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: null,
        }
    }
    render() {
        return this.state.feed !== 'unauthorized' ?
            this.state.feed ?
                <div>
                    <ul className='feedList'>
                        {this.state.feed.map((blitz) => {
                            return <Post blitz={blitz} key={uuid()} token={this.props.token} />
                        })}
                    </ul>
                </div>
                :
                <p>Loading...</p>
            :
            <Redirect to='/' />
    }
    componentDidMount = () => {
        const headers = new Headers({
            Authorization: 'Bearer ' + this.props.token
        })
        const options = {
            method: "GET",
            headers: headers
        }

        fetch('https://propulsion-blitz.herokuapp.com/api/feed', options)
            .then(res => res.status === 401 ? 'unauthorized' : res.json())
            .then(data => {
                this.setState({
                    feed: data
                })
            })
    }
}

const connectedFeed = connection(Feed)

export default connectedFeed