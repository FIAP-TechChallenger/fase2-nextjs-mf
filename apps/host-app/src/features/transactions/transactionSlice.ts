import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  DeleteTransacao,
  getSaldo,
  getTransacoes,
  postSaldo,
  postTransacao,
  putTransacoes,
} from '../../services/transacoesServices';
import { useSession } from 'next-auth/react';

interface Transacao {
  userId: number;
  tipoTransacao: string;
  valor: number;
  date: string;
  anexo?: File;
}

interface TransacoesState {
  transacoes: Transacao[];
  saldo: number;
}

const initialState: TransacoesState = {
  transacoes: [],
  saldo: 0,
};



// Thunks para ações assíncronas
export const fetchDadosIniciais = createAsyncThunk(
  'transacoes/fetchDadosIniciais',
  async (userId: number) => {
    const [saldoResult, transacoesResult] = await Promise.all([
      getSaldo(userId),
      getTransacoes(userId),
    ]);
    return { saldo: saldoResult, transacoes: transacoesResult };
  }
);

export const atualizarTransacoes = createAsyncThunk(
  'transacoes/atualizarTransacoes',
  async (userId: number) => {
    const transacoesResult = await getTransacoes(userId);
    return { transacoes: transacoesResult };
  }

)
export const atualizarSaldo = createAsyncThunk(
  'transacoes/atualizarSaldo',
  async (userId: number) => {
    const saldoResult = await getSaldo(userId);
    return { saldo: saldoResult };
  }
)

export const realizarDeposito = createAsyncThunk(
  'transacoes/realizarDeposito',
  async (
    { userId, valor }: { userId: number; valor: number },
    { dispatch }
  ) => {

    await postSaldo(userId, valor); // Atualiza o saldo no banco
    const saldoAtualizado = await getSaldo(userId); // Busca o saldo atualizado
    dispatch(atualizarSaldoGlobal(saldoAtualizado)); // Atualiza no Redux imediatamente
  }
);

export const realizarTransferencia = createAsyncThunk(
  'transacoes/realizarTransferencia',
  async (
    { userId, valor }: { userId: number; valor: number },
    { dispatch }
  ) => {

    await postSaldo(userId, valor); // Atualiza o saldo no banco
    const saldoAtualizado = await getSaldo(userId); // Busca o saldo atualizado
    dispatch(atualizarSaldoGlobal(saldoAtualizado)); // Atualiza no Redux imediatamente
  }
);

export const novaTransacaoBanco = createAsyncThunk(
  'transacoes/novaTransacaoBanco',
  async (
    { userId, tipoTransacao, valor, date, anexo }: { userId: number; tipoTransacao: string; valor: number; date: string; anexo?: File },
    { dispatch }
  ) => {
    const transacao: Transacao = { userId, tipoTransacao, valor, date, anexo };
    const result = await postTransacao(transacao);

    if (result) {
      await dispatch(atualizarTransacoes(userId));

    }
  }

);


export const atualizarTransacaoBanco = createAsyncThunk(
  'transacoes/atualizarTransacaoBanco',
  async (
    { transacaoId, tipoTransacao, valor, date, anexo }: { transacaoId: number; tipoTransacao: string; valor: number; date: string; anexo?: File },
    { dispatch }
  ) => {
    const transacaoAtualizada = { transacaoId, tipoTransacao, valor, date, anexo };
    const result = await putTransacoes(transacaoAtualizada);

    if (result) {
     

    }
  }

)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    atualizarSaldoLocal(state, action: PayloadAction<number>) {
      state.saldo += action.payload; // Atualiza o saldo localmente
    },
    atualizarSaldoGlobal(state, action: PayloadAction<number>) {
      state.saldo = action.payload; // Atualiza com o saldo retornado do banco
    },
    novaTransacao(state, action: PayloadAction<Transacao>) {
      state.transacoes.push(action.payload); // Adiciona nova transação localmente
    },
  },
  // extra reducres para atualizar localmente os dados 
  extraReducers: (builder) => {
    builder
      .addCase(fetchDadosIniciais.fulfilled, (state, action) => {
        state.saldo = action.payload.saldo;
        state.transacoes = action.payload.transacoes;
      })
      .addCase(fetchDadosIniciais.rejected, (state, action) => {
        console.error('Erro ao buscar dados iniciais:', action.error.message);
      })
      .addCase(atualizarTransacoes.fulfilled, (state, action) => {
        state.transacoes = action.payload.transacoes;
      })
      .addCase(atualizarSaldo.fulfilled, (state, action) => {
        state.saldo = action.payload.saldo;
        console.log('Saldo atualizado pelo banco:', state.saldo);
      })

  },
});

export const {
  atualizarSaldoLocal,
  atualizarSaldoGlobal,
  novaTransacao,
} = transactionSlice.actions;

export default transactionSlice.reducer;
