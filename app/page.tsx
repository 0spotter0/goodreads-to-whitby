"use client";

import { useState, useRef, useEffect } from "react";
import Papa, { ParseResult } from "papaparse";

interface CsvRow {
  [key: string]: string;
}

export default function Home() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("csvData");
    if (saved) {
      setCsvData(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<CsvRow>(file, {
      complete: (result: ParseResult<CsvRow>) => {
        setCsvData(result.data);
        localStorage.setItem("csvData", JSON.stringify(result.data));
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const unloadFile = () => {
    setCsvData([]);
    localStorage.removeItem("csvData");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="sm:hidden w-fit h-fit px-6 py-4 font-mono shadow-lg mt-20 m-auto bg-white font-bold">
        NO MOBILE :(
      </div>
      <div className="hidden sm:block h-screen bg-white shadow-lg flex flex-col items-center">
        <div className="flex justify-center mb-8">
          <div className="bg-amber-300 h-full px-2 py-2">
            <img src="/goodreads-logo.png" className="w-full h-10" />
          </div>
          <p className="font-mono px-10 my-auto text-3xl transform scale-x-[-1]">
            {"𓆝 𓆟 𓆞 𓆝 𓆟"}
          </p>
          <div className="bg-sky-800 w-60 px-2 py-2">
            <img src="/whitby-public-library-logo.png" className="w-full" />
          </div>
        </div>
        <div className="bg-white h-fit mb-20">
          <h1 className="text-3xl text-center font-light italic">
            library haters hate to see it happen
          </h1>
          <h2 className="text-sm text-gray-500 text-center">v1</h2>
          <div className="flex items-center gap-4 px-4 mt-4">
            <label className="cursor-pointer inline-block">
              <img src="/open.png" className="w-8 h-8 cursor-pointer" />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
            {csvData.length > 0 && (
              <>
                <button
                  className="cursor-pointer underline flex items-center"
                  onClick={unloadFile}
                >
                  <img src="/trash.png" className="w-8 h-8" />
                </button>
                <p>total {csvData.length}</p>
              </>
            )}
          </div>
          {csvData.length > 0 && (
            <table className="table-auto border-collapse border-0 border-gray-300 w-full mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    author
                  </th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://whitby.bibliocommons.com/v2/search?&query=anywhere%3A(${row["ISBN13"]})&searchType=bl`}
                        className="underline decoration-black text-ellipsis line-clamp-1"
                      >
                        {row.Title ?? "Missing title"}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 truncate">
                      {row.Author ?? "Missing author"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
