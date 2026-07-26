import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, updateAddress } from "../../features/address/addressSlice";
import { FiMapPin, FiPlus, FiCheck, FiX } from "react-icons/fi";

const EMPTY_FORM = {
  address: "",
};
const AddressCard = () => {
  const dispatch = useDispatch();

  const { address } = useSelector((state) => state.address);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  useEffect(() => {
    if (address) {
      setForm((prev) => ({
        ...prev,
        address: address,
      }));
    }
  }, [address]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    if (!form.address.trim()) return;

    try {
      await dispatch(updateAddress(form.address)).unwrap();
      await dispatch(getAddress());

      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-number">01</span>
        <h2 className="checkout-section-title">Delivery Address</h2>
      </div>

      <div className="address-list">
        {address ? (
          <div className="address-card address-card-selected">
            <div className="address-card-body">
              <p className="address-line">{address}</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn-add-address"
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Add Address
          </button>
        )}
      </div>

      {!showForm ? (
        address ? (
          <button
            type="button"
            className="btn-add-address"
            onClick={() => setShowForm(true)}
          >
            Edit Address
          </button>
        ) : null
      ) : (
        <form className="address-form" onSubmit={handleSaveAddress}>
          <div className="address-form-header">
            <span>
              <FiMapPin /> Delivery Address
            </span>
            <button
              type="button"
              className="address-form-close"
              onClick={() => setShowForm(false)}
            >
              <FiX />
            </button>
          </div>

          <div className="address-form-grid">
            <textarea
              className="address-input address-input-full"
              rows={6}
              placeholder="Enter your complete delivery address..."
              value={form.address}
              onChange={handleChange("address")}
              required
            />
          </div>

          <button type="submit" className="btn-save-address">
            Save Changes
          </button>
        </form>
      )}
    </section>
  );
};

export default AddressCard;
