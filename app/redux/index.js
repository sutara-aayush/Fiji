import { combineReducers } from 'redux'

import users from './users'
import nav from './nav'
import auth from './auth'
import chat from './chat'
import story from './story'
import game from './game'
import user from './user'
import score from './score'
import data from './data'
import sticker from './sticker'

const rootReducer = combineReducers({
    users,
    nav,
    auth,
    chat,
    sticker,
    story,
    game,
    user,
    data,
    score 
})

export default rootReducer