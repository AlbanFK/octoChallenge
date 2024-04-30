"use client";
import { useState } from "react";
import InputGroup from "./inputGroup";
import Label from "./label";
import Select from "./select";
import RadioGroupInput from "./radioGroupInput";
import { snakeCase } from "@/lib/utils";
import Input from "./input";
import Button from "./button";

type period = "Immediate Disposal" | "1 Month" | "3 Months";
export interface BillingInfos {
  blastService: boolean;
  storagePeriod: period;
  orderer: {
    name: string;
    contact: string;
    firstEmail: string;
    secondEmail: string;
  };
  comment: string;
  institution: string;
  mobileNumber: string;
  country: string;
  billingAddress: string;
  poNumber: string;
  attn: string;
  coupon: string;
  promotionCode: string;
  paymentRequest: string;
}

function BillingInfosView() {
  const initialData: BillingInfos = {
    blastService: false,
    storagePeriod: "Immediate Disposal",
    orderer: {
      name: "",
      contact: "",
      firstEmail: "",
      secondEmail: "",
    },
    comment: "",
    institution: "",
    mobileNumber: "",
    country: "",
    billingAddress: "",
    poNumber: "",
    attn: "",
    coupon: "",
    promotionCode: "",
    paymentRequest: "",
  };
  const [data, setData] = useState<BillingInfos>(initialData);

  return (
    <>
      <div className="col-span-2">
        <InputGroup
          description="This is a service that a that is highly similar to the sequence of DNA obtained in the Local Alignment Search Tool and NCBI database
We will provide you with data files retrieved from NCBI and no analysis services will be provided."
        >
          <div className="flex flex-col gap-1.5">
            <Label>Blast Service</Label>
            <RadioGroupInput
              items={["Yes", "No"]}
              label={(item) => item}
              value={(item) => item}
              itemKey={(item) => snakeCase(item)}
              change={(val) =>
                setData({
                  ...data,
                  blastService: val === "Yes",
                })
              }
              selected={data.blastService ? "Yes" : "No"}
            />
          </div>
        </InputGroup>
      </div>

      <div className="col-span-2">
        <InputGroup description="If immediate disposal is selected, additional orders and re-sequencing cannot be ordered as the sample is immediately discarded after the primary experiment">
          <div className="flex flex-col gap-1.5">
            <Label>Storage Period</Label>
            <RadioGroupInput
              items={["Immediate Disposal", "1 Month", "3 Months"]}
              label={(item) => item}
              value={(item) => item}
              itemKey={(item) => snakeCase(item)}
              change={(val) =>
                setData({
                  ...data,
                  storagePeriod: val,
                })
              }
              selected={data.storagePeriod}
            />
          </div>
        </InputGroup>
      </div>
      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Ordered By</Label>
          <Input
            value={data.orderer.name}
            onChange={(e) =>
              setData({
                ...data,
                orderer: { ...data.orderer, name: e.target.value },
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Actual Orderer Contact</Label>
          <Input
            value={data.orderer.contact}
            onChange={(e) =>
              setData({
                ...data,
                orderer: { ...data.orderer, contact: e.target.value },
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Primary E-mail</Label>
          <Input
            value={data.orderer.firstEmail}
            onChange={(e) =>
              setData({
                ...data,
                orderer: { ...data.orderer, firstEmail: e.target.value },
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Additional E-mail for Result</Label>
          <Input
            value={data.orderer.secondEmail}
            onChange={(e) =>
              setData({
                ...data,
                orderer: { ...data.orderer, secondEmail: e.target.value },
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Comment</Label>
          <Input
            value={data.comment}
            onChange={(e) =>
              setData({
                ...data,
                comment: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Institution for Billing</Label>
          <div className="flex gap-2 items-center">
            <Input
              value={data.institution}
              onChange={(e) =>
                setData({
                  ...data,
                  institution: e.target.value,
                })
              }
            />
            <Button>Find</Button>
          </div>
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Mobile Number</Label>
          <Input
            type="tel"
            value={data.mobileNumber}
            onChange={(e) =>
              setData({
                ...data,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Country</Label>
          <Input
            value={data.country}
            onChange={(e) =>
              setData({
                ...data,
                country: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Billing Address</Label>
          <Input
            value={data.billingAddress}
            onChange={(e) =>
              setData({
                ...data,
                billingAddress: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>PO Number</Label>
          <Input
            value={data.poNumber}
            onChange={(e) =>
              setData({
                ...data,
                poNumber: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>ATTN</Label>
          <Input
            value={data.attn}
            onChange={(e) =>
              setData({
                ...data,
                attn: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Coupon</Label>

          <div className="flex gap-2 items-center">
            <Input
              value={data.coupon}
              onChange={(e) =>
                setData({
                  ...data,
                  coupon: e.target.value,
                })
              }
            />
            <Button>Apply</Button>
          </div>
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Promotion Code</Label>

          <div className="flex gap-2 items-center">
            <Input
              value={data.promotionCode}
              onChange={(e) =>
                setData({
                  ...data,
                  promotionCode: e.target.value,
                })
              }
            />
            <Button>Apply</Button>
          </div>
        </div>
      </InputGroup>

      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Request on payment</Label>
          <Input
            value={data.paymentRequest}
            onChange={(e) =>
              setData({
                ...data,
                paymentRequest: e.target.value,
              })
            }
          />
        </div>
      </InputGroup>
    </>
  );
}

export default BillingInfosView;
