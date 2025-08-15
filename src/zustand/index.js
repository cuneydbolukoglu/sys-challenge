import { create } from 'zustand';

import allCustomer from './store/useCustomer';

export const useCategoryStore = create(allCustomer);