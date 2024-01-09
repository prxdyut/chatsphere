import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Share from "yet-another-react-lightbox/plugins/share";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function ImagePreview() {
  const [params, setParams] = useSearchParams();
  const preview = params.get("image");
  const navigate = useNavigate();

  return (
    <div>
      <Lightbox
        plugins={[Share, Zoom]}
        open={Boolean(preview)}
        close={() => navigate(-1)}
        slides={[{ src: preview }]}
      />
    </div>
  );
}
