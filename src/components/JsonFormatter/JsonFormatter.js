import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Highlight } from "prism-react-renderer";

const ContainerBox = styled(Box)(({ theme }) => ({
  padding: "32px",
  backgroundColor: "#f4f4f4",
  borderRadius: "16px",
  marginLeft: "5%",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
}));

const CodeContainer = styled(Box)({
  marginLeft: "16px", // Add left margin to code block
  position: "relative",
});

const CollapsibleDocPage = ({ data, config, appearance }) => {
  const code=`
import Form from "path-to-component";

<Form
  data={${JSON.stringify(data, null, 2)}}
  config={${JSON.stringify(config, null, 2)}}
  appearance={${JSON.stringify(appearance, null, 2)}}
/>
          `
  const copyCodeSnippet = () => {
    const codeSnippet = code
    navigator.clipboard
      .writeText(codeSnippet)
      .then(() => alert("Code copied to clipboard!"))
      .catch(() => alert("Failed to copy code."));
  };

  return (
    <ContainerBox>
  
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Usage Example
      </Typography>
      <CodeContainer>
        <Button
          variant="contained"
          size="small"
          onClick={copyCodeSnippet}
          sx={{
            position: "absolute",
            top: -40,
            right: 0,
            backgroundColor: "#3f51b5",
          }}
        >
          Copy Code
        </Button>
        <Highlight
          code={code}
          language="jsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, padding: "16px" }}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </CodeContainer>
    </ContainerBox>
  );
};

export default CollapsibleDocPage;
