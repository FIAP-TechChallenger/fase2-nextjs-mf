import { configureStore } from "@reduxjs/toolkit";
import  transactionTypes from "../features/TransactionTypes/transactionTypesSlice"
import  transaction from "../features/transactions/transactionSlice"

const store = configureStore({
    reducer: {
        transactionTypes,
        transaction
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;