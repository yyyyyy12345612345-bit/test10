"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, Lock, Truck, CreditCard, Check,
  ChevronDown, Apple, Smartphone
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data/products";
import { SHIPPING_METHODS } from "@/types/cart";
import { getEstimatedDelivery } from "@/lib/utils";

type Step = "information" | "shipping" | "payment" | "confirmation";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  phone: string;
  saveInfo: boolean;
  shippingMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
  giftMessage: string;
  couponCode: string;
}

export function CheckoutClient() {
  const [step, setStep] = useState<Step>("information");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const { items, getTotals, couponCode, applyCoupon, clearCart } = useCartStore();
  const totals = getTotals();

  const [form, setForm] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    saveInfo: true,
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    giftMessage: "",
    couponCode: "",
  });

  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === form.shippingMethod);

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    const success = await applyCoupon(couponInput);
    if (!success) setCouponError("Invalid or expired coupon code.");
    else setCouponError("");
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate Stripe payment processing
    await new Promise((r) => setTimeout(r, 2000));
    const fakeOrderId = `NL-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(fakeOrderId);
    clearCart();
    setStep("confirmation");
    setLoading(false);
  };

  const steps: { id: Step; label: string; icon: typeof Lock }[] = [
    { id: "information", label: "Information", icon: Lock },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  if (step === "confirmation") {
    return (
      <div
        className="min-h-screen bg-noir flex items-center justify-center px-4"
        style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
      >
        <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 border-2 border-gold rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-gold" />
          </div>
          <p className="label-xs text-gold mb-4">ORDER CONFIRMED</p>
          <h1 className="heading-xl text-snow mb-4">Thank You.</h1>
          <p className="text-pearl/60 mb-2">
            Your order <span className="text-gold font-semibold">{orderId}</span> has been placed.
          </p>
          <p className="text-silver text-sm mb-8">
            A confirmation email has been sent to{" "}
            <span className="text-pearl">{form.email || "your email"}</span>.
          </p>
          <p className="text-silver text-sm mb-10">
            Estimated delivery:{" "}
            <span className="text-pearl">{getEstimatedDelivery(form.shippingMethod)}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/orders" className="btn-primary">
              <span>Track Order</span>
            </Link>
            <Link href="/shop" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-noir"
      style={{ paddingTop: "calc(var(--nav-height) + var(--bar-height))" }}
    >
      <div className="container-site py-10">
        {/* Logo center */}
        <Link href="/" className="flex justify-center mb-10">
          <Image
            src="/home/logo.png"
            alt="NOIR LABEL"
            width={100}
            height={34}
            className="h-8 w-auto invert brightness-200"
          />
        </Link>

        {/* Breadcrumb steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (
                    (s.id === "shipping" && step !== "information") ||
                    (s.id === "information")
                  ) {
                    setStep(s.id);
                  }
                }}
                className={`label-xs transition-colors ${
                  step === s.id
                    ? "text-gold"
                    : steps.indexOf({ id: step, label: step, icon: Lock }) > i
                    ? "text-pearl"
                    : "text-fog"
                }`}
              >
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-fog" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* LEFT: Form */}
          <div>

            {/* EXPRESS CHECKOUT */}
            <div className="mb-8">
              <p className="label-xs text-silver text-center mb-4">EXPRESS CHECKOUT</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-black border border-fog py-3 text-snow text-sm hover:border-pearl transition-colors">
                  <Apple className="w-4 h-4" />
                  Apple Pay
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#4285F4] py-3 text-white text-sm hover:bg-[#3b79e0] transition-colors">
                  <Smartphone className="w-4 h-4" />
                  Google Pay
                </button>
              </div>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-fog/40" />
                <span className="label-xs text-fog">OR CONTINUE BELOW</span>
                <div className="flex-1 h-px bg-fog/40" />
              </div>
            </div>

            {/* INFORMATION */}
            {(step === "information" || step === "shipping" || step === "payment") && (
              <div className={step !== "information" ? "opacity-60 pointer-events-none" : ""}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="label-sm text-snow">Contact Information</h2>
                  <Link href="/login" className="text-xs text-silver hover:text-gold transition-colors">
                    Log in
                  </Link>
                </div>

                <div className="space-y-3 mb-6">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="input"
                    autoComplete="email"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className="input"
                      autoComplete="given-name"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className="input"
                      autoComplete="family-name"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="input"
                    autoComplete="street-address"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={form.apartment}
                    onChange={(e) => update("apartment", e.target.value)}
                    className="input"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="input"
                      autoComplete="address-level2"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="ZIP"
                      value={form.zip}
                      onChange={(e) => update("zip", e.target.value)}
                      className="input"
                      autoComplete="postal-code"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone (for delivery updates)"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="input"
                    autoComplete="tel"
                  />
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-silver">
                    <input
                      type="checkbox"
                      checked={form.saveInfo}
                      onChange={(e) => update("saveInfo", e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    Save this information for next time
                  </label>
                </div>

                {step === "information" && (
                  <button
                    onClick={() => setStep("shipping")}
                    className="btn-primary w-full justify-center"
                    disabled={!form.email || !form.firstName || !form.address}
                  >
                    <span>Continue to Shipping</span>
                    <ChevronRight className="w-4 h-4 relative z-10" />
                  </button>
                )}
              </div>
            )}

            {/* SHIPPING */}
            {(step === "shipping" || step === "payment") && (
              <div className={`mt-8 ${step === "payment" ? "opacity-60 pointer-events-none" : ""}`}>
                <h2 className="label-sm text-snow mb-4">Shipping Method</h2>
                <div className="space-y-3 mb-6">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-200 ${
                        form.shippingMethod === method.id
                          ? "border-gold bg-gold/5"
                          : "border-fog hover:border-fog/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={form.shippingMethod === method.id}
                          onChange={() => update("shippingMethod", method.id)}
                          className="accent-gold"
                        />
                        <div>
                          <p className="text-sm text-snow font-medium">{method.name}</p>
                          <p className="text-xs text-silver">{method.description}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gold font-semibold">
                        {method.price === 0 ? "FREE" : formatPrice(method.price)}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Gift options */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Gift message (optional)"
                    value={form.giftMessage}
                    onChange={(e) => update("giftMessage", e.target.value)}
                    className="input"
                    maxLength={200}
                  />
                </div>

                {step === "shipping" && (
                  <button
                    onClick={() => setStep("payment")}
                    className="btn-primary w-full justify-center"
                  >
                    <span>Continue to Payment</span>
                    <ChevronRight className="w-4 h-4 relative z-10" />
                  </button>
                )}
              </div>
            )}

            {/* PAYMENT */}
            {step === "payment" && (
              <div className="mt-8">
                <h2 className="label-sm text-snow mb-4">Payment</h2>

                {/* Card form (mock — replace with Stripe Elements in production) */}
                <div className="glass border border-fog/30 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-gold" />
                    <span className="label-xs text-snow">Credit / Debit Card</span>
                    <div className="ml-auto flex gap-2">
                      {["Visa", "MC", "Amex"].map((c) => (
                        <span key={c} className="text-[10px] border border-fog/40 px-1.5 py-0.5 text-silver">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                        update("cardNumber", v.replace(/(.{4})/g, "$1 ").trim());
                      }}
                      className="input font-mono"
                      maxLength={19}
                    />
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={form.cardName}
                      onChange={(e) => update("cardName", e.target.value)}
                      className="input"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={form.cardExpiry}
                        onChange={(e) => update("cardExpiry", e.target.value)}
                        className="input font-mono"
                        maxLength={7}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={form.cardCvv}
                        onChange={(e) => update("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="input font-mono"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="flex items-center gap-2 text-xs text-fog mb-6">
                  <Lock className="w-3 h-3" />
                  <span>Your payment is encrypted and secure. We never store card details.</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !form.cardNumber || !form.cardName}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 relative z-10" />
                      <span>Pay {formatPrice(totals.total)}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:order-first lg:order-none xl:order-last">
            <div className="lg:sticky lg:top-28">
              <div className="glass border border-fog/20 p-6 rounded-sm">
                <h3 className="label-sm text-snow mb-6">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-[280px] overflow-y-auto scrollbar-hide">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-20 flex-shrink-0 bg-ash overflow-hidden">
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        {/* Quantity badge */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-noir text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-snow leading-tight">{item.product.name}</p>
                        <p className="text-xs text-silver mt-0.5">Size: {item.variant.size}</p>
                      </div>
                      <span className="text-sm text-gold font-medium">
                        {formatPrice((item.variant.price ?? item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                    className="input flex-1 text-sm py-2"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gold/20 text-gold border border-gold/30 text-xs font-semibold uppercase tracking-wider hover:bg-gold/30 transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-danger text-xs -mt-4 mb-4">{couponError}</p>}
                {couponCode && (
                  <p className="text-success text-xs -mt-4 mb-4">✓ Coupon {couponCode} applied</p>
                )}

                <div className="divider mb-4" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-silver">
                    <span>Subtotal</span>
                    <span>{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>−{formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-silver">
                    <span>Shipping</span>
                    <span>
                      {selectedShipping?.price === 0 || totals.shipping === 0
                        ? "FREE"
                        : formatPrice(selectedShipping?.price ?? totals.shipping)}
                    </span>
                  </div>
                  <div className="divider my-2" />
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-snow">Total</span>
                    <span className="text-gold text-lg">{formatPrice(totals.total)}</span>
                  </div>
                </div>

                {/* Estimated delivery */}
                {form.shippingMethod && (
                  <p className="text-xs text-silver mt-4">
                    Estimated delivery:{" "}
                    <span className="text-pearl">{getEstimatedDelivery(form.shippingMethod)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
