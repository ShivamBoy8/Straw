import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RiSparkling2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import api from "../../api/axios";
import "./AISizeRecommendation.css";

const FIT_OPTIONS = [
  { value: "snug", label: "Snug Fit" },
  { value: "regular", label: "Regular Fit" },
  { value: "relaxed", label: "Relaxed Fit" },
];

const AISizeRecommendation = ({ product }) => {
  const dialogRef = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [footSize, setFootSize] = useState("");

  const [fitPreference, setFitPreference] = useState("regular");

  const [recommendation, setRecommendation] = useState(null);

  const hasSizes = product?.sizes?.length > 0;

  useEffect(() => {
    if (!user) return;

    setHeight(user.height || "");
    setWeight(user.weight || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setBodyType(user.bodyType || "");
    setFootSize(user.footSize || "");
  }, [user]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      dialogRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  if (!hasSizes) return null;

  const openModal = () => {
    if (!isAuthenticated) {
      alert("Please login first.");
      return;
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      setStatus("idle");
      setRecommendation(null);
      setErrorMsg("");
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!height || !weight || !age || !gender || !bodyType || !footSize) {
      setErrorMsg(
        "Please complete your profile before using AI Size Recommendation.",
      );
      return;
    }

    try {
      setStatus("loading");
      setErrorMsg("");

      const response = await api.post("/ai/recommend-size", {
        productId: product._id,
        fitPreference,
      });

      setRecommendation(response.data.recommendation);

      setStatus("done");
    } catch (err) {
      console.log(err);
      console.log(err.response);

      setStatus("error");

      setErrorMsg(
        err.response?.data?.message || "Couldn't get AI recommendation.",
      );
    }
  };
  return (
    <>
      <button type="button" className="ai-trigger" onClick={openModal}>
        <span className="ai-trigger-icon">
          <RiSparkling2Fill size={15} />
        </span>
        Ask AI
      </button>

      {isOpen && (
        <div
          className="ai-overlay"
          onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            className="ai-modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <button
              className="ai-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              <IoClose size={20} />
            </button>

            <div className="ai-modal-head">
              <span className="ai-modal-badge">
                <RiSparkling2Fill size={16} />
              </span>

              <div>
                <h2 className="ai-modal-title">Ask AI</h2>

                <p className="ai-modal-sub">
                  We use your saved profile to recommend the best size.
                </p>
              </div>
            </div>

            {status !== "done" ? (
              <form className="ai-form" onSubmit={handleSubmit}>
                <div className="ai-field-row">
                  <label className="ai-field">
                    <span>Height</span>

                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </label>

                  <label className="ai-field">
                    <span>Weight</span>

                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </label>
                </div>

                <div className="ai-field-row">
                  <label className="ai-field">
                    <span>Age</span>

                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>

                  <label className="ai-field">
                    <span>Foot Size</span>

                    <input
                      type="number"
                      value={footSize}
                      onChange={(e) => setFootSize(e.target.value)}
                    />
                  </label>
                </div>

                <div className="ai-field-row">
                  <label className="ai-field">
                    <span>Gender</span>

                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="ai-field">
                    <span>Body Type</span>

                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Slim">Slim</option>
                      <option value="Regular">Regular</option>
                      <option value="Athletic">Athletic</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </label>
                </div>

                <div className="ai-field">
                  <span>Preferred Fit</span>

                  <div className="ai-fit-group">
                    {FIT_OPTIONS.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className={`ai-fit-pill ${
                          fitPreference === item.value ? "is-active" : ""
                        }`}
                        onClick={() => setFitPreference(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMsg && <p className="ai-error">{errorMsg}</p>}

                <button className="ai-submit" disabled={status === "loading"}>
                  {status === "loading"
                    ? "Finding your perfect size..."
                    : "Get AI Recommendation"}
                </button>
              </form>
            ) : (
              <div className="ai-result">
                <div className="ai-result-size">
                  <span className="ai-result-label">Recommended Size</span>

                  <span className="ai-result-chip">
                    {recommendation.recommendedSize}
                  </span>
                </div>

                <div className="ai-reasoning">{recommendation.reason}</div>

                <button
                  className="ai-again"
                  onClick={() => {
                    setStatus("idle");
                    setRecommendation(null);
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AISizeRecommendation;