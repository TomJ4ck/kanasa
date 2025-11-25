import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalculationResult } from '../types';
import { calculatePay } from '../utils/calculator';

interface CalculatorState {
  salary: number | '';
  age: number | '';
  dependents: number;
  result: CalculationResult | null;
}

const initialState: CalculatorState = {
  salary: '',
  age: '',
  dependents: 0,
  result: null,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setSalary(state, action: PayloadAction<number | ''>) {
      state.salary = action.payload;
    },
    setAge(state, action: PayloadAction<number | ''>) {
      state.age = action.payload;
    },
    setDependents(state, action: PayloadAction<number>) {
      state.dependents = action.payload;
    },
    calculateResult(state) {
      if (typeof state.salary === 'number' && typeof state.age === 'number') {
        const ageCategory = state.age >= 40 ? 'over40' : 'under40';
        state.result = calculatePay(state.salary, ageCategory, state.dependents);
      }
    },
  },
});

export const { setSalary, setAge, setDependents, calculateResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;