"use client";

import { useState } from "react";
import Status from "./components/ui/Status";
import ProfileName from "./components/ui/ProfileName";
import Table from "./components/ui/Table";
import Pagination from "./components/ui/Pagination";
import ProgressBar from "./components/ui/ProgressBar";
import type { TableColumn } from "./types/Table";

interface Student {
  id: string;
  name: string;
  faculty: string;
  department: string;
  program: string;
  level: number;
  status: "Active" | "Hold" | "Suspended";
  gpa: number;
  risk: "Low" | "Watch" | "High";
}

const students: Student[] = [
  { id: "202301184", name: "Nour Adel", faculty: "Engineering", department: "Computer Science", program: "BSc Computer Science", level: 3, status: "Active", gpa: 3.42, risk: "Watch" },
  { id: "202201076", name: "Karim Samir", faculty: "Business", department: "Finance", program: "BBA Finance", level: 4, status: "Active", gpa: 2.18, risk: "High" },
  { id: "202401291", name: "Mariam Ashraf", faculty: "Medicine", department: "Clinical Sciences", program: "MBBS Medicine", level: 2, status: "Active", gpa: 3.76, risk: "Low" },
  { id: "202301445", name: "Omar Tarek", faculty: "Arts", department: "Architecture", program: "BArch Architecture", level: 3, status: "Hold", gpa: 2.84, risk: "Watch" },
  { id: "202501028", name: "Salma Hany", faculty: "Engineering", department: "Data Science", program: "BSc Data Science", level: 1, status: "Active", gpa: 3.91, risk: "Low" },
  { id: "202201612", name: "Youssef Nader", faculty: "Business", department: "Marketing", program: "BBA Marketing", level: 4, status: "Active", gpa: 3.02, risk: "Low" },
  { id: "202401183", name: "Lina Wael", faculty: "Pharmacy", department: "Pharmaceutics", program: "BPharm Pharmacy", level: 2, status: "Active", gpa: 2.36, risk: "High" },
  { id: "202501146", name: "Adam Fares", faculty: "Engineering", department: "Mechanical", program: "BEng Mechanical", level: 1, status: "Active", gpa: 3.55, risk: "Low" },
  { id: "202301298", name: "Jana Mostafa", faculty: "Arts", department: "Media", program: "BA Digital Media", level: 3, status: "Suspended", gpa: 1.92, risk: "High" },
  { id: "202401377", name: "Hassan Ali", faculty: "Engineering", department: "Electrical", program: "BEng Electrical", level: 2, status: "Active", gpa: 3.11, risk: "Low" },
  { id: "202201845", name: "Farida Khaled", faculty: "Medicine", department: "Surgery", program: "MBBS Medicine", level: 4, status: "Active", gpa: 3.67, risk: "Low" },
  { id: "202501302", name: "Ziad Hossam", faculty: "Business", department: "Accounting", program: "BBA Accounting", level: 1, status: "Hold", gpa: 2.45, risk: "Watch" },
];

const statusMap = { Active: "success", Hold: "loading", Suspended: "error" } as const;
const riskColor = { Low: "text-[#16A34A]", Watch: "text-[#9A5B00]", High: "text-[#EF4444]" };

const columns: TableColumn<Student>[] = [
  { header: "Student / ID", accessor: "name", cell: (s) => `${s.name} · ${s.id}` },
  { header: "Faculty", accessor: "faculty" },
  { header: "Department", accessor: "department" },
  { header: "Program", accessor: "program" },
  { header: "Level", accessor: "level" },
  { header: "Status", accessor: "status", cell: (s) => <Status status={statusMap[s.status]} label={s.status} /> },
  { header: "GPA", accessor: "gpa", className: "font-semibold text-[#0F172A]", cell: (s) => s.gpa.toFixed(2) },
  { header: "Risk", accessor: "risk", cell: (s) => <span className={riskColor[s.risk]}>{s.risk}</span> },
];

export default function Home() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="flex gap-2">
        <Status status="success" />
        <Status status="loading" />
        <Status status="error" />
      </div>
      <ProfileName name="Omar Ahmed" />

      <div className="flex w-[340px] flex-col gap-4">
        <ProgressBar value={78} label="Within target" />
        <ProgressBar value={45} color="#9A5B00" label="Near limit" />
        <ProgressBar value={92} color="#EF4444" label="Over target" />
        <ProgressBar value={60} color="#28C5F4" />
      </div>

      <Table
        columns={columns}
        data={students}
        rowKey="id"
        pageSize={9}
        onRowClick={(s) => alert(s.name)}
      />

      <div className="w-full rounded-2xl border-[0.8px] border-[#E2E8F0] bg-white">
        <Pagination page={page} pageSize={9} total={18642} onPageChange={setPage} />
      </div>
    </div>
  );
}
