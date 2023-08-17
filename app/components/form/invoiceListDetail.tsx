import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { onReadInvoiceList } from "app/services/invoice.api";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";

export default function InvoiceListDetailForm({ id }: any) {
  const [invoice_list_detail, setInvoiceListDetail] = useState<any>([])
  const default_invoice_list_detail = useSelector((state: any) => state.invoiceSlicer.default_list_detail)
  const readInvoiceListDetail = async () => {
    const resp = await onReadInvoiceList({ id })
    if (!resp.error) setInvoiceListDetail(resp.invoice_list_detail)
  }
  useEffect(() => {
    if (!id) {
      readInvoiceListDetail()
    }
  }, [id]);
  const header = [
    "Doc Received No", "PO No", "Item", "Quantity", "Amount DPP", "Other Amount", "PPH Amount", "PPH Prepaid", "PPH Payable", "Total Before Tax", "Total After Tax", "Action"
  ]
  return (
    <div className="m-2 border-b border-t border-zinc-500">
      <div className="bg-zinc-100  border-b border-zinc-500 p-2 flex justify-between">
        <span className="font-semibold text-sm">Invoice List Detail</span>
        <PlusCircleIcon className="text-blue-700 w-5 cursor-pointer" onClick={() => setInvoiceListDetail(s => [...s, default_invoice_list_detail])} />
      </div>
      <div className="space-y-2 p-2">
        <div className="grid grid-cols-12 gap-1 text-center">
          {header.map(h => <label key={h} className="text-[11px]">{h}</label>)}
        </div>
        {invoice_list_detail.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-1">
            <Input placeholder="INV129" />
            <Input placeholder="PUR/HMIA/21-2088" />
            <Input placeholder="UI Path Robot" />
            <Input placeholder="0" type="number" />
            <Input placeholder="200.000" type="number" />
            <Input placeholder="0" type="number" />
            <Input placeholder="0" type="number" />
            <Input placeholder="0" type="number" />
            <Input placeholder="0" type="number" />
            <Input placeholder="100.000" type="number" />
            <Input placeholder="100.000" type="number" />
            {c.is_saved ?
              <Trash2Icon className="w-5 text-red-700 cursor-pointer" />
              :
              <div className="flex gap-2 pt-2 justify-center">
                <Trash2Icon className="w-5 text-red-700 cursor-pointer" />
                <SaveIcon className="w-5 text-blue-700 cursor-pointer" />
              </div>
            }
          </div>
        ))}
    </div>
    </div >
  );
}
