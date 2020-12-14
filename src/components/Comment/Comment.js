import React from 'react';
import { withAuth } from '../../context/auth-context';

class Comment extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.postDetails.commentAuthor.username}</p>
                <p>{this.props.postDetails.description}</p>
            </div>
        )
    }
}

export default withAuth(Comment);