"use client";
import { useCart } from "@/hooks/useCart";
import { useFormat } from "@/hooks/useFormat";
import Link from "next/link";
import React from "react";

const CartSummary = () => {
  const { totalPrice } = useCart();
  const { formatAmount } = useFormat();
  return (
    <div className="space-y-8 p-8 rounded-lg shadow-lg border">
      <h2 className="text-xl font-medium text-templateBrown">Cart Summary</h2>
      <div className="space-y-4 text-gray-600">
        <div className="flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatAmount(totalPrice)}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between text-sm">
          <span>Shipping</span>
          <span>{formatAmount(0)}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between text-sm">
          <span>Taxes</span>
          <span>{formatAmount(totalPrice)}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between text-sm">
          <span>Total</span>
          <span>{formatAmount(totalPrice)}</span>
        </div>
      </div>
      <div>
        <Link
          href={"/checkout"}
          className="bg-templateBrown flex items-center justify-center font-light gap-2 hover:opacity-90 tracking-wider text-white w-full py-2.5 rounded-full"
        >
          CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
