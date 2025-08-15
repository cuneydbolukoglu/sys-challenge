import { create } from "zustand";

const BASEURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const APIURL = `${BASEURL}/customer`;

const useCustomerStore = create((set, get) => ({
    customerData: [],
    isLoading: false,

    setLoading: (loading) => set({ isLoading: loading }),

    getCustomer: () => {
        return new Promise(async (resolve, reject) => {
            set({ isLoading: true });
            try {
                const response = await fetch(APIURL);
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                const result = await response.json();
                set({ customerData: result, isLoading: false });
                resolve(result);
            } catch (error) {
                set({ isLoading: false });
                reject(error);
            }
        });
    },

    addCustomer: (formData) => {
        return new Promise(async (resolve, reject) => {
            const id = Math.random().toString(16).slice(2);
            try {
                const response = await fetch(APIURL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, ...formData }),
                });
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                await response.json();
                await get().getCustomer();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateCustomer: (id, formData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${APIURL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                await response.json();
                await get().getCustomer();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteCustomer: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${APIURL}/${id}`, { method: "DELETE" });
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                await get().getCustomer();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    },
}));

export default useCustomerStore;