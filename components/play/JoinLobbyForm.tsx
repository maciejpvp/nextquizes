"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export const JoinLobbyForm = () => {
  const [code, setCode] = useState<string>("");
  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 7) {
      return;
    }
    setCode(event.target.value);
  };

  const handleSubmit = () => {
    redirect(`/play/${code}`);
  };

  const isCodeValid = code.length > 5;

  return (
    <div className="flex flex-col p-10 rounded-md bg-violet-900 gap-3 drop-shadow-lg">
      <input
        placeholder="code"
        onChange={handleCode}
        value={code}
        name="code"
        type="number"
        className="bg-violet-950 p-2 rounded-md text-center font-semibold outline-none"
      />
      <button
        onClick={handleSubmit}
        type="submit"
        disabled={!isCodeValid}
        className={`
          ${isCodeValid ? "bg-yellow-600" : "bg-stone-600"}
          ${isCodeValid ? "hover:bg-yellow-700" : undefined}
          ${isCodeValid ? undefined : "cursor-not-allowed"}
          p-2 rounded-md text-center font-semibold transition-all duration-100`}
      >
        Join
      </button>
    </div>
  );
};
