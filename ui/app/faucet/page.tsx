"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

export default function FaucetPage() {

  return (
    <>
      <h1 className="font-semibold text-2xl mb-2">Test Assets</h1>
      <p className="text-red-400">
        {" "}
        these are all mock tokens and has no relation with the real tokens
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Asset</TableHead>{" "}
            <TableHead className="pl-2 w-[110px]">Balance</TableHead>{" "}
            <TableHead>Address</TableHead>
            <TableHead className="w-[100px] text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         
        </TableBody>
      </Table>
    </>
  );
}
