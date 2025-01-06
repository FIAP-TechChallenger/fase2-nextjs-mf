import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: [
        'deposito', 
        'saque',
        'transferencia'
    ]
};

const transactionTypeSlices = createSlice({
    name: 'transactionTypes',
    initialState,
    reducers: {} // Adicione uma propriedade reducers, mesmo que esteja vazia
});

export default transactionTypeSlices.reducer;
