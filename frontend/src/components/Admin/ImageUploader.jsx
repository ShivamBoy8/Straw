import { MdDelete } from "react-icons/md";

export default function ImageUploader({
  images,
  setImages,
  existingImages = [],
}) {
  function handleImageChange(e) {
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="mb-3">Product Images</h5>

        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Existing Images */}

        {existingImages.length > 0 && (
          <>
            <h6 className="mt-4 mb-3">Existing Images</h6>

            <div className="row g-3 mb-4">
              {existingImages.map((image) => (
                <div key={image.public_id} className="col-6 col-md-4 col-lg-3">
                  <div className="border rounded overflow-hidden">
                    <img
                      src={image.url}
                      alt="product"
                      className="w-100"
                      style={{
                        height: 220,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Newly Selected Images */}

        {images.length > 0 && (
          <>
            <h6 className="mb-3">New Images</h6>

            <div className="row g-3">
              {images.map((image, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-3">
                  <div className="position-relative border rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-100"
                      style={{
                        height: 220,
                        objectFit: "cover",
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => removeImage(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
