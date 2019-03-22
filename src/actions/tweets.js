import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet (text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(dispatch(hideLoading()))
    }
}

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function toggleLike ({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_LIKE,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleLike(info) {
    return (dispatch) => {
        dispatch(toggleLike(info))

        return saveLikeToggle(info)
            .catch(e => {
                console.warn('Error on tweet like: ', e)
                dispatch(toggleLike(info))
                alert('Something went wrong, please try again')
            })
    }
}