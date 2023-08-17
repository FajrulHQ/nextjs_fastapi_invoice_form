import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { onGetInvoiceList } from "app/services/invoice.api";
import { set_invoice_claim, set_invoice_list } from "app/services/slicer/invoiceSlicer";
import { ArrowRightCircleIcon, Trash2Icon } from "lucide-react";

export default function InvoiceListForm() {
  const dispatch = useDispatch()
  const invoice_list = useSelector((state: any) => state.invoiceSlicer.list)
  const changeInvoiceList = (obj, title, value) => {
    let new_obj = { ...obj }
    new_obj[title] = value
    const new_invoice_list = invoice_list.map(s =>
      s.id === obj.id ? new_obj : s)
    dispatch(set_invoice_list(new_invoice_list))
  }
  const header = [
    "Invoice Doc", "Invoice Date", "Top", "Invoice Due Date", "Faktur Pajak No", "PPN Rate (%)", "Description", "Total Before Tax", "PPN Prepaid", "Total After Tax", "Action"
  ]

  return (
    <div className="m-2 border-b border-t border-zinc-500">
      <div className="text-sm bg-zinc-100 font-semibold border-b border-zinc-500 p-2"><span>Invoice List</span></div>
      <div className="space-y-2 p-2">
        <div className="grid grid-cols-11 gap-1 text-center">
          {header.map(h => <label key={h} className="text-[11px]">{h}</label>)}
        </div>
        {invoice_list.map((c, i) => (
          <div key={i} className="grid grid-cols-11 gap-1">
            <Input
              placeholder="INV129"
              value={c.bds_doc_no || ''}
              onChange={(e) => changeInvoiceList(c, 'bds_doc_no', e.target.value)}
            />
            <Input
              placeholder="2022-10-05"
              value={c.bds_doc_date || ''}
              onChange={(e) => changeInvoiceList(c, 'bds_doc_date', e.target.value)}
            />
            <Input
              placeholder="30" type="number"
              value={c.top || 0}
              onChange={(e) => changeInvoiceList(c, 'top', Number(e.target.value))}
            />
            <Input
              placeholder="2022-10-05"
              value={c.invoice_due_date || ''}
              onChange={(e) => changeInvoiceList(c, 'invoice_due_date', e.target.value)}
            />
            <Input
              placeholder="111.2222.222-0"
              value={c.tax_invoice_id || ''}
              onChange={(e) => changeInvoiceList(c, 'tax_invoice_id', Number(e.target.value))}
            />
            <Input
              placeholder="10"
              value={c.ppn_rate || 0}
              onChange={(e) => changeInvoiceList(c, 'ppn_rate', Number(e.target.value))}
            />
            <Input
              placeholder="LICENSE"
              value={c.description || ''}
              onChange={(e) => changeInvoiceList(c, 'description', e.target.value)}
            />
            <Input
              placeholder="100.000.000" type="number"
              value={c.total_after_tax || 0}
              onChange={(e) => changeInvoiceList(c, 'total_after_tax', Number(e.target.value))}
            />
            <Input
              placeholder="10.000" type="number"
              value={c.pph_prepaid || 0}
              onChange={(e) => changeInvoiceList(c, 'pph_prepaid', Number(e.target.value))}
            />
            <Input
              placeholder="100.000.000" type="number"
              value={c.total_after_tax || 0}
              onChange={(e) => changeInvoiceList(c, 'total_after_tax', Number(e.target.value))}
            />
            <div className="flex gap-2 pt-2 justify-center">
              <Trash2Icon className="w-5 text-red-700 cursor-pointer" />
              <ArrowRightCircleIcon className="w-5 text-blue-700 cursor-pointer" onClick={() => dispatch(set_invoice_claim(c))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
