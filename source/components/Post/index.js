// Core 
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, array, number } from 'prop-types';

// Components
import { Consumer } from 'components/HOC/withProfile';
import Like from 'components/Like'

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        // comment: string.isRequired,
        // created: number.isRequired,
        // id: string.isRequeired,
        // _likePost: func.isRequeired,
        // likes: array.isRequeired,
    };

    constructor() {
        super();
        this._removePost = this._removePost.bind(this);
    }

    _removePost() {
        const { _removePost, id } = this.props;
        _removePost(id);
    }

    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className={Styles.post}>
                        <span className={Styles.cross}
                            onClick={this._removePost}>
                        </span>
                        <img src={context.avatar} />
                        <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                        <Like id={id} _likePost={_likePost} likes={likes} {...context} />
                    </section>
                )}
            </Consumer>
        )
    }
}