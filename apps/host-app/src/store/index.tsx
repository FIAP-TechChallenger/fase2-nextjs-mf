import { configureStore } from "@reduxjs/toolkit";
import  transactionTypes from "../features/TransactionTypes/transactionTypesSlice"

const store = configureStore({
    reducer: {
        transactionTypes
    }
});

export default store;