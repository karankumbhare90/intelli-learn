import { PricingTable } from "@clerk/nextjs";

export default function Billings() {
    return (
        <div>
            <h2 className="text-2xl font-bold pb-5">Select Plan</h2>
            <PricingTable />
        </div>
    )
}
