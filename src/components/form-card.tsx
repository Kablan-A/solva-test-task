import * as React from "react";

export interface FormCardProps {
  title?: string;
  children: React.ReactNode; // Form component
}

export function FormCard({ title, children }: FormCardProps) {
  return (
    <div
      className="card"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      {title && (
        <div className="card-header bg-transparent">
          <h2 className="display-6 fw-light">{title}</h2>
        </div>
      )}
      <div className="card-body p-3 py-lg-4 px-lg-5">{children}</div>
    </div>
  );
}
