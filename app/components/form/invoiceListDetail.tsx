import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { onCreateInvoiceListDetail, onDeleteInvoiceListDetail, onReadInvoiceList } from "app/services/invoice.api";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { set_invoice_list_detail } from "app/services/slicer/invoiceSlicer";

export default function InvoiceListDetailForm({ id, data }: any) {
  const dispatch = useDispatch()

  const invoice_list_detail = useSelector((state: any) => state.invoiceSlicer.list_detail)
  const default_invoice_list_detail = useSelector((state: any) => state.invoiceSlicer.default_list_detail)

  const readInvoiceListDetail = async () => {
    const resp = await onReadInvoiceList({ id })
    if (!resp.error) dispatch(set_invoice_list_detail(resp.invoice_list_detail.map(inv => ({ ...inv, is_saved: true }))))
  }

  const changeInvoiceListDetail = (obj, title, value) => {
    let new_obj = { ...obj }
    new_obj[title] = value
    const new_invoice_list_detail = invoice_list_detail.map(s =>
      s.id === obj.id ? new_obj : s)
    dispatch(set_invoice_list_detail(new_invoice_list_detail))
  }

  const deleteInvoiceListDetail = async (c) => {
    if (c.is_saved) {
      if (confirm("Are you sure to delete this data?")) {
        await onDeleteInvoiceListDetail({ id: c.id })
      }
    }
    dispatch(set_invoice_list_detail(invoice_list_detail.filter(s => s.id !== c.id)))
  }

  const saveInvoiceListDetail = async (c) => {
    const resp = await onCreateInvoiceListDetail({ ...c, invoice_id: id })
    const new_invoice_list_detail = invoice_list_detail.map(inv => inv.id === c.id ? { ...resp, is_saved: true } : inv)
    dispatch(set_invoice_list_detail(new_invoice_list_detail))
  }

  useEffect(() => {
    if (id) {
      readInvoiceListDetail()
    }
  }, [id]);

  const header = [
    "Doc Received No", "PO No", "Item", "Quantity", "Amount DPP", "Other Amount", "PPN Amount", "PPH Prepaid", "PPH Payable", "Total Before Tax", "Total After Tax", "Action"
  ]
  return (
    <div className="m-2 border-b border-t border-zinc-500">
      <div className="bg-zinc-100  border-b border-zinc-500 p-2 flex justify-between">
        <span className="font-semibold text-sm">Invoice List Detail</span>
        {id ?
          <PlusCircleIcon className="text-blue-700 w-5 cursor-pointer" onClick={() => dispatch(set_invoice_list_detail([...invoice_list_detail, { ...default_invoice_list_detail, id: Math.floor(Math.random() * 1000) }]))} />
          : ""}
      </div>
      <div className="space-y-2 p-2">
        <div className="grid grid-cols-12 gap-1 text-center">
          {header.map(h => <label key={h} className="text-[11px]">{h}</label>)}
        </div>
        {invoice_list_detail.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-1">
            <Input placeholder="INV129" value={data.bds_doc_no} readOnly />
            <Input placeholder="PUR/HMIA/21-2088" value={c.po_no} onChange={e => changeInvoiceListDetail(c, 'po_no', e.target.value)} />
            <Input placeholder="UI Path Robot" value={c.items} onChange={e => changeInvoiceListDetail(c, 'items', e.target.value)} />
            <Input placeholder="0" type="number" value={c.quantity} onChange={e => changeInvoiceListDetail(c, 'quantity', e.target.value)} />
            <Input placeholder="200.000" type="number" value={c.amount_dpp} onChange={e => changeInvoiceListDetail(c, 'amount_dpp', Number(e.target.value))} />
            <Input placeholder="0" type="number" value={c.other_amount} onChange={e => changeInvoiceListDetail(c, 'other_amount', Number(e.target.value))} />
            <Input placeholder="0" type="number" value={c.ppn_amount} onChange={e => changeInvoiceListDetail(c, 'ppn_amount', Number(e.target.value))} />
            <Input placeholder="0" type="number" value={c.pph_prepaid} onChange={e => changeInvoiceListDetail(c, 'pph_prepaid', Number(e.target.value))} />
            <Input placeholder="0" type="number" value={c.pph_payable} onChange={e => changeInvoiceListDetail(c, 'pph_payable', Number(e.target.value))} />
            <Input placeholder="100.000" type="number" value={c.total_before_tax} onChange={e => changeInvoiceListDetail(c, 'total_before_tax', Number(e.target.value))} />
            <Input placeholder="100.000" type="number" value={c.total_after_tax} onChange={e => changeInvoiceListDetail(c, 'total_after_tax', Number(e.target.value))} />
            {c.is_saved ?
              <div className="flex gap-2 pt-2 justify-center">
                <Trash2Icon className="w-5 text-red-700 cursor-pointer" onClick={() => deleteInvoiceListDetail(c)} />
              </div>
              :
              <div className="flex gap-2 pt-2 justify-center">
                <Trash2Icon className="w-5 text-red-700 cursor-pointer" onClick={() => deleteInvoiceListDetail(c)} />
                <SaveIcon className="w-5 text-blue-700 cursor-pointer" onClick={() => saveInvoiceListDetail(c)} />
              </div>
            }
          </div>
        ))}
      </div>
    </div >
  );
}
