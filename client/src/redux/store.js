import { createStore } from "redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { getAllPizzaListManager } from "./reducers/pizzaListReducer";
import {cartListManager} from "./reducers/cartListReducer";
import createSagaMiddleware from "@redux-saga/core";
import pizzaSaga from "./saga/pizzaListSaga";
import {composeWithDevTools} from "redux-devtools-extension";
import { userManager } from "./reducers/userReducer";
import { finalPriceManager } from "./reducers/finalPriceReducer";
import { orderManager } from "./reducers/orderReducer";
import { allUserManager } from "./reducers/allUserReducer";
import { pizzaToOperateOnManager } from "./reducers/pizzaOpReducer";
import { AllOrdersManager } from "./reducers/allOrdersReducer";

const rootReducer=combineReducers({getAllPizzaListManager,cartListManager,userManager,finalPriceManager,orderManager,allUserManager,pizzaToOperateOnManager,AllOrdersManager});

const sagaMiddleWare=createSagaMiddleware();

const initialState={}
const middleware=[sagaMiddleWare];
const store=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleWare.run(pizzaSaga);


export default store;