import { DatabaseIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import InvoiceListForm from "./invoiceList";
import InvoiceListDetailForm from "./invoiceListDetail";
import { Button } from "../ui/button";
import { onCreateInvoice, onGetInvoiceList, onUpdateInvoiceClaim, onUpdateInvoiceList } from "app/services/invoice.api";
import { set_invoice_claim, set_invoice_list, set_invoice_list_detail } from "app/services/slicer/invoiceSlicer";

export default function InvoiceForm() {
  const dispatch = useDispatch()
  const invoice = useSelector((state: any) => state.invoiceSlicer.claim)
  const invoice_list = useSelector((state: any) => state.invoiceSlicer.list)
  const setInvoice = (d) => dispatch(set_invoice_claim(d))
  const getInvoices = async () => {
    const resp = await onGetInvoiceList({})
    dispatch(set_invoice_list(resp))
  }

  const submitInvoice = async () => {
    const resp = await onCreateInvoice(invoice)
    if (!resp.error) {
      alert('Invoice create successfully')
      getInvoices()
    }
    else alert(resp.error)
  }

  const saveInvoice = () => {
    onUpdateInvoiceClaim(invoice)
    invoice_list.map(inv => onUpdateInvoiceList(inv))
    alert('Invoice saved successfully')
  }

  const refreshInvoice = () => {
    dispatch(set_invoice_claim({
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
      invoice_list_detail: []
    }))
  }

  useEffect(() => {
    getInvoices()
  }, []);
  const transaction_options = [
    { key: 'transfer', text: 'Transfer' },
    { key: 'cash', text: 'Cash' },
    { key: 'other', text: 'Other' },
  ]
  const bank_options = [
    { key: 'bca', text: 'BCA' },
    { key: 'bni', text: 'BNI' },
    { key: 'bri', text: 'BRI' },
    { key: 'mandiri', text: 'Mandiri' },
  ]
  return (
    <Card className="shadow-md">
      <div className="bg-zinc-100 items-center p-2 flex gap-2">
        <DatabaseIcon className="w-4 h-4" />
        <span className="text-sm font-semibold">Invoice Claim</span>
      </div>
      <div className="p-2 px-6 grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">BDS Doc No</label>
            <Input
              placeholder="BDS/02/2022/0090"
              value={invoice.bds_doc_no}
              onChange={e => setInvoice({ ...invoice, bds_doc_no: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">BDS Doc Date</label>
            <Input
              placeholder="2022-10-05"
              value={invoice.bds_doc_date}
              onChange={e => setInvoice({ ...invoice, bds_doc_date: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Supplier</label>
            <Input
              placeholder="PT. Metrodata"
              value={invoice.supplier}
              onChange={e => setInvoice({ ...invoice, supplier: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Supplier Tax ID</label>
            <Input
              placeholder="101.333-2222.33333"
              value={invoice.supplier_tax_id}
              onChange={e => setInvoice({ ...invoice, supplier_tax_id: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Transaction Type</label>
            <Select onValueChange={c => setInvoice({ ...invoice, transaction_type: c })} value={invoice.transaction_type}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {transaction_options.map(val => (
                  <SelectItem key={val.key} value={val.key}>{val.text}</SelectItem>
                ))}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1">
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Bank Name</label>
            <Select onValueChange={c => setInvoice({ ...invoice, bank_name: c })} value={invoice.bank_name}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {bank_options.map(val => (
                  <SelectItem key={val.key} value={val.key}>{val.text}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Bank Account</label>
            <Input
              placeholder="12222222" type="number"
              value={invoice.bank_account}
              onChange={e => setInvoice({ ...invoice, bank_account: Number(e.target.value) })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Bank Account Name</label>
            <Input
              placeholder="PT. Metrodata"
              value={invoice.bank_account_name}
              onChange={e => setInvoice({ ...invoice, bank_account_name: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Support Doc</label>
            <Input
              placeholder="data/docs.pdf" type="file" accept="application/pdf"
              onChange={e => setInvoice({ ...invoice, support_doc: e.target.files![0].name })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Payment Plan Date</label>
            <Input
              placeholder="2022-10-10"
              value={invoice.payment_plan_date}
              onChange={e => setInvoice({ ...invoice, payment_plan_date: e.target.value })}
            />
          </div>
          <div className="items-center grid grid-cols-2 gap-1">
            <label className="text-xs">Paid Date</label>
            <Input
              placeholder="2022-10-10"
              value={invoice.paid_date}
              onChange={e => setInvoice({ ...invoice, paid_date: e.target.value })}
            />
          </div>
        </div>
      </div>
      <InvoiceListForm />
      <InvoiceListDetailForm id={invoice.id} />
      <div className="my-2 flex justify-center gap-4">
        <Button className="w-48 bg-blue-600 hover:bg-blue-500" onClick={saveInvoice}>Save</Button>
        <Button className="w-48 bg-blue-950 hover:bg-blue-900" onClick={submitInvoice}>Submit</Button>
        <Button className="w-48 bg-gray-500 hover:bg-gray-400" onClick={refreshInvoice}>Reset</Button>
      </div>
    </Card>);
}