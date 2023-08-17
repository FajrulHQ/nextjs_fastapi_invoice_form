import { configureStore } from '@reduxjs/toolkit'
import invoiceSlicer from './slicer/invoiceSlicer'

export const store = configureStore({
    reducer: {
        invoiceSlicer,
    }
})