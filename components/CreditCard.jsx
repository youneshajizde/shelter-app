import React from "react";

function CreditCard() {
  return (
    <div className="relative w-full h-48 bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">VIRTUAL BANK</div>
      </div>
      <div className="text-xl font-mono tracking-widest mb-6">
        1234 5678 9012 3456
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <div className="uppercase text-gray-400 text-xs">Cardholder</div>
          <div className="font-semibold">John Doe</div>
        </div>
        <div>
          <div className="uppercase text-gray-400 text-xs">Expires</div>
          <div className="font-semibold">12/25</div>
        </div>
      </div>
      <div className="absolute top-4 right-4 text-gray-400 text-xs">VISA</div>
    </div>
  );
}

export default CreditCard;
