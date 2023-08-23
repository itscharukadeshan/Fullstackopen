/** @format */

import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  rating: number;
}

function HealthCheckRating({ rating }: Props) {
  let color;

  switch (rating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    case 4:
      color = "red";
      break;
    default:
      color = "gray";
  }

  return (
    <div style={{ color }}>
      <FavoriteIcon />
    </div>
  );
}

export default HealthCheckRating;
