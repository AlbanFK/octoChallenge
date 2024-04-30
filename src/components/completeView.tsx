import React, { useId } from "react";
import { IconCheck } from "./icons";
import Button from "./button";

function CompleteView() {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center mb-8">
          <IconCheck className="w-10 h-10 text-white" />
        </div>
        <p className="text-xl font-medium">
          {" "}
          Your order has been placed{" "}
          <span className="text-green-600">successfully</span>{" "}
        </p>
        <p className="text-lg">Order Number {useId()}</p>
      </div>
      <div className="p-8 flex flex-col items-center justify-center gap-4 bg-primary-100 rounded-md mt-8">
        <span>Print your order barcode to send to Amsterdam laboratory </span>
        <div className="flex justify-center items-center gap-2">
          <Button variant="secondary">DHL</Button>
          <Button variant="secondary">Fedex</Button>
          <Button variant="secondary">UPS</Button>
          <Button>Print Order Barcode</Button>
        </div>
      </div>
    </div>
  );
}

export default CompleteView;
