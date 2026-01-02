import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import React from "react";

type EmptyStateProps = {
  title?: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Card>
  );
}
