// Core 
import React, { Component } from 'react';
import moment from 'moment';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    state = {
        isSpinning: false,
        posts: [
            {
                id: '123',
                comment: "Hi there!",
                created: 1526825076849,
                likes: [],
            },
            {
                id: '456',
                comment: "Hi",
                created: 1526825076859,
                likes: [],
            }
        ],
    };

    _setPostsFetchingState(state) {
        this.setState({
            isSpinning: state,
        })
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post = {
            id: getUniqueID(),
            created: moment.utc(),
            comment,
            likes: [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isSpinning: false,
        }))
    }

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName,
                        }
                    ],
                }
            }
            return post;
        });

        this.setState({
            posts: newPosts,
            isSpinning: false,
        })
    }

    async _removePost(id) {
        this._setPostsFetchingState(true);
        await delay(1200);

        const removePosts = this.state.posts.filter(post => post.id !== id);

        this.setState({
            posts: removePosts,
            isSpinning: false,
        })
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key={post.id} {...post} 
                    _likePost={this._likePost}
                    _removePost={this._removePost} />
        });

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isSpinning} />
                <StatusBar />
                <Composer _createPost={this._createPost} />
                {postsJSX}
            </section>
        )
    }
}
