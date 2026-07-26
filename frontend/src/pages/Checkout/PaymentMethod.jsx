import { FiCheck, FiTruck, FiCreditCard } from "react-icons/fi";

const PAYMENT_OPTIONS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay with cash when your order arrives",
    icon: FiTruck,
    available: true,
  },
  {
    id: "razorpay",
    label: "Razorpay",
    description: "UPI, cards and netbanking",
    icon: FiCreditCard,
    available: false,
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "International cards",
    icon: FiCreditCard,
    available: false,
  },
];

const PaymentMethod = ({ selected, onSelect }) => {
  return (
    <section className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-number">03</span>
        <h2 className="checkout-section-title">Payment Method</h2>
      </div>

      <div className="payment-list">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <button
              type="button"
              key={option.id}
              className={`payment-option ${
                isSelected ? "payment-option-selected" : ""
              } ${!option.available ? "payment-option-disabled" : ""}`}
              onClick={() => option.available && onSelect(option.id)}
              disabled={!option.available}
            >
              <div className="payment-option-radio">
                {isSelected && <FiCheck />}
              </div>

              <Icon className="payment-option-icon" />

              <div className="payment-option-text">
                <span className="payment-option-label">{option.label}</span>
                <span className="payment-option-description">
                  {option.description}
                </span>
              </div>

              {!option.available && (
                <span className="payment-option-badge">Coming Soon</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethod;