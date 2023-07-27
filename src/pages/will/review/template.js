import * as React from "react";

const PageTemplate = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0mm",
        left: "20mm",
      }}
    >
      {props.pageNum >= 3 &&
        (props.pageNum <= props.totalPages - props.attached ? (
          <div style={{ padding: "0" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontSize: "12px",
                color: "black",
              }}
            >
              Last Will and Testament of {props.name}{" "}
              <span style={{ marginLeft: "160px" }}>
                Page {props.pageNum - 2} of{" "}
                {props.totalPages - 2 - props.attached}
              </span>
            </p>
          </div>
        ) : props.attached === 1 ? (
          <div style={{ padding: "0" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontSize: "12px",
                color: "black",
              }}
            >
              Schedule A:{" "}
              {props.digital ? "My Digital Assets" : "Assets in My Estate"}{" "}
              <span style={{ marginLeft: "250px" }}>1 of 1</span>
            </p>
          </div>
        ) : props.pageNum < props.totalPages ? (
          <div style={{ padding: "0" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontSize: "12px",
                color: "black",
              }}
            >
              Schedule A: My Digital Assets{" "}
              <span style={{ marginLeft: "250px" }}>1 of 1</span>
            </p>
          </div>
        ) : (
          <div style={{ padding: "0" }}>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontSize: "12px",
                color: "black",
              }}
            >
              Schedule B: Assets in My Estate{" "}
              <span style={{ marginLeft: "250px" }}>1 of 1</span>
            </p>
          </div>
        ))}
    </div>
  );
};
export default PageTemplate;
