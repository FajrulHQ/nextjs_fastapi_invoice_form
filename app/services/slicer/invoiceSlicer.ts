import { createSlice } from '@reduxjs/toolkit'

export const invoiceSlicer = createSlice({
    name: 'invoiceSlicer',
    initialState: {
        claim: {
            bds_doc_no: '',
            bds_doc_date: '',
            supplier: '',
            supplier_tax_id: '',
            transaction_type: '',
            bank_name: '',
            bank_account: 0,
            bank_account_name: '',
            support_doc: '',
            payment_plan_date: '',
            paid_date: '',
            invoice_list_detail: [],
        },
        default_list: {
            top: 0,
            invoice_due_date: '',
            tax_invoice_id: '',
            ppn_rate: 0,
            description: '',
            total_before_tax: 0,
            ppn_prepaid: 0,
            total_after_tax: 0,
        },
        default_list_detail: {
            po_no: '',
            items: '',
            quantity: 0,
            amount_dpp: 0,
            other_amount: 0,
            ppn_amount: 0,
            pph_prepaid: 0,
            pph_payable: 0,
            total_before_tax: 0,
            total_after_tax: 0,
        },
        list: [],
        list_detail: [],
    },
    reducers: {
        set_invoice_claim: (state, action) => {
            state.claim = action.payload
        },
        set_invoice_list: (state, action) => {
            state.list = action.payload
        },
        set_invoice_list_detail: (state, action) => {
            state.list_detail = action.payload
        },
    },
})

export const { set_invoice_claim, set_invoice_list, set_invoice_list_detail } = invoiceSlicer.actions
export default invoiceSlicer.reducer
